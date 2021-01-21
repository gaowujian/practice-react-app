/**
 * react-lazyload
 */
/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { on, off } from "./utils/event";
import scrollParent from "./utils/scrollParent";
import debounce from "./utils/debounce";
import throttle from "./utils/throttle";

const defaultBoundingClientRect = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: 0,
  height: 0,
};
const LISTEN_FLAG = "data-lazyload-listened";
const listeners = [];
let pending = [];

// try to handle passive events
let passiveEventSupported = false;
try {
  const opts = Object.defineProperty({}, "passive", {
    get() {
      passiveEventSupported = true;
    },
  });
  window.addEventListener("test", null, opts);
} catch (e) {}
// if they are supported, setup the optional params
// IMPORTANT: FALSE doubles as the default CAPTURE value!
const passiveEvent = passiveEventSupported
  ? { capture: false, passive: true }
  : false;

/**
 * Check if `component` is visible in overflow container `parent`
 * @param  {node} component React component
 * @param  {node} parent    component's scroll parent
 * @return {bool}
 */
const checkOverflowVisible = function checkOverflowVisible(component, parent) {
  const node = component.ref;
  let parentTop;
  let parentLeft;
  let parentHeight;
  let parentWidth;
  // 获取父级参考元素的top left width和height，这个height是parent的offsetHeight
  // console.log(parent.offsetHeight);
  // console.log(parent.clientHeight);
  try {
    ({
      top: parentTop,
      left: parentLeft,
      height: parentHeight,
      width: parentWidth,
    } = parent.getBoundingClientRect());
  } catch (e) {
    ({
      top: parentTop,
      left: parentLeft,
      height: parentHeight,
      width: parentWidth,
    } = defaultBoundingClientRect);
  }

  //获取浏览器的可视区域
  const windowInnerHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowInnerWidth =
    window.innerWidth || document.documentElement.clientWidth;

  // intersection表示容器元素和图片元素重合的部分
  // 计算重合部分相较于视图的top left height和width
  // 举例一种复杂情况：
  // 当容器高度+相对于视图的top 大于浏览器可视高度的时候，我们的重合部分就是浏览器内容器的可视部分

  // calculate top and height of the intersection of the element's scrollParent and viewport
  const intersectionTop = Math.max(parentTop, 0); // intersection's top relative to viewport
  const intersectionLeft = Math.max(parentLeft, 0); // intersection's left relative to viewport
  const intersectionHeight =
    Math.min(windowInnerHeight, parentTop + parentHeight) - intersectionTop; // height
  const intersectionWidth =
    Math.min(windowInnerWidth, parentLeft + parentWidth) - intersectionLeft; // width

  // check whether the element is visible in the intersection
  let top;
  let left;
  let height;
  let width;

  // 获取图片元素的top left width和height， 这个height是元素的的offsetHeight
  try {
    ({ top, left, height, width } = node.getBoundingClientRect());
  } catch (e) {
    ({ top, left, height, width } = defaultBoundingClientRect);
  }

  // 计算图片元素相较于重合部分的高度
  const offsetTop = top - intersectionTop; // element's top relative to intersection
  const offsetLeft = left - intersectionLeft; // element's left relative to intersection

  const offsets = Array.isArray(component.props.offset)
    ? component.props.offset
    : [component.props.offset, component.props.offset]; // Be compatible with previous API

  return (
    offsetTop - offsets[0] <= intersectionHeight &&
    offsetTop + height + offsets[1] >= 0 &&
    offsetLeft - offsets[0] <= intersectionWidth &&
    offsetLeft + width + offsets[1] >= 0
  );
};

/**
 * Check if `component` is visible in document
 * @param  {node} component React component
 * @return {bool}
 */
