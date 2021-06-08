/*! jQuery UI - v1.10.4 - 2014-01-17
* http://jqueryui.com
* Includes: jquery.ui.core.js, jquery.ui.widget.js, jquery.ui.mouse.js, jquery.ui.draggable.js, jquery.ui.droppable.js, jquery.ui.resizable.js, jquery.ui.selectable.js, jquery.ui.sortable.js, jquery.ui.effect.js, jquery.ui.accordion.js, jquery.ui.autocomplete.js, jquery.ui.button.js, jquery.ui.datepicker.js, jquery.ui.dialog.js, jquery.ui.effect-blind.js, jquery.ui.effect-bounce.js, jquery.ui.effect-clip.js, jquery.ui.effect-drop.js, jquery.ui.effect-explode.js, jquery.ui.effect-fade.js, jquery.ui.effect-fold.js, jquery.ui.effect-highlight.js, jquery.ui.effect-pulsate.js, jquery.ui.effect-scale.js, jquery.ui.effect-shake.js, jquery.ui.effect-slide.js, jquery.ui.effect-transfer.js, jquery.ui.menu.js, jquery.ui.position.js, jquery.ui.progressbar.js, jquery.ui.slider.js, jquery.ui.spinner.js, jquery.ui.tabs.js, jquery.ui.tooltip.js
* Copyright 2014 jQuery Foundation and other contributors; Licensed MIT */
!function($) {
    var orig, removeData, uuid = 0, runiqueId = /^ui-id-\d+$/;
    function focusable(element, isTabIndexNotNaN) {
        var map, img, nodeName = element.nodeName.toLowerCase();
        return "area" === nodeName ? (img = (map = element.parentNode).name,
        !(!element.href || !img || "map" !== map.nodeName.toLowerCase()) && (!!(img = $("img[usemap=#" + img + "]")[0]) && visible(img))) : (/input|select|textarea|button|object/.test(nodeName) ? !element.disabled : "a" === nodeName && element.href || isTabIndexNotNaN) && visible(element)
    }
    function visible(element) {
        return $.expr.filters.visible(element) && !$(element).parents().addBack().filter(function() {
            return "hidden" === $.css(this, "visibility")
        }).length
    }
    $.ui = $.ui || {},
    $.extend($.ui, {
        version: "1.10.4",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    }),
    $.fn.extend({
        focus: (orig = $.fn.focus,
        function(delay, fn) {
            return "number" == typeof delay ? this.each(function() {
                var elem = this;
                setTimeout(function() {
                    $(elem).focus(),
                    fn && fn.call(elem)
                }, delay)
            }) : orig.apply(this, arguments)
        }
        ),
        scrollParent: function() {
            var scrollParent = ($.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test($.css(this, "position")) && /(auto|scroll)/.test($.css(this, "overflow") + $.css(this, "overflow-y") + $.css(this, "overflow-x"))
            }) : this.parents().filter(function() {
                return /(auto|scroll)/.test($.css(this, "overflow") + $.css(this, "overflow-y") + $.css(this, "overflow-x"))
            })).eq(0);
            return /fixed/.test(this.css("position")) || !scrollParent.length ? $(document) : scrollParent
        },
        zIndex: function(zIndex) {
            if (void 0 !== zIndex)
                return this.css("zIndex", zIndex);
            if (this.length)
                for (var position, value, elem = $(this[0]); elem.length && elem[0] !== document; ) {
                    if (("absolute" === (position = elem.css("position")) || "relative" === position || "fixed" === position) && (value = parseInt(elem.css("zIndex"), 10),
                    !isNaN(value) && 0 !== value))
                        return value;
                    elem = elem.parent()
                }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++uuid)
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                runiqueId.test(this.id) && $(this).removeAttr("id")
            })
        }
    }),
    $.extend($.expr[":"], {
        data: $.expr.createPseudo ? $.expr.createPseudo(function(dataName) {
            return function(elem) {
                return !!$.data(elem, dataName)
            }
        }) : function(elem, i, match) {
            return !!$.data(elem, match[3])
        }
        ,
        focusable: function(element) {
            return focusable(element, !isNaN($.attr(element, "tabindex")))
        },
        tabbable: function(element) {
            var tabIndex = $.attr(element, "tabindex")
              , isTabIndexNaN = isNaN(tabIndex);
            return (isTabIndexNaN || 0 <= tabIndex) && focusable(element, !isTabIndexNaN)
        }
    }),
    $("<a>").outerWidth(1).jquery || $.each(["Width", "Height"], function(i, name) {
        var side = "Width" === name ? ["Left", "Right"] : ["Top", "Bottom"]
          , type = name.toLowerCase()
          , orig = {
            innerWidth: $.fn.innerWidth,
            innerHeight: $.fn.innerHeight,
            outerWidth: $.fn.outerWidth,
            outerHeight: $.fn.outerHeight
        };
        function reduce(elem, size, border, margin) {
            return $.each(side, function() {
                size -= parseFloat($.css(elem, "padding" + this)) || 0,
                border && (size -= parseFloat($.css(elem, "border" + this + "Width")) || 0),
                margin && (size -= parseFloat($.css(elem, "margin" + this)) || 0)
            }),
            size
        }
        $.fn["inner" + name] = function(size) {
            return void 0 === size ? orig["inner" + name].call(this) : this.each(function() {
                $(this).css(type, reduce(this, size) + "px")
            })
        }
        ,
        $.fn["outer" + name] = function(size, margin) {
            return "number" != typeof size ? orig["outer" + name].call(this, size) : this.each(function() {
                $(this).css(type, reduce(this, size, !0, margin) + "px")
            })
        }
    }),
    $.fn.addBack || ($.fn.addBack = function(selector) {
        return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector))
    }
    ),
    $("<a>").data("a-b", "a").removeData("a-b").data("a-b") && ($.fn.removeData = (removeData = $.fn.removeData,
    function(key) {
        return arguments.length ? removeData.call(this, $.camelCase(key)) : removeData.call(this)
    }
    )),
    $.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),
    $.support.selectstart = "onselectstart"in document.createElement("div"),
    $.fn.extend({
        disableSelection: function() {
            return this.bind(($.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(event) {
                event.preventDefault()
            })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    }),
    $.extend($.ui, {
        plugin: {
            add: function(module, option, set) {
                var i, proto = $.ui[module].prototype;
                for (i in set)
                    proto.plugins[i] = proto.plugins[i] || [],
                    proto.plugins[i].push([option, set[i]])
            },
            call: function(instance, name, args) {
                var i, set = instance.plugins[name];
                if (set && instance.element[0].parentNode && 11 !== instance.element[0].parentNode.nodeType)
                    for (i = 0; i < set.length; i++)
                        instance.options[set[i][0]] && set[i][1].apply(instance.element, args)
            }
        },
        hasScroll: function(el, has) {
            if ("hidden" === $(el).css("overflow"))
                return !1;
            var scroll = has && "left" === has ? "scrollLeft" : "scrollTop"
              , has = !1;
            return 0 < el[scroll] || (el[scroll] = 1,
            has = 0 < el[scroll],
            el[scroll] = 0,
            has)
        }
    })
}(jQuery),
function($) {
    var uuid = 0
      , slice = Array.prototype.slice
      , _cleanData = $.cleanData;
    $.cleanData = function(elems) {
        for (var elem, i = 0; null != (elem = elems[i]); i++)
            try {
                $(elem).triggerHandler("remove")
            } catch (e) {}
        _cleanData(elems)
    }
    ,
    $.widget = function(name, base, prototype) {
        var fullName, existingConstructor, constructor, basePrototype, proxiedPrototype = {}, namespace = name.split(".")[0];
        name = name.split(".")[1],
        fullName = namespace + "-" + name,
        prototype || (prototype = base,
        base = $.Widget),
        $.expr[":"][fullName.toLowerCase()] = function(elem) {
            return !!$.data(elem, fullName)
        }
        ,
        $[namespace] = $[namespace] || {},
        existingConstructor = $[namespace][name],
        constructor = $[namespace][name] = function(options, element) {
            if (!this._createWidget)
                return new constructor(options,element);
            arguments.length && this._createWidget(options, element)
        }
        ,
        $.extend(constructor, existingConstructor, {
            version: prototype.version,
            _proto: $.extend({}, prototype),
            _childConstructors: []
        }),
        (basePrototype = new base).options = $.widget.extend({}, basePrototype.options),
        $.each(prototype, function(prop, value) {
            function _super() {
                return base.prototype[prop].apply(this, arguments)
            }
            function _superApply(args) {
                return base.prototype[prop].apply(this, args)
            }
            $.isFunction(value) ? proxiedPrototype[prop] = function() {
                var returnValue, __super = this._super, __superApply = this._superApply;
                return this._super = _super,
                this._superApply = _superApply,
                returnValue = value.apply(this, arguments),
                this._super = __super,
                this._superApply = __superApply,
                returnValue
            }
            : proxiedPrototype[prop] = value
        }),
        constructor.prototype = $.widget.extend(basePrototype, {
            widgetEventPrefix: existingConstructor && basePrototype.widgetEventPrefix || name
        }, proxiedPrototype, {
            constructor: constructor,
            namespace: namespace,
            widgetName: name,
            widgetFullName: fullName
        }),
        existingConstructor ? ($.each(existingConstructor._childConstructors, function(i, child) {
            var childPrototype = child.prototype;
            $.widget(childPrototype.namespace + "." + childPrototype.widgetName, constructor, child._proto)
        }),
        delete existingConstructor._childConstructors) : base._childConstructors.push(constructor),
        $.widget.bridge(name, constructor)
    }
    ,
    $.widget.extend = function(target) {
        for (var key, value, input = slice.call(arguments, 1), inputIndex = 0, inputLength = input.length; inputIndex < inputLength; inputIndex++)
            for (key in input[inputIndex])
                value = input[inputIndex][key],
                input[inputIndex].hasOwnProperty(key) && void 0 !== value && ($.isPlainObject(value) ? target[key] = $.isPlainObject(target[key]) ? $.widget.extend({}, target[key], value) : $.widget.extend({}, value) : target[key] = value);
        return target
    }
    ,
    $.widget.bridge = function(name, object) {
        var fullName = object.prototype.widgetFullName || name;
        $.fn[name] = function(options) {
            var isMethodCall = "string" == typeof options
              , args = slice.call(arguments, 1)
              , returnValue = this;
            return options = !isMethodCall && args.length ? $.widget.extend.apply(null, [options].concat(args)) : options,
            isMethodCall ? this.each(function() {
                var methodValue, instance = $.data(this, fullName);
                return instance ? $.isFunction(instance[options]) && "_" !== options.charAt(0) ? (methodValue = instance[options].apply(instance, args)) !== instance && void 0 !== methodValue ? (returnValue = methodValue && methodValue.jquery ? returnValue.pushStack(methodValue.get()) : methodValue,
                !1) : void 0 : $.error("no such method '" + options + "' for " + name + " widget instance") : $.error("cannot call methods on " + name + " prior to initialization; attempted to call method '" + options + "'")
            }) : this.each(function() {
                var instance = $.data(this, fullName);
                instance ? instance.option(options || {})._init() : $.data(this, fullName, new object(options,this))
            }),
            returnValue
        }
    }
    ,
    $.Widget = function() {}
    ,
    $.Widget._childConstructors = [],
    $.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "<div>",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(options, element) {
            element = $(element || this.defaultElement || this)[0],
            this.element = $(element),
            this.uuid = uuid++,
            this.eventNamespace = "." + this.widgetName + this.uuid,
            this.options = $.widget.extend({}, this.options, this._getCreateOptions(), options),
            this.bindings = $(),
            this.hoverable = $(),
            this.focusable = $(),
            element !== this && ($.data(element, this.widgetFullName, this),
            this._on(!0, this.element, {
                remove: function(event) {
                    event.target === element && this.destroy()
                }
            }),
            this.document = $(element.style ? element.ownerDocument : element.document || element),
            this.window = $(this.document[0].defaultView || this.document[0].parentWindow)),
            this._create(),
            this._trigger("create", null, this._getCreateEventData()),
            this._init()
        },
        _getCreateOptions: $.noop,
        _getCreateEventData: $.noop,
        _create: $.noop,
        _init: $.noop,
        destroy: function() {
            this._destroy(),
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData($.camelCase(this.widgetFullName)),
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"),
            this.bindings.unbind(this.eventNamespace),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: $.noop,
        widget: function() {
            return this.element
        },
        option: function(key, value) {
            var parts, curOption, i, options = key;
            if (0 === arguments.length)
                return $.widget.extend({}, this.options);
            if ("string" == typeof key)
                if (options = {},
                key = (parts = key.split(".")).shift(),
                parts.length) {
                    for (curOption = options[key] = $.widget.extend({}, this.options[key]),
                    i = 0; i < parts.length - 1; i++)
                        curOption[parts[i]] = curOption[parts[i]] || {},
                        curOption = curOption[parts[i]];
                    if (key = parts.pop(),
                    1 === arguments.length)
                        return void 0 === curOption[key] ? null : curOption[key];
                    curOption[key] = value
                } else {
                    if (1 === arguments.length)
                        return void 0 === this.options[key] ? null : this.options[key];
                    options[key] = value
                }
            return this._setOptions(options),
            this
        },
        _setOptions: function(options) {
            for (var key in options)
                this._setOption(key, options[key]);
            return this
        },
        _setOption: function(key, value) {
            return this.options[key] = value,
            "disabled" === key && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!value).attr("aria-disabled", value),
            this.hoverable.removeClass("ui-state-hover"),
            this.focusable.removeClass("ui-state-focus")),
            this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _on: function(suppressDisabledCheck, element, handlers) {
            var delegateElement, instance = this;
            "boolean" != typeof suppressDisabledCheck && (handlers = element,
            element = suppressDisabledCheck,
            suppressDisabledCheck = !1),
            handlers ? (element = delegateElement = $(element),
            this.bindings = this.bindings.add(element)) : (handlers = element,
            element = this.element,
            delegateElement = this.widget()),
            $.each(handlers, function(eventName, handler) {
                function handlerProxy() {
                    if (suppressDisabledCheck || !0 !== instance.options.disabled && !$(this).hasClass("ui-state-disabled"))
                        return ("string" == typeof handler ? instance[handler] : handler).apply(instance, arguments)
                }
                "string" != typeof handler && (handlerProxy.guid = handler.guid = handler.guid || handlerProxy.guid || $.guid++);
                var selector = eventName.match(/^(\w+)\s*(.*)$/)
                  , eventName = selector[1] + instance.eventNamespace
                  , selector = selector[2];
                selector ? delegateElement.delegate(selector, eventName, handlerProxy) : element.bind(eventName, handlerProxy)
            })
        },
        _off: function(element, eventName) {
            eventName = (eventName || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace,
            element.unbind(eventName).undelegate(eventName)
        },
        _delay: function(handler, delay) {
            var instance = this;
            return setTimeout(function() {
                return ("string" == typeof handler ? instance[handler] : handler).apply(instance, arguments)
            }, delay || 0)
        },
        _hoverable: function(element) {
            this.hoverable = this.hoverable.add(element),
            this._on(element, {
                mouseenter: function(event) {
                    $(event.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(event) {
                    $(event.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(element) {
            this.focusable = this.focusable.add(element),
            this._on(element, {
                focusin: function(event) {
                    $(event.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(event) {
                    $(event.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(type, event, data) {
            var prop, orig, callback = this.options[type];
            if (data = data || {},
            (event = $.Event(event)).type = (type === this.widgetEventPrefix ? type : this.widgetEventPrefix + type).toLowerCase(),
            event.target = this.element[0],
            orig = event.originalEvent)
                for (prop in orig)
                    prop in event || (event[prop] = orig[prop]);
            return this.element.trigger(event, data),
            !($.isFunction(callback) && !1 === callback.apply(this.element[0], [event].concat(data)) || event.isDefaultPrevented())
        }
    },
    $.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(method, defaultEffect) {
        $.Widget.prototype["_" + method] = function(element, options, callback) {
            var effectName = (options = "string" == typeof options ? {
                effect: options
            } : options) ? !0 !== options && "number" != typeof options && options.effect || defaultEffect : method
              , hasOptions = !$.isEmptyObject(options = "number" == typeof (options = options || {}) ? {
                duration: options
            } : options);
            options.complete = callback,
            options.delay && element.delay(options.delay),
            hasOptions && $.effects && $.effects.effect[effectName] ? element[method](options) : effectName !== method && element[effectName] ? element[effectName](options.duration, options.easing, callback) : element.queue(function(next) {
                $(this)[method](),
                callback && callback.call(element[0]),
                next()
            })
        }
    })
}(jQuery),
function($) {
    var mouseHandled = !1;
    $(document).mouseup(function() {
        mouseHandled = !1
    }),
    $.widget("ui.mouse", {
        version: "1.10.4",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var that = this;
            this.element.bind("mousedown." + this.widgetName, function(event) {
                return that._mouseDown(event)
            }).bind("click." + this.widgetName, function(event) {
                if (!0 === $.data(event.target, that.widgetName + ".preventClickEvent"))
                    return $.removeData(event.target, that.widgetName + ".preventClickEvent"),
                    event.stopImmediatePropagation(),
                    !1
            }),
            this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName),
            this._mouseMoveDelegate && $(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(event) {
            if (!mouseHandled) {
                this._mouseStarted && this._mouseUp(event),
                this._mouseDownEvent = event;
                var that = this
                  , btnIsLeft = 1 === event.which
                  , elIsCancel = !("string" != typeof this.options.cancel || !event.target.nodeName) && $(event.target).closest(this.options.cancel).length;
                return btnIsLeft && !elIsCancel && this._mouseCapture(event) ? (this.mouseDelayMet = !this.options.delay,
                this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    that.mouseDelayMet = !0
                }, this.options.delay)),
                this._mouseDistanceMet(event) && this._mouseDelayMet(event) && (this._mouseStarted = !1 !== this._mouseStart(event),
                !this._mouseStarted) ? (event.preventDefault(),
                !0) : (!0 === $.data(event.target, this.widgetName + ".preventClickEvent") && $.removeData(event.target, this.widgetName + ".preventClickEvent"),
                this._mouseMoveDelegate = function(event) {
                    return that._mouseMove(event)
                }
                ,
                this._mouseUpDelegate = function(event) {
                    return that._mouseUp(event)
                }
                ,
                $(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate),
                event.preventDefault(),
                mouseHandled = !0)) : !0
            }
        },
        _mouseMove: function(event) {
            return $.ui.ie && (!document.documentMode || document.documentMode < 9) && !event.button ? this._mouseUp(event) : this._mouseStarted ? (this._mouseDrag(event),
            event.preventDefault()) : (this._mouseDistanceMet(event) && this._mouseDelayMet(event) && (this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, event),
            this._mouseStarted ? this._mouseDrag(event) : this._mouseUp(event)),
            !this._mouseStarted)
        },
        _mouseUp: function(event) {
            return $(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate),
            this._mouseStarted && (this._mouseStarted = !1,
            event.target === this._mouseDownEvent.target && $.data(event.target, this.widgetName + ".preventClickEvent", !0),
            this._mouseStop(event)),
            !1
        },
        _mouseDistanceMet: function(event) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - event.pageX), Math.abs(this._mouseDownEvent.pageY - event.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    })
}(jQuery),
function($) {
    $.widget("ui.draggable", $.ui.mouse, {
        version: "1.10.4",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"),
            this.options.addClasses && this.element.addClass("ui-draggable"),
            this.options.disabled && this.element.addClass("ui-draggable-disabled"),
            this._mouseInit()
        },
        _destroy: function() {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),
            this._mouseDestroy()
        },
        _mouseCapture: function(event) {
            var o = this.options;
            return !(this.helper || o.disabled || 0 < $(event.target).closest(".ui-resizable-handle").length) && (this.handle = this._getHandle(event),
            !!this.handle && ($(!0 === o.iframeFix ? "iframe" : o.iframeFix).each(function() {
                $("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1e3
                }).css($(this).offset()).appendTo("body")
            }),
            !0))
        },
        _mouseStart: function(event) {
            var o = this.options;
            return this.helper = this._createHelper(event),
            this.helper.addClass("ui-draggable-dragging"),
            this._cacheHelperProportions(),
            $.ui.ddmanager && ($.ui.ddmanager.current = this),
            this._cacheMargins(),
            this.cssPosition = this.helper.css("position"),
            this.scrollParent = this.helper.scrollParent(),
            this.offsetParent = this.helper.offsetParent(),
            this.offsetParentCssPosition = this.offsetParent.css("position"),
            this.offset = this.positionAbs = this.element.offset(),
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            },
            this.offset.scroll = !1,
            $.extend(this.offset, {
                click: {
                    left: event.pageX - this.offset.left,
                    top: event.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }),
            this.originalPosition = this.position = this._generatePosition(event),
            this.originalPageX = event.pageX,
            this.originalPageY = event.pageY,
            o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt),
            this._setContainment(),
            !1 === this._trigger("start", event) ? (this._clear(),
            !1) : (this._cacheHelperProportions(),
            $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event),
            this._mouseDrag(event, !0),
            $.ui.ddmanager && $.ui.ddmanager.dragStart(this, event),
            !0)
        },
        _mouseDrag: function(event, ui) {
            if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()),
            this.position = this._generatePosition(event),
            this.positionAbs = this._convertPositionTo("absolute"),
            !ui) {
                ui = this._uiHash();
                if (!1 === this._trigger("drag", event, ui))
                    return this._mouseUp({}),
                    !1;
                this.position = ui.position
            }
            return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"),
            this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"),
            $.ui.ddmanager && $.ui.ddmanager.drag(this, event),
            !1
        },
        _mouseStop: function(event) {
            var that = this
              , dropped = !1;
            return $.ui.ddmanager && !this.options.dropBehaviour && (dropped = $.ui.ddmanager.drop(this, event)),
            this.dropped && (dropped = this.dropped,
            this.dropped = !1),
            ("original" !== this.options.helper || $.contains(this.element[0].ownerDocument, this.element[0])) && ("invalid" === this.options.revert && !dropped || "valid" === this.options.revert && dropped || !0 === this.options.revert || $.isFunction(this.options.revert) && this.options.revert.call(this.element, dropped) ? $(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                !1 !== that._trigger("stop", event) && that._clear()
            }) : !1 !== this._trigger("stop", event) && this._clear()),
            !1
        },
        _mouseUp: function(event) {
            return $("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            }),
            $.ui.ddmanager && $.ui.ddmanager.dragStop(this, event),
            $.ui.mouse.prototype._mouseUp.call(this, event)
        },
        cancel: function() {
            return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(),
            this
        },
        _getHandle: function(event) {
            return !this.options.handle || !!$(event.target).closest(this.element.find(this.options.handle)).length
        },
        _createHelper: function(helper) {
            var o = this.options
              , helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [helper])) : "clone" === o.helper ? this.element.clone().removeAttr("id") : this.element;
            return helper.parents("body").length || helper.appendTo("parent" === o.appendTo ? this.element[0].parentNode : o.appendTo),
            helper[0] === this.element[0] || /(fixed|absolute)/.test(helper.css("position")) || helper.css("position", "absolute"),
            helper
        },
        _adjustOffsetFromHelper: function(obj) {
            "string" == typeof obj && (obj = obj.split(" ")),
            "left"in (obj = $.isArray(obj) ? {
                left: +obj[0],
                top: +obj[1] || 0
            } : obj) && (this.offset.click.left = obj.left + this.margins.left),
            "right"in obj && (this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left),
            "top"in obj && (this.offset.click.top = obj.top + this.margins.top),
            "bottom"in obj && (this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            var po = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0]) && (po.left += this.scrollParent.scrollLeft(),
            po.top += this.scrollParent.scrollTop()),
            {
                top: (po = this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && $.ui.ie ? {
                    top: 0,
                    left: 0
                } : po).top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" !== this.cssPosition)
                return {
                    top: 0,
                    left: 0
                };
            var p = this.element.position();
            return {
                top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var over, c, ce, o = this.options;
            o.containment ? "window" !== o.containment ? "document" !== o.containment ? o.containment.constructor !== Array ? ("parent" === o.containment && (o.containment = this.helper[0].parentNode),
            (ce = (c = $(o.containment))[0]) && (over = "hidden" !== c.css("overflow"),
            this.containment = [(parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom],
            this.relative_container = c)) : this.containment = o.containment : this.containment = [0, 0, $(document).width() - this.helperProportions.width - this.margins.left, ($(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top] : this.containment = [$(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, $(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, $(window).scrollLeft() + $(window).width() - this.helperProportions.width - this.margins.left, $(window).scrollTop() + ($(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top] : this.containment = null
        },
        _convertPositionTo: function(scroll, pos) {
            pos = pos || this.position;
            var mod = "absolute" === scroll ? 1 : -1
              , scroll = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
            return this.offset.scroll || (this.offset.scroll = {
                top: scroll.scrollTop(),
                left: scroll.scrollLeft()
            }),
            {
                top: pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * mod,
                left: pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * mod
            }
        },
        _generatePosition: function(left) {
            var containment, o = this.options, scroll = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent, pageX = left.pageX, pageY = left.pageY;
            return this.offset.scroll || (this.offset.scroll = {
                top: scroll.scrollTop(),
                left: scroll.scrollLeft()
            }),
            this.originalPosition && (this.containment && (containment = this.relative_container ? (containment = this.relative_container.offset(),
            [this.containment[0] + containment.left, this.containment[1] + containment.top, this.containment[2] + containment.left, this.containment[3] + containment.top]) : this.containment,
            left.pageX - this.offset.click.left < containment[0] && (pageX = containment[0] + this.offset.click.left),
            left.pageY - this.offset.click.top < containment[1] && (pageY = containment[1] + this.offset.click.top),
            left.pageX - this.offset.click.left > containment[2] && (pageX = containment[2] + this.offset.click.left),
            left.pageY - this.offset.click.top > containment[3] && (pageY = containment[3] + this.offset.click.top)),
            o.grid && (left = o.grid[1] ? this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1] : this.originalPageY,
            pageY = !containment || left - this.offset.click.top >= containment[1] || left - this.offset.click.top > containment[3] ? left : left - this.offset.click.top >= containment[1] ? left - o.grid[1] : left + o.grid[1],
            left = o.grid[0] ? this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0] : this.originalPageX,
            pageX = !containment || left - this.offset.click.left >= containment[0] || left - this.offset.click.left > containment[2] ? left : left - this.offset.click.left >= containment[0] ? left - o.grid[0] : left + o.grid[0])),
            {
                top: pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
                left: pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging"),
            this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(),
            this.helper = null,
            this.cancelHelperRemoval = !1
        },
        _trigger: function(type, event, ui) {
            return ui = ui || this._uiHash(),
            $.ui.plugin.call(this, type, [event, ui]),
            "drag" === type && (this.positionAbs = this._convertPositionTo("absolute")),
            $.Widget.prototype._trigger.call(this, type, event, ui)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    }),
    $.ui.plugin.add("draggable", "connectToSortable", {
        start: function(event, ui) {
            var inst = $(this).data("ui-draggable")
              , o = inst.options
              , uiSortable = $.extend({}, ui, {
                item: inst.element
            });
            inst.sortables = [],
            $(o.connectToSortable).each(function() {
                var sortable = $.data(this, "ui-sortable");
                sortable && !sortable.options.disabled && (inst.sortables.push({
                    instance: sortable,
                    shouldRevert: sortable.options.revert
                }),
                sortable.refreshPositions(),
                sortable._trigger("activate", event, uiSortable))
            })
        },
        stop: function(event, ui) {
            var inst = $(this).data("ui-draggable")
              , uiSortable = $.extend({}, ui, {
                item: inst.element
            });
            $.each(inst.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0,
                inst.cancelHelperRemoval = !0,
                this.instance.cancelHelperRemoval = !1,
                this.shouldRevert && (this.instance.options.revert = this.shouldRevert),
                this.instance._mouseStop(event),
                this.instance.options.helper = this.instance.options._helper,
                "original" === inst.options.helper && this.instance.currentItem.css({
                    top: "auto",
                    left: "auto"
                })) : (this.instance.cancelHelperRemoval = !1,
                this.instance._trigger("deactivate", event, uiSortable))
            })
        },
        drag: function(event, ui) {
            var inst = $(this).data("ui-draggable")
              , that = this;
            $.each(inst.sortables, function() {
                var innermostIntersecting = !1
                  , thisSortable = this;
                this.instance.positionAbs = inst.positionAbs,
                this.instance.helperProportions = inst.helperProportions,
                this.instance.offset.click = inst.offset.click,
                this.instance._intersectsWith(this.instance.containerCache) && (innermostIntersecting = !0,
                $.each(inst.sortables, function() {
                    return this.instance.positionAbs = inst.positionAbs,
                    this.instance.helperProportions = inst.helperProportions,
                    this.instance.offset.click = inst.offset.click,
                    innermostIntersecting = this !== thisSortable && this.instance._intersectsWith(this.instance.containerCache) && $.contains(thisSortable.instance.element[0], this.instance.element[0]) ? !1 : innermostIntersecting
                })),
                innermostIntersecting ? (this.instance.isOver || (this.instance.isOver = 1,
                this.instance.currentItem = $(that).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0),
                this.instance.options._helper = this.instance.options.helper,
                this.instance.options.helper = function() {
                    return ui.helper[0]
                }
                ,
                event.target = this.instance.currentItem[0],
                this.instance._mouseCapture(event, !0),
                this.instance._mouseStart(event, !0, !0),
                this.instance.offset.click.top = inst.offset.click.top,
                this.instance.offset.click.left = inst.offset.click.left,
                this.instance.offset.parent.left -= inst.offset.parent.left - this.instance.offset.parent.left,
                this.instance.offset.parent.top -= inst.offset.parent.top - this.instance.offset.parent.top,
                inst._trigger("toSortable", event),
                inst.dropped = this.instance.element,
                inst.currentItem = inst.element,
                this.instance.fromOutside = inst),
                this.instance.currentItem && this.instance._mouseDrag(event)) : this.instance.isOver && (this.instance.isOver = 0,
                this.instance.cancelHelperRemoval = !0,
                this.instance.options.revert = !1,
                this.instance._trigger("out", event, this.instance._uiHash(this.instance)),
                this.instance._mouseStop(event, !0),
                this.instance.options.helper = this.instance.options._helper,
                this.instance.currentItem.remove(),
                this.instance.placeholder && this.instance.placeholder.remove(),
                inst._trigger("fromSortable", event),
                inst.dropped = !1)
            })
        }
    }),
    $.ui.plugin.add("draggable", "cursor", {
        start: function() {
            var t = $("body")
              , o = $(this).data("ui-draggable").options;
            t.css("cursor") && (o._cursor = t.css("cursor")),
            t.css("cursor", o.cursor)
        },
        stop: function() {
            var o = $(this).data("ui-draggable").options;
            o._cursor && $("body").css("cursor", o._cursor)
        }
    }),
    $.ui.plugin.add("draggable", "opacity", {
        start: function(event, o) {
            var t = $(o.helper)
              , o = $(this).data("ui-draggable").options;
            t.css("opacity") && (o._opacity = t.css("opacity")),
            t.css("opacity", o.opacity)
        },
        stop: function(event, ui) {
            var o = $(this).data("ui-draggable").options;
            o._opacity && $(ui.helper).css("opacity", o._opacity)
        }
    }),
    $.ui.plugin.add("draggable", "scroll", {
        start: function() {
            var i = $(this).data("ui-draggable");
            i.scrollParent[0] !== document && "HTML" !== i.scrollParent[0].tagName && (i.overflowOffset = i.scrollParent.offset())
        },
        drag: function(event) {
            var i = $(this).data("ui-draggable")
              , o = i.options
              , scrolled = !1;
            i.scrollParent[0] !== document && "HTML" !== i.scrollParent[0].tagName ? (o.axis && "x" === o.axis || (i.overflowOffset.top + i.scrollParent[0].offsetHeight - event.pageY < o.scrollSensitivity ? i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop + o.scrollSpeed : event.pageY - i.overflowOffset.top < o.scrollSensitivity && (i.scrollParent[0].scrollTop = scrolled = i.scrollParent[0].scrollTop - o.scrollSpeed)),
            o.axis && "y" === o.axis || (i.overflowOffset.left + i.scrollParent[0].offsetWidth - event.pageX < o.scrollSensitivity ? i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft + o.scrollSpeed : event.pageX - i.overflowOffset.left < o.scrollSensitivity && (i.scrollParent[0].scrollLeft = scrolled = i.scrollParent[0].scrollLeft - o.scrollSpeed))) : (o.axis && "x" === o.axis || (event.pageY - $(document).scrollTop() < o.scrollSensitivity ? scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed) : $(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity && (scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed))),
            o.axis && "y" === o.axis || (event.pageX - $(document).scrollLeft() < o.scrollSensitivity ? scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed) : $(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity && (scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed)))),
            !1 !== scrolled && $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(i, event)
        }
    }),
    $.ui.plugin.add("draggable", "snap", {
        start: function() {
            var i = $(this).data("ui-draggable")
              , o = i.options;
            i.snapElements = [],
            $(o.snap.constructor !== String ? o.snap.items || ":data(ui-draggable)" : o.snap).each(function() {
                var $t = $(this)
                  , $o = $t.offset();
                this !== i.element[0] && i.snapElements.push({
                    item: this,
                    width: $t.outerWidth(),
                    height: $t.outerHeight(),
                    top: $o.top,
                    left: $o.left
                })
            })
        },
        drag: function(event, ui) {
            for (var ts, bs, ls, rs, l, r, t, b, first, inst = $(this).data("ui-draggable"), o = inst.options, d = o.snapTolerance, x1 = ui.offset.left, x2 = x1 + inst.helperProportions.width, y1 = ui.offset.top, y2 = y1 + inst.helperProportions.height, i = inst.snapElements.length - 1; 0 <= i; i--)
                r = (l = inst.snapElements[i].left) + inst.snapElements[i].width,
                b = (t = inst.snapElements[i].top) + inst.snapElements[i].height,
                x2 < l - d || r + d < x1 || y2 < t - d || b + d < y1 || !$.contains(inst.snapElements[i].item.ownerDocument, inst.snapElements[i].item) ? (inst.snapElements[i].snapping && inst.options.snap.release && inst.options.snap.release.call(inst.element, event, $.extend(inst._uiHash(), {
                    snapItem: inst.snapElements[i].item
                })),
                inst.snapElements[i].snapping = !1) : ("inner" !== o.snapMode && (ts = Math.abs(t - y2) <= d,
                bs = Math.abs(b - y1) <= d,
                ls = Math.abs(l - x2) <= d,
                rs = Math.abs(r - x1) <= d,
                ts && (ui.position.top = inst._convertPositionTo("relative", {
                    top: t - inst.helperProportions.height,
                    left: 0
                }).top - inst.margins.top),
                bs && (ui.position.top = inst._convertPositionTo("relative", {
                    top: b,
                    left: 0
                }).top - inst.margins.top),
                ls && (ui.position.left = inst._convertPositionTo("relative", {
                    top: 0,
                    left: l - inst.helperProportions.width
                }).left - inst.margins.left),
                rs && (ui.position.left = inst._convertPositionTo("relative", {
                    top: 0,
                    left: r
                }).left - inst.margins.left)),
                first = ts || bs || ls || rs,
                "outer" !== o.snapMode && (ts = Math.abs(t - y1) <= d,
                bs = Math.abs(b - y2) <= d,
                ls = Math.abs(l - x1) <= d,
                rs = Math.abs(r - x2) <= d,
                ts && (ui.position.top = inst._convertPositionTo("relative", {
                    top: t,
                    left: 0
                }).top - inst.margins.top),
                bs && (ui.position.top = inst._convertPositionTo("relative", {
                    top: b - inst.helperProportions.height,
                    left: 0
                }).top - inst.margins.top),
                ls && (ui.position.left = inst._convertPositionTo("relative", {
                    top: 0,
                    left: l
                }).left - inst.margins.left),
                rs && (ui.position.left = inst._convertPositionTo("relative", {
                    top: 0,
                    left: r - inst.helperProportions.width
                }).left - inst.margins.left)),
                !inst.snapElements[i].snapping && (ts || bs || ls || rs || first) && inst.options.snap.snap && inst.options.snap.snap.call(inst.element, event, $.extend(inst._uiHash(), {
                    snapItem: inst.snapElements[i].item
                })),
                inst.snapElements[i].snapping = ts || bs || ls || rs || first)
        }
    }),
    $.ui.plugin.add("draggable", "stack", {
        start: function() {
            var min, group = this.data("ui-draggable").options, group = $.makeArray($(group.stack)).sort(function(a, b) {
                return (parseInt($(a).css("zIndex"), 10) || 0) - (parseInt($(b).css("zIndex"), 10) || 0)
            });
            group.length && (min = parseInt($(group[0]).css("zIndex"), 10) || 0,
            $(group).each(function(i) {
                $(this).css("zIndex", min + i)
            }),
            this.css("zIndex", min + group.length))
        }
    }),
    $.ui.plugin.add("draggable", "zIndex", {
        start: function(event, o) {
            var t = $(o.helper)
              , o = $(this).data("ui-draggable").options;
            t.css("zIndex") && (o._zIndex = t.css("zIndex")),
            t.css("zIndex", o.zIndex)
        },
        stop: function(event, ui) {
            var o = $(this).data("ui-draggable").options;
            o._zIndex && $(ui.helper).css("zIndex", o._zIndex)
        }
    })
}(jQuery),
function($) {
    function isOverAxis(x, reference, size) {
        return reference < x && x < reference + size
    }
    $.widget("ui.droppable", {
        version: "1.10.4",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var proportions, o = this.options, accept = o.accept;
            this.isover = !1,
            this.isout = !0,
            this.accept = $.isFunction(accept) ? accept : function(d) {
                return d.is(accept)
            }
            ,
            this.proportions = function() {
                if (!arguments.length)
                    return proportions = proportions || {
                        width: this.element[0].offsetWidth,
                        height: this.element[0].offsetHeight
                    };
                proportions = arguments[0]
            }
            ,
            $.ui.ddmanager.droppables[o.scope] = $.ui.ddmanager.droppables[o.scope] || [],
            $.ui.ddmanager.droppables[o.scope].push(this),
            o.addClasses && this.element.addClass("ui-droppable")
        },
        _destroy: function() {
            for (var i = 0, drop = $.ui.ddmanager.droppables[this.options.scope]; i < drop.length; i++)
                drop[i] === this && drop.splice(i, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled")
        },
        _setOption: function(key, value) {
            "accept" === key && (this.accept = $.isFunction(value) ? value : function(d) {
                return d.is(value)
            }
            ),
            $.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function(event) {
            var draggable = $.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass),
            draggable && this._trigger("activate", event, this.ui(draggable))
        },
        _deactivate: function(event) {
            var draggable = $.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass),
            draggable && this._trigger("deactivate", event, this.ui(draggable))
        },
        _over: function(event) {
            var draggable = $.ui.ddmanager.current;
            draggable && (draggable.currentItem || draggable.element)[0] !== this.element[0] && this.accept.call(this.element[0], draggable.currentItem || draggable.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass),
            this._trigger("over", event, this.ui(draggable)))
        },
        _out: function(event) {
            var draggable = $.ui.ddmanager.current;
            draggable && (draggable.currentItem || draggable.element)[0] !== this.element[0] && this.accept.call(this.element[0], draggable.currentItem || draggable.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass),
            this._trigger("out", event, this.ui(draggable)))
        },
        _drop: function(event, custom) {
            var draggable = custom || $.ui.ddmanager.current
              , childrenIntersection = !1;
            return !(!draggable || (draggable.currentItem || draggable.element)[0] === this.element[0]) && (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var inst = $.data(this, "ui-droppable");
                if (inst.options.greedy && !inst.options.disabled && inst.options.scope === draggable.options.scope && inst.accept.call(inst.element[0], draggable.currentItem || draggable.element) && $.ui.intersect(draggable, $.extend(inst, {
                    offset: inst.element.offset()
                }), inst.options.tolerance))
                    return !(childrenIntersection = !0)
            }),
            !childrenIntersection && (!!this.accept.call(this.element[0], draggable.currentItem || draggable.element) && (this.options.activeClass && this.element.removeClass(this.options.activeClass),
            this.options.hoverClass && this.element.removeClass(this.options.hoverClass),
            this._trigger("drop", event, this.ui(draggable)),
            this.element)))
        },
        ui: function(c) {
            return {
                draggable: c.currentItem || c.element,
                helper: c.helper,
                position: c.position,
                offset: c.positionAbs
            }
        }
    }),
    $.ui.intersect = function(draggable, droppable, toleranceMode) {
        if (!droppable.offset)
            return !1;
        var draggableLeft, x1 = (draggable.positionAbs || draggable.position.absolute).left, y1 = (draggable.positionAbs || draggable.position.absolute).top, x2 = x1 + draggable.helperProportions.width, y2 = y1 + draggable.helperProportions.height, l = droppable.offset.left, t = droppable.offset.top, r = l + droppable.proportions().width, b = t + droppable.proportions().height;
        switch (toleranceMode) {
        case "fit":
            return l <= x1 && x2 <= r && t <= y1 && y2 <= b;
        case "intersect":
            return l < x1 + draggable.helperProportions.width / 2 && x2 - draggable.helperProportions.width / 2 < r && t < y1 + draggable.helperProportions.height / 2 && y2 - draggable.helperProportions.height / 2 < b;
        case "pointer":
            return draggableLeft = (draggable.positionAbs || draggable.position.absolute).left + (draggable.clickOffset || draggable.offset.click).left,
            isOverAxis((draggable.positionAbs || draggable.position.absolute).top + (draggable.clickOffset || draggable.offset.click).top, t, droppable.proportions().height) && isOverAxis(draggableLeft, l, droppable.proportions().width);
        case "touch":
            return (t <= y1 && y1 <= b || t <= y2 && y2 <= b || y1 < t && b < y2) && (l <= x1 && x1 <= r || l <= x2 && x2 <= r || x1 < l && r < x2);
        default:
            return !1
        }
    }
    ,
    $.ui.ddmanager = {
        current: null,
        droppables: {
            default: []
        },
        prepareOffsets: function(t, event) {
            var i, j, m = $.ui.ddmanager.droppables[t.options.scope] || [], type = event ? event.type : null, list = (t.currentItem || t.element).find(":data(ui-droppable)").addBack();
            droppablesLoop: for (i = 0; i < m.length; i++)
                if (!(m[i].options.disabled || t && !m[i].accept.call(m[i].element[0], t.currentItem || t.element))) {
                    for (j = 0; j < list.length; j++)
                        if (list[j] === m[i].element[0]) {
                            m[i].proportions().height = 0;
                            continue droppablesLoop
                        }
                    m[i].visible = "none" !== m[i].element.css("display"),
                    m[i].visible && ("mousedown" === type && m[i]._activate.call(m[i], event),
                    m[i].offset = m[i].element.offset(),
                    m[i].proportions({
                        width: m[i].element[0].offsetWidth,
                        height: m[i].element[0].offsetHeight
                    }))
                }
        },
        drop: function(draggable, event) {
            var dropped = !1;
            return $.each(($.ui.ddmanager.droppables[draggable.options.scope] || []).slice(), function() {
                this.options && (!this.options.disabled && this.visible && $.ui.intersect(draggable, this, this.options.tolerance) && (dropped = this._drop.call(this, event) || dropped),
                !this.options.disabled && this.visible && this.accept.call(this.element[0], draggable.currentItem || draggable.element) && (this.isout = !0,
                this.isover = !1,
                this._deactivate.call(this, event)))
            }),
            dropped
        },
        dragStart: function(draggable, event) {
            draggable.element.parentsUntil("body").bind("scroll.droppable", function() {
                draggable.options.refreshPositions || $.ui.ddmanager.prepareOffsets(draggable, event)
            })
        },
        drag: function(draggable, event) {
            draggable.options.refreshPositions && $.ui.ddmanager.prepareOffsets(draggable, event),
            $.each($.ui.ddmanager.droppables[draggable.options.scope] || [], function() {
                var parentInstance, scope, parent, c;
                this.options.disabled || this.greedyChild || !this.visible || (c = !(parent = $.ui.intersect(draggable, this, this.options.tolerance)) && this.isover ? "isout" : parent && !this.isover ? "isover" : null) && (this.options.greedy && (scope = this.options.scope,
                (parent = this.element.parents(":data(ui-droppable)").filter(function() {
                    return $.data(this, "ui-droppable").options.scope === scope
                })).length && ((parentInstance = $.data(parent[0], "ui-droppable")).greedyChild = "isover" === c)),
                parentInstance && "isover" === c && (parentInstance.isover = !1,
                parentInstance.isout = !0,
                parentInstance._out.call(parentInstance, event)),
                this[c] = !0,
                this["isout" === c ? "isover" : "isout"] = !1,
                this["isover" === c ? "_over" : "_out"].call(this, event),
                parentInstance && "isout" === c && (parentInstance.isout = !1,
                parentInstance.isover = !0,
                parentInstance._over.call(parentInstance, event)))
            })
        },
        dragStop: function(draggable, event) {
            draggable.element.parentsUntil("body").unbind("scroll.droppable"),
            draggable.options.refreshPositions || $.ui.ddmanager.prepareOffsets(draggable, event)
        }
    }
}(jQuery),
function($) {
    function num(v) {
        return parseInt(v, 10) || 0
    }
    function isNumber(value) {
        return !isNaN(parseInt(value, 10))
    }
    $.widget("ui.resizable", $.ui.mouse, {
        version: "1.10.4",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _create: function() {
            var n, i, handle, axis, that = this, o = this.options;
            if (this.element.addClass("ui-resizable"),
            $.extend(this, {
                _aspectRatio: !!o.aspectRatio,
                aspectRatio: o.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: o.helper || o.ghost || o.animate ? o.helper || "ui-resizable-helper" : null
            }),
            this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap($("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
                position: this.element.css("position"),
                width: this.element.outerWidth(),
                height: this.element.outerHeight(),
                top: this.element.css("top"),
                left: this.element.css("left")
            })),
            this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")),
            this.elementIsWrapper = !0,
            this.element.css({
                marginLeft: this.originalElement.css("marginLeft"),
                marginTop: this.originalElement.css("marginTop"),
                marginRight: this.originalElement.css("marginRight"),
                marginBottom: this.originalElement.css("marginBottom")
            }),
            this.originalElement.css({
                marginLeft: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0
            }),
            this.originalResizeStyle = this.originalElement.css("resize"),
            this.originalElement.css("resize", "none"),
            this._proportionallyResizeElements.push(this.originalElement.css({
                position: "static",
                zoom: 1,
                display: "block"
            })),
            this.originalElement.css({
                margin: this.originalElement.css("margin")
            }),
            this._proportionallyResize()),
            this.handles = o.handles || ($(".ui-resizable-handle", this.element).length ? {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            } : "e,s,se"),
            this.handles.constructor === String)
                for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"),
                n = this.handles.split(","),
                this.handles = {},
                i = 0; i < n.length; i++)
                    handle = $.trim(n[i]),
                    (axis = $("<div class='ui-resizable-handle " + ("ui-resizable-" + handle) + "'></div>")).css({
                        zIndex: o.zIndex
                    }),
                    "se" === handle && axis.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),
                    this.handles[handle] = ".ui-resizable-" + handle,
                    this.element.append(axis);
            this._renderAxis = function(target) {
                var i, padPos, padWrapper;
                for (i in target = target || this.element,
                this.handles)
                    this.handles[i].constructor === String && (this.handles[i] = $(this.handles[i], this.element).show()),
                    this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (padPos = $(this.handles[i], this.element),
                    padWrapper = /sw|ne|nw|se|n|s/.test(i) ? padPos.outerHeight() : padPos.outerWidth(),
                    padPos = ["padding", /ne|nw|n/.test(i) ? "Top" : /se|sw|s/.test(i) ? "Bottom" : /^e$/.test(i) ? "Right" : "Left"].join(""),
                    target.css(padPos, padWrapper),
                    this._proportionallyResize()),
                    $(this.handles[i]).length
            }
            ,
            this._renderAxis(this.element),
            this._handles = $(".ui-resizable-handle", this.element).disableSelection(),
            this._handles.mouseover(function() {
                that.resizing || (this.className && (axis = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)),
                that.axis = axis && axis[1] ? axis[1] : "se")
            }),
            o.autoHide && (this._handles.hide(),
            $(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                o.disabled || ($(this).removeClass("ui-resizable-autohide"),
                that._handles.show())
            }).mouseleave(function() {
                o.disabled || that.resizing || ($(this).addClass("ui-resizable-autohide"),
                that._handles.hide())
            })),
            this._mouseInit()
        },
        _destroy: function() {
            this._mouseDestroy();
            function _destroy(exp) {
                $(exp).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            }
            var wrapper;
            return this.elementIsWrapper && (_destroy(this.element),
            wrapper = this.element,
            this.originalElement.css({
                position: wrapper.css("position"),
                width: wrapper.outerWidth(),
                height: wrapper.outerHeight(),
                top: wrapper.css("top"),
                left: wrapper.css("left")
            }).insertAfter(wrapper),
            wrapper.remove()),
            this.originalElement.css("resize", this.originalResizeStyle),
            _destroy(this.originalElement),
            this
        },
        _mouseCapture: function(event) {
            var i, handle, capture = !1;
            for (i in this.handles)
                (handle = $(this.handles[i])[0]) !== event.target && !$.contains(handle, event.target) || (capture = !0);
            return !this.options.disabled && capture
        },
        _mouseStart: function(event) {
            var curleft, cursor = this.options, curtop = this.element.position(), el = this.element;
            return this.resizing = !0,
            /absolute/.test(el.css("position")) ? el.css({
                position: "absolute",
                top: el.css("top"),
                left: el.css("left")
            }) : el.is(".ui-draggable") && el.css({
                position: "absolute",
                top: curtop.top,
                left: curtop.left
            }),
            this._renderProxy(),
            curleft = num(this.helper.css("left")),
            curtop = num(this.helper.css("top")),
            cursor.containment && (curleft += $(cursor.containment).scrollLeft() || 0,
            curtop += $(cursor.containment).scrollTop() || 0),
            this.offset = this.helper.offset(),
            this.position = {
                left: curleft,
                top: curtop
            },
            this.size = this._helper ? {
                width: this.helper.width(),
                height: this.helper.height()
            } : {
                width: el.width(),
                height: el.height()
            },
            this.originalSize = this._helper ? {
                width: el.outerWidth(),
                height: el.outerHeight()
            } : {
                width: el.width(),
                height: el.height()
            },
            this.originalPosition = {
                left: curleft,
                top: curtop
            },
            this.sizeDiff = {
                width: el.outerWidth() - el.width(),
                height: el.outerHeight() - el.height()
            },
            this.originalMousePosition = {
                left: event.pageX,
                top: event.pageY
            },
            this.aspectRatio = "number" == typeof cursor.aspectRatio ? cursor.aspectRatio : this.originalSize.width / this.originalSize.height || 1,
            cursor = $(".ui-resizable-" + this.axis).css("cursor"),
            $("body").css("cursor", "auto" === cursor ? this.axis + "-resize" : cursor),
            el.addClass("ui-resizable-resizing"),
            this._propagate("start", event),
            !0
        },
        _mouseDrag: function(event) {
            var el = this.helper
              , props = {}
              , data = this.originalMousePosition
              , trigger = this.axis
              , prevTop = this.position.top
              , prevLeft = this.position.left
              , prevWidth = this.size.width
              , prevHeight = this.size.height
              , dx = event.pageX - data.left || 0
              , data = event.pageY - data.top || 0
              , trigger = this._change[trigger];
            return trigger && (data = trigger.apply(this, [event, dx, data]),
            this._updateVirtualBoundaries(event.shiftKey),
            (this._aspectRatio || event.shiftKey) && (data = this._updateRatio(data, event)),
            data = this._respectSize(data, event),
            this._updateCache(data),
            this._propagate("resize", event),
            this.position.top !== prevTop && (props.top = this.position.top + "px"),
            this.position.left !== prevLeft && (props.left = this.position.left + "px"),
            this.size.width !== prevWidth && (props.width = this.size.width + "px"),
            this.size.height !== prevHeight && (props.height = this.size.height + "px"),
            el.css(props),
            !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(),
            $.isEmptyObject(props) || this._trigger("resize", event, this.ui())),
            !1
        },
        _mouseStop: function(event) {
            this.resizing = !1;
            var s, left, top, o = this.options;
            return this._helper && (top = (s = (left = this._proportionallyResizeElements).length && /textarea/i.test(left[0].nodeName)) && $.ui.hasScroll(left[0], "left") ? 0 : this.sizeDiff.height,
            left = s ? 0 : this.sizeDiff.width,
            s = {
                width: this.helper.width() - left,
                height: this.helper.height() - top
            },
            left = parseInt(this.element.css("left"), 10) + (this.position.left - this.originalPosition.left) || null,
            top = parseInt(this.element.css("top"), 10) + (this.position.top - this.originalPosition.top) || null,
            o.animate || this.element.css($.extend(s, {
                top: top,
                left: left
            })),
            this.helper.height(this.size.height),
            this.helper.width(this.size.width),
            this._helper && !o.animate && this._proportionallyResize()),
            $("body").css("cursor", "auto"),
            this.element.removeClass("ui-resizable-resizing"),
            this._propagate("stop", event),
            this._helper && this.helper.remove(),
            !1
        },
        _updateVirtualBoundaries: function(pMaxHeight) {
            var pMinWidth, pMinHeight, pMaxWidth = this.options, b = {
                minWidth: isNumber(pMaxWidth.minWidth) ? pMaxWidth.minWidth : 0,
                maxWidth: isNumber(pMaxWidth.maxWidth) ? pMaxWidth.maxWidth : 1 / 0,
                minHeight: isNumber(pMaxWidth.minHeight) ? pMaxWidth.minHeight : 0,
                maxHeight: isNumber(pMaxWidth.maxHeight) ? pMaxWidth.maxHeight : 1 / 0
            };
            (this._aspectRatio || pMaxHeight) && (pMinWidth = b.minHeight * this.aspectRatio,
            pMinHeight = b.minWidth / this.aspectRatio,
            pMaxWidth = b.maxHeight * this.aspectRatio,
            pMaxHeight = b.maxWidth / this.aspectRatio,
            pMinWidth > b.minWidth && (b.minWidth = pMinWidth),
            pMinHeight > b.minHeight && (b.minHeight = pMinHeight),
            pMaxWidth < b.maxWidth && (b.maxWidth = pMaxWidth),
            pMaxHeight < b.maxHeight && (b.maxHeight = pMaxHeight)),
            this._vBoundaries = b
        },
        _updateCache: function(data) {
            this.offset = this.helper.offset(),
            isNumber(data.left) && (this.position.left = data.left),
            isNumber(data.top) && (this.position.top = data.top),
            isNumber(data.height) && (this.size.height = data.height),
            isNumber(data.width) && (this.size.width = data.width)
        },
        _updateRatio: function(data) {
            var cpos = this.position
              , csize = this.size
              , a = this.axis;
            return isNumber(data.height) ? data.width = data.height * this.aspectRatio : isNumber(data.width) && (data.height = data.width / this.aspectRatio),
            "sw" === a && (data.left = cpos.left + (csize.width - data.width),
            data.top = null),
            "nw" === a && (data.top = cpos.top + (csize.height - data.height),
            data.left = cpos.left + (csize.width - data.width)),
            data
        },
        _respectSize: function(data) {
            var o = this._vBoundaries
              , ch = this.axis
              , ismaxw = isNumber(data.width) && o.maxWidth && o.maxWidth < data.width
              , ismaxh = isNumber(data.height) && o.maxHeight && o.maxHeight < data.height
              , isminw = isNumber(data.width) && o.minWidth && o.minWidth > data.width
              , isminh = isNumber(data.height) && o.minHeight && o.minHeight > data.height
              , dw = this.originalPosition.left + this.originalSize.width
              , dh = this.position.top + this.size.height
              , cw = /sw|nw|w/.test(ch)
              , ch = /nw|ne|n/.test(ch);
            return isminw && (data.width = o.minWidth),
            isminh && (data.height = o.minHeight),
            ismaxw && (data.width = o.maxWidth),
            ismaxh && (data.height = o.maxHeight),
            isminw && cw && (data.left = dw - o.minWidth),
            ismaxw && cw && (data.left = dw - o.maxWidth),
            isminh && ch && (data.top = dh - o.minHeight),
            ismaxh && ch && (data.top = dh - o.maxHeight),
            data.width || data.height || data.left || !data.top ? data.width || data.height || data.top || !data.left || (data.left = null) : data.top = null,
            data
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length)
                for (var j, borders, paddings, prel, element = this.helper || this.element, i = 0; i < this._proportionallyResizeElements.length; i++) {
                    if (prel = this._proportionallyResizeElements[i],
                    !this.borderDif)
                        for (this.borderDif = [],
                        borders = [prel.css("borderTopWidth"), prel.css("borderRightWidth"), prel.css("borderBottomWidth"), prel.css("borderLeftWidth")],
                        paddings = [prel.css("paddingTop"), prel.css("paddingRight"), prel.css("paddingBottom"), prel.css("paddingLeft")],
                        j = 0; j < borders.length; j++)
                            this.borderDif[j] = (parseInt(borders[j], 10) || 0) + (parseInt(paddings[j], 10) || 0);
                    prel.css({
                        height: element.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: element.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
                }
        },
        _renderProxy: function() {
            var el = this.element
              , o = this.options;
            this.elementOffset = el.offset(),
            this._helper ? (this.helper = this.helper || $("<div style='overflow:hidden;'></div>"),
            this.helper.addClass(this._helper).css({
                width: this.element.outerWidth() - 1,
                height: this.element.outerHeight() - 1,
                position: "absolute",
                left: this.elementOffset.left + "px",
                top: this.elementOffset.top + "px",
                zIndex: ++o.zIndex
            }),
            this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        },
        _change: {
            e: function(event, dx) {
                return {
                    width: this.originalSize.width + dx
                }
            },
            w: function(event, dx) {
                var cs = this.originalSize;
                return {
                    left: this.originalPosition.left + dx,
                    width: cs.width - dx
                }
            },
            n: function(event, dx, dy) {
                var cs = this.originalSize;
                return {
                    top: this.originalPosition.top + dy,
                    height: cs.height - dy
                }
            },
            s: function(event, dx, dy) {
                return {
                    height: this.originalSize.height + dy
                }
            },
            se: function(event, dx, dy) {
                return $.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]))
            },
            sw: function(event, dx, dy) {
                return $.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]))
            },
            ne: function(event, dx, dy) {
                return $.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [event, dx, dy]))
            },
            nw: function(event, dx, dy) {
                return $.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [event, dx, dy]))
            }
        },
        _propagate: function(n, event) {
            $.ui.plugin.call(this, n, [event, this.ui()]),
            "resize" !== n && this._trigger(n, event, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    }),
    $.ui.plugin.add("resizable", "animate", {
        stop: function(event) {
            var that = $(this).data("ui-resizable")
              , o = that.options
              , pr = that._proportionallyResizeElements
              , style = pr.length && /textarea/i.test(pr[0].nodeName)
              , top = style && $.ui.hasScroll(pr[0], "left") ? 0 : that.sizeDiff.height
              , left = style ? 0 : that.sizeDiff.width
              , style = {
                width: that.size.width - left,
                height: that.size.height - top
            }
              , left = parseInt(that.element.css("left"), 10) + (that.position.left - that.originalPosition.left) || null
              , top = parseInt(that.element.css("top"), 10) + (that.position.top - that.originalPosition.top) || null;
            that.element.animate($.extend(style, top && left ? {
                top: top,
                left: left
            } : {}), {
                duration: o.animateDuration,
                easing: o.animateEasing,
                step: function() {
                    var data = {
                        width: parseInt(that.element.css("width"), 10),
                        height: parseInt(that.element.css("height"), 10),
                        top: parseInt(that.element.css("top"), 10),
                        left: parseInt(that.element.css("left"), 10)
                    };
                    pr && pr.length && $(pr[0]).css({
                        width: data.width,
                        height: data.height
                    }),
                    that._updateCache(data),
                    that._propagate("resize", event)
                }
            })
        }
    }),
    $.ui.plugin.add("resizable", "containment", {
        start: function() {
            var element, p, that = $(this).data("ui-resizable"), co = that.options, height = that.element, width = co.containment, ce = width instanceof $ ? width.get(0) : /parent/.test(width) ? height.parent().get(0) : width;
            ce && (that.containerElement = $(ce),
            /document/.test(width) || width === document ? (that.containerOffset = {
                left: 0,
                top: 0
            },
            that.containerPosition = {
                left: 0,
                top: 0
            },
            that.parentData = {
                element: $(document),
                left: 0,
                top: 0,
                width: $(document).width(),
                height: $(document).height() || document.body.parentNode.scrollHeight
            }) : (element = $(ce),
            p = [],
            $(["Top", "Right", "Left", "Bottom"]).each(function(i, name) {
                p[i] = num(element.css("padding" + name))
            }),
            that.containerOffset = element.offset(),
            that.containerPosition = element.position(),
            that.containerSize = {
                height: element.innerHeight() - p[3],
                width: element.innerWidth() - p[1]
            },
            co = that.containerOffset,
            height = that.containerSize.height,
            width = that.containerSize.width,
            width = $.ui.hasScroll(ce, "left") ? ce.scrollWidth : width,
            height = $.ui.hasScroll(ce) ? ce.scrollHeight : height,
            that.parentData = {
                element: ce,
                left: co.left,
                top: co.top,
                width: width,
                height: height
            }))
        },
        resize: function(ce) {
            var that = $(this).data("ui-resizable")
              , woset = that.options
              , isOffsetRelative = that.containerOffset
              , hoset = that.position
              , pRatio = that._aspectRatio || ce.shiftKey
              , isParent = {
                top: 0,
                left: 0
            }
              , ce = that.containerElement;
            ce[0] !== document && /static/.test(ce.css("position")) && (isParent = isOffsetRelative),
            hoset.left < (that._helper ? isOffsetRelative.left : 0) && (that.size.width = that.size.width + (that._helper ? that.position.left - isOffsetRelative.left : that.position.left - isParent.left),
            pRatio && (that.size.height = that.size.width / that.aspectRatio),
            that.position.left = woset.helper ? isOffsetRelative.left : 0),
            hoset.top < (that._helper ? isOffsetRelative.top : 0) && (that.size.height = that.size.height + (that._helper ? that.position.top - isOffsetRelative.top : that.position.top),
            pRatio && (that.size.width = that.size.height * that.aspectRatio),
            that.position.top = that._helper ? isOffsetRelative.top : 0),
            that.offset.left = that.parentData.left + that.position.left,
            that.offset.top = that.parentData.top + that.position.top,
            woset = Math.abs((that._helper,
            that.offset.left - isParent.left + that.sizeDiff.width)),
            hoset = Math.abs((that._helper ? that.offset.top - isParent.top : that.offset.top - isOffsetRelative.top) + that.sizeDiff.height),
            isParent = that.containerElement.get(0) === that.element.parent().get(0),
            isOffsetRelative = /relative|absolute/.test(that.containerElement.css("position")),
            isParent && isOffsetRelative && (woset -= Math.abs(that.parentData.left)),
            woset + that.size.width >= that.parentData.width && (that.size.width = that.parentData.width - woset,
            pRatio && (that.size.height = that.size.width / that.aspectRatio)),
            hoset + that.size.height >= that.parentData.height && (that.size.height = that.parentData.height - hoset,
            pRatio && (that.size.width = that.size.height * that.aspectRatio))
        },
        stop: function() {
            var that = $(this).data("ui-resizable")
              , o = that.options
              , co = that.containerOffset
              , cop = that.containerPosition
              , ce = that.containerElement
              , h = $(that.helper)
              , ho = h.offset()
              , w = h.outerWidth() - that.sizeDiff.width
              , h = h.outerHeight() - that.sizeDiff.height;
            that._helper && !o.animate && /relative/.test(ce.css("position")) && $(this).css({
                left: ho.left - cop.left - co.left,
                width: w,
                height: h
            }),
            that._helper && !o.animate && /static/.test(ce.css("position")) && $(this).css({
                left: ho.left - cop.left - co.left,
                width: w,
                height: h
            })
        }
    }),
    $.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            function _store(exp) {
                $(exp).each(function() {
                    var el = $(this);
                    el.data("ui-resizable-alsoresize", {
                        width: parseInt(el.width(), 10),
                        height: parseInt(el.height(), 10),
                        left: parseInt(el.css("left"), 10),
                        top: parseInt(el.css("top"), 10)
                    })
                })
            }
            var o = $(this).data("ui-resizable").options;
            "object" != typeof o.alsoResize || o.alsoResize.parentNode ? _store(o.alsoResize) : o.alsoResize.length ? (o.alsoResize = o.alsoResize[0],
            _store(o.alsoResize)) : $.each(o.alsoResize, function(exp) {
                _store(exp)
            })
        },
        resize: function(event, ui) {
            function _alsoResize(exp, c) {
                $(exp).each(function() {
                    var el = $(this)
                      , start = $(this).data("ui-resizable-alsoresize")
                      , style = {}
                      , css = c && c.length ? c : el.parents(ui.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                    $.each(css, function(i, prop) {
                        var sum = (start[prop] || 0) + (delta[prop] || 0);
                        sum && 0 <= sum && (style[prop] = sum || null)
                    }),
                    el.css(style)
                })
            }
            var that = $(this).data("ui-resizable")
              , o = that.options
              , os = that.originalSize
              , op = that.originalPosition
              , delta = {
                height: that.size.height - os.height || 0,
                width: that.size.width - os.width || 0,
                top: that.position.top - op.top || 0,
                left: that.position.left - op.left || 0
            };
            "object" != typeof o.alsoResize || o.alsoResize.nodeType ? _alsoResize(o.alsoResize) : $.each(o.alsoResize, function(exp, c) {
                _alsoResize(exp, c)
            })
        },
        stop: function() {
            $(this).removeData("resizable-alsoresize")
        }
    }),
    $.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var that = $(this).data("ui-resizable")
              , o = that.options
              , cs = that.size;
            that.ghost = that.originalElement.clone(),
            that.ghost.css({
                opacity: .25,
                display: "block",
                position: "relative",
                height: cs.height,
                width: cs.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass("string" == typeof o.ghost ? o.ghost : ""),
            that.ghost.appendTo(that.helper)
        },
        resize: function() {
            var that = $(this).data("ui-resizable");
            that.ghost && that.ghost.css({
                position: "relative",
                height: that.size.height,
                width: that.size.width
            })
        },
        stop: function() {
            var that = $(this).data("ui-resizable");
            that.ghost && that.helper && that.helper.get(0).removeChild(that.ghost.get(0))
        }
    }),
    $.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var that = $(this).data("ui-resizable")
              , o = that.options
              , isMinHeight = that.size
              , os = that.originalSize
              , op = that.originalPosition
              , a = that.axis
              , grid = "number" == typeof o.grid ? [o.grid, o.grid] : o.grid
              , gridX = grid[0] || 1
              , gridY = grid[1] || 1
              , ox = Math.round((isMinHeight.width - os.width) / gridX) * gridX
              , oy = Math.round((isMinHeight.height - os.height) / gridY) * gridY
              , newWidth = os.width + ox
              , newHeight = os.height + oy
              , isMaxWidth = o.maxWidth && o.maxWidth < newWidth
              , isMaxHeight = o.maxHeight && o.maxHeight < newHeight
              , isMinWidth = o.minWidth && o.minWidth > newWidth
              , isMinHeight = o.minHeight && o.minHeight > newHeight;
            o.grid = grid,
            isMinWidth && (newWidth += gridX),
            isMinHeight && (newHeight += gridY),
            isMaxWidth && (newWidth -= gridX),
            isMaxHeight && (newHeight -= gridY),
            /^(se|s|e)$/.test(a) ? (that.size.width = newWidth,
            that.size.height = newHeight) : /^(ne)$/.test(a) ? (that.size.width = newWidth,
            that.size.height = newHeight,
            that.position.top = op.top - oy) : /^(sw)$/.test(a) ? (that.size.width = newWidth,
            that.size.height = newHeight,
            that.position.left = op.left - ox) : (0 < newHeight - gridY ? (that.size.height = newHeight,
            that.position.top = op.top - oy) : (that.size.height = gridY,
            that.position.top = op.top + os.height - gridY),
            0 < newWidth - gridX ? (that.size.width = newWidth,
            that.position.left = op.left - ox) : (that.size.width = gridX,
            that.position.left = op.left + os.width - gridX))
        }
    })
}(jQuery),
function($) {
    $.widget("ui.selectable", $.ui.mouse, {
        version: "1.10.4",
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function() {
            var selectees, that = this;
            this.element.addClass("ui-selectable"),
            this.dragged = !1,
            this.refresh = function() {
                (selectees = $(that.options.filter, that.element[0])).addClass("ui-selectee"),
                selectees.each(function() {
                    var $this = $(this)
                      , pos = $this.offset();
                    $.data(this, "selectable-item", {
                        element: this,
                        $element: $this,
                        left: pos.left,
                        top: pos.top,
                        right: pos.left + $this.outerWidth(),
                        bottom: pos.top + $this.outerHeight(),
                        startselected: !1,
                        selected: $this.hasClass("ui-selected"),
                        selecting: $this.hasClass("ui-selecting"),
                        unselecting: $this.hasClass("ui-unselecting")
                    })
                })
            }
            ,
            this.refresh(),
            this.selectees = selectees.addClass("ui-selectee"),
            this._mouseInit(),
            this.helper = $("<div class='ui-selectable-helper'></div>")
        },
        _destroy: function() {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item"),
            this.element.removeClass("ui-selectable ui-selectable-disabled"),
            this._mouseDestroy()
        },
        _mouseStart: function(event) {
            var that = this
              , options = this.options;
            this.opos = [event.pageX, event.pageY],
            this.options.disabled || (this.selectees = $(options.filter, this.element[0]),
            this._trigger("start", event),
            $(options.appendTo).append(this.helper),
            this.helper.css({
                left: event.pageX,
                top: event.pageY,
                width: 0,
                height: 0
            }),
            options.autoRefresh && this.refresh(),
            this.selectees.filter(".ui-selected").each(function() {
                var selectee = $.data(this, "selectable-item");
                selectee.startselected = !0,
                event.metaKey || event.ctrlKey || (selectee.$element.removeClass("ui-selected"),
                selectee.selected = !1,
                selectee.$element.addClass("ui-unselecting"),
                selectee.unselecting = !0,
                that._trigger("unselecting", event, {
                    unselecting: selectee.element
                }))
            }),
            $(event.target).parents().addBack().each(function() {
                var doSelect, selectee = $.data(this, "selectable-item");
                if (selectee)
                    return doSelect = !event.metaKey && !event.ctrlKey || !selectee.$element.hasClass("ui-selected"),
                    selectee.$element.removeClass(doSelect ? "ui-unselecting" : "ui-selected").addClass(doSelect ? "ui-selecting" : "ui-unselecting"),
                    selectee.unselecting = !doSelect,
                    selectee.selecting = doSelect,
                    (selectee.selected = doSelect) ? that._trigger("selecting", event, {
                        selecting: selectee.element
                    }) : that._trigger("unselecting", event, {
                        unselecting: selectee.element
                    }),
                    !1
            }))
        },
        _mouseDrag: function(event) {
            if (this.dragged = !0,
            !this.options.disabled) {
                var tmp, that = this, options = this.options, x1 = this.opos[0], y1 = this.opos[1], x2 = event.pageX, y2 = event.pageY;
                return x2 < x1 && (tmp = x2,
                x2 = x1,
                x1 = tmp),
                y2 < y1 && (tmp = y2,
                y2 = y1,
                y1 = tmp),
                this.helper.css({
                    left: x1,
                    top: y1,
                    width: x2 - x1,
                    height: y2 - y1
                }),
                this.selectees.each(function() {
                    var selectee = $.data(this, "selectable-item")
                      , hit = !1;
                    selectee && selectee.element !== that.element[0] && ("touch" === options.tolerance ? hit = !(selectee.left > x2 || selectee.right < x1 || selectee.top > y2 || selectee.bottom < y1) : "fit" === options.tolerance && (hit = selectee.left > x1 && selectee.right < x2 && selectee.top > y1 && selectee.bottom < y2),
                    hit ? (selectee.selected && (selectee.$element.removeClass("ui-selected"),
                    selectee.selected = !1),
                    selectee.unselecting && (selectee.$element.removeClass("ui-unselecting"),
                    selectee.unselecting = !1),
                    selectee.selecting || (selectee.$element.addClass("ui-selecting"),
                    selectee.selecting = !0,
                    that._trigger("selecting", event, {
                        selecting: selectee.element
                    }))) : (selectee.selecting && ((event.metaKey || event.ctrlKey) && selectee.startselected ? (selectee.$element.removeClass("ui-selecting"),
                    selectee.selecting = !1,
                    selectee.$element.addClass("ui-selected"),
                    selectee.selected = !0) : (selectee.$element.removeClass("ui-selecting"),
                    selectee.selecting = !1,
                    selectee.startselected && (selectee.$element.addClass("ui-unselecting"),
                    selectee.unselecting = !0),
                    that._trigger("unselecting", event, {
                        unselecting: selectee.element
                    }))),
                    selectee.selected && (event.metaKey || event.ctrlKey || selectee.startselected || (selectee.$element.removeClass("ui-selected"),
                    selectee.selected = !1,
                    selectee.$element.addClass("ui-unselecting"),
                    selectee.unselecting = !0,
                    that._trigger("unselecting", event, {
                        unselecting: selectee.element
                    })))))
                }),
                !1
            }
        },
        _mouseStop: function(event) {
            var that = this;
            return this.dragged = !1,
            $(".ui-unselecting", this.element[0]).each(function() {
                var selectee = $.data(this, "selectable-item");
                selectee.$element.removeClass("ui-unselecting"),
                selectee.unselecting = !1,
                selectee.startselected = !1,
                that._trigger("unselected", event, {
                    unselected: selectee.element
                })
            }),
            $(".ui-selecting", this.element[0]).each(function() {
                var selectee = $.data(this, "selectable-item");
                selectee.$element.removeClass("ui-selecting").addClass("ui-selected"),
                selectee.selecting = !1,
                selectee.selected = !0,
                selectee.startselected = !0,
                that._trigger("selected", event, {
                    selected: selectee.element
                })
            }),
            this._trigger("stop", event),
            this.helper.remove(),
            !1
        }
    })
}(jQuery),
function($) {
    function isOverAxis(x, reference, size) {
        return reference < x && x < reference + size
    }
    function isFloating(item) {
        return /left|right/.test(item.css("float")) || /inline|table-cell/.test(item.css("display"))
    }
    $.widget("ui.sortable", $.ui.mouse, {
        version: "1.10.4",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "> *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1e3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _create: function() {
            var o = this.options;
            this.containerCache = {},
            this.element.addClass("ui-sortable"),
            this.refresh(),
            this.floating = !!this.items.length && ("x" === o.axis || isFloating(this.items[0].item)),
            this.offset = this.element.offset(),
            this._mouseInit(),
            this.ready = !0
        },
        _destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled"),
            this._mouseDestroy();
            for (var i = this.items.length - 1; 0 <= i; i--)
                this.items[i].item.removeData(this.widgetName + "-item");
            return this
        },
        _setOption: function(key, value) {
            "disabled" === key ? (this.options[key] = value,
            this.widget().toggleClass("ui-sortable-disabled", !!value)) : $.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function(event, overrideHandle) {
            var currentItem = null
              , validHandle = !1
              , that = this;
            return !this.reverting && (!this.options.disabled && "static" !== this.options.type && (this._refreshItems(event),
            $(event.target).parents().each(function() {
                if ($.data(this, that.widgetName + "-item") === that)
                    return currentItem = $(this),
                    !1
            }),
            !!(currentItem = $.data(event.target, that.widgetName + "-item") === that ? $(event.target) : currentItem) && (!(this.options.handle && !overrideHandle && ($(this.options.handle, currentItem).find("*").addBack().each(function() {
                this === event.target && (validHandle = !0)
            }),
            !validHandle)) && (this.currentItem = currentItem,
            this._removeCurrentsFromItems(),
            !0))))
        },
        _mouseStart: function(event, overrideHandle, noActivation) {
            var i, body, o = this.options;
            if ((this.currentContainer = this).refreshPositions(),
            this.helper = this._createHelper(event),
            this._cacheHelperProportions(),
            this._cacheMargins(),
            this.scrollParent = this.helper.scrollParent(),
            this.offset = this.currentItem.offset(),
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            },
            $.extend(this.offset, {
                click: {
                    left: event.pageX - this.offset.left,
                    top: event.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            }),
            this.helper.css("position", "absolute"),
            this.cssPosition = this.helper.css("position"),
            this.originalPosition = this._generatePosition(event),
            this.originalPageX = event.pageX,
            this.originalPageY = event.pageY,
            o.cursorAt && this._adjustOffsetFromHelper(o.cursorAt),
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            },
            this.helper[0] !== this.currentItem[0] && this.currentItem.hide(),
            this._createPlaceholder(),
            o.containment && this._setContainment(),
            o.cursor && "auto" !== o.cursor && (body = this.document.find("body"),
            this.storedCursor = body.css("cursor"),
            body.css("cursor", o.cursor),
            this.storedStylesheet = $("<style>*{ cursor: " + o.cursor + " !important; }</style>").appendTo(body)),
            o.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")),
            this.helper.css("opacity", o.opacity)),
            o.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")),
            this.helper.css("zIndex", o.zIndex)),
            this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()),
            this._trigger("start", event, this._uiHash()),
            this._preserveHelperProportions || this._cacheHelperProportions(),
            !noActivation)
                for (i = this.containers.length - 1; 0 <= i; i--)
                    this.containers[i]._trigger("activate", event, this._uiHash(this));
            return $.ui.ddmanager && ($.ui.ddmanager.current = this),
            $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event),
            this.dragging = !0,
            this.helper.addClass("ui-sortable-helper"),
            this._mouseDrag(event),
            !0
        },
        _mouseDrag: function(event) {
            var i, item, itemElement, intersection, o = this.options, scrolled = !1;
            for (this.position = this._generatePosition(event),
            this.positionAbs = this._convertPositionTo("absolute"),
            this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs),
            this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - event.pageY < o.scrollSensitivity ? this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed : event.pageY - this.overflowOffset.top < o.scrollSensitivity && (this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed),
            this.overflowOffset.left + this.scrollParent[0].offsetWidth - event.pageX < o.scrollSensitivity ? this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed : event.pageX - this.overflowOffset.left < o.scrollSensitivity && (this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed)) : (event.pageY - $(document).scrollTop() < o.scrollSensitivity ? scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed) : $(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity && (scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed)),
            event.pageX - $(document).scrollLeft() < o.scrollSensitivity ? scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed) : $(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity && (scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed))),
            !1 !== scrolled && $.ui.ddmanager && !o.dropBehaviour && $.ui.ddmanager.prepareOffsets(this, event)),
            this.positionAbs = this._convertPositionTo("absolute"),
            this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"),
            this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"),
            i = this.items.length - 1; 0 <= i; i--)
                if (itemElement = (item = this.items[i]).item[0],
                (intersection = this._intersectsWithPointer(item)) && item.instance === this.currentContainer && !(itemElement === this.currentItem[0] || this.placeholder[1 === intersection ? "next" : "prev"]()[0] === itemElement || $.contains(this.placeholder[0], itemElement) || "semi-dynamic" === this.options.type && $.contains(this.element[0], itemElement))) {
                    if (this.direction = 1 === intersection ? "down" : "up",
                    "pointer" !== this.options.tolerance && !this._intersectsWithSides(item))
                        break;
                    this._rearrange(event, item),
                    this._trigger("change", event, this._uiHash());
                    break
                }
            return this._contactContainers(event),
            $.ui.ddmanager && $.ui.ddmanager.drag(this, event),
            this._trigger("sort", event, this._uiHash()),
            this.lastPositionAbs = this.positionAbs,
            !1
        },
        _mouseStop: function(event, noPropagation) {
            var that, cur, axis, animation;
            if (event)
                return $.ui.ddmanager && !this.options.dropBehaviour && $.ui.ddmanager.drop(this, event),
                this.options.revert ? (cur = (that = this).placeholder.offset(),
                animation = {},
                (axis = this.options.axis) && "x" !== axis || (animation.left = cur.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)),
                axis && "y" !== axis || (animation.top = cur.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)),
                this.reverting = !0,
                $(this.helper).animate(animation, parseInt(this.options.revert, 10) || 500, function() {
                    that._clear(event)
                })) : this._clear(event, noPropagation),
                !1
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                }),
                "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var i = this.containers.length - 1; 0 <= i; i--)
                    this.containers[i]._trigger("deactivate", null, this._uiHash(this)),
                    this.containers[i].containerCache.over && (this.containers[i]._trigger("out", null, this._uiHash(this)),
                    this.containers[i].containerCache.over = 0)
            }
            return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(),
            $.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }),
            this.domPosition.prev ? $(this.domPosition.prev).after(this.currentItem) : $(this.domPosition.parent).prepend(this.currentItem)),
            this
        },
        serialize: function(o) {
            var items = this._getItemsAsjQuery(o && o.connected)
              , str = [];
            return o = o || {},
            $(items).each(function() {
                var res = ($(o.item || this).attr(o.attribute || "id") || "").match(o.expression || /(.+)[\-=_](.+)/);
                res && str.push((o.key || res[1] + "[]") + "=" + (o.key && o.expression ? res[1] : res[2]))
            }),
            !str.length && o.key && str.push(o.key + "="),
            str.join("&")
        },
        toArray: function(o) {
            var items = this._getItemsAsjQuery(o && o.connected)
              , ret = [];
            return o = o || {},
            items.each(function() {
                ret.push($(o.item || this).attr(o.attribute || "id") || "")
            }),
            ret
        },
        _intersectsWith: function(item) {
            var x1 = this.positionAbs.left
              , x2 = x1 + this.helperProportions.width
              , y1 = this.positionAbs.top
              , y2 = y1 + this.helperProportions.height
              , l = item.left
              , r = l + item.width
              , t = item.top
              , b = t + item.height
              , isOverElementHeight = this.offset.click.top
              , isOverElementWidth = this.offset.click.left
              , isOverElementHeight = "x" === this.options.axis || t < y1 + isOverElementHeight && y1 + isOverElementHeight < b
              , isOverElementWidth = "y" === this.options.axis || l < x1 + isOverElementWidth && x1 + isOverElementWidth < r;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > item[this.floating ? "width" : "height"] ? isOverElementHeight && isOverElementWidth : l < x1 + this.helperProportions.width / 2 && x2 - this.helperProportions.width / 2 < r && t < y1 + this.helperProportions.height / 2 && y2 - this.helperProportions.height / 2 < b
        },
        _intersectsWithPointer: function(isOverElement) {
            var verticalDirection = "x" === this.options.axis || isOverAxis(this.positionAbs.top + this.offset.click.top, isOverElement.top, isOverElement.height)
              , horizontalDirection = "y" === this.options.axis || isOverAxis(this.positionAbs.left + this.offset.click.left, isOverElement.left, isOverElement.width)
              , isOverElement = verticalDirection && horizontalDirection
              , verticalDirection = this._getDragVerticalDirection()
              , horizontalDirection = this._getDragHorizontalDirection();
            return !!isOverElement && (this.floating ? horizontalDirection && "right" === horizontalDirection || "down" === verticalDirection ? 2 : 1 : verticalDirection && ("down" === verticalDirection ? 2 : 1))
        },
        _intersectsWithSides: function(horizontalDirection) {
            var isOverBottomHalf = isOverAxis(this.positionAbs.top + this.offset.click.top, horizontalDirection.top + horizontalDirection.height / 2, horizontalDirection.height)
              , isOverRightHalf = isOverAxis(this.positionAbs.left + this.offset.click.left, horizontalDirection.left + horizontalDirection.width / 2, horizontalDirection.width)
              , verticalDirection = this._getDragVerticalDirection()
              , horizontalDirection = this._getDragHorizontalDirection();
            return this.floating && horizontalDirection ? "right" === horizontalDirection && isOverRightHalf || "left" === horizontalDirection && !isOverRightHalf : verticalDirection && ("down" === verticalDirection && isOverBottomHalf || "up" === verticalDirection && !isOverBottomHalf)
        },
        _getDragVerticalDirection: function() {
            var delta = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 != delta && (0 < delta ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var delta = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 != delta && (0 < delta ? "right" : "left")
        },
        refresh: function(event) {
            return this._refreshItems(event),
            this.refreshPositions(),
            this
        },
        _connectWith: function() {
            var options = this.options;
            return options.connectWith.constructor === String ? [options.connectWith] : options.connectWith
        },
        _getItemsAsjQuery: function(connected) {
            var i, j, cur, inst, items = [], queries = [], connectWith = this._connectWith();
            if (connectWith && connected)
                for (i = connectWith.length - 1; 0 <= i; i--)
                    for (j = (cur = $(connectWith[i])).length - 1; 0 <= j; j--)
                        (inst = $.data(cur[j], this.widgetFullName)) && inst !== this && !inst.options.disabled && queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element) : $(inst.options.items, inst.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), inst]);
            function addItems() {
                items.push(this)
            }
            for (queries.push([$.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : $(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]),
            i = queries.length - 1; 0 <= i; i--)
                queries[i][0].each(addItems);
            return $(items)
        },
        _removeCurrentsFromItems: function() {
            var list = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = $.grep(this.items, function(item) {
                for (var j = 0; j < list.length; j++)
                    if (list[j] === item.item[0])
                        return !1;
                return !0
            })
        },
        _refreshItems: function(event) {
            this.items = [],
            this.containers = [this];
            var i, j, cur, inst, targetData, _queries, item, queriesLength, items = this.items, queries = [[$.isFunction(this.options.items) ? this.options.items.call(this.element[0], event, {
                item: this.currentItem
            }) : $(this.options.items, this.element), this]], connectWith = this._connectWith();
            if (connectWith && this.ready)
                for (i = connectWith.length - 1; 0 <= i; i--)
                    for (j = (cur = $(connectWith[i])).length - 1; 0 <= j; j--)
                        (inst = $.data(cur[j], this.widgetFullName)) && inst !== this && !inst.options.disabled && (queries.push([$.isFunction(inst.options.items) ? inst.options.items.call(inst.element[0], event, {
                            item: this.currentItem
                        }) : $(inst.options.items, inst.element), inst]),
                        this.containers.push(inst));
            for (i = queries.length - 1; 0 <= i; i--)
                for (targetData = queries[i][1],
                queriesLength = (_queries = queries[i][j = 0]).length; j < queriesLength; j++)
                    (item = $(_queries[j])).data(this.widgetName + "-item", targetData),
                    items.push({
                        item: item,
                        instance: targetData,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
        },
        refreshPositions: function(fast) {
            var i, item, t, p;
            for (this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset()),
            i = this.items.length - 1; 0 <= i; i--)
                (item = this.items[i]).instance !== this.currentContainer && this.currentContainer && item.item[0] !== this.currentItem[0] || (t = this.options.toleranceElement ? $(this.options.toleranceElement, item.item) : item.item,
                fast || (item.width = t.outerWidth(),
                item.height = t.outerHeight()),
                p = t.offset(),
                item.left = p.left,
                item.top = p.top);
            if (this.options.custom && this.options.custom.refreshContainers)
                this.options.custom.refreshContainers.call(this);
            else
                for (i = this.containers.length - 1; 0 <= i; i--)
                    p = this.containers[i].element.offset(),
                    this.containers[i].containerCache.left = p.left,
                    this.containers[i].containerCache.top = p.top,
                    this.containers[i].containerCache.width = this.containers[i].element.outerWidth(),
                    this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
            return this
        },
        _createPlaceholder: function(that) {
            var className, o = (that = that || this).options;
            o.placeholder && o.placeholder.constructor !== String || (className = o.placeholder,
            o.placeholder = {
                element: function() {
                    var nodeName = that.currentItem[0].nodeName.toLowerCase()
                      , element = $("<" + nodeName + ">", that.document[0]).addClass(className || that.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                    return "tr" === nodeName ? that.currentItem.children().each(function() {
                        $("<td>&#160;</td>", that.document[0]).attr("colspan", $(this).attr("colspan") || 1).appendTo(element)
                    }) : "img" === nodeName && element.attr("src", that.currentItem.attr("src")),
                    className || element.css("visibility", "hidden"),
                    element
                },
                update: function(container, p) {
                    className && !o.forcePlaceholderSize || (p.height() || p.height(that.currentItem.innerHeight() - parseInt(that.currentItem.css("paddingTop") || 0, 10) - parseInt(that.currentItem.css("paddingBottom") || 0, 10)),
                    p.width() || p.width(that.currentItem.innerWidth() - parseInt(that.currentItem.css("paddingLeft") || 0, 10) - parseInt(that.currentItem.css("paddingRight") || 0, 10)))
                }
            }),
            that.placeholder = $(o.placeholder.element.call(that.element, that.currentItem)),
            that.currentItem.after(that.placeholder),
            o.placeholder.update(that, that.placeholder)
        },
        _contactContainers: function(event) {
            for (var j, dist, itemWithLeastDistance, posProperty, sizeProperty, base, cur, nearBottom, floating, innermostContainer = null, innermostIndex = null, i = this.containers.length - 1; 0 <= i; i--)
                $.contains(this.currentItem[0], this.containers[i].element[0]) || (this._intersectsWith(this.containers[i].containerCache) ? innermostContainer && $.contains(this.containers[i].element[0], innermostContainer.element[0]) || (innermostContainer = this.containers[i],
                innermostIndex = i) : this.containers[i].containerCache.over && (this.containers[i]._trigger("out", event, this._uiHash(this)),
                this.containers[i].containerCache.over = 0));
            if (innermostContainer)
                if (1 === this.containers.length)
                    this.containers[innermostIndex].containerCache.over || (this.containers[innermostIndex]._trigger("over", event, this._uiHash(this)),
                    this.containers[innermostIndex].containerCache.over = 1);
                else {
                    for (dist = 1e4,
                    itemWithLeastDistance = null,
                    sizeProperty = (floating = innermostContainer.floating || isFloating(this.currentItem)) ? "width" : "height",
                    base = this.positionAbs[posProperty = floating ? "left" : "top"] + this.offset.click[posProperty],
                    j = this.items.length - 1; 0 <= j; j--)
                        $.contains(this.containers[innermostIndex].element[0], this.items[j].item[0]) && this.items[j].item[0] !== this.currentItem[0] && (floating && !isOverAxis(this.positionAbs.top + this.offset.click.top, this.items[j].top, this.items[j].height) || (cur = this.items[j].item.offset()[posProperty],
                        nearBottom = !1,
                        Math.abs(cur - base) > Math.abs(cur + this.items[j][sizeProperty] - base) && (nearBottom = !0,
                        cur += this.items[j][sizeProperty]),
                        Math.abs(cur - base) < dist && (dist = Math.abs(cur - base),
                        itemWithLeastDistance = this.items[j],
                        this.direction = nearBottom ? "up" : "down")));
                    (itemWithLeastDistance || this.options.dropOnEmpty) && this.currentContainer !== this.containers[innermostIndex] && (itemWithLeastDistance ? this._rearrange(event, itemWithLeastDistance, null, !0) : this._rearrange(event, null, this.containers[innermostIndex].element, !0),
                    this._trigger("change", event, this._uiHash()),
                    this.containers[innermostIndex]._trigger("change", event, this._uiHash(this)),
                    this.currentContainer = this.containers[innermostIndex],
                    this.options.placeholder.update(this.currentContainer, this.placeholder),
                    this.containers[innermostIndex]._trigger("over", event, this._uiHash(this)),
                    this.containers[innermostIndex].containerCache.over = 1)
                }
        },
        _createHelper: function(helper) {
            var o = this.options
              , helper = $.isFunction(o.helper) ? $(o.helper.apply(this.element[0], [helper, this.currentItem])) : "clone" === o.helper ? this.currentItem.clone() : this.currentItem;
            return helper.parents("body").length || $("parent" !== o.appendTo ? o.appendTo : this.currentItem[0].parentNode)[0].appendChild(helper[0]),
            helper[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            }),
            helper[0].style.width && !o.forceHelperSize || helper.width(this.currentItem.width()),
            helper[0].style.height && !o.forceHelperSize || helper.height(this.currentItem.height()),
            helper
        },
        _adjustOffsetFromHelper: function(obj) {
            "string" == typeof obj && (obj = obj.split(" ")),
            "left"in (obj = $.isArray(obj) ? {
                left: +obj[0],
                top: +obj[1] || 0
            } : obj) && (this.offset.click.left = obj.left + this.margins.left),
            "right"in obj && (this.offset.click.left = this.helperProportions.width - obj.right + this.margins.left),
            "top"in obj && (this.offset.click.top = obj.top + this.margins.top),
            "bottom"in obj && (this.offset.click.top = this.helperProportions.height - obj.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var po = this.offsetParent.offset();
            return "absolute" === this.cssPosition && this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0]) && (po.left += this.scrollParent.scrollLeft(),
            po.top += this.scrollParent.scrollTop()),
            {
                top: (po = this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && $.ui.ie ? {
                    top: 0,
                    left: 0
                } : po).top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: po.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" !== this.cssPosition)
                return {
                    top: 0,
                    left: 0
                };
            var p = this.currentItem.position();
            return {
                top: p.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                left: p.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var ce, co, over = this.options;
            "parent" === over.containment && (over.containment = this.helper[0].parentNode),
            "document" !== over.containment && "window" !== over.containment || (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, $("document" === over.containment ? document : window).width() - this.helperProportions.width - this.margins.left, ($("document" === over.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]),
            /^(document|window|parent)$/.test(over.containment) || (ce = $(over.containment)[0],
            co = $(over.containment).offset(),
            over = "hidden" !== $(ce).css("overflow"),
            this.containment = [co.left + (parseInt($(ce).css("borderLeftWidth"), 10) || 0) + (parseInt($(ce).css("paddingLeft"), 10) || 0) - this.margins.left, co.top + (parseInt($(ce).css("borderTopWidth"), 10) || 0) + (parseInt($(ce).css("paddingTop"), 10) || 0) - this.margins.top, co.left + (over ? Math.max(ce.scrollWidth, ce.offsetWidth) : ce.offsetWidth) - (parseInt($(ce).css("borderLeftWidth"), 10) || 0) - (parseInt($(ce).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, co.top + (over ? Math.max(ce.scrollHeight, ce.offsetHeight) : ce.offsetHeight) - (parseInt($(ce).css("borderTopWidth"), 10) || 0) - (parseInt($(ce).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function(scrollIsRootNode, pos) {
            pos = pos || this.position;
            var mod = "absolute" === scrollIsRootNode ? 1 : -1
              , scroll = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent
              , scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
            return {
                top: pos.top + this.offset.relative.top * mod + this.offset.parent.top * mod - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()) * mod,
                left: pos.left + this.offset.relative.left * mod + this.offset.parent.left * mod - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft()) * mod
            }
        },
        _generatePosition: function(left) {
            var o = this.options
              , pageX = left.pageX
              , pageY = left.pageY
              , scroll = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && $.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent
              , scrollIsRootNode = /(html|body)/i.test(scroll[0].tagName);
            return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()),
            this.originalPosition && (this.containment && (left.pageX - this.offset.click.left < this.containment[0] && (pageX = this.containment[0] + this.offset.click.left),
            left.pageY - this.offset.click.top < this.containment[1] && (pageY = this.containment[1] + this.offset.click.top),
            left.pageX - this.offset.click.left > this.containment[2] && (pageX = this.containment[2] + this.offset.click.left),
            left.pageY - this.offset.click.top > this.containment[3] && (pageY = this.containment[3] + this.offset.click.top)),
            o.grid && (left = this.originalPageY + Math.round((pageY - this.originalPageY) / o.grid[1]) * o.grid[1],
            pageY = !this.containment || left - this.offset.click.top >= this.containment[1] && left - this.offset.click.top <= this.containment[3] ? left : left - this.offset.click.top >= this.containment[1] ? left - o.grid[1] : left + o.grid[1],
            left = this.originalPageX + Math.round((pageX - this.originalPageX) / o.grid[0]) * o.grid[0],
            pageX = !this.containment || left - this.offset.click.left >= this.containment[0] && left - this.offset.click.left <= this.containment[2] ? left : left - this.offset.click.left >= this.containment[0] ? left - o.grid[0] : left + o.grid[0])),
            {
                top: pageY - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : scrollIsRootNode ? 0 : scroll.scrollTop()),
                left: pageX - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : scrollIsRootNode ? 0 : scroll.scrollLeft())
            }
        },
        _rearrange: function(event, i, a, hardRefresh) {
            a ? a[0].appendChild(this.placeholder[0]) : i.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? i.item[0] : i.item[0].nextSibling),
            this.counter = this.counter ? ++this.counter : 1;
            var counter = this.counter;
            this._delay(function() {
                counter === this.counter && this.refreshPositions(!hardRefresh)
            })
        },
        _clear: function(event, noPropagation) {
            this.reverting = !1;
            var i, delayedTriggers = [];
            if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem),
            this._noFinalSort = null,
            this.helper[0] === this.currentItem[0]) {
                for (i in this._storedCSS)
                    "auto" !== this._storedCSS[i] && "static" !== this._storedCSS[i] || (this._storedCSS[i] = "");
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else
                this.currentItem.show();
            function delayEvent(type, instance, container) {
                return function(event) {
                    container._trigger(type, event, instance._uiHash(instance))
                }
            }
            for (this.fromOutside && !noPropagation && delayedTriggers.push(function(event) {
                this._trigger("receive", event, this._uiHash(this.fromOutside))
            }),
            !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || noPropagation || delayedTriggers.push(function(event) {
                this._trigger("update", event, this._uiHash())
            }),
            this !== this.currentContainer && (noPropagation || (delayedTriggers.push(function(event) {
                this._trigger("remove", event, this._uiHash())
            }),
            delayedTriggers.push(function(c) {
                return function(event) {
                    c._trigger("receive", event, this._uiHash(this))
                }
            }
            .call(this, this.currentContainer)),
            delayedTriggers.push(function(c) {
                return function(event) {
                    c._trigger("update", event, this._uiHash(this))
                }
            }
            .call(this, this.currentContainer)))),
            i = this.containers.length - 1; 0 <= i; i--)
                noPropagation || delayedTriggers.push(delayEvent("deactivate", this, this.containers[i])),
                this.containers[i].containerCache.over && (delayedTriggers.push(delayEvent("out", this, this.containers[i])),
                this.containers[i].containerCache.over = 0);
            if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor),
            this.storedStylesheet.remove()),
            this._storedOpacity && this.helper.css("opacity", this._storedOpacity),
            this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex),
            this.dragging = !1,
            this.cancelHelperRemoval) {
                if (!noPropagation) {
                    for (this._trigger("beforeStop", event, this._uiHash()),
                    i = 0; i < delayedTriggers.length; i++)
                        delayedTriggers[i].call(this, event);
                    this._trigger("stop", event, this._uiHash())
                }
                return this.fromOutside = !1
            }
            if (noPropagation || this._trigger("beforeStop", event, this._uiHash()),
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]),
            this.helper[0] !== this.currentItem[0] && this.helper.remove(),
            this.helper = null,
            !noPropagation) {
                for (i = 0; i < delayedTriggers.length; i++)
                    delayedTriggers[i].call(this, event);
                this._trigger("stop", event, this._uiHash())
            }
            return !(this.fromOutside = !1)
        },
        _trigger: function() {
            !1 === $.Widget.prototype._trigger.apply(this, arguments) && this.cancel()
        },
        _uiHash: function(_inst) {
            var inst = _inst || this;
            return {
                helper: inst.helper,
                placeholder: inst.placeholder || $([]),
                position: inst.position,
                originalPosition: inst.originalPosition,
                offset: inst.positionAbs,
                item: inst.currentItem,
                sender: _inst ? _inst.element : null
            }
        }
    })
}(jQuery),
function($) {
    var orig, classAnimationActions, shorthandStyles, baseEasings;
    function getElementStyles(elem) {
        var key, len, style = elem.ownerDocument.defaultView ? elem.ownerDocument.defaultView.getComputedStyle(elem, null) : elem.currentStyle, styles = {};
        if (style && style.length && style[0] && style[style[0]])
            for (len = style.length; len--; )
                "string" == typeof style[key = style[len]] && (styles[$.camelCase(key)] = style[key]);
        else
            for (key in style)
                "string" == typeof style[key] && (styles[key] = style[key]);
        return styles
    }
    $.effects = {
        effect: {}
    },
    /*!
 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */
    function(jQuery) {
        var colors, rplusequals = /^([\-+])=\s*(\d+\.?\d*)/, stringParsers = [{
            re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(execResult) {
                return [execResult[1], execResult[2], execResult[3], execResult[4]]
            }
        }, {
            re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            parse: function(execResult) {
                return [2.55 * execResult[1], 2.55 * execResult[2], 2.55 * execResult[3], execResult[4]]
            }
        }, {
            re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
            parse: function(execResult) {
                return [parseInt(execResult[1], 16), parseInt(execResult[2], 16), parseInt(execResult[3], 16)]
            }
        }, {
            re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
            parse: function(execResult) {
                return [parseInt(execResult[1] + execResult[1], 16), parseInt(execResult[2] + execResult[2], 16), parseInt(execResult[3] + execResult[3], 16)]
            }
        }, {
            re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
            space: "hsla",
            parse: function(execResult) {
                return [execResult[1], execResult[2] / 100, execResult[3] / 100, execResult[4]]
            }
        }], color = jQuery.Color = function(color, green, blue, alpha) {
            return new jQuery.Color.fn.parse(color,green,blue,alpha)
        }
        , spaces = {
            rgba: {
                props: {
                    red: {
                        idx: 0,
                        type: "byte"
                    },
                    green: {
                        idx: 1,
                        type: "byte"
                    },
                    blue: {
                        idx: 2,
                        type: "byte"
                    }
                }
            },
            hsla: {
                props: {
                    hue: {
                        idx: 0,
                        type: "degrees"
                    },
                    saturation: {
                        idx: 1,
                        type: "percent"
                    },
                    lightness: {
                        idx: 2,
                        type: "percent"
                    }
                }
            }
        }, propTypes = {
            byte: {
                floor: !0,
                max: 255
            },
            percent: {
                max: 1
            },
            degrees: {
                mod: 360,
                floor: !0
            }
        }, support = color.support = {}, supportElem = jQuery("<p>")[0], each = jQuery.each;
        function clamp(value, prop, allowEmpty) {
            var type = propTypes[prop.type] || {};
            return null == value ? allowEmpty || !prop.def ? null : prop.def : (value = type.floor ? ~~value : parseFloat(value),
            isNaN(value) ? prop.def : type.mod ? (value + type.mod) % type.mod : value < 0 ? 0 : type.max < value ? type.max : value)
        }
        function stringParse(string) {
            var inst = color()
              , rgba = inst._rgba = [];
            return string = string.toLowerCase(),
            each(stringParsers, function(i, spaceName) {
                var parsed = spaceName.re.exec(string)
                  , parsed = parsed && spaceName.parse(parsed)
                  , spaceName = spaceName.space || "rgba";
                if (parsed)
                    return parsed = inst[spaceName](parsed),
                    inst[spaces[spaceName].cache] = parsed[spaces[spaceName].cache],
                    rgba = inst._rgba = parsed._rgba,
                    !1
            }),
            rgba.length ? ("0,0,0,0" === rgba.join() && jQuery.extend(rgba, colors.transparent),
            inst) : colors[string]
        }
        function hue2rgb(p, q, h) {
            return 6 * (h = (h + 1) % 1) < 1 ? p + (q - p) * h * 6 : 2 * h < 1 ? q : 3 * h < 2 ? p + (q - p) * (2 / 3 - h) * 6 : p
        }
        supportElem.style.cssText = "background-color:rgba(1,1,1,.5)",
        support.rgba = -1 < supportElem.style.backgroundColor.indexOf("rgba"),
        each(spaces, function(spaceName, space) {
            space.cache = "_" + spaceName,
            space.props.alpha = {
                idx: 3,
                type: "percent",
                def: 1
            }
        }),
        (color.fn = jQuery.extend(color.prototype, {
            parse: function(red, green, blue, alpha) {
                if (void 0 === red)
                    return this._rgba = [null, null, null, null],
                    this;
                (red.jquery || red.nodeType) && (red = jQuery(red).css(green),
                green = void 0);
                var inst = this
                  , type = jQuery.type(red)
                  , rgba = this._rgba = [];
                return void 0 !== green && (red = [red, green, blue, alpha],
                type = "array"),
                "string" === type ? this.parse(stringParse(red) || colors._default) : "array" === type ? (each(spaces.rgba.props, function(key, prop) {
                    rgba[prop.idx] = clamp(red[prop.idx], prop)
                }),
                this) : "object" === type ? (each(spaces, red instanceof color ? function(spaceName, space) {
                    red[space.cache] && (inst[space.cache] = red[space.cache].slice())
                }
                : function(spaceName, space) {
                    var cache = space.cache;
                    each(space.props, function(key, prop) {
                        if (!inst[cache] && space.to) {
                            if ("alpha" === key || null == red[key])
                                return;
                            inst[cache] = space.to(inst._rgba)
                        }
                        inst[cache][prop.idx] = clamp(red[key], prop, !0)
                    }),
                    inst[cache] && jQuery.inArray(null, inst[cache].slice(0, 3)) < 0 && (inst[cache][3] = 1,
                    space.from && (inst._rgba = space.from(inst[cache])))
                }
                ),
                this) : void 0
            },
            is: function(compare) {
                var is = color(compare)
                  , same = !0
                  , inst = this;
                return each(spaces, function(_, space) {
                    var localCache, isCache = is[space.cache];
                    return isCache && (localCache = inst[space.cache] || space.to && space.to(inst._rgba) || [],
                    each(space.props, function(_, prop) {
                        if (null != isCache[prop.idx])
                            return same = isCache[prop.idx] === localCache[prop.idx]
                    })),
                    same
                }),
                same
            },
            _space: function() {
                var used = []
                  , inst = this;
                return each(spaces, function(spaceName, space) {
                    inst[space.cache] && used.push(spaceName)
                }),
                used.pop()
            },
            transition: function(startColor, distance) {
                var spaceName = (end = color(startColor))._space()
                  , space = spaces[spaceName]
                  , startColor = 0 === this.alpha() ? color("transparent") : this
                  , start = startColor[space.cache] || space.to(startColor._rgba)
                  , result = start.slice()
                  , end = end[space.cache];
                return each(space.props, function(key, prop) {
                    var index = prop.idx
                      , startValue = start[index]
                      , endValue = end[index]
                      , type = propTypes[prop.type] || {};
                    null !== endValue && (null === startValue ? result[index] = endValue : (type.mod && (endValue - startValue > type.mod / 2 ? startValue += type.mod : startValue - endValue > type.mod / 2 && (startValue -= type.mod)),
                    result[index] = clamp((endValue - startValue) * distance + startValue, prop)))
                }),
                this[spaceName](result)
            },
            blend: function(opaque) {
                if (1 === this._rgba[3])
                    return this;
                var rgb = this._rgba.slice()
                  , a = rgb.pop()
                  , blend = color(opaque)._rgba;
                return color(jQuery.map(rgb, function(v, i) {
                    return (1 - a) * blend[i] + a * v
                }))
            },
            toRgbaString: function() {
                var prefix = "rgba("
                  , rgba = jQuery.map(this._rgba, function(v, i) {
                    return null == v ? 2 < i ? 1 : 0 : v
                });
                return 1 === rgba[3] && (rgba.pop(),
                prefix = "rgb("),
                prefix + rgba.join() + ")"
            },
            toHslaString: function() {
                var prefix = "hsla("
                  , hsla = jQuery.map(this.hsla(), function(v, i) {
                    return null == v && (v = 2 < i ? 1 : 0),
                    v = i && i < 3 ? Math.round(100 * v) + "%" : v
                });
                return 1 === hsla[3] && (hsla.pop(),
                prefix = "hsl("),
                prefix + hsla.join() + ")"
            },
            toHexString: function(includeAlpha) {
                var rgba = this._rgba.slice()
                  , alpha = rgba.pop();
                return includeAlpha && rgba.push(~~(255 * alpha)),
                "#" + jQuery.map(rgba, function(v) {
                    return 1 === (v = (v || 0).toString(16)).length ? "0" + v : v
                }).join("")
            },
            toString: function() {
                return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
            }
        })).parse.prototype = color.fn,
        spaces.hsla.to = function(l) {
            if (null == l[0] || null == l[1] || null == l[2])
                return [null, null, null, l[3]];
            var r = l[0] / 255
              , h = l[1] / 255
              , b = l[2] / 255
              , a = l[3]
              , max = Math.max(r, h, b)
              , min = Math.min(r, h, b)
              , diff = max - min
              , s = max + min
              , l = .5 * s
              , h = min === max ? 0 : r === max ? 60 * (h - b) / diff + 360 : h === max ? 60 * (b - r) / diff + 120 : 60 * (r - h) / diff + 240
              , s = 0 == diff ? 0 : l <= .5 ? diff / s : diff / (2 - s);
            return [Math.round(h) % 360, s, l, null == a ? 1 : a]
        }
        ,
        spaces.hsla.from = function(a) {
            if (null == a[0] || null == a[1] || null == a[2])
                return [null, null, null, a[3]];
            var h = a[0] / 360
              , q = a[1]
              , p = a[2]
              , a = a[3]
              , q = p <= .5 ? p * (1 + q) : p + q - p * q
              , p = 2 * p - q;
            return [Math.round(255 * hue2rgb(p, q, h + 1 / 3)), Math.round(255 * hue2rgb(p, q, h)), Math.round(255 * hue2rgb(p, q, h - 1 / 3)), a]
        }
        ,
        each(spaces, function(spaceName, space) {
            var props = space.props
              , cache = space.cache
              , to = space.to
              , from = space.from;
            color.fn[spaceName] = function(value) {
                if (to && !this[cache] && (this[cache] = to(this._rgba)),
                void 0 === value)
                    return this[cache].slice();
                var ret, type = jQuery.type(value), arr = "array" === type || "object" === type ? value : arguments, local = this[cache].slice();
                return each(props, function(val, prop) {
                    val = arr["object" === type ? val : prop.idx];
                    null == val && (val = local[prop.idx]),
                    local[prop.idx] = clamp(val, prop)
                }),
                from ? ((ret = color(from(local)))[cache] = local,
                ret) : color(local)
            }
            ,
            each(props, function(key, prop) {
                color.fn[key] || (color.fn[key] = function(value) {
                    var match, vtype = jQuery.type(value), fn = "alpha" === key ? this._hsla ? "hsla" : "rgba" : spaceName, local = this[fn](), cur = local[prop.idx];
                    return "undefined" === vtype ? cur : ("function" === vtype && (value = value.call(this, cur),
                    vtype = jQuery.type(value)),
                    null == value && prop.empty ? this : ("string" === vtype && (match = rplusequals.exec(value)) && (value = cur + parseFloat(match[2]) * ("+" === match[1] ? 1 : -1)),
                    local[prop.idx] = value,
                    this[fn](local)))
                }
                )
            })
        }),
        (color.hook = function(hooks) {
            hooks = hooks.split(" ");
            each(hooks, function(i, hook) {
                jQuery.cssHooks[hook] = {
                    set: function(elem, value) {
                        var parsed, curElem, backgroundColor = "";
                        if ("transparent" !== value && ("string" !== jQuery.type(value) || (parsed = stringParse(value)))) {
                            if (value = color(parsed || value),
                            !support.rgba && 1 !== value._rgba[3]) {
                                for (curElem = "backgroundColor" === hook ? elem.parentNode : elem; ("" === backgroundColor || "transparent" === backgroundColor) && curElem && curElem.style; )
                                    try {
                                        backgroundColor = jQuery.css(curElem, "backgroundColor"),
                                        curElem = curElem.parentNode
                                    } catch (e) {}
                                value = value.blend(backgroundColor && "transparent" !== backgroundColor ? backgroundColor : "_default")
                            }
                            value = value.toRgbaString()
                        }
                        try {
                            elem.style[hook] = value
                        } catch (e) {}
                    }
                },
                jQuery.fx.step[hook] = function(fx) {
                    fx.colorInit || (fx.start = color(fx.elem, hook),
                    fx.end = color(fx.end),
                    fx.colorInit = !0),
                    jQuery.cssHooks[hook].set(fx.elem, fx.start.transition(fx.end, fx.pos))
                }
            })
        }
        )("backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor"),
        jQuery.cssHooks.borderColor = {
            expand: function(value) {
                var expanded = {};
                return each(["Top", "Right", "Bottom", "Left"], function(i, part) {
                    expanded["border" + part + "Color"] = value
                }),
                expanded
            }
        },
        colors = jQuery.Color.names = {
            aqua: "#00ffff",
            black: "#000000",
            blue: "#0000ff",
            fuchsia: "#ff00ff",
            gray: "#808080",
            green: "#008000",
            lime: "#00ff00",
            maroon: "#800000",
            navy: "#000080",
            olive: "#808000",
            purple: "#800080",
            red: "#ff0000",
            silver: "#c0c0c0",
            teal: "#008080",
            white: "#ffffff",
            yellow: "#ffff00",
            transparent: [null, null, null, 0],
            _default: "#ffffff"
        }
    }(jQuery),
    classAnimationActions = ["add", "remove", "toggle"],
    shorthandStyles = {
        border: 1,
        borderBottom: 1,
        borderColor: 1,
        borderLeft: 1,
        borderRight: 1,
        borderTop: 1,
        borderWidth: 1,
        margin: 1,
        padding: 1
    },
    $.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(_, prop) {
        $.fx.step[prop] = function(fx) {
            ("none" !== fx.end && !fx.setAttr || 1 === fx.pos && !fx.setAttr) && (jQuery.style(fx.elem, prop, fx.end),
            fx.setAttr = !0)
        }
    }),
    $.fn.addBack || ($.fn.addBack = function(selector) {
        return this.add(null == selector ? this.prevObject : this.prevObject.filter(selector))
    }
    ),
    $.effects.animateClass = function(value, duration, easing, callback) {
        var o = $.speed(duration, easing, callback);
        return this.queue(function() {
            var animated = $(this)
              , baseClass = animated.attr("class") || ""
              , allAnimations = (allAnimations = o.children ? animated.find("*").addBack() : animated).map(function() {
                return {
                    el: $(this),
                    start: getElementStyles(this)
                }
            })
              , applyClassChange = function() {
                $.each(classAnimationActions, function(i, action) {
                    value[action] && animated[action + "Class"](value[action])
                })
            };
            applyClassChange(),
            allAnimations = allAnimations.map(function() {
                return this.end = getElementStyles(this.el[0]),
                this.diff = function(oldStyle, newStyle) {
                    var name, value, diff = {};
                    for (name in newStyle)
                        value = newStyle[name],
                        oldStyle[name] !== value && (shorthandStyles[name] || !$.fx.step[name] && isNaN(parseFloat(value)) || (diff[name] = value));
                    return diff
                }(this.start, this.end),
                this
            }),
            animated.attr("class", baseClass),
            allAnimations = allAnimations.map(function() {
                var styleInfo = this
                  , dfd = $.Deferred()
                  , opts = $.extend({}, o, {
                    queue: !1,
                    complete: function() {
                        dfd.resolve(styleInfo)
                    }
                });
                return this.el.animate(this.diff, opts),
                dfd.promise()
            }),
            $.when.apply($, allAnimations.get()).done(function() {
                applyClassChange(),
                $.each(arguments, function() {
                    var el = this.el;
                    $.each(this.diff, function(key) {
                        el.css(key, "")
                    })
                }),
                o.complete.call(animated[0])
            })
        })
    }
    ,
    $.fn.extend({
        addClass: (orig = $.fn.addClass,
        function(classNames, speed, easing, callback) {
            return speed ? $.effects.animateClass.call(this, {
                add: classNames
            }, speed, easing, callback) : orig.apply(this, arguments)
        }
        ),
        removeClass: function(orig) {
            return function(classNames, speed, easing, callback) {
                return 1 < arguments.length ? $.effects.animateClass.call(this, {
                    remove: classNames
                }, speed, easing, callback) : orig.apply(this, arguments)
            }
        }($.fn.removeClass),
        toggleClass: function(orig) {
            return function(classNames, force, speed, easing, callback) {
                return "boolean" == typeof force || void 0 === force ? speed ? $.effects.animateClass.call(this, force ? {
                    add: classNames
                } : {
                    remove: classNames
                }, speed, easing, callback) : orig.apply(this, arguments) : $.effects.animateClass.call(this, {
                    toggle: classNames
                }, force, speed, easing)
            }
        }($.fn.toggleClass),
        switchClass: function(remove, add, speed, easing, callback) {
            return $.effects.animateClass.call(this, {
                add: add,
                remove: remove
            }, speed, easing, callback)
        }
    }),
    function() {
        function _normalizeArguments(effect, options, speed, callback) {
            return effect = {
                effect: effect = $.isPlainObject(effect) ? (options = effect).effect : effect
            },
            $.isFunction(options = null == options ? {} : options) && (callback = options,
            speed = null,
            options = {}),
            "number" != typeof options && !$.fx.speeds[options] || (callback = speed,
            speed = options,
            options = {}),
            $.isFunction(speed) && (callback = speed,
            speed = null),
            options && $.extend(effect, options),
            speed = speed || options.duration,
            effect.duration = $.fx.off ? 0 : "number" == typeof speed ? speed : speed in $.fx.speeds ? $.fx.speeds[speed] : $.fx.speeds._default,
            effect.complete = callback || options.complete,
            effect
        }
        function standardAnimationOption(option) {
            return !option || "number" == typeof option || $.fx.speeds[option] || ("string" == typeof option && !$.effects.effect[option] || ($.isFunction(option) || "object" == typeof option && !option.effect))
        }
        var orig;
        $.extend($.effects, {
            version: "1.10.4",
            save: function(element, set) {
                for (var i = 0; i < set.length; i++)
                    null !== set[i] && element.data("ui-effects-" + set[i], element[0].style[set[i]])
            },
            restore: function(element, set) {
                for (var val, i = 0; i < set.length; i++)
                    null !== set[i] && (void 0 === (val = element.data("ui-effects-" + set[i])) && (val = ""),
                    element.css(set[i], val))
            },
            setMode: function(el, mode) {
                return mode = "toggle" === mode ? el.is(":hidden") ? "show" : "hide" : mode
            },
            getBaseline: function(origin, original) {
                var y, x;
                switch (origin[0]) {
                case "top":
                    y = 0;
                    break;
                case "middle":
                    y = .5;
                    break;
                case "bottom":
                    y = 1;
                    break;
                default:
                    y = origin[0] / original.height
                }
                switch (origin[1]) {
                case "left":
                    x = 0;
                    break;
                case "center":
                    x = .5;
                    break;
                case "right":
                    x = 1;
                    break;
                default:
                    x = origin[1] / original.width
                }
                return {
                    x: x,
                    y: y
                }
            },
            createWrapper: function(element) {
                if (element.parent().is(".ui-effects-wrapper"))
                    return element.parent();
                var props = {
                    width: element.outerWidth(!0),
                    height: element.outerHeight(!0),
                    float: element.css("float")
                }
                  , wrapper = $("<div></div>").addClass("ui-effects-wrapper").css({
                    fontSize: "100%",
                    background: "transparent",
                    border: "none",
                    margin: 0,
                    padding: 0
                })
                  , size = {
                    width: element.width(),
                    height: element.height()
                }
                  , active = document.activeElement;
                try {
                    active.id
                } catch (e) {
                    active = document.body
                }
                return element.wrap(wrapper),
                element[0] !== active && !$.contains(element[0], active) || $(active).focus(),
                wrapper = element.parent(),
                "static" === element.css("position") ? (wrapper.css({
                    position: "relative"
                }),
                element.css({
                    position: "relative"
                })) : ($.extend(props, {
                    position: element.css("position"),
                    zIndex: element.css("z-index")
                }),
                $.each(["top", "left", "bottom", "right"], function(i, pos) {
                    props[pos] = element.css(pos),
                    isNaN(parseInt(props[pos], 10)) && (props[pos] = "auto")
                }),
                element.css({
                    position: "relative",
                    top: 0,
                    left: 0,
                    right: "auto",
                    bottom: "auto"
                })),
                element.css(size),
                wrapper.css(props).show()
            },
            removeWrapper: function(element) {
                var active = document.activeElement;
                return element.parent().is(".ui-effects-wrapper") && (element.parent().replaceWith(element),
                element[0] !== active && !$.contains(element[0], active) || $(active).focus()),
                element
            },
            setTransition: function(element, list, factor, value) {
                return value = value || {},
                $.each(list, function(i, x) {
                    var unit = element.cssUnit(x);
                    0 < unit[0] && (value[x] = unit[0] * factor + unit[1])
                }),
                value
            }
        }),
        $.fn.extend({
            effect: function() {
                var args = _normalizeArguments.apply(this, arguments)
                  , mode = args.mode
                  , queue = args.queue
                  , effectMethod = $.effects.effect[args.effect];
                return $.fx.off || !effectMethod ? mode ? this[mode](args.duration, args.complete) : this.each(function() {
                    args.complete && args.complete.call(this)
                }) : !1 === queue ? this.each(run) : this.queue(queue || "fx", run);
                function run(next) {
                    var elem = $(this)
                      , complete = args.complete
                      , mode = args.mode;
                    function done() {
                        $.isFunction(complete) && complete.call(elem[0]),
                        $.isFunction(next) && next()
                    }
                    (elem.is(":hidden") ? "hide" === mode : "show" === mode) ? (elem[mode](),
                    done()) : effectMethod.call(elem[0], args, done)
                }
            },
            show: (orig = $.fn.show,
            function(option) {
                if (standardAnimationOption(option))
                    return orig.apply(this, arguments);
                var args = _normalizeArguments.apply(this, arguments);
                return args.mode = "show",
                this.effect.call(this, args)
            }
            ),
            hide: function(orig) {
                return function(option) {
                    if (standardAnimationOption(option))
                        return orig.apply(this, arguments);
                    var args = _normalizeArguments.apply(this, arguments);
                    return args.mode = "hide",
                    this.effect.call(this, args)
                }
            }($.fn.hide),
            toggle: function(orig) {
                return function(option) {
                    if (standardAnimationOption(option) || "boolean" == typeof option)
                        return orig.apply(this, arguments);
                    var args = _normalizeArguments.apply(this, arguments);
                    return args.mode = "toggle",
                    this.effect.call(this, args)
                }
            }($.fn.toggle),
            cssUnit: function(key) {
                var style = this.css(key)
                  , val = [];
                return $.each(["em", "px", "%", "pt"], function(i, unit) {
                    0 < style.indexOf(unit) && (val = [parseFloat(style), unit])
                }),
                val
            }
        })
    }(),
    baseEasings = {},
    $.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(i, name) {
        baseEasings[name] = function(p) {
            return Math.pow(p, i + 2)
        }
    }),
    $.extend(baseEasings, {
        Sine: function(p) {
            return 1 - Math.cos(p * Math.PI / 2)
        },
        Circ: function(p) {
            return 1 - Math.sqrt(1 - p * p)
        },
        Elastic: function(p) {
            return 0 === p || 1 === p ? p : -Math.pow(2, 8 * (p - 1)) * Math.sin((80 * (p - 1) - 7.5) * Math.PI / 15)
        },
        Back: function(p) {
            return p * p * (3 * p - 2)
        },
        Bounce: function(p) {
            for (var pow2, bounce = 4; p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11; )
                ;
            return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((3 * pow2 - 2) / 22 - p, 2)
        }
    }),
    $.each(baseEasings, function(name, easeIn) {
        $.easing["easeIn" + name] = easeIn,
        $.easing["easeOut" + name] = function(p) {
            return 1 - easeIn(1 - p)
        }
        ,
        $.easing["easeInOut" + name] = function(p) {
            return p < .5 ? easeIn(2 * p) / 2 : 1 - easeIn(-2 * p + 2) / 2
        }
    })
}(jQuery),
function($) {
    var uid = 0
      , hideProps = {}
      , showProps = {};
    hideProps.height = hideProps.paddingTop = hideProps.paddingBottom = hideProps.borderTopWidth = hideProps.borderBottomWidth = "hide",
    showProps.height = showProps.paddingTop = showProps.paddingBottom = showProps.borderTopWidth = showProps.borderBottomWidth = "show",
    $.widget("ui.accordion", {
        version: "1.10.4",
        options: {
            active: 0,
            animate: {},
            collapsible: !1,
            event: "click",
            header: "> li > :first-child,> :not(li):even",
            heightStyle: "auto",
            icons: {
                activeHeader: "ui-icon-triangle-1-s",
                header: "ui-icon-triangle-1-e"
            },
            activate: null,
            beforeActivate: null
        },
        _create: function() {
            var options = this.options;
            this.prevShow = this.prevHide = $(),
            this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"),
            options.collapsible || !1 !== options.active && null != options.active || (options.active = 0),
            this._processPanels(),
            options.active < 0 && (options.active += this.headers.length),
            this._refresh()
        },
        _getCreateEventData: function() {
            return {
                header: this.active,
                panel: this.active.length ? this.active.next() : $(),
                content: this.active.length ? this.active.next() : $()
            }
        },
        _createIcons: function() {
            var icons = this.options.icons;
            icons && ($("<span>").addClass("ui-accordion-header-icon ui-icon " + icons.header).prependTo(this.headers),
            this.active.children(".ui-accordion-header-icon").removeClass(icons.header).addClass(icons.activeHeader),
            this.headers.addClass("ui-accordion-icons"))
        },
        _destroyIcons: function() {
            this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
        },
        _destroy: function() {
            var contents;
            this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),
            this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function() {
                /^ui-accordion/.test(this.id) && this.removeAttribute("id")
            }),
            this._destroyIcons(),
            contents = this.headers.next().css("display", "").removeAttr("role").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function() {
                /^ui-accordion/.test(this.id) && this.removeAttribute("id")
            }),
            "content" !== this.options.heightStyle && contents.css("height", "")
        },
        _setOption: function(key, value) {
            "active" !== key ? ("event" === key && (this.options.event && this._off(this.headers, this.options.event),
            this._setupEvents(value)),
            this._super(key, value),
            "collapsible" !== key || value || !1 !== this.options.active || this._activate(0),
            "icons" === key && (this._destroyIcons(),
            value && this._createIcons()),
            "disabled" === key && this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!value)) : this._activate(value)
        },
        _keydown: function(event) {
            if (!event.altKey && !event.ctrlKey) {
                var keyCode = $.ui.keyCode
                  , length = this.headers.length
                  , currentIndex = this.headers.index(event.target)
                  , toFocus = !1;
                switch (event.keyCode) {
                case keyCode.RIGHT:
                case keyCode.DOWN:
                    toFocus = this.headers[(currentIndex + 1) % length];
                    break;
                case keyCode.LEFT:
                case keyCode.UP:
                    toFocus = this.headers[(currentIndex - 1 + length) % length];
                    break;
                case keyCode.SPACE:
                case keyCode.ENTER:
                    this._eventHandler(event);
                    break;
                case keyCode.HOME:
                    toFocus = this.headers[0];
                    break;
                case keyCode.END:
                    toFocus = this.headers[length - 1]
                }
                toFocus && ($(event.target).attr("tabIndex", -1),
                $(toFocus).attr("tabIndex", 0),
                toFocus.focus(),
                event.preventDefault())
            }
        },
        _panelKeyDown: function(event) {
            event.keyCode === $.ui.keyCode.UP && event.ctrlKey && $(event.currentTarget).prev().focus()
        },
        refresh: function() {
            var options = this.options;
            this._processPanels(),
            !1 === options.active && !0 === options.collapsible || !this.headers.length ? (options.active = !1,
            this.active = $()) : !1 === options.active ? this._activate(0) : this.active.length && !$.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (options.active = !1,
            this.active = $()) : this._activate(Math.max(0, options.active - 1)) : options.active = this.headers.index(this.active),
            this._destroyIcons(),
            this._refresh()
        },
        _processPanels: function() {
            this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"),
            this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()
        },
        _refresh: function() {
            var maxHeight, options = this.options, heightStyle = options.heightStyle, parent = this.element.parent(), accordionId = this.accordionId = "ui-accordion-" + (this.element.attr("id") || ++uid);
            this.active = this._findActive(options.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"),
            this.active.next().addClass("ui-accordion-content-active").show(),
            this.headers.attr("role", "tab").each(function(i) {
                var header = $(this)
                  , headerId = header.attr("id")
                  , panel = header.next()
                  , panelId = panel.attr("id");
                headerId || header.attr("id", headerId = accordionId + "-header-" + i),
                panelId || panel.attr("id", panelId = accordionId + "-panel-" + i),
                header.attr("aria-controls", panelId),
                panel.attr("aria-labelledby", headerId)
            }).next().attr("role", "tabpanel"),
            this.headers.not(this.active).attr({
                "aria-selected": "false",
                "aria-expanded": "false",
                tabIndex: -1
            }).next().attr({
                "aria-hidden": "true"
            }).hide(),
            this.active.length ? this.active.attr({
                "aria-selected": "true",
                "aria-expanded": "true",
                tabIndex: 0
            }).next().attr({
                "aria-hidden": "false"
            }) : this.headers.eq(0).attr("tabIndex", 0),
            this._createIcons(),
            this._setupEvents(options.event),
            "fill" === heightStyle ? (maxHeight = parent.height(),
            this.element.siblings(":visible").each(function() {
                var elem = $(this)
                  , position = elem.css("position");
                "absolute" !== position && "fixed" !== position && (maxHeight -= elem.outerHeight(!0))
            }),
            this.headers.each(function() {
                maxHeight -= $(this).outerHeight(!0)
            }),
            this.headers.next().each(function() {
                $(this).height(Math.max(0, maxHeight - $(this).innerHeight() + $(this).height()))
            }).css("overflow", "auto")) : "auto" === heightStyle && (maxHeight = 0,
            this.headers.next().each(function() {
                maxHeight = Math.max(maxHeight, $(this).css("height", "").height())
            }).height(maxHeight))
        },
        _activate: function(active) {
            active = this._findActive(active)[0];
            active !== this.active[0] && (active = active || this.active[0],
            this._eventHandler({
                target: active,
                currentTarget: active,
                preventDefault: $.noop
            }))
        },
        _findActive: function(selector) {
            return "number" == typeof selector ? this.headers.eq(selector) : $()
        },
        _setupEvents: function(event) {
            var events = {
                keydown: "_keydown"
            };
            event && $.each(event.split(" "), function(index, eventName) {
                events[eventName] = "_eventHandler"
            }),
            this._off(this.headers.add(this.headers.next())),
            this._on(this.headers, events),
            this._on(this.headers.next(), {
                keydown: "_panelKeyDown"
            }),
            this._hoverable(this.headers),
            this._focusable(this.headers)
        },
        _eventHandler: function(event) {
            var options = this.options
              , active = this.active
              , clicked = $(event.currentTarget)
              , clickedIsActive = clicked[0] === active[0]
              , collapsing = clickedIsActive && options.collapsible
              , eventData = collapsing ? $() : clicked.next()
              , toHide = active.next()
              , eventData = {
                oldHeader: active,
                oldPanel: toHide,
                newHeader: collapsing ? $() : clicked,
                newPanel: eventData
            };
            event.preventDefault(),
            clickedIsActive && !options.collapsible || !1 === this._trigger("beforeActivate", event, eventData) || (options.active = !collapsing && this.headers.index(clicked),
            this.active = clickedIsActive ? $() : clicked,
            this._toggle(eventData),
            active.removeClass("ui-accordion-header-active ui-state-active"),
            options.icons && active.children(".ui-accordion-header-icon").removeClass(options.icons.activeHeader).addClass(options.icons.header),
            clickedIsActive || (clicked.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"),
            options.icons && clicked.children(".ui-accordion-header-icon").removeClass(options.icons.header).addClass(options.icons.activeHeader),
            clicked.next().addClass("ui-accordion-content-active")))
        },
        _toggle: function(data) {
            var toShow = data.newPanel
              , toHide = this.prevShow.length ? this.prevShow : data.oldPanel;
            this.prevShow.add(this.prevHide).stop(!0, !0),
            this.prevShow = toShow,
            this.prevHide = toHide,
            this.options.animate ? this._animate(toShow, toHide, data) : (toHide.hide(),
            toShow.show(),
            this._toggleComplete(data)),
            toHide.attr({
                "aria-hidden": "true"
            }),
            toHide.prev().attr("aria-selected", "false"),
            toShow.length && toHide.length ? toHide.prev().attr({
                tabIndex: -1,
                "aria-expanded": "false"
            }) : toShow.length && this.headers.filter(function() {
                return 0 === $(this).attr("tabIndex")
            }).attr("tabIndex", -1),
            toShow.attr("aria-hidden", "false").prev().attr({
                "aria-selected": "true",
                tabIndex: 0,
                "aria-expanded": "true"
            })
        },
        _animate: function(toShow, toHide, data) {
            var total, easing, duration, that = this, adjust = 0, complete = toShow.length && (!toHide.length || toShow.index() < toHide.index()), animate = this.options.animate || {}, options = complete && animate.down || animate, complete = function() {
                that._toggleComplete(data)
            };
            return easing = (easing = "string" == typeof options ? options : easing) || options.easing || animate.easing,
            duration = (duration = "number" == typeof options ? options : duration) || options.duration || animate.duration,
            toHide.length ? toShow.length ? (total = toShow.show().outerHeight(),
            toHide.animate(hideProps, {
                duration: duration,
                easing: easing,
                step: function(now, fx) {
                    fx.now = Math.round(now)
                }
            }),
            void toShow.hide().animate(showProps, {
                duration: duration,
                easing: easing,
                complete: complete,
                step: function(now, fx) {
                    fx.now = Math.round(now),
                    "height" !== fx.prop ? adjust += fx.now : "content" !== that.options.heightStyle && (fx.now = Math.round(total - toHide.outerHeight() - adjust),
                    adjust = 0)
                }
            })) : toHide.animate(hideProps, duration, easing, complete) : toShow.animate(showProps, duration, easing, complete)
        },
        _toggleComplete: function(data) {
            var toHide = data.oldPanel;
            toHide.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"),
            toHide.length && (toHide.parent()[0].className = toHide.parent()[0].className),
            this._trigger("activate", null, data)
        }
    })
}(jQuery),
function($) {
    $.widget("ui.autocomplete", {
        version: "1.10.4",
        defaultElement: "<input>",
        options: {
            appendTo: null,
            autoFocus: !1,
            delay: 300,
            minLength: 1,
            position: {
                my: "left top",
                at: "left bottom",
                collision: "none"
            },
            source: null,
            change: null,
            close: null,
            focus: null,
            open: null,
            response: null,
            search: null,
            select: null
        },
        requestIndex: 0,
        pending: 0,
        _create: function() {
            var suppressKeyPress, suppressKeyPressRepeat, suppressInput, isInput = this.element[0].nodeName.toLowerCase(), isTextarea = "textarea" === isInput, isInput = "input" === isInput;
            this.isMultiLine = isTextarea || !isInput && this.element.prop("isContentEditable"),
            this.valueMethod = this.element[isTextarea || isInput ? "val" : "text"],
            this.isNewMenu = !0,
            this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"),
            this._on(this.element, {
                keydown: function(event) {
                    if (this.element.prop("readOnly"))
                        suppressKeyPressRepeat = suppressInput = suppressKeyPress = !0;
                    else {
                        suppressKeyPressRepeat = suppressInput = suppressKeyPress = !1;
                        var keyCode = $.ui.keyCode;
                        switch (event.keyCode) {
                        case keyCode.PAGE_UP:
                            suppressKeyPress = !0,
                            this._move("previousPage", event);
                            break;
                        case keyCode.PAGE_DOWN:
                            suppressKeyPress = !0,
                            this._move("nextPage", event);
                            break;
                        case keyCode.UP:
                            suppressKeyPress = !0,
                            this._keyEvent("previous", event);
                            break;
                        case keyCode.DOWN:
                            suppressKeyPress = !0,
                            this._keyEvent("next", event);
                            break;
                        case keyCode.ENTER:
                        case keyCode.NUMPAD_ENTER:
                            this.menu.active && (suppressKeyPress = !0,
                            event.preventDefault(),
                            this.menu.select(event));
                            break;
                        case keyCode.TAB:
                            this.menu.active && this.menu.select(event);
                            break;
                        case keyCode.ESCAPE:
                            this.menu.element.is(":visible") && (this._value(this.term),
                            this.close(event),
                            event.preventDefault());
                            break;
                        default:
                            suppressKeyPressRepeat = !0,
                            this._searchTimeout(event)
                        }
                    }
                },
                keypress: function(event) {
                    if (suppressKeyPress)
                        return suppressKeyPress = !1,
                        void (this.isMultiLine && !this.menu.element.is(":visible") || event.preventDefault());
                    if (!suppressKeyPressRepeat) {
                        var keyCode = $.ui.keyCode;
                        switch (event.keyCode) {
                        case keyCode.PAGE_UP:
                            this._move("previousPage", event);
                            break;
                        case keyCode.PAGE_DOWN:
                            this._move("nextPage", event);
                            break;
                        case keyCode.UP:
                            this._keyEvent("previous", event);
                            break;
                        case keyCode.DOWN:
                            this._keyEvent("next", event)
                        }
                    }
                },
                input: function(event) {
                    if (suppressInput)
                        return suppressInput = !1,
                        void event.preventDefault();
                    this._searchTimeout(event)
                },
                focus: function() {
                    this.selectedItem = null,
                    this.previous = this._value()
                },
                blur: function(event) {
                    this.cancelBlur ? delete this.cancelBlur : (clearTimeout(this.searching),
                    this.close(event),
                    this._change(event))
                }
            }),
            this._initSource(),
            this.menu = $("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                role: null
            }).hide().data("ui-menu"),
            this._on(this.menu.element, {
                mousedown: function(event) {
                    event.preventDefault(),
                    this.cancelBlur = !0,
                    this._delay(function() {
                        delete this.cancelBlur
                    });
                    var menuElement = this.menu.element[0];
                    $(event.target).closest(".ui-menu-item").length || this._delay(function() {
                        var that = this;
                        this.document.one("mousedown", function(event) {
                            event.target === that.element[0] || event.target === menuElement || $.contains(menuElement, event.target) || that.close()
                        })
                    })
                },
                menufocus: function(event, item) {
                    if (this.isNewMenu && (this.isNewMenu = !1,
                    event.originalEvent && /^mouse/.test(event.originalEvent.type)))
                        return this.menu.blur(),
                        void this.document.one("mousemove", function() {
                            $(event.target).trigger(event.originalEvent)
                        });
                    item = item.item.data("ui-autocomplete-item");
                    !1 !== this._trigger("focus", event, {
                        item: item
                    }) ? event.originalEvent && /^key/.test(event.originalEvent.type) && this._value(item.value) : this.liveRegion.text(item.value)
                },
                menuselect: function(event, ui) {
                    var item = ui.item.data("ui-autocomplete-item")
                      , previous = this.previous;
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(),
                    this.previous = previous,
                    this._delay(function() {
                        this.previous = previous,
                        this.selectedItem = item
                    })),
                    !1 !== this._trigger("select", event, {
                        item: item
                    }) && this._value(item.value),
                    this.term = this._value(),
                    this.close(event),
                    this.selectedItem = item
                }
            }),
            this.liveRegion = $("<span>", {
                role: "status",
                "aria-live": "polite"
            }).addClass("ui-helper-hidden-accessible").insertBefore(this.element),
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _destroy: function() {
            clearTimeout(this.searching),
            this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"),
            this.menu.element.remove(),
            this.liveRegion.remove()
        },
        _setOption: function(key, value) {
            this._super(key, value),
            "source" === key && this._initSource(),
            "appendTo" === key && this.menu.element.appendTo(this._appendTo()),
            "disabled" === key && value && this.xhr && this.xhr.abort()
        },
        _appendTo: function() {
            var element = this.options.appendTo;
            return element = !(element = (element = element && (element.jquery || element.nodeType ? $(element) : this.document.find(element).eq(0))) || this.element.closest(".ui-front")).length ? this.document[0].body : element
        },
        _initSource: function() {
            var array, url, that = this;
            $.isArray(this.options.source) ? (array = this.options.source,
            this.source = function(request, response) {
                response($.ui.autocomplete.filter(array, request.term))
            }
            ) : "string" == typeof this.options.source ? (url = this.options.source,
            this.source = function(request, response) {
                that.xhr && that.xhr.abort(),
                that.xhr = $.ajax({
                    url: url,
                    data: request,
                    dataType: "json",
                    success: function(data) {
                        response(data)
                    },
                    error: function() {
                        response([])
                    }
                })
            }
            ) : this.source = this.options.source
        },
        _searchTimeout: function(event) {
            clearTimeout(this.searching),
            this.searching = this._delay(function() {
                this.term !== this._value() && (this.selectedItem = null,
                this.search(null, event))
            }, this.options.delay)
        },
        search: function(value, event) {
            return value = null != value ? value : this._value(),
            this.term = this._value(),
            value.length < this.options.minLength ? this.close(event) : !1 !== this._trigger("search", event) ? this._search(value) : void 0
        },
        _search: function(value) {
            this.pending++,
            this.element.addClass("ui-autocomplete-loading"),
            this.cancelSearch = !1,
            this.source({
                term: value
            }, this._response())
        },
        _response: function() {
            var index = ++this.requestIndex;
            return $.proxy(function(content) {
                index === this.requestIndex && this.__response(content),
                this.pending--,
                this.pending || this.element.removeClass("ui-autocomplete-loading")
            }, this)
        },
        __response: function(content) {
            content = content && this._normalize(content),
            this._trigger("response", null, {
                content: content
            }),
            !this.options.disabled && content && content.length && !this.cancelSearch ? (this._suggest(content),
            this._trigger("open")) : this._close()
        },
        close: function(event) {
            this.cancelSearch = !0,
            this._close(event)
        },
        _close: function(event) {
            this.menu.element.is(":visible") && (this.menu.element.hide(),
            this.menu.blur(),
            this.isNewMenu = !0,
            this._trigger("close", event))
        },
        _change: function(event) {
            this.previous !== this._value() && this._trigger("change", event, {
                item: this.selectedItem
            })
        },
        _normalize: function(items) {
            return items.length && items[0].label && items[0].value ? items : $.map(items, function(item) {
                return "string" == typeof item ? {
                    label: item,
                    value: item
                } : $.extend({
                    label: item.label || item.value,
                    value: item.value || item.label
                }, item)
            })
        },
        _suggest: function(items) {
            var ul = this.menu.element.empty();
            this._renderMenu(ul, items),
            this.isNewMenu = !0,
            this.menu.refresh(),
            ul.show(),
            this._resizeMenu(),
            ul.position($.extend({
                of: this.element
            }, this.options.position)),
            this.options.autoFocus && this.menu.next()
        },
        _resizeMenu: function() {
            var ul = this.menu.element;
            ul.outerWidth(Math.max(ul.width("").outerWidth() + 1, this.element.outerWidth()))
        },
        _renderMenu: function(ul, items) {
            var that = this;
            $.each(items, function(index, item) {
                that._renderItemData(ul, item)
            })
        },
        _renderItemData: function(ul, item) {
            return this._renderItem(ul, item).data("ui-autocomplete-item", item)
        },
        _renderItem: function(ul, item) {
            return $("<li>").append($("<a>").text(item.label)).appendTo(ul)
        },
        _move: function(direction, event) {
            if (this.menu.element.is(":visible"))
                return this.menu.isFirstItem() && /^previous/.test(direction) || this.menu.isLastItem() && /^next/.test(direction) ? (this._value(this.term),
                void this.menu.blur()) : void this.menu[direction](event);
            this.search(null, event)
        },
        widget: function() {
            return this.menu.element
        },
        _value: function() {
            return this.valueMethod.apply(this.element, arguments)
        },
        _keyEvent: function(keyEvent, event) {
            this.isMultiLine && !this.menu.element.is(":visible") || (this._move(keyEvent, event),
            event.preventDefault())
        }
    }),
    $.extend($.ui.autocomplete, {
        escapeRegex: function(value) {
            return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function(array, term) {
            var matcher = new RegExp($.ui.autocomplete.escapeRegex(term),"i");
            return $.grep(array, function(value) {
                return matcher.test(value.label || value.value || value)
            })
        }
    }),
    $.widget("ui.autocomplete", $.ui.autocomplete, {
        options: {
            messages: {
                noResults: "No search results.",
                results: function(amount) {
                    return amount + (1 < amount ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                }
            }
        },
        __response: function(content) {
            var message;
            this._superApply(arguments),
            this.options.disabled || this.cancelSearch || (message = content && content.length ? this.options.messages.results(content.length) : this.options.messages.noResults,
            this.liveRegion.text(message))
        }
    })
}(jQuery),
function($) {
    function formResetHandler() {
        var form = $(this);
        setTimeout(function() {
            form.find(":ui-button").button("refresh")
        }, 1)
    }
    function radioGroup(radio) {
        var name = radio.name
          , form = radio.form
          , radios = $([]);
        return name && (name = name.replace(/'/g, "\\'"),
        radios = form ? $(form).find("[name='" + name + "']") : $("[name='" + name + "']", radio.ownerDocument).filter(function() {
            return !this.form
        })),
        radios
    }
    var lastActive, baseClasses = "ui-button ui-widget ui-state-default ui-corner-all", typeClasses = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only";
    $.widget("ui.button", {
        version: "1.10.4",
        defaultElement: "<button>",
        options: {
            disabled: null,
            text: !0,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, formResetHandler),
            "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled),
            this._determineButtonType(),
            this.hasTitle = !!this.buttonElement.attr("title");
            var that = this
              , options = this.options
              , toggleButton = "checkbox" === this.type || "radio" === this.type
              , activeClass = toggleButton ? "" : "ui-state-active";
            null === options.label && (options.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()),
            this._hoverable(this.buttonElement),
            this.buttonElement.addClass(baseClasses).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
                options.disabled || this === lastActive && $(this).addClass("ui-state-active")
            }).bind("mouseleave" + this.eventNamespace, function() {
                options.disabled || $(this).removeClass(activeClass)
            }).bind("click" + this.eventNamespace, function(event) {
                options.disabled && (event.preventDefault(),
                event.stopImmediatePropagation())
            }),
            this._on({
                focus: function() {
                    this.buttonElement.addClass("ui-state-focus")
                },
                blur: function() {
                    this.buttonElement.removeClass("ui-state-focus")
                }
            }),
            toggleButton && this.element.bind("change" + this.eventNamespace, function() {
                that.refresh()
            }),
            "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                if (options.disabled)
                    return !1
            }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                if (options.disabled)
                    return !1;
                $(this).addClass("ui-state-active"),
                that.buttonElement.attr("aria-pressed", "true");
                var radio = that.element[0];
                radioGroup(radio).not(radio).map(function() {
                    return $(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
                return !options.disabled && ($(this).addClass("ui-state-active"),
                lastActive = this,
                void that.document.one("mouseup", function() {
                    lastActive = null
                }))
            }).bind("mouseup" + this.eventNamespace, function() {
                return !options.disabled && void $(this).removeClass("ui-state-active")
            }).bind("keydown" + this.eventNamespace, function(event) {
                return !options.disabled && void (event.keyCode !== $.ui.keyCode.SPACE && event.keyCode !== $.ui.keyCode.ENTER || $(this).addClass("ui-state-active"))
            }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
                $(this).removeClass("ui-state-active")
            }),
            this.buttonElement.is("a") && this.buttonElement.keyup(function(event) {
                event.keyCode === $.ui.keyCode.SPACE && $(this).click()
            })),
            this._setOption("disabled", options.disabled),
            this._resetButton()
        },
        _determineButtonType: function() {
            var ancestor, checked;
            this.element.is("[type=checkbox]") ? this.type = "checkbox" : this.element.is("[type=radio]") ? this.type = "radio" : this.element.is("input") ? this.type = "input" : this.type = "button",
            "checkbox" === this.type || "radio" === this.type ? (ancestor = this.element.parents().last(),
            checked = "label[for='" + this.element.attr("id") + "']",
            this.buttonElement = ancestor.find(checked),
            this.buttonElement.length || (ancestor = (ancestor.length ? ancestor : this.element).siblings(),
            this.buttonElement = ancestor.filter(checked),
            this.buttonElement.length || (this.buttonElement = ancestor.find(checked))),
            this.element.addClass("ui-helper-hidden-accessible"),
            (checked = this.element.is(":checked")) && this.buttonElement.addClass("ui-state-active"),
            this.buttonElement.prop("aria-pressed", checked)) : this.buttonElement = this.element
        },
        widget: function() {
            return this.buttonElement
        },
        _destroy: function() {
            this.element.removeClass("ui-helper-hidden-accessible"),
            this.buttonElement.removeClass(baseClasses + " ui-state-active " + typeClasses).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),
            this.hasTitle || this.buttonElement.removeAttr("title")
        },
        _setOption: function(key, value) {
            if (this._super(key, value),
            "disabled" === key)
                return this.element.prop("disabled", !!value),
                void (value && this.buttonElement.removeClass("ui-state-focus"));
            this._resetButton()
        },
        refresh: function() {
            var isDisabled = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            isDisabled !== this.options.disabled && this._setOption("disabled", isDisabled),
            "radio" === this.type ? radioGroup(this.element[0]).each(function() {
                $(this).is(":checked") ? $(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : $(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
            }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
        },
        _resetButton: function() {
            var buttonElement, buttonText, icons, multipleIcons, buttonClasses;
            "input" !== this.type ? (buttonElement = this.buttonElement.removeClass(typeClasses),
            buttonText = $("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(buttonElement.empty()).text(),
            multipleIcons = (icons = this.options.icons).primary && icons.secondary,
            buttonClasses = [],
            icons.primary || icons.secondary ? (this.options.text && buttonClasses.push("ui-button-text-icon" + (multipleIcons ? "s" : icons.primary ? "-primary" : "-secondary")),
            icons.primary && buttonElement.prepend("<span class='ui-button-icon-primary ui-icon " + icons.primary + "'></span>"),
            icons.secondary && buttonElement.append("<span class='ui-button-icon-secondary ui-icon " + icons.secondary + "'></span>"),
            this.options.text || (buttonClasses.push(multipleIcons ? "ui-button-icons-only" : "ui-button-icon-only"),
            this.hasTitle || buttonElement.attr("title", $.trim(buttonText)))) : buttonClasses.push("ui-button-text-only"),
            buttonElement.addClass(buttonClasses.join(" "))) : this.options.label && this.element.val(this.options.label)
        }
    }),
    $.widget("ui.buttonset", {
        version: "1.10.4",
        options: {
            items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
        },
        _create: function() {
            this.element.addClass("ui-buttonset")
        },
        _init: function() {
            this.refresh()
        },
        _setOption: function(key, value) {
            "disabled" === key && this.buttons.button("option", key, value),
            this._super(key, value)
        },
        refresh: function() {
            var rtl = "rtl" === this.element.css("direction");
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                return $(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(rtl ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(rtl ? "ui-corner-left" : "ui-corner-right").end().end()
        },
        _destroy: function() {
            this.element.removeClass("ui-buttonset"),
            this.buttons.map(function() {
                return $(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }
    })
}(jQuery),
function($) {
    $.extend($.ui, {
        datepicker: {
            version: "1.10.4"
        }
    });
    var instActive, PROP_NAME = "datepicker";
    function Datepicker() {
        this._curInst = null,
        this._keyEvent = !1,
        this._disabledInputs = [],
        this._datepickerShowing = !1,
        this._inDialog = !1,
        this._mainDivId = "ui-datepicker-div",
        this._inlineClass = "ui-datepicker-inline",
        this._appendClass = "ui-datepicker-append",
        this._triggerClass = "ui-datepicker-trigger",
        this._dialogClass = "ui-datepicker-dialog",
        this._disableClass = "ui-datepicker-disabled",
        this._unselectableClass = "ui-datepicker-unselectable",
        this._currentClass = "ui-datepicker-current-day",
        this._dayOverClass = "ui-datepicker-days-cell-over",
        this.regional = [],
        this.regional[""] = {
            closeText: "Done",
            prevText: "Prev",
            nextText: "Next",
            currentText: "Today",
            monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
            dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
            weekHeader: "Wk",
            dateFormat: "mm/dd/yy",
            firstDay: 0,
            isRTL: !1,
            showMonthAfterYear: !1,
            yearSuffix: ""
        },
        this._defaults = {
            showOn: "focus",
            showAnim: "fadeIn",
            showOptions: {},
            defaultDate: null,
            appendText: "",
            buttonText: "...",
            buttonImage: "",
            buttonImageOnly: !1,
            hideIfNoPrevNext: !1,
            navigationAsDateFormat: !1,
            gotoCurrent: !1,
            changeMonth: !1,
            changeYear: !1,
            yearRange: "c-10:c+10",
            showOtherMonths: !1,
            selectOtherMonths: !1,
            showWeek: !1,
            calculateWeek: this.iso8601Week,
            shortYearCutoff: "+10",
            minDate: null,
            maxDate: null,
            duration: "fast",
            beforeShowDay: null,
            beforeShow: null,
            onSelect: null,
            onChangeMonthYear: null,
            onClose: null,
            numberOfMonths: 1,
            showCurrentAtPos: 0,
            stepMonths: 1,
            stepBigMonths: 12,
            altField: "",
            altFormat: "",
            constrainInput: !0,
            showButtonPanel: !1,
            autoSize: !1,
            disabled: !1
        },
        $.extend(this._defaults, this.regional[""]),
        this.dpDiv = bindHover($("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
    }
    function bindHover(dpDiv) {
        var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
        return dpDiv.delegate(selector, "mouseout", function() {
            $(this).removeClass("ui-state-hover"),
            -1 !== this.className.indexOf("ui-datepicker-prev") && $(this).removeClass("ui-datepicker-prev-hover"),
            -1 !== this.className.indexOf("ui-datepicker-next") && $(this).removeClass("ui-datepicker-next-hover")
        }).delegate(selector, "mouseover", function() {
            $.datepicker._isDisabledDatepicker((instActive.inline ? dpDiv.parent() : instActive.input)[0]) || ($(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),
            $(this).addClass("ui-state-hover"),
            -1 !== this.className.indexOf("ui-datepicker-prev") && $(this).addClass("ui-datepicker-prev-hover"),
            -1 !== this.className.indexOf("ui-datepicker-next") && $(this).addClass("ui-datepicker-next-hover"))
        })
    }
    function extendRemove(target, props) {
        for (var name in $.extend(target, props),
        props)
            null == props[name] && (target[name] = props[name]);
        return target
    }
    $.extend(Datepicker.prototype, {
        markerClassName: "hasDatepicker",
        maxRows: 4,
        _widgetDatepicker: function() {
            return this.dpDiv
        },
        setDefaults: function(settings) {
            return extendRemove(this._defaults, settings || {}),
            this
        },
        _attachDatepicker: function(target, settings) {
            var inst, nodeName = target.nodeName.toLowerCase(), inline = "div" === nodeName || "span" === nodeName;
            target.id || (this.uuid += 1,
            target.id = "dp" + this.uuid),
            (inst = this._newInst($(target), inline)).settings = $.extend({}, settings || {}),
            "input" === nodeName ? this._connectDatepicker(target, inst) : inline && this._inlineDatepicker(target, inst)
        },
        _newInst: function(target, inline) {
            return {
                id: target[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1"),
                input: target,
                selectedDay: 0,
                selectedMonth: 0,
                selectedYear: 0,
                drawMonth: 0,
                drawYear: 0,
                inline: inline,
                dpDiv: inline ? bindHover($("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
            }
        },
        _connectDatepicker: function(target, inst) {
            var input = $(target);
            inst.append = $([]),
            inst.trigger = $([]),
            input.hasClass(this.markerClassName) || (this._attachments(input, inst),
            input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp),
            this._autoSize(inst),
            $.data(target, PROP_NAME, inst),
            inst.settings.disabled && this._disableDatepicker(target))
        },
        _attachments: function(input, inst) {
            var buttonImage, buttonText = this._get(inst, "appendText"), isRTL = this._get(inst, "isRTL");
            inst.append && inst.append.remove(),
            buttonText && (inst.append = $("<span class='" + this._appendClass + "'>" + buttonText + "</span>"),
            input[isRTL ? "before" : "after"](inst.append)),
            input.unbind("focus", this._showDatepicker),
            inst.trigger && inst.trigger.remove(),
            "focus" !== (buttonImage = this._get(inst, "showOn")) && "both" !== buttonImage || input.focus(this._showDatepicker),
            "button" !== buttonImage && "both" !== buttonImage || (buttonText = this._get(inst, "buttonText"),
            buttonImage = this._get(inst, "buttonImage"),
            inst.trigger = $(this._get(inst, "buttonImageOnly") ? $("<img/>").addClass(this._triggerClass).attr({
                src: buttonImage,
                alt: buttonText,
                title: buttonText
            }) : $("<button type='button'></button>").addClass(this._triggerClass).html(buttonImage ? $("<img/>").attr({
                src: buttonImage,
                alt: buttonText,
                title: buttonText
            }) : buttonText)),
            input[isRTL ? "before" : "after"](inst.trigger),
            inst.trigger.click(function() {
                return $.datepicker._datepickerShowing && $.datepicker._lastInput === input[0] ? $.datepicker._hideDatepicker() : ($.datepicker._datepickerShowing && $.datepicker._lastInput !== input[0] && $.datepicker._hideDatepicker(),
                $.datepicker._showDatepicker(input[0])),
                !1
            }))
        },
        _autoSize: function(inst) {
            var findMax, max, maxI, i, date, dateFormat;
            this._get(inst, "autoSize") && !inst.inline && (date = new Date(2009,11,20),
            (dateFormat = this._get(inst, "dateFormat")).match(/[DM]/) && (findMax = function(names) {
                for (i = maxI = max = 0; i < names.length; i++)
                    names[i].length > max && (max = names[i].length,
                    maxI = i);
                return maxI
            }
            ,
            date.setMonth(findMax(this._get(inst, dateFormat.match(/MM/) ? "monthNames" : "monthNamesShort"))),
            date.setDate(findMax(this._get(inst, dateFormat.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - date.getDay())),
            inst.input.attr("size", this._formatDate(inst, date).length))
        },
        _inlineDatepicker: function(target, inst) {
            var divSpan = $(target);
            divSpan.hasClass(this.markerClassName) || (divSpan.addClass(this.markerClassName).append(inst.dpDiv),
            $.data(target, PROP_NAME, inst),
            this._setDate(inst, this._getDefaultDate(inst), !0),
            this._updateDatepicker(inst),
            this._updateAlternate(inst),
            inst.settings.disabled && this._disableDatepicker(target),
            inst.dpDiv.css("display", "block"))
        },
        _dialogDatepicker: function(input, scrollX, onSelect, browserHeight, scrollY) {
            var browserWidth, inst = this._dialogInst;
            return inst || (this.uuid += 1,
            browserWidth = "dp" + this.uuid,
            this._dialogInput = $("<input type='text' id='" + browserWidth + "' style='position: absolute; top: -100px; width: 0px;'/>"),
            this._dialogInput.keydown(this._doKeyDown),
            $("body").append(this._dialogInput),
            (inst = this._dialogInst = this._newInst(this._dialogInput, !1)).settings = {},
            $.data(this._dialogInput[0], PROP_NAME, inst)),
            extendRemove(inst.settings, browserHeight || {}),
            scrollX = scrollX && scrollX.constructor === Date ? this._formatDate(inst, scrollX) : scrollX,
            this._dialogInput.val(scrollX),
            this._pos = scrollY ? scrollY.length ? scrollY : [scrollY.pageX, scrollY.pageY] : null,
            this._pos || (browserWidth = document.documentElement.clientWidth,
            browserHeight = document.documentElement.clientHeight,
            scrollX = document.documentElement.scrollLeft || document.body.scrollLeft,
            scrollY = document.documentElement.scrollTop || document.body.scrollTop,
            this._pos = [browserWidth / 2 - 100 + scrollX, browserHeight / 2 - 150 + scrollY]),
            this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"),
            inst.settings.onSelect = onSelect,
            this._inDialog = !0,
            this.dpDiv.addClass(this._dialogClass),
            this._showDatepicker(this._dialogInput[0]),
            $.blockUI && $.blockUI(this.dpDiv),
            $.data(this._dialogInput[0], PROP_NAME, inst),
            this
        },
        _destroyDatepicker: function(target) {
            var nodeName, $target = $(target), inst = $.data(target, PROP_NAME);
            $target.hasClass(this.markerClassName) && (nodeName = target.nodeName.toLowerCase(),
            $.removeData(target, PROP_NAME),
            "input" === nodeName ? (inst.append.remove(),
            inst.trigger.remove(),
            $target.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : "div" !== nodeName && "span" !== nodeName || $target.removeClass(this.markerClassName).empty())
        },
        _enableDatepicker: function(target) {
            var nodeName, inline = $(target), inst = $.data(target, PROP_NAME);
            inline.hasClass(this.markerClassName) && ("input" === (nodeName = target.nodeName.toLowerCase()) ? (target.disabled = !1,
            inst.trigger.filter("button").each(function() {
                this.disabled = !1
            }).end().filter("img").css({
                opacity: "1.0",
                cursor: ""
            })) : "div" !== nodeName && "span" !== nodeName || ((inline = inline.children("." + this._inlineClass)).children().removeClass("ui-state-disabled"),
            inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)),
            this._disabledInputs = $.map(this._disabledInputs, function(value) {
                return value === target ? null : value
            }))
        },
        _disableDatepicker: function(target) {
            var nodeName, inline = $(target), inst = $.data(target, PROP_NAME);
            inline.hasClass(this.markerClassName) && ("input" === (nodeName = target.nodeName.toLowerCase()) ? (target.disabled = !0,
            inst.trigger.filter("button").each(function() {
                this.disabled = !0
            }).end().filter("img").css({
                opacity: "0.5",
                cursor: "default"
            })) : "div" !== nodeName && "span" !== nodeName || ((inline = inline.children("." + this._inlineClass)).children().addClass("ui-state-disabled"),
            inline.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)),
            this._disabledInputs = $.map(this._disabledInputs, function(value) {
                return value === target ? null : value
            }),
            this._disabledInputs[this._disabledInputs.length] = target)
        },
        _isDisabledDatepicker: function(target) {
            if (!target)
                return !1;
            for (var i = 0; i < this._disabledInputs.length; i++)
                if (this._disabledInputs[i] === target)
                    return !0;
            return !1
        },
        _getInst: function(target) {
            try {
                return $.data(target, PROP_NAME)
            } catch (err) {
                throw "Missing instance data for this datepicker"
            }
        },
        _optionDatepicker: function(target, name, value) {
            var settings, date, minDate, maxDate, inst = this._getInst(target);
            if (2 === arguments.length && "string" == typeof name)
                return "defaults" === name ? $.extend({}, $.datepicker._defaults) : inst ? "all" === name ? $.extend({}, inst.settings) : this._get(inst, name) : null;
            settings = name || {},
            "string" == typeof name && ((settings = {})[name] = value),
            inst && (this._curInst === inst && this._hideDatepicker(),
            date = this._getDateDatepicker(target, !0),
            minDate = this._getMinMaxDate(inst, "min"),
            maxDate = this._getMinMaxDate(inst, "max"),
            extendRemove(inst.settings, settings),
            null !== minDate && void 0 !== settings.dateFormat && void 0 === settings.minDate && (inst.settings.minDate = this._formatDate(inst, minDate)),
            null !== maxDate && void 0 !== settings.dateFormat && void 0 === settings.maxDate && (inst.settings.maxDate = this._formatDate(inst, maxDate)),
            "disabled"in settings && (settings.disabled ? this._disableDatepicker(target) : this._enableDatepicker(target)),
            this._attachments($(target), inst),
            this._autoSize(inst),
            this._setDate(inst, date),
            this._updateAlternate(inst),
            this._updateDatepicker(inst))
        },
        _changeDatepicker: function(target, name, value) {
            this._optionDatepicker(target, name, value)
        },
        _refreshDatepicker: function(inst) {
            inst = this._getInst(inst);
            inst && this._updateDatepicker(inst)
        },
        _setDateDatepicker: function(inst, date) {
            inst = this._getInst(inst);
            inst && (this._setDate(inst, date),
            this._updateDatepicker(inst),
            this._updateAlternate(inst))
        },
        _getDateDatepicker: function(inst, noDefault) {
            inst = this._getInst(inst);
            return inst && !inst.inline && this._setDateFromField(inst, noDefault),
            inst ? this._getDate(inst) : null
        },
        _doKeyDown: function(event) {
            var onSelect, dateStr, inst = $.datepicker._getInst(event.target), handled = !0, isRTL = inst.dpDiv.is(".ui-datepicker-rtl");
            if (inst._keyEvent = !0,
            $.datepicker._datepickerShowing)
                switch (event.keyCode) {
                case 9:
                    $.datepicker._hideDatepicker(),
                    handled = !1;
                    break;
                case 13:
                    return (dateStr = $("td." + $.datepicker._dayOverClass + ":not(." + $.datepicker._currentClass + ")", inst.dpDiv))[0] && $.datepicker._selectDay(event.target, inst.selectedMonth, inst.selectedYear, dateStr[0]),
                    (onSelect = $.datepicker._get(inst, "onSelect")) ? (dateStr = $.datepicker._formatDate(inst),
                    onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst])) : $.datepicker._hideDatepicker(),
                    !1;
                case 27:
                    $.datepicker._hideDatepicker();
                    break;
                case 33:
                    $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
                    break;
                case 34:
                    $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
                    break;
                case 35:
                    (event.ctrlKey || event.metaKey) && $.datepicker._clearDate(event.target),
                    handled = event.ctrlKey || event.metaKey;
                    break;
                case 36:
                    (event.ctrlKey || event.metaKey) && $.datepicker._gotoToday(event.target),
                    handled = event.ctrlKey || event.metaKey;
                    break;
                case 37:
                    (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, isRTL ? 1 : -1, "D"),
                    handled = event.ctrlKey || event.metaKey,
                    event.originalEvent.altKey && $.datepicker._adjustDate(event.target, event.ctrlKey ? -$.datepicker._get(inst, "stepBigMonths") : -$.datepicker._get(inst, "stepMonths"), "M");
                    break;
                case 38:
                    (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, -7, "D"),
                    handled = event.ctrlKey || event.metaKey;
                    break;
                case 39:
                    (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, isRTL ? -1 : 1, "D"),
                    handled = event.ctrlKey || event.metaKey,
                    event.originalEvent.altKey && $.datepicker._adjustDate(event.target, event.ctrlKey ? +$.datepicker._get(inst, "stepBigMonths") : +$.datepicker._get(inst, "stepMonths"), "M");
                    break;
                case 40:
                    (event.ctrlKey || event.metaKey) && $.datepicker._adjustDate(event.target, 7, "D"),
                    handled = event.ctrlKey || event.metaKey;
                    break;
                default:
                    handled = !1
                }
            else
                36 === event.keyCode && event.ctrlKey ? $.datepicker._showDatepicker(this) : handled = !1;
            handled && (event.preventDefault(),
            event.stopPropagation())
        },
        _doKeyPress: function(event) {
            var chars, chr = $.datepicker._getInst(event.target);
            if ($.datepicker._get(chr, "constrainInput"))
                return chars = $.datepicker._possibleChars($.datepicker._get(chr, "dateFormat")),
                chr = String.fromCharCode(null == event.charCode ? event.keyCode : event.charCode),
                event.ctrlKey || event.metaKey || chr < " " || !chars || -1 < chars.indexOf(chr)
        },
        _doKeyUp: function(inst) {
            inst = $.datepicker._getInst(inst.target);
            if (inst.input.val() !== inst.lastVal)
                try {
                    $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), inst.input ? inst.input.val() : null, $.datepicker._getFormatConfig(inst)) && ($.datepicker._setDateFromField(inst),
                    $.datepicker._updateAlternate(inst),
                    $.datepicker._updateDatepicker(inst))
                } catch (err) {}
            return !0
        },
        _showDatepicker: function(input) {
            var isFixed, showAnim, duration, inst;
            "input" !== (input = input.target || input).nodeName.toLowerCase() && (input = $("input", input.parentNode)[0]),
            $.datepicker._isDisabledDatepicker(input) || $.datepicker._lastInput === input || (inst = $.datepicker._getInst(input),
            $.datepicker._curInst && $.datepicker._curInst !== inst && ($.datepicker._curInst.dpDiv.stop(!0, !0),
            inst && $.datepicker._datepickerShowing && $.datepicker._hideDatepicker($.datepicker._curInst.input[0])),
            !1 !== (showAnim = (duration = $.datepicker._get(inst, "beforeShow")) ? duration.apply(input, [input, inst]) : {}) && (extendRemove(inst.settings, showAnim),
            inst.lastVal = null,
            $.datepicker._lastInput = input,
            $.datepicker._setDateFromField(inst),
            $.datepicker._inDialog && (input.value = ""),
            $.datepicker._pos || ($.datepicker._pos = $.datepicker._findPos(input),
            $.datepicker._pos[1] += input.offsetHeight),
            isFixed = !1,
            $(input).parents().each(function() {
                return !(isFixed |= "fixed" === $(this).css("position"))
            }),
            duration = {
                left: $.datepicker._pos[0],
                top: $.datepicker._pos[1]
            },
            $.datepicker._pos = null,
            inst.dpDiv.empty(),
            inst.dpDiv.css({
                position: "absolute",
                display: "block",
                top: "-1000px"
            }),
            $.datepicker._updateDatepicker(inst),
            duration = $.datepicker._checkOffset(inst, duration, isFixed),
            inst.dpDiv.css({
                position: $.datepicker._inDialog && $.blockUI ? "static" : isFixed ? "fixed" : "absolute",
                display: "none",
                left: duration.left + "px",
                top: duration.top + "px"
            }),
            inst.inline || (showAnim = $.datepicker._get(inst, "showAnim"),
            duration = $.datepicker._get(inst, "duration"),
            inst.dpDiv.zIndex($(input).zIndex() + 1),
            $.datepicker._datepickerShowing = !0,
            $.effects && $.effects.effect[showAnim] ? inst.dpDiv.show(showAnim, $.datepicker._get(inst, "showOptions"), duration) : inst.dpDiv[showAnim || "show"](showAnim ? duration : null),
            $.datepicker._shouldFocusInput(inst) && inst.input.focus(),
            $.datepicker._curInst = inst)))
        },
        _updateDatepicker: function(inst) {
            this.maxRows = 4,
            (instActive = inst).dpDiv.empty().append(this._generateHTML(inst)),
            this._attachHandlers(inst),
            inst.dpDiv.find("." + this._dayOverClass + " a").mouseover();
            var origyearshtml, numMonths = this._getNumberOfMonths(inst), cols = numMonths[1];
            inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),
            1 < cols && inst.dpDiv.addClass("ui-datepicker-multi-" + cols).css("width", 17 * cols + "em"),
            inst.dpDiv[(1 !== numMonths[0] || 1 !== numMonths[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"),
            inst.dpDiv[(this._get(inst, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"),
            inst === $.datepicker._curInst && $.datepicker._datepickerShowing && $.datepicker._shouldFocusInput(inst) && inst.input.focus(),
            inst.yearshtml && (origyearshtml = inst.yearshtml,
            setTimeout(function() {
                origyearshtml === inst.yearshtml && inst.yearshtml && inst.dpDiv.find("select.ui-datepicker-year:first").replaceWith(inst.yearshtml),
                origyearshtml = inst.yearshtml = null
            }, 0))
        },
        _shouldFocusInput: function(inst) {
            return inst.input && inst.input.is(":visible") && !inst.input.is(":disabled") && !inst.input.is(":focus")
        },
        _checkOffset: function(inst, offset, isFixed) {
            var dpWidth = inst.dpDiv.outerWidth()
              , dpHeight = inst.dpDiv.outerHeight()
              , inputWidth = inst.input ? inst.input.outerWidth() : 0
              , inputHeight = inst.input ? inst.input.outerHeight() : 0
              , viewWidth = document.documentElement.clientWidth + (isFixed ? 0 : $(document).scrollLeft())
              , viewHeight = document.documentElement.clientHeight + (isFixed ? 0 : $(document).scrollTop());
            return offset.left -= this._get(inst, "isRTL") ? dpWidth - inputWidth : 0,
            offset.left -= isFixed && offset.left === inst.input.offset().left ? $(document).scrollLeft() : 0,
            offset.top -= isFixed && offset.top === inst.input.offset().top + inputHeight ? $(document).scrollTop() : 0,
            offset.left -= Math.min(offset.left, offset.left + dpWidth > viewWidth && dpWidth < viewWidth ? Math.abs(offset.left + dpWidth - viewWidth) : 0),
            offset.top -= Math.min(offset.top, offset.top + dpHeight > viewHeight && dpHeight < viewHeight ? Math.abs(dpHeight + inputHeight) : 0),
            offset
        },
        _findPos: function(obj) {
            for (var position = this._getInst(obj), isRTL = this._get(position, "isRTL"); obj && ("hidden" === obj.type || 1 !== obj.nodeType || $.expr.filters.hidden(obj)); )
                obj = obj[isRTL ? "previousSibling" : "nextSibling"];
            return [(position = $(obj).offset()).left, position.top]
        },
        _hideDatepicker: function(onClose) {
            var showAnim, duration, inst = this._curInst;
            !inst || onClose && inst !== $.data(onClose, PROP_NAME) || this._datepickerShowing && (showAnim = this._get(inst, "showAnim"),
            duration = this._get(inst, "duration"),
            onClose = function() {
                $.datepicker._tidyDialog(inst)
            }
            ,
            $.effects && ($.effects.effect[showAnim] || $.effects[showAnim]) ? inst.dpDiv.hide(showAnim, $.datepicker._get(inst, "showOptions"), duration, onClose) : inst.dpDiv["slideDown" === showAnim ? "slideUp" : "fadeIn" === showAnim ? "fadeOut" : "hide"](showAnim ? duration : null, onClose),
            showAnim || onClose(),
            this._datepickerShowing = !1,
            (onClose = this._get(inst, "onClose")) && onClose.apply(inst.input ? inst.input[0] : null, [inst.input ? inst.input.val() : "", inst]),
            this._lastInput = null,
            this._inDialog && (this._dialogInput.css({
                position: "absolute",
                left: "0",
                top: "-100px"
            }),
            $.blockUI && ($.unblockUI(),
            $("body").append(this.dpDiv))),
            this._inDialog = !1)
        },
        _tidyDialog: function(inst) {
            inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
        },
        _checkExternalClick: function(inst) {
            var $target;
            $.datepicker._curInst && ($target = $(inst.target),
            inst = $.datepicker._getInst($target[0]),
            ($target[0].id === $.datepicker._mainDivId || 0 !== $target.parents("#" + $.datepicker._mainDivId).length || $target.hasClass($.datepicker.markerClassName) || $target.closest("." + $.datepicker._triggerClass).length || !$.datepicker._datepickerShowing || $.datepicker._inDialog && $.blockUI) && (!$target.hasClass($.datepicker.markerClassName) || $.datepicker._curInst === inst) || $.datepicker._hideDatepicker())
        },
        _adjustDate: function(inst, offset, period) {
            var target = $(inst)
              , inst = this._getInst(target[0]);
            this._isDisabledDatepicker(target[0]) || (this._adjustInstDate(inst, offset + ("M" === period ? this._get(inst, "showCurrentAtPos") : 0), period),
            this._updateDatepicker(inst))
        },
        _gotoToday: function(date) {
            var target = $(date)
              , inst = this._getInst(target[0]);
            this._get(inst, "gotoCurrent") && inst.currentDay ? (inst.selectedDay = inst.currentDay,
            inst.drawMonth = inst.selectedMonth = inst.currentMonth,
            inst.drawYear = inst.selectedYear = inst.currentYear) : (date = new Date,
            inst.selectedDay = date.getDate(),
            inst.drawMonth = inst.selectedMonth = date.getMonth(),
            inst.drawYear = inst.selectedYear = date.getFullYear()),
            this._notifyChange(inst),
            this._adjustDate(target)
        },
        _selectMonthYear: function(inst, select, period) {
            var target = $(inst)
              , inst = this._getInst(target[0]);
            inst["selected" + ("M" === period ? "Month" : "Year")] = inst["draw" + ("M" === period ? "Month" : "Year")] = parseInt(select.options[select.selectedIndex].value, 10),
            this._notifyChange(inst),
            this._adjustDate(target)
        },
        _selectDay: function(id, month, year, td) {
            var inst = $(id);
            $(td).hasClass(this._unselectableClass) || this._isDisabledDatepicker(inst[0]) || ((inst = this._getInst(inst[0])).selectedDay = inst.currentDay = $("a", td).html(),
            inst.selectedMonth = inst.currentMonth = month,
            inst.selectedYear = inst.currentYear = year,
            this._selectDate(id, this._formatDate(inst, inst.currentDay, inst.currentMonth, inst.currentYear)))
        },
        _clearDate: function(target) {
            target = $(target);
            this._selectDate(target, "")
        },
        _selectDate: function(inst, dateStr) {
            var onSelect = $(inst)
              , inst = this._getInst(onSelect[0]);
            dateStr = null != dateStr ? dateStr : this._formatDate(inst),
            inst.input && inst.input.val(dateStr),
            this._updateAlternate(inst),
            (onSelect = this._get(inst, "onSelect")) ? onSelect.apply(inst.input ? inst.input[0] : null, [dateStr, inst]) : inst.input && inst.input.trigger("change"),
            inst.inline ? this._updateDatepicker(inst) : (this._hideDatepicker(),
            this._lastInput = inst.input[0],
            "object" != typeof inst.input[0] && inst.input.focus(),
            this._lastInput = null)
        },
        _updateAlternate: function(inst) {
            var altFormat, date, dateStr, altField = this._get(inst, "altField");
            altField && (altFormat = this._get(inst, "altFormat") || this._get(inst, "dateFormat"),
            date = this._getDate(inst),
            dateStr = this.formatDate(altFormat, date, this._getFormatConfig(inst)),
            $(altField).each(function() {
                $(this).val(dateStr)
            }))
        },
        noWeekends: function(day) {
            day = day.getDay();
            return [0 < day && day < 6, ""]
        },
        iso8601Week: function(time) {
            var checkDate = new Date(time.getTime());
            return checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7)),
            time = checkDate.getTime(),
            checkDate.setMonth(0),
            checkDate.setDate(1),
            Math.floor(Math.round((time - checkDate) / 864e5) / 7) + 1
        },
        parseDate: function(format, value, settings) {
            if (null == format || null == value)
                throw "Invalid arguments";
            if ("" === (value = "object" == typeof value ? value.toString() : value + ""))
                return null;
            function lookAhead(matches) {
                return (matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === matches) && iFormat++,
                matches
            }
            function getNumber(num) {
                var isDoubled = lookAhead(num)
                  , num = new RegExp("^\\d{1," + ("@" === num ? 14 : "!" === num ? 20 : "y" === num && isDoubled ? 4 : "o" === num ? 3 : 2) + "}");
                if (!(num = value.substring(iValue).match(num)))
                    throw "Missing number at position " + iValue;
                return iValue += num[0].length,
                parseInt(num[0], 10)
            }
            function getName(match, names, longNames) {
                var index = -1
                  , names = $.map(lookAhead(match) ? longNames : names, function(v, k) {
                    return [[k, v]]
                }).sort(function(a, b) {
                    return -(a[1].length - b[1].length)
                });
                if ($.each(names, function(i, pair) {
                    var name = pair[1];
                    if (value.substr(iValue, name.length).toLowerCase() === name.toLowerCase())
                        return index = pair[0],
                        iValue += name.length,
                        !1
                }),
                -1 !== index)
                    return index + 1;
                throw "Unknown name at position " + iValue
            }
            function checkLiteral() {
                if (value.charAt(iValue) !== format.charAt(iFormat))
                    throw "Unexpected literal at position " + iValue;
                iValue++
            }
            for (var dim, extra, date, iValue = 0, shortYearCutoff = (settings ? settings.shortYearCutoff : null) || this._defaults.shortYearCutoff, shortYearCutoff = "string" != typeof shortYearCutoff ? shortYearCutoff : (new Date).getFullYear() % 100 + parseInt(shortYearCutoff, 10), dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort, dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames, monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort, monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames, year = -1, month = -1, day = -1, doy = -1, literal = !1, iFormat = 0; iFormat < format.length; iFormat++)
                if (literal)
                    "'" !== format.charAt(iFormat) || lookAhead("'") ? checkLiteral() : literal = !1;
                else
                    switch (format.charAt(iFormat)) {
                    case "d":
                        day = getNumber("d");
                        break;
                    case "D":
                        getName("D", dayNamesShort, dayNames);
                        break;
                    case "o":
                        doy = getNumber("o");
                        break;
                    case "m":
                        month = getNumber("m");
                        break;
                    case "M":
                        month = getName("M", monthNamesShort, monthNames);
                        break;
                    case "y":
                        year = getNumber("y");
                        break;
                    case "@":
                        year = (date = new Date(getNumber("@"))).getFullYear(),
                        month = date.getMonth() + 1,
                        day = date.getDate();
                        break;
                    case "!":
                        year = (date = new Date((getNumber("!") - this._ticksTo1970) / 1e4)).getFullYear(),
                        month = date.getMonth() + 1,
                        day = date.getDate();
                        break;
                    case "'":
                        lookAhead("'") ? checkLiteral() : literal = !0;
                        break;
                    default:
                        checkLiteral()
                    }
            if (iValue < value.length && (extra = value.substr(iValue),
            !/^\s+/.test(extra)))
                throw "Extra/unparsed characters found in date: " + extra;
            if (-1 === year ? year = (new Date).getFullYear() : year < 100 && (year += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (year <= shortYearCutoff ? 0 : -100)),
            -1 < doy)
                for (month = 1,
                day = doy; ; ) {
                    if (day <= (dim = this._getDaysInMonth(year, month - 1)))
                        break;
                    month++,
                    day -= dim
                }
            if ((date = this._daylightSavingAdjust(new Date(year,month - 1,day))).getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day)
                throw "Invalid date";
            return date
        },
        ATOM: "yy-mm-dd",
        COOKIE: "D, dd M yy",
        ISO_8601: "yy-mm-dd",
        RFC_822: "D, d M y",
        RFC_850: "DD, dd-M-y",
        RFC_1036: "D, d M y",
        RFC_1123: "D, d M yy",
        RFC_2822: "D, d M yy",
        RSS: "D, d M y",
        TICKS: "!",
        TIMESTAMP: "@",
        W3C: "yy-mm-dd",
        _ticksTo1970: 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 60 * 60 * 1e7,
        formatDate: function(format, date, settings) {
            if (!date)
                return "";
            function lookAhead(matches) {
                return (matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === matches) && iFormat++,
                matches
            }
            function formatNumber(match, value, len) {
                var num = "" + value;
                if (lookAhead(match))
                    for (; num.length < len; )
                        num = "0" + num;
                return num
            }
            function formatName(match, value, shortNames, longNames) {
                return (lookAhead(match) ? longNames : shortNames)[value]
            }
            var iFormat, dayNamesShort = (settings ? settings.dayNamesShort : null) || this._defaults.dayNamesShort, dayNames = (settings ? settings.dayNames : null) || this._defaults.dayNames, monthNamesShort = (settings ? settings.monthNamesShort : null) || this._defaults.monthNamesShort, monthNames = (settings ? settings.monthNames : null) || this._defaults.monthNames, output = "", literal = !1;
            if (date)
                for (iFormat = 0; iFormat < format.length; iFormat++)
                    if (literal)
                        "'" !== format.charAt(iFormat) || lookAhead("'") ? output += format.charAt(iFormat) : literal = !1;
                    else
                        switch (format.charAt(iFormat)) {
                        case "d":
                            output += formatNumber("d", date.getDate(), 2);
                            break;
                        case "D":
                            output += formatName("D", date.getDay(), dayNamesShort, dayNames);
                            break;
                        case "o":
                            output += formatNumber("o", Math.round((new Date(date.getFullYear(),date.getMonth(),date.getDate()).getTime() - new Date(date.getFullYear(),0,0).getTime()) / 864e5), 3);
                            break;
                        case "m":
                            output += formatNumber("m", date.getMonth() + 1, 2);
                            break;
                        case "M":
                            output += formatName("M", date.getMonth(), monthNamesShort, monthNames);
                            break;
                        case "y":
                            output += lookAhead("y") ? date.getFullYear() : (date.getYear() % 100 < 10 ? "0" : "") + date.getYear() % 100;
                            break;
                        case "@":
                            output += date.getTime();
                            break;
                        case "!":
                            output += 1e4 * date.getTime() + this._ticksTo1970;
                            break;
                        case "'":
                            lookAhead("'") ? output += "'" : literal = !0;
                            break;
                        default:
                            output += format.charAt(iFormat)
                        }
            return output
        },
        _possibleChars: function(format) {
            function lookAhead(matches) {
                return (matches = iFormat + 1 < format.length && format.charAt(iFormat + 1) === matches) && iFormat++,
                matches
            }
            for (var chars = "", literal = !1, iFormat = 0; iFormat < format.length; iFormat++)
                if (literal)
                    "'" !== format.charAt(iFormat) || lookAhead("'") ? chars += format.charAt(iFormat) : literal = !1;
                else
                    switch (format.charAt(iFormat)) {
                    case "d":
                    case "m":
                    case "y":
                    case "@":
                        chars += "0123456789";
                        break;
                    case "D":
                    case "M":
                        return null;
                    case "'":
                        lookAhead("'") ? chars += "'" : literal = !0;
                        break;
                    default:
                        chars += format.charAt(iFormat)
                    }
            return chars
        },
        _get: function(inst, name) {
            return (void 0 !== inst.settings[name] ? inst.settings : this._defaults)[name]
        },
        _setDateFromField: function(inst, noDefault) {
            if (inst.input.val() !== inst.lastVal) {
                var dateFormat = this._get(inst, "dateFormat")
                  , dates = inst.lastVal = inst.input ? inst.input.val() : null
                  , defaultDate = this._getDefaultDate(inst)
                  , date = defaultDate
                  , settings = this._getFormatConfig(inst);
                try {
                    date = this.parseDate(dateFormat, dates, settings) || defaultDate
                } catch (event) {
                    dates = noDefault ? "" : dates
                }
                inst.selectedDay = date.getDate(),
                inst.drawMonth = inst.selectedMonth = date.getMonth(),
                inst.drawYear = inst.selectedYear = date.getFullYear(),
                inst.currentDay = dates ? date.getDate() : 0,
                inst.currentMonth = dates ? date.getMonth() : 0,
                inst.currentYear = dates ? date.getFullYear() : 0,
                this._adjustInstDate(inst)
            }
        },
        _getDefaultDate: function(inst) {
            return this._restrictMinMax(inst, this._determineDate(inst, this._get(inst, "defaultDate"), new Date))
        },
        _determineDate: function(inst, newDate, defaultDate) {
            newDate = null == newDate || "" === newDate ? defaultDate : "string" == typeof newDate ? function(offset) {
                try {
                    return $.datepicker.parseDate($.datepicker._get(inst, "dateFormat"), offset, $.datepicker._getFormatConfig(inst))
                } catch (e) {}
                for (var date = (offset.toLowerCase().match(/^c/) ? $.datepicker._getDate(inst) : null) || new Date, year = date.getFullYear(), month = date.getMonth(), day = date.getDate(), pattern = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, matches = pattern.exec(offset); matches; ) {
                    switch (matches[2] || "d") {
                    case "d":
                    case "D":
                        day += parseInt(matches[1], 10);
                        break;
                    case "w":
                    case "W":
                        day += 7 * parseInt(matches[1], 10);
                        break;
                    case "m":
                    case "M":
                        month += parseInt(matches[1], 10),
                        day = Math.min(day, $.datepicker._getDaysInMonth(year, month));
                        break;
                    case "y":
                    case "Y":
                        year += parseInt(matches[1], 10),
                        day = Math.min(day, $.datepicker._getDaysInMonth(year, month))
                    }
                    matches = pattern.exec(offset)
                }
                return new Date(year,month,day)
            }(newDate) : "number" == typeof newDate ? isNaN(newDate) ? defaultDate : function(offset) {
                var date = new Date;
                return date.setDate(date.getDate() + offset),
                date
            }(newDate) : new Date(newDate.getTime());
            return (newDate = newDate && "Invalid Date" === newDate.toString() ? defaultDate : newDate) && (newDate.setHours(0),
            newDate.setMinutes(0),
            newDate.setSeconds(0),
            newDate.setMilliseconds(0)),
            this._daylightSavingAdjust(newDate)
        },
        _daylightSavingAdjust: function(date) {
            return date ? (date.setHours(12 < date.getHours() ? date.getHours() + 2 : 0),
            date) : null
        },
        _setDate: function(inst, newDate, noChange) {
            var clear = !newDate
              , origMonth = inst.selectedMonth
              , origYear = inst.selectedYear
              , newDate = this._restrictMinMax(inst, this._determineDate(inst, newDate, new Date));
            inst.selectedDay = inst.currentDay = newDate.getDate(),
            inst.drawMonth = inst.selectedMonth = inst.currentMonth = newDate.getMonth(),
            inst.drawYear = inst.selectedYear = inst.currentYear = newDate.getFullYear(),
            origMonth === inst.selectedMonth && origYear === inst.selectedYear || noChange || this._notifyChange(inst),
            this._adjustInstDate(inst),
            inst.input && inst.input.val(clear ? "" : this._formatDate(inst))
        },
        _getDate: function(inst) {
            return !inst.currentYear || inst.input && "" === inst.input.val() ? null : this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay))
        },
        _attachHandlers: function(inst) {
            var stepMonths = this._get(inst, "stepMonths")
              , id = "#" + inst.id.replace(/\\\\/g, "\\");
            inst.dpDiv.find("[data-handler]").map(function() {
                var handler = {
                    prev: function() {
                        $.datepicker._adjustDate(id, -stepMonths, "M")
                    },
                    next: function() {
                        $.datepicker._adjustDate(id, +stepMonths, "M")
                    },
                    hide: function() {
                        $.datepicker._hideDatepicker()
                    },
                    today: function() {
                        $.datepicker._gotoToday(id)
                    },
                    selectDay: function() {
                        return $.datepicker._selectDay(id, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this),
                        !1
                    },
                    selectMonth: function() {
                        return $.datepicker._selectMonthYear(id, this, "M"),
                        !1
                    },
                    selectYear: function() {
                        return $.datepicker._selectMonthYear(id, this, "Y"),
                        !1
                    }
                };
                $(this).bind(this.getAttribute("data-event"), handler[this.getAttribute("data-handler")])
            })
        },
        _generateHTML: function(inst) {
            var maxDraw, prev, next, firstDay, showWeek, dayNames, dayNamesMin, monthNames, monthNamesShort, beforeShowDay, showOtherMonths, selectOtherMonths, defaultDate, html, dow, row, group, col, selectedDate, cornerClass, calender, thead, day, leadDays, curRows, numRows, printDate, dRow, tbody, daySettings, otherMonth, unselectable, stepMonths = new Date, today = this._daylightSavingAdjust(new Date(stepMonths.getFullYear(),stepMonths.getMonth(),stepMonths.getDate())), isRTL = this._get(inst, "isRTL"), showButtonPanel = this._get(inst, "showButtonPanel"), currentText = this._get(inst, "hideIfNoPrevNext"), buttonPanel = this._get(inst, "navigationAsDateFormat"), numMonths = this._getNumberOfMonths(inst), gotoDate = this._get(inst, "showCurrentAtPos"), stepMonths = this._get(inst, "stepMonths"), isMultiMonth = 1 !== numMonths[0] || 1 !== numMonths[1], currentDate = this._daylightSavingAdjust(inst.currentDay ? new Date(inst.currentYear,inst.currentMonth,inst.currentDay) : new Date(9999,9,9)), minDate = this._getMinMaxDate(inst, "min"), maxDate = this._getMinMaxDate(inst, "max"), drawMonth = inst.drawMonth - gotoDate, drawYear = inst.drawYear;
            if (drawMonth < 0 && (drawMonth += 12,
            drawYear--),
            maxDate)
                for (maxDraw = this._daylightSavingAdjust(new Date(maxDate.getFullYear(),maxDate.getMonth() - numMonths[0] * numMonths[1] + 1,maxDate.getDate())),
                maxDraw = minDate && maxDraw < minDate ? minDate : maxDraw; this._daylightSavingAdjust(new Date(drawYear,drawMonth,1)) > maxDraw; )
                    --drawMonth < 0 && (drawMonth = 11,
                    drawYear--);
            for (inst.drawMonth = drawMonth,
            inst.drawYear = drawYear,
            gotoDate = this._get(inst, "prevText"),
            gotoDate = buttonPanel ? this.formatDate(gotoDate, this._daylightSavingAdjust(new Date(drawYear,drawMonth - stepMonths,1)), this._getFormatConfig(inst)) : gotoDate,
            prev = this._canAdjustMonth(inst, -1, drawYear, drawMonth) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + gotoDate + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + gotoDate + "</span></a>" : currentText ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + gotoDate + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "e" : "w") + "'>" + gotoDate + "</span></a>",
            gotoDate = this._get(inst, "nextText"),
            gotoDate = buttonPanel ? this.formatDate(gotoDate, this._daylightSavingAdjust(new Date(drawYear,drawMonth + stepMonths,1)), this._getFormatConfig(inst)) : gotoDate,
            next = this._canAdjustMonth(inst, 1, drawYear, drawMonth) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + gotoDate + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + gotoDate + "</span></a>" : currentText ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + gotoDate + "'><span class='ui-icon ui-icon-circle-triangle-" + (isRTL ? "w" : "e") + "'>" + gotoDate + "</span></a>",
            currentText = this._get(inst, "currentText"),
            gotoDate = this._get(inst, "gotoCurrent") && inst.currentDay ? currentDate : today,
            currentText = buttonPanel ? this.formatDate(currentText, gotoDate, this._getFormatConfig(inst)) : currentText,
            buttonPanel = inst.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(inst, "closeText") + "</button>",
            buttonPanel = showButtonPanel ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (isRTL ? buttonPanel : "") + (this._isInRange(inst, gotoDate) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + currentText + "</button>" : "") + (isRTL ? "" : buttonPanel) + "</div>" : "",
            firstDay = parseInt(this._get(inst, "firstDay"), 10),
            firstDay = isNaN(firstDay) ? 0 : firstDay,
            showWeek = this._get(inst, "showWeek"),
            dayNames = this._get(inst, "dayNames"),
            dayNamesMin = this._get(inst, "dayNamesMin"),
            monthNames = this._get(inst, "monthNames"),
            monthNamesShort = this._get(inst, "monthNamesShort"),
            beforeShowDay = this._get(inst, "beforeShowDay"),
            showOtherMonths = this._get(inst, "showOtherMonths"),
            selectOtherMonths = this._get(inst, "selectOtherMonths"),
            defaultDate = this._getDefaultDate(inst),
            html = "",
            row = 0; row < numMonths[0]; row++) {
                for (group = "",
                this.maxRows = 4,
                col = 0; col < numMonths[1]; col++) {
                    if (selectedDate = this._daylightSavingAdjust(new Date(drawYear,drawMonth,inst.selectedDay)),
                    cornerClass = " ui-corner-all",
                    calender = "",
                    isMultiMonth) {
                        if (calender += "<div class='ui-datepicker-group",
                        1 < numMonths[1])
                            switch (col) {
                            case 0:
                                calender += " ui-datepicker-group-first",
                                cornerClass = " ui-corner-" + (isRTL ? "right" : "left");
                                break;
                            case numMonths[1] - 1:
                                calender += " ui-datepicker-group-last",
                                cornerClass = " ui-corner-" + (isRTL ? "left" : "right");
                                break;
                            default:
                                calender += " ui-datepicker-group-middle",
                                cornerClass = ""
                            }
                        calender += "'>"
                    }
                    for (calender += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + cornerClass + "'>" + (/all|left/.test(cornerClass) && 0 === row ? isRTL ? next : prev : "") + (/all|right/.test(cornerClass) && 0 === row ? isRTL ? prev : next : "") + this._generateMonthYearHeader(inst, drawMonth, drawYear, minDate, maxDate, 0 < row || 0 < col, monthNames, monthNamesShort) + "</div><table class='ui-datepicker-calendar'><thead><tr>",
                    thead = showWeek ? "<th class='ui-datepicker-week-col'>" + this._get(inst, "weekHeader") + "</th>" : "",
                    dow = 0; dow < 7; dow++)
                        thead += "<th" + (5 <= (dow + firstDay + 6) % 7 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + dayNames[day = (dow + firstDay) % 7] + "'>" + dayNamesMin[day] + "</span></th>";
                    for (calender += thead + "</tr></thead><tbody>",
                    curRows = this._getDaysInMonth(drawYear, drawMonth),
                    drawYear === inst.selectedYear && drawMonth === inst.selectedMonth && (inst.selectedDay = Math.min(inst.selectedDay, curRows)),
                    leadDays = (this._getFirstDayOfMonth(drawYear, drawMonth) - firstDay + 7) % 7,
                    curRows = Math.ceil((leadDays + curRows) / 7),
                    numRows = isMultiMonth && this.maxRows > curRows ? this.maxRows : curRows,
                    this.maxRows = numRows,
                    printDate = this._daylightSavingAdjust(new Date(drawYear,drawMonth,1 - leadDays)),
                    dRow = 0; dRow < numRows; dRow++) {
                        for (calender += "<tr>",
                        tbody = showWeek ? "<td class='ui-datepicker-week-col'>" + this._get(inst, "calculateWeek")(printDate) + "</td>" : "",
                        dow = 0; dow < 7; dow++)
                            daySettings = beforeShowDay ? beforeShowDay.apply(inst.input ? inst.input[0] : null, [printDate]) : [!0, ""],
                            unselectable = (otherMonth = printDate.getMonth() !== drawMonth) && !selectOtherMonths || !daySettings[0] || minDate && printDate < minDate || maxDate && maxDate < printDate,
                            tbody += "<td class='" + (5 <= (dow + firstDay + 6) % 7 ? " ui-datepicker-week-end" : "") + (otherMonth ? " ui-datepicker-other-month" : "") + (printDate.getTime() === selectedDate.getTime() && drawMonth === inst.selectedMonth && inst._keyEvent || defaultDate.getTime() === printDate.getTime() && defaultDate.getTime() === selectedDate.getTime() ? " " + this._dayOverClass : "") + (unselectable ? " " + this._unselectableClass + " ui-state-disabled" : "") + (otherMonth && !showOtherMonths ? "" : " " + daySettings[1] + (printDate.getTime() === currentDate.getTime() ? " " + this._currentClass : "") + (printDate.getTime() === today.getTime() ? " ui-datepicker-today" : "")) + "'" + (otherMonth && !showOtherMonths || !daySettings[2] ? "" : " title='" + daySettings[2].replace(/'/g, "&#39;") + "'") + (unselectable ? "" : " data-handler='selectDay' data-event='click' data-month='" + printDate.getMonth() + "' data-year='" + printDate.getFullYear() + "'") + ">" + (otherMonth && !showOtherMonths ? "&#xa0;" : unselectable ? "<span class='ui-state-default'>" + printDate.getDate() + "</span>" : "<a class='ui-state-default" + (printDate.getTime() === today.getTime() ? " ui-state-highlight" : "") + (printDate.getTime() === currentDate.getTime() ? " ui-state-active" : "") + (otherMonth ? " ui-priority-secondary" : "") + "' href='#'>" + printDate.getDate() + "</a>") + "</td>",
                            printDate.setDate(printDate.getDate() + 1),
                            printDate = this._daylightSavingAdjust(printDate);
                        calender += tbody + "</tr>"
                    }
                    11 < ++drawMonth && (drawMonth = 0,
                    drawYear++),
                    group += calender += "</tbody></table>" + (isMultiMonth ? "</div>" + (0 < numMonths[0] && col === numMonths[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : "")
                }
                html += group
            }
            return html += buttonPanel,
            inst._keyEvent = !1,
            html
        },
        _generateMonthYearHeader: function(inst, drawMonth, drawYear, minDate, maxDate, secondary, determineYear, monthNamesShort) {
            var inMinYear, inMaxYear, month, years, thisYear, year, endYear, changeMonth = this._get(inst, "changeMonth"), changeYear = this._get(inst, "changeYear"), showMonthAfterYear = this._get(inst, "showMonthAfterYear"), html = "<div class='ui-datepicker-title'>", monthHtml = "";
            if (secondary || !changeMonth)
                monthHtml += "<span class='ui-datepicker-month'>" + determineYear[drawMonth] + "</span>";
            else {
                for (inMinYear = minDate && minDate.getFullYear() === drawYear,
                inMaxYear = maxDate && maxDate.getFullYear() === drawYear,
                monthHtml += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>",
                month = 0; month < 12; month++)
                    (!inMinYear || month >= minDate.getMonth()) && (!inMaxYear || month <= maxDate.getMonth()) && (monthHtml += "<option value='" + month + "'" + (month === drawMonth ? " selected='selected'" : "") + ">" + monthNamesShort[month] + "</option>");
                monthHtml += "</select>"
            }
            if (showMonthAfterYear || (html += monthHtml + (!secondary && changeMonth && changeYear ? "" : "&#xa0;")),
            !inst.yearshtml)
                if (inst.yearshtml = "",
                secondary || !changeYear)
                    html += "<span class='ui-datepicker-year'>" + drawYear + "</span>";
                else {
                    for (years = this._get(inst, "yearRange").split(":"),
                    thisYear = (new Date).getFullYear(),
                    year = (determineYear = function(year) {
                        year = year.match(/c[+\-].*/) ? drawYear + parseInt(year.substring(1), 10) : year.match(/[+\-].*/) ? thisYear + parseInt(year, 10) : parseInt(year, 10);
                        return isNaN(year) ? thisYear : year
                    }
                    )(years[0]),
                    endYear = Math.max(year, determineYear(years[1] || "")),
                    year = minDate ? Math.max(year, minDate.getFullYear()) : year,
                    endYear = maxDate ? Math.min(endYear, maxDate.getFullYear()) : endYear,
                    inst.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; year <= endYear; year++)
                        inst.yearshtml += "<option value='" + year + "'" + (year === drawYear ? " selected='selected'" : "") + ">" + year + "</option>";
                    inst.yearshtml += "</select>",
                    html += inst.yearshtml,
                    inst.yearshtml = null
                }
            return html += this._get(inst, "yearSuffix"),
            showMonthAfterYear && (html += (!secondary && changeMonth && changeYear ? "" : "&#xa0;") + monthHtml),
            html += "</div>"
        },
        _adjustInstDate: function(inst, date, period) {
            var year = inst.drawYear + ("Y" === period ? date : 0)
              , month = inst.drawMonth + ("M" === period ? date : 0)
              , date = Math.min(inst.selectedDay, this._getDaysInMonth(year, month)) + ("D" === period ? date : 0)
              , date = this._restrictMinMax(inst, this._daylightSavingAdjust(new Date(year,month,date)));
            inst.selectedDay = date.getDate(),
            inst.drawMonth = inst.selectedMonth = date.getMonth(),
            inst.drawYear = inst.selectedYear = date.getFullYear(),
            "M" !== period && "Y" !== period || this._notifyChange(inst)
        },
        _restrictMinMax: function(maxDate, newDate) {
            var minDate = this._getMinMaxDate(maxDate, "min")
              , maxDate = this._getMinMaxDate(maxDate, "max")
              , newDate = minDate && newDate < minDate ? minDate : newDate;
            return maxDate && maxDate < newDate ? maxDate : newDate
        },
        _notifyChange: function(inst) {
            var onChange = this._get(inst, "onChangeMonthYear");
            onChange && onChange.apply(inst.input ? inst.input[0] : null, [inst.selectedYear, inst.selectedMonth + 1, inst])
        },
        _getNumberOfMonths: function(numMonths) {
            numMonths = this._get(numMonths, "numberOfMonths");
            return null == numMonths ? [1, 1] : "number" == typeof numMonths ? [1, numMonths] : numMonths
        },
        _getMinMaxDate: function(inst, minMax) {
            return this._determineDate(inst, this._get(inst, minMax + "Date"), null)
        },
        _getDaysInMonth: function(year, month) {
            return 32 - this._daylightSavingAdjust(new Date(year,month,32)).getDate()
        },
        _getFirstDayOfMonth: function(year, month) {
            return new Date(year,month,1).getDay()
        },
        _canAdjustMonth: function(inst, offset, curYear, curMonth) {
            var date = this._getNumberOfMonths(inst)
              , date = this._daylightSavingAdjust(new Date(curYear,curMonth + (offset < 0 ? offset : date[0] * date[1]),1));
            return offset < 0 && date.setDate(this._getDaysInMonth(date.getFullYear(), date.getMonth())),
            this._isInRange(inst, date)
        },
        _isInRange: function(yearSplit, date) {
            var minDate = this._getMinMaxDate(yearSplit, "min")
              , maxDate = this._getMinMaxDate(yearSplit, "max")
              , minYear = null
              , maxYear = null
              , currentYear = this._get(yearSplit, "yearRange");
            return currentYear && (yearSplit = currentYear.split(":"),
            currentYear = (new Date).getFullYear(),
            minYear = parseInt(yearSplit[0], 10),
            maxYear = parseInt(yearSplit[1], 10),
            yearSplit[0].match(/[+\-].*/) && (minYear += currentYear),
            yearSplit[1].match(/[+\-].*/) && (maxYear += currentYear)),
            (!minDate || date.getTime() >= minDate.getTime()) && (!maxDate || date.getTime() <= maxDate.getTime()) && (!minYear || date.getFullYear() >= minYear) && (!maxYear || date.getFullYear() <= maxYear)
        },
        _getFormatConfig: function(inst) {
            var shortYearCutoff = this._get(inst, "shortYearCutoff");
            return {
                shortYearCutoff: shortYearCutoff = "string" != typeof shortYearCutoff ? shortYearCutoff : (new Date).getFullYear() % 100 + parseInt(shortYearCutoff, 10),
                dayNamesShort: this._get(inst, "dayNamesShort"),
                dayNames: this._get(inst, "dayNames"),
                monthNamesShort: this._get(inst, "monthNamesShort"),
                monthNames: this._get(inst, "monthNames")
            }
        },
        _formatDate: function(inst, date, month, year) {
            date || (inst.currentDay = inst.selectedDay,
            inst.currentMonth = inst.selectedMonth,
            inst.currentYear = inst.selectedYear);
            date = date ? "object" == typeof date ? date : this._daylightSavingAdjust(new Date(year,month,date)) : this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay));
            return this.formatDate(this._get(inst, "dateFormat"), date, this._getFormatConfig(inst))
        }
    }),
    $.fn.datepicker = function(options) {
        if (!this.length)
            return this;
        $.datepicker.initialized || ($(document).mousedown($.datepicker._checkExternalClick),
        $.datepicker.initialized = !0),
        0 === $("#" + $.datepicker._mainDivId).length && $("body").append($.datepicker.dpDiv);
        var otherArgs = Array.prototype.slice.call(arguments, 1);
        return "string" == typeof options && ("isDisabled" === options || "getDate" === options || "widget" === options) || "option" === options && 2 === arguments.length && "string" == typeof arguments[1] ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this[0]].concat(otherArgs)) : this.each(function() {
            "string" == typeof options ? $.datepicker["_" + options + "Datepicker"].apply($.datepicker, [this].concat(otherArgs)) : $.datepicker._attachDatepicker(this, options)
        })
    }
    ,
    $.datepicker = new Datepicker,
    $.datepicker.initialized = !1,
    $.datepicker.uuid = (new Date).getTime(),
    $.datepicker.version = "1.10.4"
}(jQuery),
function($) {
    var sizeRelatedOptions = {
        buttons: !0,
        height: !0,
        maxHeight: !0,
        maxWidth: !0,
        minHeight: !0,
        minWidth: !0,
        width: !0
    }
      , resizableRelatedOptions = {
        maxHeight: !0,
        maxWidth: !0,
        minHeight: !0,
        minWidth: !0
    };
    $.widget("ui.dialog", {
        version: "1.10.4",
        options: {
            appendTo: "body",
            autoOpen: !0,
            buttons: [],
            closeOnEscape: !0,
            closeText: "close",
            dialogClass: "",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function(pos) {
                    var topOffset = $(this).css(pos).offset().top;
                    topOffset < 0 && $(this).css("top", pos.top - topOffset)
                }
            },
            resizable: !0,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        _create: function() {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            },
            this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            },
            this.originalTitle = this.element.attr("title"),
            this.options.title = this.options.title || this.originalTitle,
            this._createWrapper(),
            this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog),
            this._createTitlebar(),
            this._createButtonPane(),
            this.options.draggable && $.fn.draggable && this._makeDraggable(),
            this.options.resizable && $.fn.resizable && this._makeResizable(),
            this._isOpen = !1
        },
        _init: function() {
            this.options.autoOpen && this.open()
        },
        _appendTo: function() {
            var element = this.options.appendTo;
            return element && (element.jquery || element.nodeType) ? $(element) : this.document.find(element || "body").eq(0)
        },
        _destroy: function() {
            var next, originalPosition = this.originalPosition;
            this._destroyOverlay(),
            this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(),
            this.uiDialog.stop(!0, !0).remove(),
            this.originalTitle && this.element.attr("title", this.originalTitle),
            (next = originalPosition.parent.children().eq(originalPosition.index)).length && next[0] !== this.element[0] ? next.before(this.element) : originalPosition.parent.append(this.element)
        },
        widget: function() {
            return this.uiDialog
        },
        disable: $.noop,
        enable: $.noop,
        close: function(event) {
            var activeElement, that = this;
            if (this._isOpen && !1 !== this._trigger("beforeClose", event)) {
                if (this._isOpen = !1,
                this._destroyOverlay(),
                !this.opener.filter(":focusable").focus().length)
                    try {
                        (activeElement = this.document[0].activeElement) && "body" !== activeElement.nodeName.toLowerCase() && $(activeElement).blur()
                    } catch (error) {}
                this._hide(this.uiDialog, this.options.hide, function() {
                    that._trigger("close", event)
                })
            }
        },
        isOpen: function() {
            return this._isOpen
        },
        moveToTop: function() {
            this._moveToTop()
        },
        _moveToTop: function(event, silent) {
            var moved = !!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;
            return moved && !silent && this._trigger("focus", event),
            moved
        },
        open: function() {
            var that = this;
            this._isOpen ? this._moveToTop() && this._focusTabbable() : (this._isOpen = !0,
            this.opener = $(this.document[0].activeElement),
            this._size(),
            this._position(),
            this._createOverlay(),
            this._moveToTop(null, !0),
            this._show(this.uiDialog, this.options.show, function() {
                that._focusTabbable(),
                that._trigger("focus")
            }),
            this._trigger("open"))
        },
        _focusTabbable: function() {
            var hasFocus = this.element.find("[autofocus]");
            (hasFocus = !(hasFocus = !(hasFocus = !(hasFocus = !hasFocus.length ? this.element.find(":tabbable") : hasFocus).length ? this.uiDialogButtonPane.find(":tabbable") : hasFocus).length ? this.uiDialogTitlebarClose.filter(":tabbable") : hasFocus).length ? this.uiDialog : hasFocus).eq(0).focus()
        },
        _keepFocus: function(event) {
            function checkFocus() {
                var activeElement = this.document[0].activeElement;
                this.uiDialog[0] === activeElement || $.contains(this.uiDialog[0], activeElement) || this._focusTabbable()
            }
            event.preventDefault(),
            checkFocus.call(this),
            this._delay(checkFocus)
        },
        _createWrapper: function() {
            this.uiDialog = $("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                tabIndex: -1,
                role: "dialog"
            }).appendTo(this._appendTo()),
            this._on(this.uiDialog, {
                keydown: function(event) {
                    if (this.options.closeOnEscape && !event.isDefaultPrevented() && event.keyCode && event.keyCode === $.ui.keyCode.ESCAPE)
                        return event.preventDefault(),
                        void this.close(event);
                    var first, last;
                    event.keyCode === $.ui.keyCode.TAB && (first = (last = this.uiDialog.find(":tabbable")).filter(":first"),
                    last = last.filter(":last"),
                    event.target !== last[0] && event.target !== this.uiDialog[0] || event.shiftKey ? event.target !== first[0] && event.target !== this.uiDialog[0] || !event.shiftKey || (last.focus(1),
                    event.preventDefault()) : (first.focus(1),
                    event.preventDefault()))
                },
                mousedown: function(event) {
                    this._moveToTop(event) && this._focusTabbable()
                }
            }),
            this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                "aria-describedby": this.element.uniqueId().attr("id")
            })
        },
        _createTitlebar: function() {
            var uiDialogTitle;
            this.uiDialogTitlebar = $("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog),
            this._on(this.uiDialogTitlebar, {
                mousedown: function(event) {
                    $(event.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
                }
            }),
            this.uiDialogTitlebarClose = $("<button type='button'></button>").button({
                label: this.options.closeText,
                icons: {
                    primary: "ui-icon-closethick"
                },
                text: !1
            }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar),
            this._on(this.uiDialogTitlebarClose, {
                click: function(event) {
                    event.preventDefault(),
                    this.close(event)
                }
            }),
            uiDialogTitle = $("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar),
            this._title(uiDialogTitle),
            this.uiDialog.attr({
                "aria-labelledby": uiDialogTitle.attr("id")
            })
        },
        _title: function(title) {
            this.options.title || title.html("&#160;"),
            title.text(this.options.title)
        },
        _createButtonPane: function() {
            this.uiDialogButtonPane = $("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),
            this.uiButtonSet = $("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane),
            this._createButtons()
        },
        _createButtons: function() {
            var that = this
              , buttons = this.options.buttons;
            this.uiDialogButtonPane.remove(),
            this.uiButtonSet.empty(),
            $.isEmptyObject(buttons) || $.isArray(buttons) && !buttons.length ? this.uiDialog.removeClass("ui-dialog-buttons") : ($.each(buttons, function(buttonOptions, props) {
                var click;
                props = $.isFunction(props) ? {
                    click: props,
                    text: buttonOptions
                } : props,
                props = $.extend({
                    type: "button"
                }, props),
                click = props.click,
                props.click = function() {
                    click.apply(that.element[0], arguments)
                }
                ,
                buttonOptions = {
                    icons: props.icons,
                    text: props.showText
                },
                delete props.icons,
                delete props.showText,
                $("<button></button>", props).button(buttonOptions).appendTo(that.uiButtonSet)
            }),
            this.uiDialog.addClass("ui-dialog-buttons"),
            this.uiDialogButtonPane.appendTo(this.uiDialog))
        },
        _makeDraggable: function() {
            var that = this
              , options = this.options;
            function filteredUi(ui) {
                return {
                    position: ui.position,
                    offset: ui.offset
                }
            }
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(event, ui) {
                    $(this).addClass("ui-dialog-dragging"),
                    that._blockFrames(),
                    that._trigger("dragStart", event, filteredUi(ui))
                },
                drag: function(event, ui) {
                    that._trigger("drag", event, filteredUi(ui))
                },
                stop: function(event, ui) {
                    options.position = [ui.position.left - that.document.scrollLeft(), ui.position.top - that.document.scrollTop()],
                    $(this).removeClass("ui-dialog-dragging"),
                    that._unblockFrames(),
                    that._trigger("dragStop", event, filteredUi(ui))
                }
            })
        },
        _makeResizable: function() {
            var that = this
              , options = this.options
              , resizeHandles = options.resizable
              , position = this.uiDialog.css("position")
              , resizeHandles = "string" == typeof resizeHandles ? resizeHandles : "n,e,s,w,se,sw,ne,nw";
            function filteredUi(ui) {
                return {
                    originalPosition: ui.originalPosition,
                    originalSize: ui.originalSize,
                    position: ui.position,
                    size: ui.size
                }
            }
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: options.maxWidth,
                maxHeight: options.maxHeight,
                minWidth: options.minWidth,
                minHeight: this._minHeight(),
                handles: resizeHandles,
                start: function(event, ui) {
                    $(this).addClass("ui-dialog-resizing"),
                    that._blockFrames(),
                    that._trigger("resizeStart", event, filteredUi(ui))
                },
                resize: function(event, ui) {
                    that._trigger("resize", event, filteredUi(ui))
                },
                stop: function(event, ui) {
                    options.height = $(this).height(),
                    options.width = $(this).width(),
                    $(this).removeClass("ui-dialog-resizing"),
                    that._unblockFrames(),
                    that._trigger("resizeStop", event, filteredUi(ui))
                }
            }).css("position", position)
        },
        _minHeight: function() {
            var options = this.options;
            return "auto" === options.height ? options.minHeight : Math.min(options.minHeight, options.height)
        },
        _position: function() {
            var isVisible = this.uiDialog.is(":visible");
            isVisible || this.uiDialog.show(),
            this.uiDialog.position(this.options.position),
            isVisible || this.uiDialog.hide()
        },
        _setOptions: function(options) {
            var that = this
              , resize = !1
              , resizableOptions = {};
            $.each(options, function(key, value) {
                that._setOption(key, value),
                key in sizeRelatedOptions && (resize = !0),
                key in resizableRelatedOptions && (resizableOptions[key] = value)
            }),
            resize && (this._size(),
            this._position()),
            this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", resizableOptions)
        },
        _setOption: function(key, value) {
            var isResizable, uiDialog = this.uiDialog;
            "dialogClass" === key && uiDialog.removeClass(this.options.dialogClass).addClass(value),
            "disabled" !== key && (this._super(key, value),
            "appendTo" === key && this.uiDialog.appendTo(this._appendTo()),
            "buttons" === key && this._createButtons(),
            "closeText" === key && this.uiDialogTitlebarClose.button({
                label: "" + value
            }),
            "draggable" === key && ((isResizable = uiDialog.is(":data(ui-draggable)")) && !value && uiDialog.draggable("destroy"),
            !isResizable && value && this._makeDraggable()),
            "position" === key && this._position(),
            "resizable" === key && ((isResizable = uiDialog.is(":data(ui-resizable)")) && !value && uiDialog.resizable("destroy"),
            isResizable && "string" == typeof value && uiDialog.resizable("option", "handles", value),
            isResizable || !1 === value || this._makeResizable()),
            "title" === key && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
        },
        _size: function() {
            var nonContentHeight, minContentHeight, maxContentHeight, options = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            }),
            options.minWidth > options.width && (options.width = options.minWidth),
            nonContentHeight = this.uiDialog.css({
                height: "auto",
                width: options.width
            }).outerHeight(),
            minContentHeight = Math.max(0, options.minHeight - nonContentHeight),
            maxContentHeight = "number" == typeof options.maxHeight ? Math.max(0, options.maxHeight - nonContentHeight) : "none",
            "auto" === options.height ? this.element.css({
                minHeight: minContentHeight,
                maxHeight: maxContentHeight,
                height: "auto"
            }) : this.element.height(Math.max(0, options.height - nonContentHeight)),
            this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
        },
        _blockFrames: function() {
            this.iframeBlocks = this.document.find("iframe").map(function() {
                var iframe = $(this);
                return $("<div>").css({
                    position: "absolute",
                    width: iframe.outerWidth(),
                    height: iframe.outerHeight()
                }).appendTo(iframe.parent()).offset(iframe.offset())[0]
            })
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(),
            delete this.iframeBlocks)
        },
        _allowInteraction: function(event) {
            return !!$(event.target).closest(".ui-dialog").length || !!$(event.target).closest(".ui-datepicker").length
        },
        _createOverlay: function() {
            var that, widgetFullName;
            this.options.modal && (widgetFullName = (that = this).widgetFullName,
            $.ui.dialog.overlayInstances || this._delay(function() {
                $.ui.dialog.overlayInstances && this.document.bind("focusin.dialog", function(event) {
                    that._allowInteraction(event) || (event.preventDefault(),
                    $(".ui-dialog:visible:last .ui-dialog-content").data(widgetFullName)._focusTabbable())
                })
            }),
            this.overlay = $("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()),
            this._on(this.overlay, {
                mousedown: "_keepFocus"
            }),
            $.ui.dialog.overlayInstances++)
        },
        _destroyOverlay: function() {
            this.options.modal && this.overlay && ($.ui.dialog.overlayInstances--,
            $.ui.dialog.overlayInstances || this.document.unbind("focusin.dialog"),
            this.overlay.remove(),
            this.overlay = null)
        }
    }),
    $.ui.dialog.overlayInstances = 0,
    !1 !== $.uiBackCompat && $.widget("ui.dialog", $.ui.dialog, {
        _position: function() {
            var position = this.options.position
              , myAt = []
              , offset = [0, 0]
              , position = position ? (("string" == typeof position || "object" == typeof position && "0"in position) && (1 === (myAt = position.split ? position.split(" ") : [position[0], position[1]]).length && (myAt[1] = myAt[0]),
            $.each(["left", "top"], function(i, offsetPosition) {
                +myAt[i] === myAt[i] && (offset[i] = myAt[i],
                myAt[i] = offsetPosition)
            }),
            position = {
                my: myAt[0] + (offset[0] < 0 ? offset[0] : "+" + offset[0]) + " " + myAt[1] + (offset[1] < 0 ? offset[1] : "+" + offset[1]),
                at: myAt.join(" ")
            }),
            $.extend({}, $.ui.dialog.prototype.options.position, position)) : $.ui.dialog.prototype.options.position
              , isVisible = this.uiDialog.is(":visible");
            isVisible || this.uiDialog.show(),
            this.uiDialog.position(position),
            isVisible || this.uiDialog.hide()
        }
    })
}(jQuery),
function($) {
    var rvertical = /up|down|vertical/
      , rpositivemotion = /up|left|vertical|horizontal/;
    $.effects.effect.blind = function(o, done) {
        var wrapper, distance, el = $(this), props = ["position", "top", "bottom", "left", "right", "height", "width"], mode = $.effects.setMode(el, o.mode || "hide"), margin = o.direction || "up", vertical = rvertical.test(margin), ref = vertical ? "height" : "width", ref2 = vertical ? "top" : "left", motion = rpositivemotion.test(margin), animation = {}, show = "show" === mode;
        el.parent().is(".ui-effects-wrapper") ? $.effects.save(el.parent(), props) : $.effects.save(el, props),
        el.show(),
        distance = (wrapper = $.effects.createWrapper(el).css({
            overflow: "hidden"
        }))[ref](),
        margin = parseFloat(wrapper.css(ref2)) || 0,
        animation[ref] = show ? distance : 0,
        motion || (el.css(vertical ? "bottom" : "right", 0).css(vertical ? "top" : "left", "auto").css({
            position: "absolute"
        }),
        animation[ref2] = show ? margin : distance + margin),
        show && (wrapper.css(ref, 0),
        motion || wrapper.css(ref2, margin + distance)),
        wrapper.animate(animation, {
            duration: o.duration,
            easing: o.easing,
            queue: !1,
            complete: function() {
                "hide" === mode && el.hide(),
                $.effects.restore(el, props),
                $.effects.removeWrapper(el),
                done()
            }
        })
    }
}(jQuery),
function($) {
    $.effects.effect.bounce = function(queue, done) {
        var i, upAnim, downAnim, el = $(this), props = ["position", "top", "bottom", "left", "right", "height", "width"], anims = $.effects.setMode(el, queue.mode || "effect"), hide = "hide" === anims, show = "show" === anims, queuelen = queue.direction || "up", distance = queue.distance, times = queue.times || 5, anims = 2 * times + (show || hide ? 1 : 0), speed = queue.duration / anims, easing = queue.easing, ref = "up" === queuelen || "down" === queuelen ? "top" : "left", motion = "up" === queuelen || "left" === queuelen, queue = el.queue(), queuelen = queue.length;
        for ((show || hide) && props.push("opacity"),
        $.effects.save(el, props),
        el.show(),
        $.effects.createWrapper(el),
        distance = distance || el["top" == ref ? "outerHeight" : "outerWidth"]() / 3,
        show && ((downAnim = {
            opacity: 1
        })[ref] = 0,
        el.css("opacity", 0).css(ref, motion ? 2 * -distance : 2 * distance).animate(downAnim, speed, easing)),
        hide && (distance /= Math.pow(2, times - 1)),
        i = (downAnim = {})[ref] = 0; i < times; i++)
            (upAnim = {})[ref] = (motion ? "-=" : "+=") + distance,
            el.animate(upAnim, speed, easing).animate(downAnim, speed, easing),
            distance = hide ? 2 * distance : distance / 2;
        hide && ((upAnim = {
            opacity: 0
        })[ref] = (motion ? "-=" : "+=") + distance,
        el.animate(upAnim, speed, easing)),
        el.queue(function() {
            hide && el.hide(),
            $.effects.restore(el, props),
            $.effects.removeWrapper(el),
            done()
        }),
        1 < queuelen && queue.splice.apply(queue, [1, 0].concat(queue.splice(queuelen, 1 + anims))),
        el.dequeue()
    }
}(jQuery),
function($) {
    $.effects.effect.clip = function(o, done) {
        var distance, el = $(this), props = ["position", "top", "bottom", "left", "right", "height", "width"], show = "show" === $.effects.setMode(el, o.mode || "hide"), animate = "vertical" === (o.direction || "vertical"), size = animate ? "height" : "width", position = animate ? "top" : "left", animation = {};
        $.effects.save(el, props),
        el.show(),
        distance = $.effects.createWrapper(el).css({
            overflow: "hidden"
        }),
        distance = (animate = "IMG" === el[0].tagName ? distance : el)[size](),
        show && (animate.css(size, 0),
        animate.css(position, distance / 2)),
        animation[size] = show ? distance : 0,
        animation[position] = show ? 0 : distance / 2,
        animate.animate(animation, {
            queue: !1,
            duration: o.duration,
            easing: o.easing,
            complete: function() {
                show || el.hide(),
                $.effects.restore(el, props),
                $.effects.removeWrapper(el),
                done()
            }
        })
    }
}(jQuery),
function($) {
    $.effects.effect.drop = function(o, done) {
        var el = $(this)
          , props = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"]
          , mode = $.effects.setMode(el, o.mode || "hide")
          , show = "show" === mode
          , distance = o.direction || "left"
          , ref = "up" === distance || "down" === distance ? "top" : "left"
          , motion = "up" === distance || "left" === distance ? "pos" : "neg"
          , animation = {
            opacity: show ? 1 : 0
        };
        $.effects.save(el, props),
        el.show(),
        $.effects.createWrapper(el),
        distance = o.distance || el["top" == ref ? "outerHeight" : "outerWidth"](!0) / 2,
        show && el.css("opacity", 0).css(ref, "pos" == motion ? -distance : distance),
        animation[ref] = (show ? "pos" == motion ? "+=" : "-=" : "pos" == motion ? "-=" : "+=") + distance,
        el.animate(animation, {
            queue: !1,
            duration: o.duration,
            easing: o.easing,
            complete: function() {
                "hide" === mode && el.hide(),
                $.effects.restore(el, props),
                $.effects.removeWrapper(el),
                done()
            }
        })
    }
}(jQuery),
function($) {
    $.effects.effect.explode = function(o, done) {
        var i, j, left, top, mx, my, rows = o.pieces ? Math.round(Math.sqrt(o.pieces)) : 3, cells = rows, el = $(this), show = "show" === $.effects.setMode(el, o.mode || "hide"), offset = el.show().css("visibility", "hidden").offset(), width = Math.ceil(el.outerWidth() / cells), height = Math.ceil(el.outerHeight() / rows), pieces = [];
        function childComplete() {
            pieces.push(this),
            pieces.length === rows * cells && function() {
                el.css({
                    visibility: "visible"
                }),
                $(pieces).remove(),
                show || el.hide();
                done()
            }()
        }
        for (i = 0; i < rows; i++)
            for (top = offset.top + i * height,
            my = i - (rows - 1) / 2,
            j = 0; j < cells; j++)
                left = offset.left + j * width,
                mx = j - (cells - 1) / 2,
                el.clone().appendTo("body").wrap("<div></div>").css({
                    position: "absolute",
                    visibility: "visible",
                    left: -j * width,
                    top: -i * height
                }).parent().addClass("ui-effects-explode").css({
                    position: "absolute",
                    overflow: "hidden",
                    width: width,
                    height: height,
                    left: left + (show ? mx * width : 0),
                    top: top + (show ? my * height : 0),
                    opacity: show ? 0 : 1
                }).animate({
                    left: left + (show ? 0 : mx * width),
                    top: top + (show ? 0 : my * height),
                    opacity: show ? 1 : 0
                }, o.duration || 500, o.easing, childComplete)
    }
}(jQuery),
function($) {
    $.effects.effect.fade = function(o, done) {
        var el = $(this)
          , mode = $.effects.setMode(el, o.mode || "toggle");
        el.animate({
            opacity: mode
        }, {
            queue: !1,
            duration: o.duration,
            easing: o.easing,
            complete: done
        })
    }
}(jQuery),
function($) {
    $.effects.effect.fold = function(o, done) {
        var el = $(this)
          , props = ["position", "top", "bottom", "left", "right", "height", "width"]
          , wrapper = $.effects.setMode(el, o.mode || "hide")
          , show = "show" === wrapper
          , hide = "hide" === wrapper
          , size = o.size || 15
          , percent = /([0-9]+)%/.exec(size)
          , horizFirst = !!o.horizFirst
          , distance = show != horizFirst
          , ref = distance ? ["width", "height"] : ["height", "width"]
          , duration = o.duration / 2
          , animation1 = {}
          , animation2 = {};
        $.effects.save(el, props),
        el.show(),
        wrapper = $.effects.createWrapper(el).css({
            overflow: "hidden"
        }),
        distance = distance ? [wrapper.width(), wrapper.height()] : [wrapper.height(), wrapper.width()],
        percent && (size = parseInt(percent[1], 10) / 100 * distance[hide ? 0 : 1]),
        show && wrapper.css(horizFirst ? {
            height: 0,
            width: size
        } : {
            height: size,
            width: 0
        }),
        animation1[ref[0]] = show ? distance[0] : size,
        animation2[ref[1]] = show ? distance[1] : 0,
        wrapper.animate(animation1, duration, o.easing).animate(animation2, duration, o.easing, function() {
            hide && el.hide(),
            $.effects.restore(el, props),
            $.effects.removeWrapper(el),
            done()
        })
    }
}(jQuery),
function($) {
    $.effects.effect.highlight = function(o, done) {
        var elem = $(this)
          , props = ["backgroundImage", "backgroundColor", "opacity"]
          , mode = $.effects.setMode(elem, o.mode || "show")
          , animation = {
            backgroundColor: elem.css("backgroundColor")
        };
        "hide" === mode && (animation.opacity = 0),
        $.effects.save(elem, props),
        elem.show().css({
            backgroundImage: "none",
            backgroundColor: o.color || "#ffff99"
        }).animate(animation, {
            queue: !1,
            duration: o.duration,
            easing: o.easing,
            complete: function() {
                "hide" === mode && elem.hide(),
                $.effects.restore(elem, props),
                done()
            }
        })
    }
}(jQuery),
function($) {
    $.effects.effect.pulsate = function(o, done) {
        var i, elem = $(this), queuelen = $.effects.setMode(elem, o.mode || "show"), show = "show" === queuelen, hide = "hide" === queuelen, anims = 2 * (o.times || 5) + (show || "hide" === queuelen ? 1 : 0), duration = o.duration / anims, animateTo = 0, queue = elem.queue(), queuelen = queue.length;
        for (!show && elem.is(":visible") || (elem.css("opacity", 0).show(),
        animateTo = 1),
        i = 1; i < anims; i++)
            elem.animate({
                opacity: animateTo
            }, duration, o.easing),
            animateTo = 1 - animateTo;
        elem.animate({
            opacity: animateTo
        }, duration, o.easing),
        elem.queue(function() {
            hide && elem.hide(),
            done()
        }),
        1 < queuelen && queue.splice.apply(queue, [1, 0].concat(queue.splice(queuelen, 1 + anims))),
        elem.dequeue()
    }
}(jQuery),
function($) {
    $.effects.effect.puff = function(o, done) {
        var elem = $(this)
          , mode = $.effects.setMode(elem, o.mode || "hide")
          , hide = "hide" === mode
          , percent = parseInt(o.percent, 10) || 150
          , factor = percent / 100
          , original = {
            height: elem.height(),
            width: elem.width(),
            outerHeight: elem.outerHeight(),
            outerWidth: elem.outerWidth()
        };
        $.extend(o, {
            effect: "scale",
            queue: !1,
            fade: !0,
            mode: mode,
            complete: done,
            percent: hide ? percent : 100,
            from: hide ? original : {
                height: original.height * factor,
                width: original.width * factor,
                outerHeight: original.outerHeight * factor,
                outerWidth: original.outerWidth * factor
            }
        }),
        elem.effect(o)
    }
    ,
    $.effects.effect.scale = function(o, done) {
        var el = $(this)
          , options = $.extend(!0, {}, o)
          , mode = $.effects.setMode(el, o.mode || "effect")
          , factor_x = parseInt(o.percent, 10) || (0 === parseInt(o.percent, 10) || "hide" === mode ? 0 : 100)
          , direction = o.direction || "both"
          , origin = o.origin
          , original = {
            height: el.height(),
            width: el.width(),
            outerHeight: el.outerHeight(),
            outerWidth: el.outerWidth()
        }
          , factor_y = "horizontal" !== direction ? factor_x / 100 : 1
          , factor_x = "vertical" !== direction ? factor_x / 100 : 1;
        options.effect = "size",
        options.queue = !1,
        options.complete = done,
        "effect" !== mode && (options.origin = origin || ["middle", "center"],
        options.restore = !0),
        options.from = o.from || ("show" === mode ? {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        } : original),
        options.to = {
            height: original.height * factor_y,
            width: original.width * factor_x,
            outerHeight: original.outerHeight * factor_y,
            outerWidth: original.outerWidth * factor_x
        },
        options.fade && ("show" === mode && (options.from.opacity = 0,
        options.to.opacity = 1),
        "hide" === mode && (options.from.opacity = 1,
        options.to.opacity = 0)),
        el.effect(options)
    }
    ,
    $.effects.effect.size = function(o, done) {
        var original, factor, el = $(this), props0 = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"], props2 = ["width", "height", "overflow"], cProps = ["fontSize"], vProps = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"], hProps = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"], mode = $.effects.setMode(el, o.mode || "effect"), restore = o.restore || "effect" !== mode, scale = o.scale || "both", baseline = o.origin || ["middle", "center"], position = el.css("position"), props = restore ? props0 : ["position", "top", "bottom", "left", "right", "overflow", "opacity"], zero = {
            height: 0,
            width: 0,
            outerHeight: 0,
            outerWidth: 0
        };
        "show" === mode && el.show(),
        original = {
            height: el.height(),
            width: el.width(),
            outerHeight: el.outerHeight(),
            outerWidth: el.outerWidth()
        },
        "toggle" === o.mode && "show" === mode ? (el.from = o.to || zero,
        el.to = o.from || original) : (el.from = o.from || ("show" === mode ? zero : original),
        el.to = o.to || ("hide" === mode ? zero : original)),
        factor = {
            from: {
                y: el.from.height / original.height,
                x: el.from.width / original.width
            },
            to: {
                y: el.to.height / original.height,
                x: el.to.width / original.width
            }
        },
        "box" !== scale && "both" !== scale || (factor.from.y !== factor.to.y && (props = props.concat(vProps),
        el.from = $.effects.setTransition(el, vProps, factor.from.y, el.from),
        el.to = $.effects.setTransition(el, vProps, factor.to.y, el.to)),
        factor.from.x !== factor.to.x && (props = props.concat(hProps),
        el.from = $.effects.setTransition(el, hProps, factor.from.x, el.from),
        el.to = $.effects.setTransition(el, hProps, factor.to.x, el.to))),
        "content" !== scale && "both" !== scale || factor.from.y !== factor.to.y && (props = props.concat(cProps).concat(props2),
        el.from = $.effects.setTransition(el, cProps, factor.from.y, el.from),
        el.to = $.effects.setTransition(el, cProps, factor.to.y, el.to)),
        $.effects.save(el, props),
        el.show(),
        $.effects.createWrapper(el),
        el.css("overflow", "hidden").css(el.from),
        baseline && (baseline = $.effects.getBaseline(baseline, original),
        el.from.top = (original.outerHeight - el.outerHeight()) * baseline.y,
        el.from.left = (original.outerWidth - el.outerWidth()) * baseline.x,
        el.to.top = (original.outerHeight - el.to.outerHeight) * baseline.y,
        el.to.left = (original.outerWidth - el.to.outerWidth) * baseline.x),
        el.css(el.from),
        "content" !== scale && "both" !== scale || (vProps = vProps.concat(["marginTop", "marginBottom"]).concat(cProps),
        hProps = hProps.concat(["marginLeft", "marginRight"]),
        props2 = props0.concat(vProps).concat(hProps),
        el.find("*[width]").each(function() {
            var child = $(this)
              , c_original_height = child.height()
              , c_original_width = child.width()
              , c_original_outerHeight = child.outerHeight()
              , c_original_outerWidth = child.outerWidth();
            restore && $.effects.save(child, props2),
            child.from = {
                height: c_original_height * factor.from.y,
                width: c_original_width * factor.from.x,
                outerHeight: c_original_outerHeight * factor.from.y,
                outerWidth: c_original_outerWidth * factor.from.x
            },
            child.to = {
                height: c_original_height * factor.to.y,
                width: c_original_width * factor.to.x,
                outerHeight: c_original_height * factor.to.y,
                outerWidth: c_original_width * factor.to.x
            },
            factor.from.y !== factor.to.y && (child.from = $.effects.setTransition(child, vProps, factor.from.y, child.from),
            child.to = $.effects.setTransition(child, vProps, factor.to.y, child.to)),
            factor.from.x !== factor.to.x && (child.from = $.effects.setTransition(child, hProps, factor.from.x, child.from),
            child.to = $.effects.setTransition(child, hProps, factor.to.x, child.to)),
            child.css(child.from),
            child.animate(child.to, o.duration, o.easing, function() {
                restore && $.effects.restore(child, props2)
            })
        })),
        el.animate(el.to, {
            queue: !1,
            duration: o.duration,
            easing: o.easing,
            complete: function() {
                0 === el.to.opacity && el.css("opacity", el.from.opacity),
                "hide" === mode && el.hide(),
                $.effects.restore(el, props),
                restore || ("static" === position ? el.css({
                    position: "relative",
                    top: el.to.top,
                    left: el.to.left
                }) : $.each(["top", "left"], function(idx, pos) {
                    el.css(pos, function(_, str) {
                        var val = parseInt(str, 10)
                          , toRef = idx ? el.to.left : el.to.top;
                        return "auto" === str ? toRef + "px" : val + toRef + "px"
                    })
                })),
                $.effects.removeWrapper(el),
                done()
            }
        })
    }
}(jQuery),
function($) {
    $.effects.effect.shake = function(o, done) {
        var i, el = $(this), props = ["position", "top", "bottom", "left", "right", "height", "width"], mode = $.effects.setMode(el, o.mode || "effect"), queuelen = o.direction || "left", distance = o.distance || 20, times = o.times || 3, anims = 2 * times + 1, speed = Math.round(o.duration / anims), ref = "up" === queuelen || "down" === queuelen ? "top" : "left", positiveMotion = "up" === queuelen || "left" === queuelen, animation = {}, animation1 = {}, animation2 = {}, queue = el.queue(), queuelen = queue.length;
        for ($.effects.save(el, props),
        el.show(),
        $.effects.createWrapper(el),
        animation[ref] = (positiveMotion ? "-=" : "+=") + distance,
        animation1[ref] = (positiveMotion ? "+=" : "-=") + 2 * distance,
        animation2[ref] = (positiveMotion ? "-=" : "+=") + 2 * distance,
        el.animate(animation, speed, o.easing),
        i = 1; i < times; i++)
            el.animate(animation1, speed, o.easing).animate(animation2, speed, o.easing);
        el.animate(animation1, speed, o.easing).animate(animation, speed / 2, o.easing).queue(function() {
            "hide" === mode && el.hide(),
            $.effects.restore(el, props),
            $.effects.removeWrapper(el),
            done()
        }),
        1 < queuelen && queue.splice.apply(queue, [1, 0].concat(queue.splice(queuelen, 1 + anims))),
        el.dequeue()
    }
}(jQuery),
function($) {
    $.effects.effect.slide = function(o, done) {
        var el = $(this)
          , props = ["position", "top", "bottom", "left", "right", "width", "height"]
          , mode = $.effects.setMode(el, o.mode || "show")
          , show = "show" === mode
          , distance = o.direction || "left"
          , ref = "up" === distance || "down" === distance ? "top" : "left"
          , positiveMotion = "up" === distance || "left" === distance
          , animation = {};
        $.effects.save(el, props),
        el.show(),
        distance = o.distance || el["top" == ref ? "outerHeight" : "outerWidth"](!0),
        $.effects.createWrapper(el).css({
            overflow: "hidden"
        }),
        show && el.css(ref, positiveMotion ? isNaN(distance) ? "-" + distance : -distance : distance),
        animation[ref] = (show ? positiveMotion ? "+=" : "-=" : positiveMotion ? "-=" : "+=") + distance,
        el.animate(animation, {
            queue: !1,
            duration: o.duration,
            easing: o.easing,
            complete: function() {
                "hide" === mode && el.hide(),
                $.effects.restore(el, props),
                $.effects.removeWrapper(el),
                done()
            }
        })
    }
}(jQuery),
function($) {
    $.effects.effect.transfer = function(o, done) {
        var elem = $(this)
          , startPosition = $(o.to)
          , targetFixed = "fixed" === startPosition.css("position")
          , animation = $("body")
          , fixTop = targetFixed ? animation.scrollTop() : 0
          , fixLeft = targetFixed ? animation.scrollLeft() : 0
          , animation = startPosition.offset()
          , animation = {
            top: animation.top - fixTop,
            left: animation.left - fixLeft,
            height: startPosition.innerHeight(),
            width: startPosition.innerWidth()
        }
          , startPosition = elem.offset()
          , transfer = $("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(o.className).css({
            top: startPosition.top - fixTop,
            left: startPosition.left - fixLeft,
            height: elem.innerHeight(),
            width: elem.innerWidth(),
            position: targetFixed ? "fixed" : "absolute"
        }).animate(animation, o.duration, o.easing, function() {
            transfer.remove(),
            done()
        })
    }
}(jQuery),
function($) {
    $.widget("ui.menu", {
        version: "1.10.4",
        defaultElement: "<ul>",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function() {
            this.activeMenu = this.element,
            this.mouseHandled = !1,
            this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }).bind("click" + this.eventNamespace, $.proxy(function(event) {
                this.options.disabled && event.preventDefault()
            }, this)),
            this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"),
            this._on({
                "mousedown .ui-menu-item > a": function(event) {
                    event.preventDefault()
                },
                "click .ui-state-disabled > a": function(event) {
                    event.preventDefault()
                },
                "click .ui-menu-item:has(a)": function(event) {
                    var target = $(event.target).closest(".ui-menu-item");
                    !this.mouseHandled && target.not(".ui-state-disabled").length && (this.select(event),
                    event.isPropagationStopped() || (this.mouseHandled = !0),
                    target.has(".ui-menu").length ? this.expand(event) : !this.element.is(":focus") && $(this.document[0].activeElement).closest(".ui-menu").length && (this.element.trigger("focus", [!0]),
                    this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                },
                "mouseenter .ui-menu-item": function(event) {
                    var target = $(event.currentTarget);
                    target.siblings().children(".ui-state-active").removeClass("ui-state-active"),
                    this.focus(event, target)
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(event, keepActiveItem) {
                    var item = this.active || this.element.children(".ui-menu-item").eq(0);
                    keepActiveItem || this.focus(event, item)
                },
                blur: function(event) {
                    this._delay(function() {
                        $.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(event)
                    })
                },
                keydown: "_keydown"
            }),
            this.refresh(),
            this._on(this.document, {
                click: function(event) {
                    $(event.target).closest(".ui-menu").length || this.collapseAll(event),
                    this.mouseHandled = !1
                }
            })
        },
        _destroy: function() {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(),
            this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                var elem = $(this);
                elem.data("ui-menu-submenu-carat") && elem.remove()
            }),
            this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function(event) {
            var match, character, skip, regex, preventDefault = !0;
            function escape(value) {
                return value.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            }
            switch (event.keyCode) {
            case $.ui.keyCode.PAGE_UP:
                this.previousPage(event);
                break;
            case $.ui.keyCode.PAGE_DOWN:
                this.nextPage(event);
                break;
            case $.ui.keyCode.HOME:
                this._move("first", "first", event);
                break;
            case $.ui.keyCode.END:
                this._move("last", "last", event);
                break;
            case $.ui.keyCode.UP:
                this.previous(event);
                break;
            case $.ui.keyCode.DOWN:
                this.next(event);
                break;
            case $.ui.keyCode.LEFT:
                this.collapse(event);
                break;
            case $.ui.keyCode.RIGHT:
                this.active && !this.active.is(".ui-state-disabled") && this.expand(event);
                break;
            case $.ui.keyCode.ENTER:
            case $.ui.keyCode.SPACE:
                this._activate(event);
                break;
            case $.ui.keyCode.ESCAPE:
                this.collapse(event);
                break;
            default:
                preventDefault = !1,
                match = this.previousFilter || "",
                character = String.fromCharCode(event.keyCode),
                skip = !1,
                clearTimeout(this.filterTimer),
                character === match ? skip = !0 : character = match + character,
                regex = new RegExp("^" + escape(character),"i"),
                match = this.activeMenu.children(".ui-menu-item").filter(function() {
                    return regex.test($(this).children("a").text())
                }),
                (match = skip && -1 !== match.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : match).length || (character = String.fromCharCode(event.keyCode),
                regex = new RegExp("^" + escape(character),"i"),
                match = this.activeMenu.children(".ui-menu-item").filter(function() {
                    return regex.test($(this).children("a").text())
                })),
                match.length ? (this.focus(event, match),
                1 < match.length ? (this.previousFilter = character,
                this.filterTimer = this._delay(function() {
                    delete this.previousFilter
                }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
            }
            preventDefault && event.preventDefault()
        },
        _activate: function(event) {
            this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(event) : this.select(event))
        },
        refresh: function() {
            var icon = this.options.icons.submenu
              , menus = this.element.find(this.options.menus);
            this.element.toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length),
            menus.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function() {
                var menu = $(this)
                  , item = menu.prev("a")
                  , submenuCarat = $("<span>").addClass("ui-menu-icon ui-icon " + icon).data("ui-menu-submenu-carat", !0);
                item.attr("aria-haspopup", "true").prepend(submenuCarat),
                menu.attr("aria-labelledby", item.attr("id"))
            }),
            (menus = menus.add(this.element)).children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                tabIndex: -1,
                role: this._itemRole()
            }),
            menus.children(":not(.ui-menu-item)").each(function() {
                var item = $(this);
                /[^\-\u2014\u2013\s]/.test(item.text()) || item.addClass("ui-widget-content ui-menu-divider")
            }),
            menus.children(".ui-state-disabled").attr("aria-disabled", "true"),
            this.active && !$.contains(this.element[0], this.active[0]) && this.blur()
        },
        _itemRole: function() {
            return {
                menu: "menuitem",
                listbox: "option"
            }[this.options.role]
        },
        _setOption: function(key, value) {
            "icons" === key && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(value.submenu),
            this._super(key, value)
        },
        focus: function(event, item) {
            var nested;
            this.blur(event, event && "focus" === event.type),
            this._scrollIntoView(item),
            this.active = item.first(),
            nested = this.active.children("a").addClass("ui-state-focus"),
            this.options.role && this.element.attr("aria-activedescendant", nested.attr("id")),
            this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"),
            event && "keydown" === event.type ? this._close() : this.timer = this._delay(function() {
                this._close()
            }, this.delay),
            (nested = item.children(".ui-menu")).length && event && /^mouse/.test(event.type) && this._startOpening(nested),
            this.activeMenu = item.parent(),
            this._trigger("focus", event, {
                item: item
            })
        },
        _scrollIntoView: function(itemHeight) {
            var offset, scroll, elementHeight;
            this._hasScroll() && (scroll = parseFloat($.css(this.activeMenu[0], "borderTopWidth")) || 0,
            elementHeight = parseFloat($.css(this.activeMenu[0], "paddingTop")) || 0,
            offset = itemHeight.offset().top - this.activeMenu.offset().top - scroll - elementHeight,
            scroll = this.activeMenu.scrollTop(),
            elementHeight = this.activeMenu.height(),
            itemHeight = itemHeight.height(),
            offset < 0 ? this.activeMenu.scrollTop(scroll + offset) : elementHeight < offset + itemHeight && this.activeMenu.scrollTop(scroll + offset - elementHeight + itemHeight))
        },
        blur: function(event, fromFocus) {
            fromFocus || clearTimeout(this.timer),
            this.active && (this.active.children("a").removeClass("ui-state-focus"),
            this.active = null,
            this._trigger("blur", event, {
                item: this.active
            }))
        },
        _startOpening: function(submenu) {
            clearTimeout(this.timer),
            "true" === submenu.attr("aria-hidden") && (this.timer = this._delay(function() {
                this._close(),
                this._open(submenu)
            }, this.delay))
        },
        _open: function(submenu) {
            var position = $.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer),
            this.element.find(".ui-menu").not(submenu.parents(".ui-menu")).hide().attr("aria-hidden", "true"),
            submenu.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(position)
        },
        collapseAll: function(event, all) {
            clearTimeout(this.timer),
            this.timer = this._delay(function() {
                var currentMenu = all ? this.element : $(event && event.target).closest(this.element.find(".ui-menu"));
                currentMenu.length || (currentMenu = this.element),
                this._close(currentMenu),
                this.blur(event),
                this.activeMenu = currentMenu
            }, this.delay)
        },
        _close: function(startMenu) {
            (startMenu = startMenu || (this.active ? this.active.parent() : this.element)).find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
        },
        collapse: function(event) {
            var newItem = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            newItem && newItem.length && (this._close(),
            this.focus(event, newItem))
        },
        expand: function(event) {
            var newItem = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            newItem && newItem.length && (this._open(newItem.parent()),
            this._delay(function() {
                this.focus(event, newItem)
            }))
        },
        next: function(event) {
            this._move("next", "first", event)
        },
        previous: function(event) {
            this._move("prev", "last", event)
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function(direction, filter, event) {
            var next;
            (next = this.active ? "first" === direction || "last" === direction ? this.active["first" === direction ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[direction + "All"](".ui-menu-item").eq(0) : next) && next.length && this.active || (next = this.activeMenu.children(".ui-menu-item")[filter]()),
            this.focus(event, next)
        },
        nextPage: function(event) {
            var item, base, height;
            this.active ? this.isLastItem() || (this._hasScroll() ? (base = this.active.offset().top,
            height = this.element.height(),
            this.active.nextAll(".ui-menu-item").each(function() {
                return (item = $(this)).offset().top - base - height < 0
            }),
            this.focus(event, item)) : this.focus(event, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())) : this.next(event)
        },
        previousPage: function(event) {
            var item, base, height;
            this.active ? this.isFirstItem() || (this._hasScroll() ? (base = this.active.offset().top,
            height = this.element.height(),
            this.active.prevAll(".ui-menu-item").each(function() {
                return 0 < (item = $(this)).offset().top - base + height
            }),
            this.focus(event, item)) : this.focus(event, this.activeMenu.children(".ui-menu-item").first())) : this.next(event)
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function(event) {
            this.active = this.active || $(event.target).closest(".ui-menu-item");
            var ui = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(event, !0),
            this._trigger("select", event, ui)
        }
    })
}(jQuery),
function($) {
    $.ui = $.ui || {};
    var cachedScrollbarWidth, max = Math.max, abs = Math.abs, round = Math.round, rhorizontal = /left|center|right/, rvertical = /top|center|bottom/, roffset = /[\+\-]\d+(\.[\d]+)?%?/, rposition = /^\w+/, rpercent = /%$/, _position = $.fn.position;
    function getOffsets(offsets, width, height) {
        return [parseFloat(offsets[0]) * (rpercent.test(offsets[0]) ? width / 100 : 1), parseFloat(offsets[1]) * (rpercent.test(offsets[1]) ? height / 100 : 1)]
    }
    function parseCss(element, property) {
        return parseInt($.css(element, property), 10) || 0
    }
    $.position = {
        scrollbarWidth: function() {
            if (void 0 !== cachedScrollbarWidth)
                return cachedScrollbarWidth;
            var w1, div = $("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"), w2 = div.children()[0];
            return $("body").append(div),
            w1 = w2.offsetWidth,
            div.css("overflow", "scroll"),
            w1 === (w2 = w2.offsetWidth) && (w2 = div[0].clientWidth),
            div.remove(),
            cachedScrollbarWidth = w1 - w2
        },
        getScrollInfo: function(within) {
            var hasOverflowX = within.isWindow || within.isDocument ? "" : within.element.css("overflow-x")
              , overflowY = within.isWindow || within.isDocument ? "" : within.element.css("overflow-y")
              , hasOverflowX = "scroll" === hasOverflowX || "auto" === hasOverflowX && within.width < within.element[0].scrollWidth;
            return {
                width: "scroll" === overflowY || "auto" === overflowY && within.height < within.element[0].scrollHeight ? $.position.scrollbarWidth() : 0,
                height: hasOverflowX ? $.position.scrollbarWidth() : 0
            }
        },
        getWithinInfo: function(isWindow) {
            var withinElement = $(isWindow || window)
              , isWindow = $.isWindow(withinElement[0]);
            return {
                element: withinElement,
                isWindow: isWindow,
                isDocument: !!withinElement[0] && 9 === withinElement[0].nodeType,
                offset: withinElement.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: withinElement.scrollLeft(),
                scrollTop: withinElement.scrollTop(),
                width: isWindow ? withinElement.width() : withinElement.outerWidth(),
                height: isWindow ? withinElement.height() : withinElement.outerHeight()
            }
        }
    },
    $.fn.position = function(options) {
        if (!options || !options.of)
            return _position.apply(this, arguments);
        options = $.extend({}, options);
        var atOffset, targetWidth, targetHeight, targetOffset, basePosition, raw, target = $(options.of), within = $.position.getWithinInfo(options.within), scrollInfo = $.position.getScrollInfo(within), collision = (options.collision || "flip").split(" "), offsets = {}, dimensions = 9 === (raw = (dimensions = target)[0]).nodeType ? {
            width: dimensions.width(),
            height: dimensions.height(),
            offset: {
                top: 0,
                left: 0
            }
        } : $.isWindow(raw) ? {
            width: dimensions.width(),
            height: dimensions.height(),
            offset: {
                top: dimensions.scrollTop(),
                left: dimensions.scrollLeft()
            }
        } : raw.preventDefault ? {
            width: 0,
            height: 0,
            offset: {
                top: raw.pageY,
                left: raw.pageX
            }
        } : {
            width: dimensions.outerWidth(),
            height: dimensions.outerHeight(),
            offset: dimensions.offset()
        };
        return target[0].preventDefault && (options.at = "left top"),
        targetWidth = dimensions.width,
        targetHeight = dimensions.height,
        basePosition = $.extend({}, targetOffset = dimensions.offset),
        $.each(["my", "at"], function() {
            var horizontalOffset, verticalOffset, pos = (options[this] || "").split(" ");
            (pos = 1 === pos.length ? rhorizontal.test(pos[0]) ? pos.concat(["center"]) : rvertical.test(pos[0]) ? ["center"].concat(pos) : ["center", "center"] : pos)[0] = rhorizontal.test(pos[0]) ? pos[0] : "center",
            pos[1] = rvertical.test(pos[1]) ? pos[1] : "center",
            horizontalOffset = roffset.exec(pos[0]),
            verticalOffset = roffset.exec(pos[1]),
            offsets[this] = [horizontalOffset ? horizontalOffset[0] : 0, verticalOffset ? verticalOffset[0] : 0],
            options[this] = [rposition.exec(pos[0])[0], rposition.exec(pos[1])[0]]
        }),
        1 === collision.length && (collision[1] = collision[0]),
        "right" === options.at[0] ? basePosition.left += targetWidth : "center" === options.at[0] && (basePosition.left += targetWidth / 2),
        "bottom" === options.at[1] ? basePosition.top += targetHeight : "center" === options.at[1] && (basePosition.top += targetHeight / 2),
        atOffset = getOffsets(offsets.at, targetWidth, targetHeight),
        basePosition.left += atOffset[0],
        basePosition.top += atOffset[1],
        this.each(function() {
            var collisionPosition, using, elem = $(this), elemWidth = elem.outerWidth(), elemHeight = elem.outerHeight(), marginLeft = parseCss(this, "marginLeft"), marginTop = parseCss(this, "marginTop"), collisionWidth = elemWidth + marginLeft + parseCss(this, "marginRight") + scrollInfo.width, collisionHeight = elemHeight + marginTop + parseCss(this, "marginBottom") + scrollInfo.height, position = $.extend({}, basePosition), myOffset = getOffsets(offsets.my, elem.outerWidth(), elem.outerHeight());
            "right" === options.my[0] ? position.left -= elemWidth : "center" === options.my[0] && (position.left -= elemWidth / 2),
            "bottom" === options.my[1] ? position.top -= elemHeight : "center" === options.my[1] && (position.top -= elemHeight / 2),
            position.left += myOffset[0],
            position.top += myOffset[1],
            $.support.offsetFractions || (position.left = round(position.left),
            position.top = round(position.top)),
            collisionPosition = {
                marginLeft: marginLeft,
                marginTop: marginTop
            },
            $.each(["left", "top"], function(i, dir) {
                $.ui.position[collision[i]] && $.ui.position[collision[i]][dir](position, {
                    targetWidth: targetWidth,
                    targetHeight: targetHeight,
                    elemWidth: elemWidth,
                    elemHeight: elemHeight,
                    collisionPosition: collisionPosition,
                    collisionWidth: collisionWidth,
                    collisionHeight: collisionHeight,
                    offset: [atOffset[0] + myOffset[0], atOffset[1] + myOffset[1]],
                    my: options.my,
                    at: options.at,
                    within: within,
                    elem: elem
                })
            }),
            options.using && (using = function(props) {
                var left = targetOffset.left - position.left
                  , right = left + targetWidth - elemWidth
                  , top = targetOffset.top - position.top
                  , bottom = top + targetHeight - elemHeight
                  , feedback = {
                    target: {
                        element: target,
                        left: targetOffset.left,
                        top: targetOffset.top,
                        width: targetWidth,
                        height: targetHeight
                    },
                    element: {
                        element: elem,
                        left: position.left,
                        top: position.top,
                        width: elemWidth,
                        height: elemHeight
                    },
                    horizontal: right < 0 ? "left" : 0 < left ? "right" : "center",
                    vertical: bottom < 0 ? "top" : 0 < top ? "bottom" : "middle"
                };
                targetWidth < elemWidth && abs(left + right) < targetWidth && (feedback.horizontal = "center"),
                targetHeight < elemHeight && abs(top + bottom) < targetHeight && (feedback.vertical = "middle"),
                max(abs(left), abs(right)) > max(abs(top), abs(bottom)) ? feedback.important = "horizontal" : feedback.important = "vertical",
                options.using.call(this, props, feedback)
            }
            ),
            elem.offset($.extend(position, {
                using: using
            }))
        })
    }
    ,
    $.ui.position = {
        fit: {
            left: function(position, data) {
                var newOverRight = data.within
                  , withinOffset = newOverRight.isWindow ? newOverRight.scrollLeft : newOverRight.offset.left
                  , outerWidth = newOverRight.width
                  , collisionPosLeft = position.left - data.collisionPosition.marginLeft
                  , overLeft = withinOffset - collisionPosLeft
                  , overRight = collisionPosLeft + data.collisionWidth - outerWidth - withinOffset;
                data.collisionWidth > outerWidth ? 0 < overLeft && overRight <= 0 ? (newOverRight = position.left + overLeft + data.collisionWidth - outerWidth - withinOffset,
                position.left += overLeft - newOverRight) : position.left = !(0 < overRight && overLeft <= 0) && overRight < overLeft ? withinOffset + outerWidth - data.collisionWidth : withinOffset : 0 < overLeft ? position.left += overLeft : 0 < overRight ? position.left -= overRight : position.left = max(position.left - collisionPosLeft, position.left)
            },
            top: function(position, data) {
                var newOverBottom = data.within
                  , withinOffset = newOverBottom.isWindow ? newOverBottom.scrollTop : newOverBottom.offset.top
                  , outerHeight = data.within.height
                  , collisionPosTop = position.top - data.collisionPosition.marginTop
                  , overTop = withinOffset - collisionPosTop
                  , overBottom = collisionPosTop + data.collisionHeight - outerHeight - withinOffset;
                data.collisionHeight > outerHeight ? 0 < overTop && overBottom <= 0 ? (newOverBottom = position.top + overTop + data.collisionHeight - outerHeight - withinOffset,
                position.top += overTop - newOverBottom) : position.top = !(0 < overBottom && overTop <= 0) && overBottom < overTop ? withinOffset + outerHeight - data.collisionHeight : withinOffset : 0 < overTop ? position.top += overTop : 0 < overBottom ? position.top -= overBottom : position.top = max(position.top - collisionPosTop, position.top)
            }
        },
        flip: {
            left: function(position, data) {
                var atOffset = data.within
                  , newOverRight = atOffset.offset.left + atOffset.scrollLeft
                  , outerWidth = atOffset.width
                  , newOverLeft = atOffset.isWindow ? atOffset.scrollLeft : atOffset.offset.left
                  , offset = position.left - data.collisionPosition.marginLeft
                  , overLeft = offset - newOverLeft
                  , overRight = offset + data.collisionWidth - outerWidth - newOverLeft
                  , myOffset = "left" === data.my[0] ? -data.elemWidth : "right" === data.my[0] ? data.elemWidth : 0
                  , atOffset = "left" === data.at[0] ? data.targetWidth : "right" === data.at[0] ? -data.targetWidth : 0
                  , offset = -2 * data.offset[0];
                overLeft < 0 ? ((newOverRight = position.left + myOffset + atOffset + offset + data.collisionWidth - outerWidth - newOverRight) < 0 || newOverRight < abs(overLeft)) && (position.left += myOffset + atOffset + offset) : 0 < overRight && (0 < (newOverLeft = position.left - data.collisionPosition.marginLeft + myOffset + atOffset + offset - newOverLeft) || abs(newOverLeft) < overRight) && (position.left += myOffset + atOffset + offset)
            },
            top: function(position, data) {
                var atOffset = data.within
                  , newOverBottom = atOffset.offset.top + atOffset.scrollTop
                  , outerHeight = atOffset.height
                  , newOverTop = atOffset.isWindow ? atOffset.scrollTop : atOffset.offset.top
                  , offset = position.top - data.collisionPosition.marginTop
                  , overTop = offset - newOverTop
                  , overBottom = offset + data.collisionHeight - outerHeight - newOverTop
                  , myOffset = "top" === data.my[1] ? -data.elemHeight : "bottom" === data.my[1] ? data.elemHeight : 0
                  , atOffset = "top" === data.at[1] ? data.targetHeight : "bottom" === data.at[1] ? -data.targetHeight : 0
                  , offset = -2 * data.offset[1];
                overTop < 0 ? (newOverBottom = position.top + myOffset + atOffset + offset + data.collisionHeight - outerHeight - newOverBottom,
                position.top + myOffset + atOffset + offset > overTop && (newOverBottom < 0 || newOverBottom < abs(overTop)) && (position.top += myOffset + atOffset + offset)) : 0 < overBottom && (newOverTop = position.top - data.collisionPosition.marginTop + myOffset + atOffset + offset - newOverTop,
                position.top + myOffset + atOffset + offset > overBottom && (0 < newOverTop || abs(newOverTop) < overBottom) && (position.top += myOffset + atOffset + offset))
            }
        },
        flipfit: {
            left: function() {
                $.ui.position.flip.left.apply(this, arguments),
                $.ui.position.fit.left.apply(this, arguments)
            },
            top: function() {
                $.ui.position.flip.top.apply(this, arguments),
                $.ui.position.fit.top.apply(this, arguments)
            }
        }
    },
    function() {
        var i, testElementParent = document.getElementsByTagName("body")[0], offsetLeft = document.createElement("div"), testElement = document.createElement(testElementParent ? "div" : "body"), testElementStyle = {
            visibility: "hidden",
            width: 0,
            height: 0,
            border: 0,
            margin: 0,
            background: "none"
        };
        for (i in testElementParent && $.extend(testElementStyle, {
            position: "absolute",
            left: "-1000px",
            top: "-1000px"
        }),
        testElementStyle)
            testElement.style[i] = testElementStyle[i];
        testElement.appendChild(offsetLeft),
        (testElementParent = testElementParent || document.documentElement).insertBefore(testElement, testElementParent.firstChild),
        offsetLeft.style.cssText = "position: absolute; left: 10.7432222px;",
        offsetLeft = $(offsetLeft).offset().left,
        $.support.offsetFractions = 10 < offsetLeft && offsetLeft < 11,
        testElement.innerHTML = "",
        testElementParent.removeChild(testElement)
    }()
}(jQuery),
function($) {
    $.widget("ui.progressbar", {
        version: "1.10.4",
        options: {
            max: 100,
            value: 0,
            change: null,
            complete: null
        },
        min: 0,
        _create: function() {
            this.oldValue = this.options.value = this._constrainedValue(),
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min
            }),
            this.valueDiv = $("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),
            this._refreshValue()
        },
        _destroy: function() {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),
            this.valueDiv.remove()
        },
        value: function(newValue) {
            if (void 0 === newValue)
                return this.options.value;
            this.options.value = this._constrainedValue(newValue),
            this._refreshValue()
        },
        _constrainedValue: function(newValue) {
            return void 0 === newValue && (newValue = this.options.value),
            this.indeterminate = !1 === newValue,
            "number" != typeof newValue && (newValue = 0),
            !this.indeterminate && Math.min(this.options.max, Math.max(this.min, newValue))
        },
        _setOptions: function(options) {
            var value = options.value;
            delete options.value,
            this._super(options),
            this.options.value = this._constrainedValue(value),
            this._refreshValue()
        },
        _setOption: function(key, value) {
            "max" === key && (value = Math.max(this.min, value)),
            this._super(key, value)
        },
        _percentage: function() {
            return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
        },
        _refreshValue: function() {
            var value = this.options.value
              , percentage = this._percentage();
            this.valueDiv.toggle(this.indeterminate || value > this.min).toggleClass("ui-corner-right", value === this.options.max).width(percentage.toFixed(0) + "%"),
            this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate),
            this.indeterminate ? (this.element.removeAttr("aria-valuenow"),
            this.overlayDiv || (this.overlayDiv = $("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({
                "aria-valuemax": this.options.max,
                "aria-valuenow": value
            }),
            this.overlayDiv && (this.overlayDiv.remove(),
            this.overlayDiv = null)),
            this.oldValue !== value && (this.oldValue = value,
            this._trigger("change")),
            value === this.options.max && this._trigger("complete")
        }
    })
}(jQuery),
function($) {
    $.widget("ui.slider", $.ui.mouse, {
        version: "1.10.4",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        _create: function() {
            this._keySliding = !1,
            this._mouseSliding = !1,
            this._animateOff = !0,
            this._handleIndex = null,
            this._detectOrientation(),
            this._mouseInit(),
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all"),
            this._refresh(),
            this._setOption("disabled", this.options.disabled),
            this._animateOff = !1
        },
        _refresh: function() {
            this._createRange(),
            this._createHandles(),
            this._setupEvents(),
            this._refreshValue()
        },
        _createHandles: function() {
            var i, options = this.options, existingHandles = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"), handles = [], handleCount = options.values && options.values.length || 1;
            for (existingHandles.length > handleCount && (existingHandles.slice(handleCount).remove(),
            existingHandles = existingHandles.slice(0, handleCount)),
            i = existingHandles.length; i < handleCount; i++)
                handles.push("<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>");
            this.handles = existingHandles.add($(handles.join("")).appendTo(this.element)),
            this.handle = this.handles.eq(0),
            this.handles.each(function(i) {
                $(this).data("ui-slider-handle-index", i)
            })
        },
        _createRange: function() {
            var options = this.options
              , classes = "";
            options.range ? (!0 === options.range && (options.values ? options.values.length && 2 !== options.values.length ? options.values = [options.values[0], options.values[0]] : $.isArray(options.values) && (options.values = options.values.slice(0)) : options.values = [this._valueMin(), this._valueMin()]),
            this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                left: "",
                bottom: ""
            }) : (this.range = $("<div></div>").appendTo(this.element),
            classes = "ui-slider-range ui-widget-header ui-corner-all"),
            this.range.addClass(classes + ("min" === options.range || "max" === options.range ? " ui-slider-range-" + options.range : ""))) : (this.range && this.range.remove(),
            this.range = null)
        },
        _setupEvents: function() {
            var elements = this.handles.add(this.range).filter("a");
            this._off(elements),
            this._on(elements, this._handleEvents),
            this._hoverable(elements),
            this._focusable(elements)
        },
        _destroy: function() {
            this.handles.remove(),
            this.range && this.range.remove(),
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"),
            this._mouseDestroy()
        },
        _mouseCapture: function(event) {
            var normValue, distance, closestHandle, index, offset, mouseOverHandle, that = this, o = this.options;
            return !o.disabled && (this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            },
            this.elementOffset = this.element.offset(),
            mouseOverHandle = {
                x: event.pageX,
                y: event.pageY
            },
            normValue = this._normValueFromMouse(mouseOverHandle),
            distance = this._valueMax() - this._valueMin() + 1,
            this.handles.each(function(i) {
                var thisDistance = Math.abs(normValue - that.values(i));
                (thisDistance < distance || distance === thisDistance && (i === that._lastChangedValue || that.values(i) === o.min)) && (distance = thisDistance,
                closestHandle = $(this),
                index = i)
            }),
            !1 !== this._start(event, index) && (this._mouseSliding = !0,
            this._handleIndex = index,
            closestHandle.addClass("ui-state-active").focus(),
            offset = closestHandle.offset(),
            mouseOverHandle = !$(event.target).parents().addBack().is(".ui-slider-handle"),
            this._clickOffset = mouseOverHandle ? {
                left: 0,
                top: 0
            } : {
                left: event.pageX - offset.left - closestHandle.width() / 2,
                top: event.pageY - offset.top - closestHandle.height() / 2 - (parseInt(closestHandle.css("borderTopWidth"), 10) || 0) - (parseInt(closestHandle.css("borderBottomWidth"), 10) || 0) + (parseInt(closestHandle.css("marginTop"), 10) || 0)
            },
            this.handles.hasClass("ui-state-hover") || this._slide(event, index, normValue),
            this._animateOff = !0))
        },
        _mouseStart: function() {
            return !0
        },
        _mouseDrag: function(event) {
            var normValue = {
                x: event.pageX,
                y: event.pageY
            }
              , normValue = this._normValueFromMouse(normValue);
            return this._slide(event, this._handleIndex, normValue),
            !1
        },
        _mouseStop: function(event) {
            return this.handles.removeClass("ui-state-active"),
            this._mouseSliding = !1,
            this._stop(event, this._handleIndex),
            this._change(event, this._handleIndex),
            this._handleIndex = null,
            this._clickOffset = null,
            this._animateOff = !1
        },
        _detectOrientation: function() {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(percentMouse) {
            var valueMouse, percentMouse = "horizontal" === this.orientation ? (valueMouse = this.elementSize.width,
            percentMouse.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (valueMouse = this.elementSize.height,
            percentMouse.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), percentMouse = percentMouse / valueMouse;
            return (percentMouse = 1 < percentMouse ? 1 : percentMouse) < 0 && (percentMouse = 0),
            "vertical" === this.orientation && (percentMouse = 1 - percentMouse),
            valueMouse = this._valueMax() - this._valueMin(),
            valueMouse = this._valueMin() + percentMouse * valueMouse,
            this._trimAlignValue(valueMouse)
        },
        _start: function(event, index) {
            var uiHash = {
                handle: this.handles[index],
                value: this.value()
            };
            return this.options.values && this.options.values.length && (uiHash.value = this.values(index),
            uiHash.values = this.values()),
            this._trigger("start", event, uiHash)
        },
        _slide: function(event, index, newVal) {
            var otherVal, allowed;
            this.options.values && this.options.values.length ? (otherVal = this.values(index ? 0 : 1),
            (newVal = 2 === this.options.values.length && !0 === this.options.range && (0 === index && otherVal < newVal || 1 === index && newVal < otherVal) ? otherVal : newVal) !== this.values(index) && ((allowed = this.values())[index] = newVal,
            allowed = this._trigger("slide", event, {
                handle: this.handles[index],
                value: newVal,
                values: allowed
            }),
            otherVal = this.values(index ? 0 : 1),
            !1 !== allowed && this.values(index, newVal))) : newVal !== this.value() && !1 !== (allowed = this._trigger("slide", event, {
                handle: this.handles[index],
                value: newVal
            })) && this.value(newVal)
        },
        _stop: function(event, index) {
            var uiHash = {
                handle: this.handles[index],
                value: this.value()
            };
            this.options.values && this.options.values.length && (uiHash.value = this.values(index),
            uiHash.values = this.values()),
            this._trigger("stop", event, uiHash)
        },
        _change: function(event, index) {
            var uiHash;
            this._keySliding || this._mouseSliding || (uiHash = {
                handle: this.handles[index],
                value: this.value()
            },
            this.options.values && this.options.values.length && (uiHash.value = this.values(index),
            uiHash.values = this.values()),
            this._lastChangedValue = index,
            this._trigger("change", event, uiHash))
        },
        value: function(newValue) {
            return arguments.length ? (this.options.value = this._trimAlignValue(newValue),
            this._refreshValue(),
            void this._change(null, 0)) : this._value()
        },
        values: function(index, newValue) {
            var vals, newValues, i;
            if (1 < arguments.length)
                return this.options.values[index] = this._trimAlignValue(newValue),
                this._refreshValue(),
                void this._change(null, index);
            if (!arguments.length)
                return this._values();
            if (!$.isArray(index))
                return this.options.values && this.options.values.length ? this._values(index) : this.value();
            for (vals = this.options.values,
            newValues = index,
            i = 0; i < vals.length; i += 1)
                vals[i] = this._trimAlignValue(newValues[i]),
                this._change(null, i);
            this._refreshValue()
        },
        _setOption: function(key, value) {
            var i, valsLength = 0;
            switch ("range" === key && !0 === this.options.range && ("min" === value ? (this.options.value = this._values(0),
            this.options.values = null) : "max" === value && (this.options.value = this._values(this.options.values.length - 1),
            this.options.values = null)),
            $.isArray(this.options.values) && (valsLength = this.options.values.length),
            $.Widget.prototype._setOption.apply(this, arguments),
            key) {
            case "orientation":
                this._detectOrientation(),
                this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation),
                this._refreshValue();
                break;
            case "value":
                this._animateOff = !0,
                this._refreshValue(),
                this._change(null, 0),
                this._animateOff = !1;
                break;
            case "values":
                for (this._animateOff = !0,
                this._refreshValue(),
                i = 0; i < valsLength; i += 1)
                    this._change(null, i);
                this._animateOff = !1;
                break;
            case "min":
            case "max":
                this._animateOff = !0,
                this._refreshValue(),
                this._animateOff = !1;
                break;
            case "range":
                this._animateOff = !0,
                this._refresh(),
                this._animateOff = !1
            }
        },
        _value: function() {
            var val = this.options.value;
            return val = this._trimAlignValue(val)
        },
        _values: function(index) {
            var val, vals, i;
            if (arguments.length)
                return val = this.options.values[index],
                this._trimAlignValue(val);
            if (this.options.values && this.options.values.length) {
                for (vals = this.options.values.slice(),
                i = 0; i < vals.length; i += 1)
                    vals[i] = this._trimAlignValue(vals[i]);
                return vals
            }
            return []
        },
        _trimAlignValue: function(alignValue) {
            if (alignValue <= this._valueMin())
                return this._valueMin();
            if (alignValue >= this._valueMax())
                return this._valueMax();
            var step = 0 < this.options.step ? this.options.step : 1
              , valModStep = (alignValue - this._valueMin()) % step
              , alignValue = alignValue - valModStep;
            return 2 * Math.abs(valModStep) >= step && (alignValue += 0 < valModStep ? step : -step),
            parseFloat(alignValue.toFixed(5))
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.options.max
        },
        _refreshValue: function() {
            var lastValPercent, valPercent, value, valueMin, valueMax, oRange = this.options.range, o = this.options, that = this, animate = !this._animateOff && o.animate, _set = {};
            this.options.values && this.options.values.length ? this.handles.each(function(i) {
                valPercent = (that.values(i) - that._valueMin()) / (that._valueMax() - that._valueMin()) * 100,
                _set["horizontal" === that.orientation ? "left" : "bottom"] = valPercent + "%",
                $(this).stop(1, 1)[animate ? "animate" : "css"](_set, o.animate),
                !0 === that.options.range && ("horizontal" === that.orientation ? (0 === i && that.range.stop(1, 1)[animate ? "animate" : "css"]({
                    left: valPercent + "%"
                }, o.animate),
                1 === i && that.range[animate ? "animate" : "css"]({
                    width: valPercent - lastValPercent + "%"
                }, {
                    queue: !1,
                    duration: o.animate
                })) : (0 === i && that.range.stop(1, 1)[animate ? "animate" : "css"]({
                    bottom: valPercent + "%"
                }, o.animate),
                1 === i && that.range[animate ? "animate" : "css"]({
                    height: valPercent - lastValPercent + "%"
                }, {
                    queue: !1,
                    duration: o.animate
                }))),
                lastValPercent = valPercent
            }) : (value = this.value(),
            valueMin = this._valueMin(),
            valueMax = this._valueMax(),
            valPercent = valueMax !== valueMin ? (value - valueMin) / (valueMax - valueMin) * 100 : 0,
            _set["horizontal" === this.orientation ? "left" : "bottom"] = valPercent + "%",
            this.handle.stop(1, 1)[animate ? "animate" : "css"](_set, o.animate),
            "min" === oRange && "horizontal" === this.orientation && this.range.stop(1, 1)[animate ? "animate" : "css"]({
                width: valPercent + "%"
            }, o.animate),
            "max" === oRange && "horizontal" === this.orientation && this.range[animate ? "animate" : "css"]({
                width: 100 - valPercent + "%"
            }, {
                queue: !1,
                duration: o.animate
            }),
            "min" === oRange && "vertical" === this.orientation && this.range.stop(1, 1)[animate ? "animate" : "css"]({
                height: valPercent + "%"
            }, o.animate),
            "max" === oRange && "vertical" === this.orientation && this.range[animate ? "animate" : "css"]({
                height: 100 - valPercent + "%"
            }, {
                queue: !1,
                duration: o.animate
            }))
        },
        _handleEvents: {
            keydown: function(event) {
                var curVal, newVal, step, index = $(event.target).data("ui-slider-handle-index");
                switch (event.keyCode) {
                case $.ui.keyCode.HOME:
                case $.ui.keyCode.END:
                case $.ui.keyCode.PAGE_UP:
                case $.ui.keyCode.PAGE_DOWN:
                case $.ui.keyCode.UP:
                case $.ui.keyCode.RIGHT:
                case $.ui.keyCode.DOWN:
                case $.ui.keyCode.LEFT:
                    if (event.preventDefault(),
                    !this._keySliding && (this._keySliding = !0,
                    $(event.target).addClass("ui-state-active"),
                    !1 === this._start(event, index)))
                        return
                }
                switch (step = this.options.step,
                curVal = newVal = this.options.values && this.options.values.length ? this.values(index) : this.value(),
                event.keyCode) {
                case $.ui.keyCode.HOME:
                    newVal = this._valueMin();
                    break;
                case $.ui.keyCode.END:
                    newVal = this._valueMax();
                    break;
                case $.ui.keyCode.PAGE_UP:
                    newVal = this._trimAlignValue(curVal + (this._valueMax() - this._valueMin()) / 5);
                    break;
                case $.ui.keyCode.PAGE_DOWN:
                    newVal = this._trimAlignValue(curVal - (this._valueMax() - this._valueMin()) / 5);
                    break;
                case $.ui.keyCode.UP:
                case $.ui.keyCode.RIGHT:
                    if (curVal === this._valueMax())
                        return;
                    newVal = this._trimAlignValue(curVal + step);
                    break;
                case $.ui.keyCode.DOWN:
                case $.ui.keyCode.LEFT:
                    if (curVal === this._valueMin())
                        return;
                    newVal = this._trimAlignValue(curVal - step)
                }
                this._slide(event, index, newVal)
            },
            click: function(event) {
                event.preventDefault()
            },
            keyup: function(event) {
                var index = $(event.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1,
                this._stop(event, index),
                this._change(event, index),
                $(event.target).removeClass("ui-state-active"))
            }
        }
    })
}(jQuery),
function($) {
    function modifier(fn) {
        return function() {
            var previous = this.element.val();
            fn.apply(this, arguments),
            this._refresh(),
            previous !== this.element.val() && this._trigger("change")
        }
    }
    $.widget("ui.spinner", {
        version: "1.10.4",
        defaultElement: "<input>",
        widgetEventPrefix: "spin",
        options: {
            culture: null,
            icons: {
                down: "ui-icon-triangle-1-s",
                up: "ui-icon-triangle-1-n"
            },
            incremental: !0,
            max: null,
            min: null,
            numberFormat: null,
            page: 10,
            step: 1,
            change: null,
            spin: null,
            start: null,
            stop: null
        },
        _create: function() {
            this._setOption("max", this.options.max),
            this._setOption("min", this.options.min),
            this._setOption("step", this.options.step),
            "" !== this.value() && this._value(this.element.val(), !0),
            this._draw(),
            this._on(this._events),
            this._refresh(),
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _getCreateOptions: function() {
            var options = {}
              , element = this.element;
            return $.each(["min", "max", "step"], function(i, option) {
                var value = element.attr(option);
                void 0 !== value && value.length && (options[option] = value)
            }),
            options
        },
        _events: {
            keydown: function(event) {
                this._start(event) && this._keydown(event) && event.preventDefault()
            },
            keyup: "_stop",
            focus: function() {
                this.previous = this.element.val()
            },
            blur: function(event) {
                this.cancelBlur ? delete this.cancelBlur : (this._stop(),
                this._refresh(),
                this.previous !== this.element.val() && this._trigger("change", event))
            },
            mousewheel: function(event, delta) {
                if (delta) {
                    if (!this.spinning && !this._start(event))
                        return !1;
                    this._spin((0 < delta ? 1 : -1) * this.options.step, event),
                    clearTimeout(this.mousewheelTimer),
                    this.mousewheelTimer = this._delay(function() {
                        this.spinning && this._stop(event)
                    }, 100),
                    event.preventDefault()
                }
            },
            "mousedown .ui-spinner-button": function(event) {
                var previous;
                function checkFocus() {
                    this.element[0] === this.document[0].activeElement || (this.element.focus(),
                    this.previous = previous,
                    this._delay(function() {
                        this.previous = previous
                    }))
                }
                previous = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(),
                event.preventDefault(),
                checkFocus.call(this),
                this.cancelBlur = !0,
                this._delay(function() {
                    delete this.cancelBlur,
                    checkFocus.call(this)
                }),
                !1 !== this._start(event) && this._repeat(null, $(event.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, event)
            },
            "mouseup .ui-spinner-button": "_stop",
            "mouseenter .ui-spinner-button": function(event) {
                if ($(event.currentTarget).hasClass("ui-state-active"))
                    return !1 !== this._start(event) && void this._repeat(null, $(event.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, event)
            },
            "mouseleave .ui-spinner-button": "_stop"
        },
        _draw: function() {
            var uiSpinner = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
            this.element.attr("role", "spinbutton"),
            this.buttons = uiSpinner.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"),
            this.buttons.height() > Math.ceil(.5 * uiSpinner.height()) && 0 < uiSpinner.height() && uiSpinner.height(uiSpinner.height()),
            this.options.disabled && this.disable()
        },
        _keydown: function(event) {
            var options = this.options
              , keyCode = $.ui.keyCode;
            switch (event.keyCode) {
            case keyCode.UP:
                return this._repeat(null, 1, event),
                !0;
            case keyCode.DOWN:
                return this._repeat(null, -1, event),
                !0;
            case keyCode.PAGE_UP:
                return this._repeat(null, options.page, event),
                !0;
            case keyCode.PAGE_DOWN:
                return this._repeat(null, -options.page, event),
                !0
            }
            return !1
        },
        _uiSpinnerHtml: function() {
            return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
        },
        _buttonHtml: function() {
            return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span></a><a class='ui-spinner-button ui-spinner-down ui-corner-br'><span class='ui-icon " + this.options.icons.down + "'>&#9660;</span></a>"
        },
        _start: function(event) {
            return !(!this.spinning && !1 === this._trigger("start", event)) && (this.counter || (this.counter = 1),
            this.spinning = !0)
        },
        _repeat: function(i, steps, event) {
            i = i || 500,
            clearTimeout(this.timer),
            this.timer = this._delay(function() {
                this._repeat(40, steps, event)
            }, i),
            this._spin(steps * this.options.step, event)
        },
        _spin: function(step, event) {
            var value = this.value() || 0;
            this.counter || (this.counter = 1),
            value = this._adjustValue(value + step * this._increment(this.counter)),
            this.spinning && !1 === this._trigger("spin", event, {
                value: value
            }) || (this._value(value),
            this.counter++)
        },
        _increment: function(i) {
            var incremental = this.options.incremental;
            return incremental ? $.isFunction(incremental) ? incremental(i) : Math.floor(i * i * i / 5e4 - i * i / 500 + 17 * i / 200 + 1) : 1
        },
        _precision: function() {
            var precision = this._precisionOf(this.options.step);
            return precision = null !== this.options.min ? Math.max(precision, this._precisionOf(this.options.min)) : precision
        },
        _precisionOf: function(decimal) {
            var str = decimal.toString()
              , decimal = str.indexOf(".");
            return -1 === decimal ? 0 : str.length - decimal - 1
        },
        _adjustValue: function(value) {
            var options = this.options
              , base = null !== options.min ? options.min : 0
              , aboveMin = value - base;
            return value = base + Math.round(aboveMin / options.step) * options.step,
            value = parseFloat(value.toFixed(this._precision())),
            null !== options.max && value > options.max ? options.max : null !== options.min && value < options.min ? options.min : value
        },
        _stop: function(event) {
            this.spinning && (clearTimeout(this.timer),
            clearTimeout(this.mousewheelTimer),
            this.counter = 0,
            this.spinning = !1,
            this._trigger("stop", event))
        },
        _setOption: function(key, value) {
            if ("culture" === key || "numberFormat" === key) {
                var prevValue = this._parse(this.element.val());
                return this.options[key] = value,
                void this.element.val(this._format(prevValue))
            }
            "max" !== key && "min" !== key && "step" !== key || "string" == typeof value && (value = this._parse(value)),
            "icons" === key && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(value.up),
            this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(value.down)),
            this._super(key, value),
            "disabled" === key && (value ? (this.element.prop("disabled", !0),
            this.buttons.button("disable")) : (this.element.prop("disabled", !1),
            this.buttons.button("enable")))
        },
        _setOptions: modifier(function(options) {
            this._super(options),
            this._value(this.element.val())
        }),
        _parse: function(val) {
            return "" === (val = "string" == typeof val && "" !== val ? window.Globalize && this.options.numberFormat ? Globalize.parseFloat(val, 10, this.options.culture) : +val : val) || isNaN(val) ? null : val
        },
        _format: function(value) {
            return "" === value ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(value, this.options.numberFormat, this.options.culture) : value
        },
        _refresh: function() {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val())
            })
        },
        _value: function(value, allowAny) {
            var parsed;
            "" !== value && null !== (parsed = this._parse(value)) && (allowAny || (parsed = this._adjustValue(parsed)),
            value = this._format(parsed)),
            this.element.val(value),
            this._refresh()
        },
        _destroy: function() {
            this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),
            this.uiSpinner.replaceWith(this.element)
        },
        stepUp: modifier(function(steps) {
            this._stepUp(steps)
        }),
        _stepUp: function(steps) {
            this._start() && (this._spin((steps || 1) * this.options.step),
            this._stop())
        },
        stepDown: modifier(function(steps) {
            this._stepDown(steps)
        }),
        _stepDown: function(steps) {
            this._start() && (this._spin((steps || 1) * -this.options.step),
            this._stop())
        },
        pageUp: modifier(function(pages) {
            this._stepUp((pages || 1) * this.options.page)
        }),
        pageDown: modifier(function(pages) {
            this._stepDown((pages || 1) * this.options.page)
        }),
        value: function(newVal) {
            if (!arguments.length)
                return this._parse(this.element.val());
            modifier(this._value).call(this, newVal)
        },
        widget: function() {
            return this.uiSpinner
        }
    })
}(jQuery),
function($) {
    var tabId = 0
      , rhash = /#.*$/;
    function isLocal(anchor) {
        return 1 < (anchor = anchor.cloneNode(!1)).hash.length && decodeURIComponent(anchor.href.replace(rhash, "")) === decodeURIComponent(location.href.replace(rhash, ""))
    }
    $.widget("ui.tabs", {
        version: "1.10.4",
        delay: 300,
        options: {
            active: null,
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _create: function() {
            var that = this
              , options = this.options;
            this.running = !1,
            this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", options.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function(event) {
                $(this).is(".ui-state-disabled") && event.preventDefault()
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
                $(this).closest("li").is(".ui-state-disabled") && this.blur()
            }),
            this._processTabs(),
            options.active = this._initialActive(),
            $.isArray(options.disabled) && (options.disabled = $.unique(options.disabled.concat($.map(this.tabs.filter(".ui-state-disabled"), function(li) {
                return that.tabs.index(li)
            }))).sort()),
            !1 !== this.options.active && this.anchors.length ? this.active = this._findActive(options.active) : this.active = $(),
            this._refresh(),
            this.active.length && this.load(options.active)
        },
        _initialActive: function() {
            var active = this.options.active
              , collapsible = this.options.collapsible
              , locationHash = location.hash.substring(1);
            return null === active && (locationHash && this.tabs.each(function(i, tab) {
                if ($(tab).attr("aria-controls") === locationHash)
                    return active = i,
                    !1
            }),
            null !== (active = null === active ? this.tabs.index(this.tabs.filter(".ui-tabs-active")) : active) && -1 !== active || (active = !!this.tabs.length && 0)),
            !1 !== active && -1 === (active = this.tabs.index(this.tabs.eq(active))) && (active = !collapsible && 0),
            active = !collapsible && !1 === active && this.anchors.length ? 0 : active
        },
        _getCreateEventData: function() {
            return {
                tab: this.active,
                panel: this.active.length ? this._getPanelForTab(this.active) : $()
            }
        },
        _tabKeydown: function(event) {
            var focusedTab = $(this.document[0].activeElement).closest("li")
              , selectedIndex = this.tabs.index(focusedTab)
              , goingForward = !0;
            if (!this._handlePageNav(event)) {
                switch (event.keyCode) {
                case $.ui.keyCode.RIGHT:
                case $.ui.keyCode.DOWN:
                    selectedIndex++;
                    break;
                case $.ui.keyCode.UP:
                case $.ui.keyCode.LEFT:
                    goingForward = !1,
                    selectedIndex--;
                    break;
                case $.ui.keyCode.END:
                    selectedIndex = this.anchors.length - 1;
                    break;
                case $.ui.keyCode.HOME:
                    selectedIndex = 0;
                    break;
                case $.ui.keyCode.SPACE:
                    return event.preventDefault(),
                    clearTimeout(this.activating),
                    void this._activate(selectedIndex);
                case $.ui.keyCode.ENTER:
                    return event.preventDefault(),
                    clearTimeout(this.activating),
                    void this._activate(selectedIndex !== this.options.active && selectedIndex);
                default:
                    return
                }
                event.preventDefault(),
                clearTimeout(this.activating),
                selectedIndex = this._focusNextTab(selectedIndex, goingForward),
                event.ctrlKey || (focusedTab.attr("aria-selected", "false"),
                this.tabs.eq(selectedIndex).attr("aria-selected", "true"),
                this.activating = this._delay(function() {
                    this.option("active", selectedIndex)
                }, this.delay))
            }
        },
        _panelKeydown: function(event) {
            this._handlePageNav(event) || event.ctrlKey && event.keyCode === $.ui.keyCode.UP && (event.preventDefault(),
            this.active.focus())
        },
        _handlePageNav: function(event) {
            return event.altKey && event.keyCode === $.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)),
            !0) : event.altKey && event.keyCode === $.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)),
            !0) : void 0
        },
        _findNextTab: function(index, goingForward) {
            var lastTabIndex = this.tabs.length - 1;
            for (; -1 !== $.inArray(index = (index = lastTabIndex < index ? 0 : index) < 0 ? lastTabIndex : index, this.options.disabled); )
                index = goingForward ? index + 1 : index - 1;
            return index
        },
        _focusNextTab: function(index, goingForward) {
            return index = this._findNextTab(index, goingForward),
            this.tabs.eq(index).focus(),
            index
        },
        _setOption: function(key, value) {
            "active" !== key ? "disabled" !== key ? (this._super(key, value),
            "collapsible" === key && (this.element.toggleClass("ui-tabs-collapsible", value),
            value || !1 !== this.options.active || this._activate(0)),
            "event" === key && this._setupEvents(value),
            "heightStyle" === key && this._setupHeightStyle(value)) : this._setupDisabled(value) : this._activate(value)
        },
        _tabId: function(tab) {
            return tab.attr("aria-controls") || "ui-tabs-" + ++tabId
        },
        _sanitizeSelector: function(hash) {
            return hash ? hash.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
        },
        refresh: function() {
            var options = this.options
              , lis = this.tablist.children(":has(a[href])");
            options.disabled = $.map(lis.filter(".ui-state-disabled"), function(tab) {
                return lis.index(tab)
            }),
            this._processTabs(),
            !1 !== options.active && this.anchors.length ? this.active.length && !$.contains(this.tablist[0], this.active[0]) ? this.tabs.length === options.disabled.length ? (options.active = !1,
            this.active = $()) : this._activate(this._findNextTab(Math.max(0, options.active - 1), !1)) : options.active = this.tabs.index(this.active) : (options.active = !1,
            this.active = $()),
            this._refresh()
        },
        _refresh: function() {
            this._setupDisabled(this.options.disabled),
            this._setupEvents(this.options.event),
            this._setupHeightStyle(this.options.heightStyle),
            this.tabs.not(this.active).attr({
                "aria-selected": "false",
                tabIndex: -1
            }),
            this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }),
            this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                "aria-selected": "true",
                tabIndex: 0
            }),
            this._getPanelForTab(this.active).show().attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            })) : this.tabs.eq(0).attr("tabIndex", 0)
        },
        _processTabs: function() {
            var that = this;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist"),
            this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            }),
            this.anchors = this.tabs.map(function() {
                return $("a", this)[0]
            }).addClass("ui-tabs-anchor").attr({
                role: "presentation",
                tabIndex: -1
            }),
            this.panels = $(),
            this.anchors.each(function(i, panelId) {
                var selector, panel, anchorId = $(panelId).uniqueId().attr("id"), tab = $(panelId).closest("li"), originalAriaControls = tab.attr("aria-controls");
                isLocal(panelId) ? (selector = panelId.hash,
                panel = that.element.find(that._sanitizeSelector(selector))) : (panelId = that._tabId(tab),
                (panel = that.element.find(selector = "#" + panelId)).length || (panel = that._createPanel(panelId)).insertAfter(that.panels[i - 1] || that.tablist),
                panel.attr("aria-live", "polite")),
                panel.length && (that.panels = that.panels.add(panel)),
                originalAriaControls && tab.data("ui-tabs-aria-controls", originalAriaControls),
                tab.attr({
                    "aria-controls": selector.substring(1),
                    "aria-labelledby": anchorId
                }),
                panel.attr("aria-labelledby", anchorId)
            }),
            this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
        },
        _getList: function() {
            return this.tablist || this.element.find("ol,ul").eq(0)
        },
        _createPanel: function(id) {
            return $("<div>").attr("id", id).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
        },
        _setupDisabled: function(disabled) {
            $.isArray(disabled) && (disabled.length ? disabled.length === this.anchors.length && (disabled = !0) : disabled = !1);
            for (var li, i = 0; li = this.tabs[i]; i++)
                !0 === disabled || -1 !== $.inArray(i, disabled) ? $(li).addClass("ui-state-disabled").attr("aria-disabled", "true") : $(li).removeClass("ui-state-disabled").removeAttr("aria-disabled");
            this.options.disabled = disabled
        },
        _setupEvents: function(event) {
            var events = {
                click: function(event) {
                    event.preventDefault()
                }
            };
            event && $.each(event.split(" "), function(index, eventName) {
                events[eventName] = "_eventHandler"
            }),
            this._off(this.anchors.add(this.tabs).add(this.panels)),
            this._on(this.anchors, events),
            this._on(this.tabs, {
                keydown: "_tabKeydown"
            }),
            this._on(this.panels, {
                keydown: "_panelKeydown"
            }),
            this._focusable(this.tabs),
            this._hoverable(this.tabs)
        },
        _setupHeightStyle: function(heightStyle) {
            var maxHeight, parent = this.element.parent();
            "fill" === heightStyle ? (maxHeight = parent.height(),
            maxHeight -= this.element.outerHeight() - this.element.height(),
            this.element.siblings(":visible").each(function() {
                var elem = $(this)
                  , position = elem.css("position");
                "absolute" !== position && "fixed" !== position && (maxHeight -= elem.outerHeight(!0))
            }),
            this.element.children().not(this.panels).each(function() {
                maxHeight -= $(this).outerHeight(!0)
            }),
            this.panels.each(function() {
                $(this).height(Math.max(0, maxHeight - $(this).innerHeight() + $(this).height()))
            }).css("overflow", "auto")) : "auto" === heightStyle && (maxHeight = 0,
            this.panels.each(function() {
                maxHeight = Math.max(maxHeight, $(this).height("").height())
            }).height(maxHeight))
        },
        _eventHandler: function(event) {
            var options = this.options
              , eventData = this.active
              , tab = $(event.currentTarget).closest("li")
              , clickedIsActive = tab[0] === eventData[0]
              , collapsing = clickedIsActive && options.collapsible
              , toShow = collapsing ? $() : this._getPanelForTab(tab)
              , toHide = eventData.length ? this._getPanelForTab(eventData) : $()
              , eventData = {
                oldTab: eventData,
                oldPanel: toHide,
                newTab: collapsing ? $() : tab,
                newPanel: toShow
            };
            event.preventDefault(),
            tab.hasClass("ui-state-disabled") || tab.hasClass("ui-tabs-loading") || this.running || clickedIsActive && !options.collapsible || !1 === this._trigger("beforeActivate", event, eventData) || (options.active = !collapsing && this.tabs.index(tab),
            this.active = clickedIsActive ? $() : tab,
            this.xhr && this.xhr.abort(),
            toHide.length || toShow.length || $.error("jQuery UI Tabs: Mismatching fragment identifier."),
            toShow.length && this.load(this.tabs.index(tab), event),
            this._toggle(event, eventData))
        },
        _toggle: function(event, eventData) {
            var that = this
              , toShow = eventData.newPanel
              , toHide = eventData.oldPanel;
            function complete() {
                that.running = !1,
                that._trigger("activate", event, eventData)
            }
            function show() {
                eventData.newTab.closest("li").addClass("ui-tabs-active ui-state-active"),
                toShow.length && that.options.show ? that._show(toShow, that.options.show, complete) : (toShow.show(),
                complete())
            }
            this.running = !0,
            toHide.length && this.options.hide ? this._hide(toHide, this.options.hide, function() {
                eventData.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),
                show()
            }) : (eventData.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),
            toHide.hide(),
            show()),
            toHide.attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            }),
            eventData.oldTab.attr("aria-selected", "false"),
            toShow.length && toHide.length ? eventData.oldTab.attr("tabIndex", -1) : toShow.length && this.tabs.filter(function() {
                return 0 === $(this).attr("tabIndex")
            }).attr("tabIndex", -1),
            toShow.attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            }),
            eventData.newTab.attr({
                "aria-selected": "true",
                tabIndex: 0
            })
        },
        _activate: function(anchor) {
            var anchor = this._findActive(anchor);
            anchor[0] !== this.active[0] && (anchor = (anchor = !anchor.length ? this.active : anchor).find(".ui-tabs-anchor")[0],
            this._eventHandler({
                target: anchor,
                currentTarget: anchor,
                preventDefault: $.noop
            }))
        },
        _findActive: function(index) {
            return !1 === index ? $() : this.tabs.eq(index)
        },
        _getIndex: function(index) {
            return index = "string" == typeof index ? this.anchors.index(this.anchors.filter("[href$='" + index + "']")) : index
        },
        _destroy: function() {
            this.xhr && this.xhr.abort(),
            this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"),
            this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"),
            this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(),
            this.tabs.add(this.panels).each(function() {
                $.data(this, "ui-tabs-destroy") ? $(this).remove() : $(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
            }),
            this.tabs.each(function() {
                var li = $(this)
                  , prev = li.data("ui-tabs-aria-controls");
                prev ? li.attr("aria-controls", prev).removeData("ui-tabs-aria-controls") : li.removeAttr("aria-controls")
            }),
            this.panels.show(),
            "content" !== this.options.heightStyle && this.panels.css("height", "")
        },
        enable: function(index) {
            var disabled = this.options.disabled;
            !1 !== disabled && (disabled = void 0 !== index && (index = this._getIndex(index),
            $.isArray(disabled) ? $.map(disabled, function(num) {
                return num !== index ? num : null
            }) : $.map(this.tabs, function(li, num) {
                return num !== index ? num : null
            })),
            this._setupDisabled(disabled))
        },
        disable: function(index) {
            var disabled = this.options.disabled;
            if (!0 !== disabled) {
                if (void 0 === index)
                    disabled = !0;
                else {
                    if (index = this._getIndex(index),
                    -1 !== $.inArray(index, disabled))
                        return;
                    disabled = $.isArray(disabled) ? $.merge([index], disabled).sort() : [index]
                }
                this._setupDisabled(disabled)
            }
        },
        load: function(anchor, event) {
            anchor = this._getIndex(anchor);
            var that = this
              , tab = this.tabs.eq(anchor)
              , anchor = tab.find(".ui-tabs-anchor")
              , panel = this._getPanelForTab(tab)
              , eventData = {
                tab: tab,
                panel: panel
            };
            isLocal(anchor[0]) || (this.xhr = $.ajax(this._ajaxSettings(anchor, event, eventData)),
            this.xhr && "canceled" !== this.xhr.statusText && (tab.addClass("ui-tabs-loading"),
            panel.attr("aria-busy", "true"),
            this.xhr.success(function(response) {
                setTimeout(function() {
                    panel.html(response),
                    that._trigger("load", event, eventData)
                }, 1)
            }).complete(function(jqXHR, status) {
                setTimeout(function() {
                    "abort" === status && that.panels.stop(!1, !0),
                    tab.removeClass("ui-tabs-loading"),
                    panel.removeAttr("aria-busy"),
                    jqXHR === that.xhr && delete that.xhr
                }, 1)
            })))
        },
        _ajaxSettings: function(anchor, event, eventData) {
            var that = this;
            return {
                url: anchor.attr("href"),
                beforeSend: function(jqXHR, settings) {
                    return that._trigger("beforeLoad", event, $.extend({
                        jqXHR: jqXHR,
                        ajaxSettings: settings
                    }, eventData))
                }
            }
        },
        _getPanelForTab: function(id) {
            id = $(id).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + id))
        }
    })
}(jQuery),
function($) {
    var increments = 0;
    $.widget("ui.tooltip", {
        version: "1.10.4",
        options: {
            content: function() {
                var title = $(this).attr("title") || "";
                return $("<a>").text(title).html()
            },
            hide: !0,
            items: "[title]:not([disabled])",
            position: {
                my: "left top+15",
                at: "left bottom",
                collision: "flipfit flip"
            },
            show: !0,
            tooltipClass: null,
            track: !1,
            close: null,
            open: null
        },
        _create: function() {
            this._on({
                mouseover: "open",
                focusin: "open"
            }),
            this.tooltips = {},
            this.parents = {},
            this.options.disabled && this._disable()
        },
        _setOption: function(key, value) {
            var that = this;
            if ("disabled" === key)
                return this[value ? "_disable" : "_enable"](),
                void (this.options[key] = value);
            this._super(key, value),
            "content" === key && $.each(this.tooltips, function(id, element) {
                that._updateContent(element)
            })
        },
        _disable: function() {
            var that = this;
            $.each(this.tooltips, function(id, element) {
                var event = $.Event("blur");
                event.target = event.currentTarget = element[0],
                that.close(event, !0)
            }),
            this.element.find(this.options.items).addBack().each(function() {
                var element = $(this);
                element.is("[title]") && element.data("ui-tooltip-title", element.attr("title")).attr("title", "")
            })
        },
        _enable: function() {
            this.element.find(this.options.items).addBack().each(function() {
                var element = $(this);
                element.data("ui-tooltip-title") && element.attr("title", element.data("ui-tooltip-title"))
            })
        },
        open: function(event) {
            var that = this
              , target = $(event ? event.target : this.element).closest(this.options.items);
            target.length && !target.data("ui-tooltip-id") && (target.attr("title") && target.data("ui-tooltip-title", target.attr("title")),
            target.data("ui-tooltip-open", !0),
            event && "mouseover" === event.type && target.parents().each(function() {
                var blurEvent, parent = $(this);
                parent.data("ui-tooltip-open") && ((blurEvent = $.Event("blur")).target = blurEvent.currentTarget = this,
                that.close(blurEvent, !0)),
                parent.attr("title") && (parent.uniqueId(),
                that.parents[this.id] = {
                    element: this,
                    title: parent.attr("title")
                },
                parent.attr("title", ""))
            }),
            this._updateContent(target, event))
        },
        _updateContent: function(target, event) {
            var content = this.options.content
              , that = this
              , eventType = event ? event.type : null;
            if ("string" == typeof content)
                return this._open(event, target, content);
            (content = content.call(target[0], function(response) {
                target.data("ui-tooltip-open") && that._delay(function() {
                    event && (event.type = eventType),
                    this._open(event, target, response)
                })
            })) && this._open(event, target, content)
        },
        _open: function(event, target, events) {
            var delayedShow, elem, id, describedby, tooltip, positionOption = $.extend({}, this.options.position);
            function position(event) {
                positionOption.of = event,
                tooltip.is(":hidden") || tooltip.position(positionOption)
            }
            events && ((tooltip = this._find(target)).length ? tooltip.find(".ui-tooltip-content").html(events) : (target.is("[title]") && (event && "mouseover" === event.type ? target.attr("title", "") : target.removeAttr("title")),
            tooltip = this._tooltip(target),
            elem = target,
            id = tooltip.attr("id"),
            (describedby = (elem.attr("aria-describedby") || "").split(/\s+/)).push(id),
            elem.data("ui-tooltip-id", id).attr("aria-describedby", $.trim(describedby.join(" "))),
            tooltip.find(".ui-tooltip-content").html(events),
            this.options.track && event && /^mouse/.test(event.type) ? (this._on(this.document, {
                mousemove: position
            }),
            position(event)) : tooltip.position($.extend({
                of: target
            }, this.options.position)),
            tooltip.hide(),
            this._show(tooltip, this.options.show),
            this.options.show && this.options.show.delay && (delayedShow = this.delayedShow = setInterval(function() {
                tooltip.is(":visible") && (position(positionOption.of),
                clearInterval(delayedShow))
            }, $.fx.interval)),
            this._trigger("open", event, {
                tooltip: tooltip
            }),
            events = {
                keyup: function(fakeEvent) {
                    fakeEvent.keyCode === $.ui.keyCode.ESCAPE && ((fakeEvent = $.Event(fakeEvent)).currentTarget = target[0],
                    this.close(fakeEvent, !0))
                },
                remove: function() {
                    this._removeTooltip(tooltip)
                }
            },
            event && "mouseover" !== event.type || (events.mouseleave = "close"),
            event && "focusin" !== event.type || (events.focusout = "close"),
            this._on(!0, target, events)))
        },
        close: function(event) {
            var elem, index, describedby, that = this, target = $(event ? event.currentTarget : this.element), tooltip = this._find(target);
            this.closing || (clearInterval(this.delayedShow),
            target.data("ui-tooltip-title") && target.attr("title", target.data("ui-tooltip-title")),
            index = (elem = target).data("ui-tooltip-id"),
            describedby = (elem.attr("aria-describedby") || "").split(/\s+/),
            -1 !== (index = $.inArray(index, describedby)) && describedby.splice(index, 1),
            elem.removeData("ui-tooltip-id"),
            (describedby = $.trim(describedby.join(" "))) ? elem.attr("aria-describedby", describedby) : elem.removeAttr("aria-describedby"),
            tooltip.stop(!0),
            this._hide(tooltip, this.options.hide, function() {
                that._removeTooltip($(this))
            }),
            target.removeData("ui-tooltip-open"),
            this._off(target, "mouseleave focusout keyup"),
            target[0] !== this.element[0] && this._off(target, "remove"),
            this._off(this.document, "mousemove"),
            event && "mouseleave" === event.type && $.each(this.parents, function(id, parent) {
                $(parent.element).attr("title", parent.title),
                delete that.parents[id]
            }),
            this.closing = !0,
            this._trigger("close", event, {
                tooltip: tooltip
            }),
            this.closing = !1)
        },
        _tooltip: function(element) {
            var id = "ui-tooltip-" + increments++
              , tooltip = $("<div>").attr({
                id: id,
                role: "tooltip"
            }).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
            return $("<div>").addClass("ui-tooltip-content").appendTo(tooltip),
            tooltip.appendTo(this.document[0].body),
            this.tooltips[id] = element,
            tooltip
        },
        _find: function(id) {
            id = id.data("ui-tooltip-id");
            return id ? $("#" + id) : $()
        },
        _removeTooltip: function(tooltip) {
            tooltip.remove(),
            delete this.tooltips[tooltip.attr("id")]
        },
        _destroy: function() {
            var that = this;
            $.each(this.tooltips, function(id, element) {
                var event = $.Event("blur");
                event.target = event.currentTarget = element[0],
                that.close(event, !0),
                $("#" + id).remove(),
                element.data("ui-tooltip-title") && (element.attr("title", element.data("ui-tooltip-title")),
                element.removeData("ui-tooltip-title"))
            })
        }
    })
}(jQuery);
//# sourceMappingURL=jquery-ui.min.js.map