const checkNormalVisible = function checkNormalVisible(component) {
  // 获取元素的真实dom
  const node = component.ref;

  // If this element is hidden by css rules somehow, it's definitely invisible
  // 如果组件的真实dom，使用css进行了隐藏，例如 display:none，那么多当然这个组件是不可见的
  if (
    !(node.offsetWidth || node.offsetHeight || node.getClientRects().length)
  ) {
    return false;
  }

  let top;
  let elementHeight;

  // 计算元素想较于视图的位置
  try {
    ({ top, height: elementHeight } = node.getBoundingClientRect());
  } catch (e) {
    ({ top, height: elementHeight } = defaultBoundingClientRect);
  }
  //获得浏览器窗口的可视高度
  const windowInnerHeight =
    window.innerHeight || document.documentElement.clientHeight;

  const offsets = Array.isArray(component.props.offset)
    ? component.props.offset
    : [component.props.offset, component.props.offset]; // Be compatible with previous API

  return (
    top - offsets[0] <= windowInnerHeight &&
    top + elementHeight + offsets[1] >= 0
  );
};

/**
 * Detect if element is visible in viewport, if so, set `visible` state to true.
 * If `once` prop is provided true, remove component as listener after checkVisible
 *
 * @param  {React} component   React component that respond to scroll and resize
 */
const checkVisible = function checkVisible(component) {
  const node = component.ref;
  if (!(node instanceof HTMLElement)) {
    return;
  }

  const parent = scrollParent(node);
  const isOverflow =
    component.props.overflow &&
    parent !== node.ownerDocument &&
    parent !== document &&
    parent !== document.documentElement;
  // console.log(isOverflow);
  const visible = isOverflow
    ? checkOverflowVisible(component, parent)
    : checkNormalVisible(component);
  if (visible) {
    // Avoid extra render if previously is visible
    if (!component.visible) {
      if (component.props.once) {
        pending.push(component);
      }

      component.visible = true;
      component.forceUpdate();
    }
  } else if (!(component.props.once && component.visible)) {
    component.visible = false;
    if (component.props.unmountIfInvisible) {
      component.forceUpdate();
    }
  }
};

const purgePending = function purgePending() {
  pending.forEach((component) => {
    const index = listeners.indexOf(component);
    if (index !== -1) {
      listeners.splice(index, 1);
    }
  });

  pending = [];
};

const lazyLoadHandler = () => {
  for (let i = 0; i < listeners.length; ++i) {
    const listener = listeners[i];
    checkVisible(listener);
  }
  // Remove `once` component in listeners
  purgePending();
};

/**
 * Forces the component to display regardless of whether the element is visible in the viewport.
 */
const forceVisible = () => {
  for (let i = 0; i < listeners.length; ++i) {
    const listener = listeners[i];
    listener.visible = true;
    listener.forceUpdate();
  }
  // Remove `once` component in listeners
  purgePending();
};

// Depending on component's props
let delayType;
let finalLazyLoadHandler = null;

const isString = (string) => typeof string === "string";

class LazyLoad extends Component {
  constructor(props) {
    super(props);
    // ;
    this.visible = false;
    this.setRef = this.setRef.bind(this);
  }

  componentDidMount() {
    // ;
    // It's unlikely to change delay type on the fly, this is mainly
    // designed for tests
    let scrollport = window;
    const { scrollContainer } = this.props;
    if (scrollContainer) {
      if (isString(scrollContainer)) {
        scrollport = scrollport.document.querySelector(scrollContainer);
      }
    }
    const needResetFinalLazyLoadHandler =
      (this.props.debounce !== undefined && delayType === "throttle") ||
      (delayType === "debounce" && this.props.debounce === undefined);

    if (needResetFinalLazyLoadHandler) {
      off(scrollport, "scroll", finalLazyLoadHandler, passiveEvent);
      off(window, "resize", finalLazyLoadHandler, passiveEvent);
      finalLazyLoadHandler = null;
    }

    if (!finalLazyLoadHandler) {
      if (this.props.debounce !== undefined) {
        finalLazyLoadHandler = debounce(
          lazyLoadHandler,
          typeof this.props.debounce === "number" ? this.props.debounce : 300
        );
        delayType = "debounce";
      } else if (this.props.throttle !== undefined) {
        finalLazyLoadHandler = throttle(
          lazyLoadHandler,
          typeof this.props.throttle === "number" ? this.props.throttle : 300
        );
        delayType = "throttle";
      } else {
        finalLazyLoadHandler = lazyLoadHandler;
      }
    }

    if (this.props.overflow) {
      const parent = scrollParent(this.ref);
      if (parent && typeof parent.getAttribute === "function") {
        const listenerCount = 1 + +parent.getAttribute(LISTEN_FLAG);
        if (listenerCount === 1) {
          parent.addEventListener("scroll", finalLazyLoadHandler, passiveEvent);
        }
        parent.setAttribute(LISTEN_FLAG, listenerCount);
      }
    } else if (listeners.length === 0 || needResetFinalLazyLoadHandler) {
      const { scroll, resize } = this.props;

      if (scroll) {
        on(scrollport, "scroll", finalLazyLoadHandler, passiveEvent);
      }

      if (resize) {
        on(window, "resize", finalLazyLoadHandler, passiveEvent);
      }
    }

    listeners.push(this);
    checkVisible(this);
  }

  shouldComponentUpdate() {
    return this.visible;
  }

  componentWillUnmount() {
    if (this.props.overflow) {
      const parent = scrollParent(this.ref);
      if (parent && typeof parent.getAttribute === "function") {
        const listenerCount = +parent.getAttribute(LISTEN_FLAG) - 1;
        if (listenerCount === 0) {
          parent.removeEventListener(
            "scroll",
            finalLazyLoadHandler,
            passiveEvent
          );
          parent.removeAttribute(LISTEN_FLAG);
        } else {
          parent.setAttribute(LISTEN_FLAG, listenerCount);
        }
      }
    }

    const index = listeners.indexOf(this);
    if (index !== -1) {
      listeners.splice(index, 1);
    }

    if (listeners.length === 0 && typeof window !== "undefined") {
      off(window, "resize", finalLazyLoadHandler, passiveEvent);
      off(window, "scroll", finalLazyLoadHandler, passiveEvent);
    }
  }

  setRef(element) {
    if (element) {
      this.ref = element;
    }
  }

  render() {
    // ;
    const {
      height,
      children,
      placeholder,
      classNamePrefix,
      style,
    } = this.props;
    // ;
    return (
      <div
        className={`${classNamePrefix}-wrapper`}
        ref={this.setRef}
        style={style}
      >
        {this.visible
          ? children
          : placeholder || (
              <div
                style={{ height }}
                className={`${classNamePrefix}-placeholder`}
              />
            )}
      </div>
    );
  }
}

LazyLoad.propTypes = {
  classNamePrefix: PropTypes.string,
  once: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  offset: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number),
  ]),
  overflow: PropTypes.bool,
  resize: PropTypes.bool,
  scroll: PropTypes.bool,
  children: PropTypes.node,
  throttle: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  debounce: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  placeholder: PropTypes.node,
  scrollContainer: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  unmountIfInvisible: PropTypes.bool,
  style: PropTypes.object,
};

LazyLoad.defaultProps = {
  classNamePrefix: "lazyload",
  once: false,
  offset: 0,
  overflow: false,
  resize: false,
  scroll: true,
  unmountIfInvisible: false,
};

const getDisplayName = (WrappedComponent) =>
  WrappedComponent.displayName || WrappedComponent.name || "Component";

const decorator = (options = {}) =>
  function lazyload(WrappedComponent) {
    return class LazyLoadDecorated extends Component {
      constructor() {
        super();
        this.displayName = `LazyLoad${getDisplayName(WrappedComponent)}`;
      }

      render() {
        return (
          <LazyLoad {...options}>
            <WrappedComponent {...this.props} />
          </LazyLoad>
        );
      }
    };
  };

export { decorator as lazyload };
export default LazyLoad;
export { lazyLoadHandler as forceCheck };
export { forceVisible };
