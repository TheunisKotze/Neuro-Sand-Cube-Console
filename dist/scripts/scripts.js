(function (window, undefined) {
  var rootjQuery, readyList, core_strundefined = typeof undefined, location = window.location, document = window.document, docElem = document.documentElement, _jQuery = window.jQuery, _$ = window.$, class2type = {}, core_deletedIds = [], core_version = '2.0.2', core_concat = core_deletedIds.concat, core_push = core_deletedIds.push, core_slice = core_deletedIds.slice, core_indexOf = core_deletedIds.indexOf, core_toString = class2type.toString, core_hasOwn = class2type.hasOwnProperty, core_trim = core_version.trim, jQuery = function (selector, context) {
      return new jQuery.fn.init(selector, context, rootjQuery);
    }, core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, core_rnotwhite = /\S+/g, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/, rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, rmsPrefix = /^-ms-/, rdashAlpha = /-([\da-z])/gi, fcamelCase = function (all, letter) {
      return letter.toUpperCase();
    }, completed = function () {
      document.removeEventListener('DOMContentLoaded', completed, false);
      window.removeEventListener('load', completed, false);
      jQuery.ready();
    };
  jQuery.fn = jQuery.prototype = {
    jquery: core_version,
    constructor: jQuery,
    init: function (selector, context, rootjQuery) {
      var match, elem;
      if (!selector) {
        return this;
      }
      if (typeof selector === 'string') {
        if (selector.charAt(0) === '<' && selector.charAt(selector.length - 1) === '>' && selector.length >= 3) {
          match = [
            null,
            selector,
            null
          ];
        } else {
          match = rquickExpr.exec(selector);
        }
        if (match && (match[1] || !context)) {
          if (match[1]) {
            context = context instanceof jQuery ? context[0] : context;
            jQuery.merge(this, jQuery.parseHTML(match[1], context && context.nodeType ? context.ownerDocument || context : document, true));
            if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
              for (match in context) {
                if (jQuery.isFunction(this[match])) {
                  this[match](context[match]);
                } else {
                  this.attr(match, context[match]);
                }
              }
            }
            return this;
          } else {
            elem = document.getElementById(match[2]);
            if (elem && elem.parentNode) {
              this.length = 1;
              this[0] = elem;
            }
            this.context = document;
            this.selector = selector;
            return this;
          }
        } else if (!context || context.jquery) {
          return (context || rootjQuery).find(selector);
        } else {
          return this.constructor(context).find(selector);
        }
      } else if (selector.nodeType) {
        this.context = this[0] = selector;
        this.length = 1;
        return this;
      } else if (jQuery.isFunction(selector)) {
        return rootjQuery.ready(selector);
      }
      if (selector.selector !== undefined) {
        this.selector = selector.selector;
        this.context = selector.context;
      }
      return jQuery.makeArray(selector, this);
    },
    selector: '',
    length: 0,
    toArray: function () {
      return core_slice.call(this);
    },
    get: function (num) {
      return num == null ? this.toArray() : num < 0 ? this[this.length + num] : this[num];
    },
    pushStack: function (elems) {
      var ret = jQuery.merge(this.constructor(), elems);
      ret.prevObject = this;
      ret.context = this.context;
      return ret;
    },
    each: function (callback, args) {
      return jQuery.each(this, callback, args);
    },
    ready: function (fn) {
      jQuery.ready.promise().done(fn);
      return this;
    },
    slice: function () {
      return this.pushStack(core_slice.apply(this, arguments));
    },
    first: function () {
      return this.eq(0);
    },
    last: function () {
      return this.eq(-1);
    },
    eq: function (i) {
      var len = this.length, j = +i + (i < 0 ? len : 0);
      return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    map: function (callback) {
      return this.pushStack(jQuery.map(this, function (elem, i) {
        return callback.call(elem, i, elem);
      }));
    },
    end: function () {
      return this.prevObject || this.constructor(null);
    },
    push: core_push,
    sort: [].sort,
    splice: [].splice
  };
  jQuery.fn.init.prototype = jQuery.fn;
  jQuery.extend = jQuery.fn.extend = function () {
    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
    if (typeof target === 'boolean') {
      deep = target;
      target = arguments[1] || {};
      i = 2;
    }
    if (typeof target !== 'object' && !jQuery.isFunction(target)) {
      target = {};
    }
    if (length === i) {
      target = this;
      --i;
    }
    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            target[name] = jQuery.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  };
  jQuery.extend({
    expando: 'jQuery' + (core_version + Math.random()).replace(/\D/g, ''),
    noConflict: function (deep) {
      if (window.$ === jQuery) {
        window.$ = _$;
      }
      if (deep && window.jQuery === jQuery) {
        window.jQuery = _jQuery;
      }
      return jQuery;
    },
    isReady: false,
    readyWait: 1,
    holdReady: function (hold) {
      if (hold) {
        jQuery.readyWait++;
      } else {
        jQuery.ready(true);
      }
    },
    ready: function (wait) {
      if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
        return;
      }
      jQuery.isReady = true;
      if (wait !== true && --jQuery.readyWait > 0) {
        return;
      }
      readyList.resolveWith(document, [jQuery]);
      if (jQuery.fn.trigger) {
        jQuery(document).trigger('ready').off('ready');
      }
    },
    isFunction: function (obj) {
      return jQuery.type(obj) === 'function';
    },
    isArray: Array.isArray,
    isWindow: function (obj) {
      return obj != null && obj === obj.window;
    },
    isNumeric: function (obj) {
      return !isNaN(parseFloat(obj)) && isFinite(obj);
    },
    type: function (obj) {
      if (obj == null) {
        return String(obj);
      }
      return typeof obj === 'object' || typeof obj === 'function' ? class2type[core_toString.call(obj)] || 'object' : typeof obj;
    },
    isPlainObject: function (obj) {
      if (jQuery.type(obj) !== 'object' || obj.nodeType || jQuery.isWindow(obj)) {
        return false;
      }
      try {
        if (obj.constructor && !core_hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) {
          return false;
        }
      } catch (e) {
        return false;
      }
      return true;
    },
    isEmptyObject: function (obj) {
      var name;
      for (name in obj) {
        return false;
      }
      return true;
    },
    error: function (msg) {
      throw new Error(msg);
    },
    parseHTML: function (data, context, keepScripts) {
      if (!data || typeof data !== 'string') {
        return null;
      }
      if (typeof context === 'boolean') {
        keepScripts = context;
        context = false;
      }
      context = context || document;
      var parsed = rsingleTag.exec(data), scripts = !keepScripts && [];
      if (parsed) {
        return [context.createElement(parsed[1])];
      }
      parsed = jQuery.buildFragment([data], context, scripts);
      if (scripts) {
        jQuery(scripts).remove();
      }
      return jQuery.merge([], parsed.childNodes);
    },
    parseJSON: JSON.parse,
    parseXML: function (data) {
      var xml, tmp;
      if (!data || typeof data !== 'string') {
        return null;
      }
      try {
        tmp = new DOMParser();
        xml = tmp.parseFromString(data, 'text/xml');
      } catch (e) {
        xml = undefined;
      }
      if (!xml || xml.getElementsByTagName('parsererror').length) {
        jQuery.error('Invalid XML: ' + data);
      }
      return xml;
    },
    noop: function () {
    },
    globalEval: function (code) {
      var script, indirect = eval;
      code = jQuery.trim(code);
      if (code) {
        if (code.indexOf('use strict') === 1) {
          script = document.createElement('script');
          script.text = code;
          document.head.appendChild(script).parentNode.removeChild(script);
        } else {
          indirect(code);
        }
      }
    },
    camelCase: function (string) {
      return string.replace(rmsPrefix, 'ms-').replace(rdashAlpha, fcamelCase);
    },
    nodeName: function (elem, name) {
      return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
    },
    each: function (obj, callback, args) {
      var value, i = 0, length = obj.length, isArray = isArraylike(obj);
      if (args) {
        if (isArray) {
          for (; i < length; i++) {
            value = callback.apply(obj[i], args);
            if (value === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            value = callback.apply(obj[i], args);
            if (value === false) {
              break;
            }
          }
        }
      } else {
        if (isArray) {
          for (; i < length; i++) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
              break;
            }
          }
        } else {
          for (i in obj) {
            value = callback.call(obj[i], i, obj[i]);
            if (value === false) {
              break;
            }
          }
        }
      }
      return obj;
    },
    trim: function (text) {
      return text == null ? '' : core_trim.call(text);
    },
    makeArray: function (arr, results) {
      var ret = results || [];
      if (arr != null) {
        if (isArraylike(Object(arr))) {
          jQuery.merge(ret, typeof arr === 'string' ? [arr] : arr);
        } else {
          core_push.call(ret, arr);
        }
      }
      return ret;
    },
    inArray: function (elem, arr, i) {
      return arr == null ? -1 : core_indexOf.call(arr, elem, i);
    },
    merge: function (first, second) {
      var l = second.length, i = first.length, j = 0;
      if (typeof l === 'number') {
        for (; j < l; j++) {
          first[i++] = second[j];
        }
      } else {
        while (second[j] !== undefined) {
          first[i++] = second[j++];
        }
      }
      first.length = i;
      return first;
    },
    grep: function (elems, callback, inv) {
      var retVal, ret = [], i = 0, length = elems.length;
      inv = !!inv;
      for (; i < length; i++) {
        retVal = !!callback(elems[i], i);
        if (inv !== retVal) {
          ret.push(elems[i]);
        }
      }
      return ret;
    },
    map: function (elems, callback, arg) {
      var value, i = 0, length = elems.length, isArray = isArraylike(elems), ret = [];
      if (isArray) {
        for (; i < length; i++) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret[ret.length] = value;
          }
        }
      } else {
        for (i in elems) {
          value = callback(elems[i], i, arg);
          if (value != null) {
            ret[ret.length] = value;
          }
        }
      }
      return core_concat.apply([], ret);
    },
    guid: 1,
    proxy: function (fn, context) {
      var tmp, args, proxy;
      if (typeof context === 'string') {
        tmp = fn[context];
        context = fn;
        fn = tmp;
      }
      if (!jQuery.isFunction(fn)) {
        return undefined;
      }
      args = core_slice.call(arguments, 2);
      proxy = function () {
        return fn.apply(context || this, args.concat(core_slice.call(arguments)));
      };
      proxy.guid = fn.guid = fn.guid || jQuery.guid++;
      return proxy;
    },
    access: function (elems, fn, key, value, chainable, emptyGet, raw) {
      var i = 0, length = elems.length, bulk = key == null;
      if (jQuery.type(key) === 'object') {
        chainable = true;
        for (i in key) {
          jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
        }
      } else if (value !== undefined) {
        chainable = true;
        if (!jQuery.isFunction(value)) {
          raw = true;
        }
        if (bulk) {
          if (raw) {
            fn.call(elems, value);
            fn = null;
          } else {
            bulk = fn;
            fn = function (elem, key, value) {
              return bulk.call(jQuery(elem), value);
            };
          }
        }
        if (fn) {
          for (; i < length; i++) {
            fn(elems[i], key, raw ? value : value.call(elems[i], i, fn(elems[i], key)));
          }
        }
      }
      return chainable ? elems : bulk ? fn.call(elems) : length ? fn(elems[0], key) : emptyGet;
    },
    now: Date.now,
    swap: function (elem, options, callback, args) {
      var ret, name, old = {};
      for (name in options) {
        old[name] = elem.style[name];
        elem.style[name] = options[name];
      }
      ret = callback.apply(elem, args || []);
      for (name in options) {
        elem.style[name] = old[name];
      }
      return ret;
    }
  });
  jQuery.ready.promise = function (obj) {
    if (!readyList) {
      readyList = jQuery.Deferred();
      if (document.readyState === 'complete') {
        setTimeout(jQuery.ready);
      } else {
        document.addEventListener('DOMContentLoaded', completed, false);
        window.addEventListener('load', completed, false);
      }
    }
    return readyList.promise(obj);
  };
  jQuery.each('Boolean Number String Function Array Date RegExp Object Error'.split(' '), function (i, name) {
    class2type['[object ' + name + ']'] = name.toLowerCase();
  });
  function isArraylike(obj) {
    var length = obj.length, type = jQuery.type(obj);
    if (jQuery.isWindow(obj)) {
      return false;
    }
    if (obj.nodeType === 1 && length) {
      return true;
    }
    return type === 'array' || type !== 'function' && (length === 0 || typeof length === 'number' && length > 0 && length - 1 in obj);
  }
  rootjQuery = jQuery(document);
  (function (window, undefined) {
    var i, support, cachedruns, Expr, getText, isXML, compile, outermostContext, sortInput, setDocument, document, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = 'sizzle' + -new Date(), preferredDoc = window.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), hasDuplicate = false, sortOrder = function () {
        return 0;
      }, strundefined = typeof undefined, MAX_NEGATIVE = 1 << 31, hasOwn = {}.hasOwnProperty, arr = [], pop = arr.pop, push_native = arr.push, push = arr.push, slice = arr.slice, indexOf = arr.indexOf || function (elem) {
        var i = 0, len = this.length;
        for (; i < len; i++) {
          if (this[i] === elem) {
            return i;
          }
        }
        return -1;
      }, booleans = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped', whitespace = '[\\x20\\t\\r\\n\\f]', characterEncoding = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+', identifier = characterEncoding.replace('w', 'w#'), attributes = '\\[' + whitespace + '*(' + characterEncoding + ')' + whitespace + '*(?:([*^$|!~]?=)' + whitespace + '*(?:([\'"])((?:\\\\.|[^\\\\])*?)\\3|(' + identifier + ')|)|)' + whitespace + '*\\]', pseudos = ':(' + characterEncoding + ')(?:\\((([\'"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|' + attributes.replace(3, 8) + ')*)|.*)\\)|)', rtrim = new RegExp('^' + whitespace + '+|((?:^|[^\\\\])(?:\\\\.)*)' + whitespace + '+$', 'g'), rcomma = new RegExp('^' + whitespace + '*,' + whitespace + '*'), rcombinators = new RegExp('^' + whitespace + '*([>+~]|' + whitespace + ')' + whitespace + '*'), rsibling = new RegExp(whitespace + '*[+~]'), rattributeQuotes = new RegExp('=' + whitespace + '*([^\\]\'"]*)' + whitespace + '*\\]', 'g'), rpseudo = new RegExp(pseudos), ridentifier = new RegExp('^' + identifier + '$'), matchExpr = {
        'ID': new RegExp('^#(' + characterEncoding + ')'),
        'CLASS': new RegExp('^\\.(' + characterEncoding + ')'),
        'TAG': new RegExp('^(' + characterEncoding.replace('w', 'w*') + ')'),
        'ATTR': new RegExp('^' + attributes),
        'PSEUDO': new RegExp('^' + pseudos),
        'CHILD': new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + whitespace + '*(even|odd|(([+-]|)(\\d*)n|)' + whitespace + '*(?:([+-]|)' + whitespace + '*(\\d+)|))' + whitespace + '*\\)|)', 'i'),
        'bool': new RegExp('^(?:' + booleans + ')$', 'i'),
        'needsContext': new RegExp('^' + whitespace + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + whitespace + '*((?:-\\d)?\\d*)' + whitespace + '*\\)|)(?=[^-]|$)', 'i')
      }, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rescape = /'|\\/g, runescape = new RegExp('\\\\([\\da-f]{1,6}' + whitespace + '?|(' + whitespace + ')|.)', 'ig'), funescape = function (_, escaped, escapedWhitespace) {
        var high = '0x' + escaped - 65536;
        return high !== high || escapedWhitespace ? escaped : high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320);
      };
    try {
      push.apply(arr = slice.call(preferredDoc.childNodes), preferredDoc.childNodes);
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {
        apply: arr.length ? function (target, els) {
          push_native.apply(target, slice.call(els));
        } : function (target, els) {
          var j = target.length, i = 0;
          while (target[j++] = els[i++]) {
          }
          target.length = j - 1;
        }
      };
    }
    function Sizzle(selector, context, results, seed) {
      var match, elem, m, nodeType, i, groups, old, nid, newContext, newSelector;
      if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
        setDocument(context);
      }
      context = context || document;
      results = results || [];
      if (!selector || typeof selector !== 'string') {
        return results;
      }
      if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
        return [];
      }
      if (documentIsHTML && !seed) {
        if (match = rquickExpr.exec(selector)) {
          if (m = match[1]) {
            if (nodeType === 9) {
              elem = context.getElementById(m);
              if (elem && elem.parentNode) {
                if (elem.id === m) {
                  results.push(elem);
                  return results;
                }
              } else {
                return results;
              }
            } else {
              if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) && contains(context, elem) && elem.id === m) {
                results.push(elem);
                return results;
              }
            }
          } else if (match[2]) {
            push.apply(results, context.getElementsByTagName(selector));
            return results;
          } else if ((m = match[3]) && support.getElementsByClassName && context.getElementsByClassName) {
            push.apply(results, context.getElementsByClassName(m));
            return results;
          }
        }
        if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
          nid = old = expando;
          newContext = context;
          newSelector = nodeType === 9 && selector;
          if (nodeType === 1 && context.nodeName.toLowerCase() !== 'object') {
            groups = tokenize(selector);
            if (old = context.getAttribute('id')) {
              nid = old.replace(rescape, '\\$&');
            } else {
              context.setAttribute('id', nid);
            }
            nid = '[id=\'' + nid + '\'] ';
            i = groups.length;
            while (i--) {
              groups[i] = nid + toSelector(groups[i]);
            }
            newContext = rsibling.test(selector) && context.parentNode || context;
            newSelector = groups.join(',');
          }
          if (newSelector) {
            try {
              push.apply(results, newContext.querySelectorAll(newSelector));
              return results;
            } catch (qsaError) {
            } finally {
              if (!old) {
                context.removeAttribute('id');
              }
            }
          }
        }
      }
      return select(selector.replace(rtrim, '$1'), context, results, seed);
    }
    function isNative(fn) {
      return rnative.test(fn + '');
    }
    function createCache() {
      var keys = [];
      function cache(key, value) {
        if (keys.push(key += ' ') > Expr.cacheLength) {
          delete cache[keys.shift()];
        }
        return cache[key] = value;
      }
      return cache;
    }
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }
    function assert(fn) {
      var div = document.createElement('div');
      try {
        return !!fn(div);
      } catch (e) {
        return false;
      } finally {
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
        div = null;
      }
    }
    function addHandle(attrs, handler, test) {
      attrs = attrs.split('|');
      var current, i = attrs.length, setHandle = test ? null : handler;
      while (i--) {
        if (!(current = Expr.attrHandle[attrs[i]]) || current === handler) {
          Expr.attrHandle[attrs[i]] = setHandle;
        }
      }
    }
    function boolHandler(elem, name) {
      var val = elem.getAttributeNode(name);
      return val && val.specified ? val.value : elem[name] === true ? name.toLowerCase() : null;
    }
    function interpolationHandler(elem, name) {
      return elem.getAttribute(name, name.toLowerCase() === 'type' ? 1 : 2);
    }
    function valueHandler(elem) {
      if (elem.nodeName.toLowerCase() === 'input') {
        return elem.defaultValue;
      }
    }
    function siblingCheck(a, b) {
      var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || MAX_NEGATIVE) - (~a.sourceIndex || MAX_NEGATIVE);
      if (diff) {
        return diff;
      }
      if (cur) {
        while (cur = cur.nextSibling) {
          if (cur === b) {
            return -1;
          }
        }
      }
      return a ? 1 : -1;
    }
    function createInputPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return name === 'input' && elem.type === type;
      };
    }
    function createButtonPseudo(type) {
      return function (elem) {
        var name = elem.nodeName.toLowerCase();
        return (name === 'input' || name === 'button') && elem.type === type;
      };
    }
    function createPositionalPseudo(fn) {
      return markFunction(function (argument) {
        argument = +argument;
        return markFunction(function (seed, matches) {
          var j, matchIndexes = fn([], seed.length, argument), i = matchIndexes.length;
          while (i--) {
            if (seed[j = matchIndexes[i]]) {
              seed[j] = !(matches[j] = seed[j]);
            }
          }
        });
      });
    }
    isXML = Sizzle.isXML = function (elem) {
      var documentElement = elem && (elem.ownerDocument || elem).documentElement;
      return documentElement ? documentElement.nodeName !== 'HTML' : false;
    };
    support = Sizzle.support = {};
    setDocument = Sizzle.setDocument = function (node) {
      var doc = node ? node.ownerDocument || node : preferredDoc, parent = doc.parentWindow;
      if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
        return document;
      }
      document = doc;
      docElem = doc.documentElement;
      documentIsHTML = !isXML(doc);
      if (parent && parent.frameElement) {
        parent.attachEvent('onbeforeunload', function () {
          setDocument();
        });
      }
      support.attributes = assert(function (div) {
        div.innerHTML = '<a href=\'#\'></a>';
        addHandle('type|href|height|width', interpolationHandler, div.firstChild.getAttribute('href') === '#');
        addHandle(booleans, boolHandler, div.getAttribute('disabled') == null);
        div.className = 'i';
        return !div.getAttribute('className');
      });
      support.input = assert(function (div) {
        div.innerHTML = '<input>';
        div.firstChild.setAttribute('value', '');
        return div.firstChild.getAttribute('value') === '';
      });
      addHandle('value', valueHandler, support.attributes && support.input);
      support.getElementsByTagName = assert(function (div) {
        div.appendChild(doc.createComment(''));
        return !div.getElementsByTagName('*').length;
      });
      support.getElementsByClassName = assert(function (div) {
        div.innerHTML = '<div class=\'a\'></div><div class=\'a i\'></div>';
        div.firstChild.className = 'i';
        return div.getElementsByClassName('i').length === 2;
      });
      support.getById = assert(function (div) {
        docElem.appendChild(div).id = expando;
        return !doc.getElementsByName || !doc.getElementsByName(expando).length;
      });
      if (support.getById) {
        Expr.find['ID'] = function (id, context) {
          if (typeof context.getElementById !== strundefined && documentIsHTML) {
            var m = context.getElementById(id);
            return m && m.parentNode ? [m] : [];
          }
        };
        Expr.filter['ID'] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            return elem.getAttribute('id') === attrId;
          };
        };
      } else {
        delete Expr.find['ID'];
        Expr.filter['ID'] = function (id) {
          var attrId = id.replace(runescape, funescape);
          return function (elem) {
            var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode('id');
            return node && node.value === attrId;
          };
        };
      }
      Expr.find['TAG'] = support.getElementsByTagName ? function (tag, context) {
        if (typeof context.getElementsByTagName !== strundefined) {
          return context.getElementsByTagName(tag);
        }
      } : function (tag, context) {
        var elem, tmp = [], i = 0, results = context.getElementsByTagName(tag);
        if (tag === '*') {
          while (elem = results[i++]) {
            if (elem.nodeType === 1) {
              tmp.push(elem);
            }
          }
          return tmp;
        }
        return results;
      };
      Expr.find['CLASS'] = support.getElementsByClassName && function (className, context) {
        if (typeof context.getElementsByClassName !== strundefined && documentIsHTML) {
          return context.getElementsByClassName(className);
        }
      };
      rbuggyMatches = [];
      rbuggyQSA = [];
      if (support.qsa = isNative(doc.querySelectorAll)) {
        assert(function (div) {
          div.innerHTML = '<select><option selected=\'\'></option></select>';
          if (!div.querySelectorAll('[selected]').length) {
            rbuggyQSA.push('\\[' + whitespace + '*(?:value|' + booleans + ')');
          }
          if (!div.querySelectorAll(':checked').length) {
            rbuggyQSA.push(':checked');
          }
        });
        assert(function (div) {
          var input = doc.createElement('input');
          input.setAttribute('type', 'hidden');
          div.appendChild(input).setAttribute('t', '');
          if (div.querySelectorAll('[t^=\'\']').length) {
            rbuggyQSA.push('[*^$]=' + whitespace + '*(?:\'\'|"")');
          }
          if (!div.querySelectorAll(':enabled').length) {
            rbuggyQSA.push(':enabled', ':disabled');
          }
          div.querySelectorAll('*,:x');
          rbuggyQSA.push(',.*:');
        });
      }
      if (support.matchesSelector = isNative(matches = docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
        assert(function (div) {
          support.disconnectedMatch = matches.call(div, 'div');
          matches.call(div, '[s!=\'\']:x');
          rbuggyMatches.push('!=', pseudos);
        });
      }
      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join('|'));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join('|'));
      contains = isNative(docElem.contains) || docElem.compareDocumentPosition ? function (a, b) {
        var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
        return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
      } : function (a, b) {
        if (b) {
          while (b = b.parentNode) {
            if (b === a) {
              return true;
            }
          }
        }
        return false;
      };
      support.sortDetached = assert(function (div1) {
        return div1.compareDocumentPosition(doc.createElement('div')) & 1;
      });
      sortOrder = docElem.compareDocumentPosition ? function (a, b) {
        if (a === b) {
          hasDuplicate = true;
          return 0;
        }
        var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition(b);
        if (compare) {
          if (compare & 1 || !support.sortDetached && b.compareDocumentPosition(a) === compare) {
            if (a === doc || contains(preferredDoc, a)) {
              return -1;
            }
            if (b === doc || contains(preferredDoc, b)) {
              return 1;
            }
            return sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
          }
          return compare & 4 ? -1 : 1;
        }
        return a.compareDocumentPosition ? -1 : 1;
      } : function (a, b) {
        var cur, i = 0, aup = a.parentNode, bup = b.parentNode, ap = [a], bp = [b];
        if (a === b) {
          hasDuplicate = true;
          return 0;
        } else if (!aup || !bup) {
          return a === doc ? -1 : b === doc ? 1 : aup ? -1 : bup ? 1 : sortInput ? indexOf.call(sortInput, a) - indexOf.call(sortInput, b) : 0;
        } else if (aup === bup) {
          return siblingCheck(a, b);
        }
        cur = a;
        while (cur = cur.parentNode) {
          ap.unshift(cur);
        }
        cur = b;
        while (cur = cur.parentNode) {
          bp.unshift(cur);
        }
        while (ap[i] === bp[i]) {
          i++;
        }
        return i ? siblingCheck(ap[i], bp[i]) : ap[i] === preferredDoc ? -1 : bp[i] === preferredDoc ? 1 : 0;
      };
      return doc;
    };
    Sizzle.matches = function (expr, elements) {
      return Sizzle(expr, null, null, elements);
    };
    Sizzle.matchesSelector = function (elem, expr) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      expr = expr.replace(rattributeQuotes, '=\'$1\']');
      if (support.matchesSelector && documentIsHTML && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
        try {
          var ret = matches.call(elem, expr);
          if (ret || support.disconnectedMatch || elem.document && elem.document.nodeType !== 11) {
            return ret;
          }
        } catch (e) {
        }
      }
      return Sizzle(expr, document, null, [elem]).length > 0;
    };
    Sizzle.contains = function (context, elem) {
      if ((context.ownerDocument || context) !== document) {
        setDocument(context);
      }
      return contains(context, elem);
    };
    Sizzle.attr = function (elem, name) {
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }
      var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : undefined;
      return val === undefined ? support.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null : val;
    };
    Sizzle.error = function (msg) {
      throw new Error('Syntax error, unrecognized expression: ' + msg);
    };
    Sizzle.uniqueSort = function (results) {
      var elem, duplicates = [], j = 0, i = 0;
      hasDuplicate = !support.detectDuplicates;
      sortInput = !support.sortStable && results.slice(0);
      results.sort(sortOrder);
      if (hasDuplicate) {
        while (elem = results[i++]) {
          if (elem === results[i]) {
            j = duplicates.push(i);
          }
        }
        while (j--) {
          results.splice(duplicates[j], 1);
        }
      }
      return results;
    };
    getText = Sizzle.getText = function (elem) {
      var node, ret = '', i = 0, nodeType = elem.nodeType;
      if (!nodeType) {
        for (; node = elem[i]; i++) {
          ret += getText(node);
        }
      } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
        if (typeof elem.textContent === 'string') {
          return elem.textContent;
        } else {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            ret += getText(elem);
          }
        }
      } else if (nodeType === 3 || nodeType === 4) {
        return elem.nodeValue;
      }
      return ret;
    };
    Expr = Sizzle.selectors = {
      cacheLength: 50,
      createPseudo: markFunction,
      match: matchExpr,
      attrHandle: {},
      find: {},
      relative: {
        '>': {
          dir: 'parentNode',
          first: true
        },
        ' ': { dir: 'parentNode' },
        '+': {
          dir: 'previousSibling',
          first: true
        },
        '~': { dir: 'previousSibling' }
      },
      preFilter: {
        'ATTR': function (match) {
          match[1] = match[1].replace(runescape, funescape);
          match[3] = (match[4] || match[5] || '').replace(runescape, funescape);
          if (match[2] === '~=') {
            match[3] = ' ' + match[3] + ' ';
          }
          return match.slice(0, 4);
        },
        'CHILD': function (match) {
          match[1] = match[1].toLowerCase();
          if (match[1].slice(0, 3) === 'nth') {
            if (!match[3]) {
              Sizzle.error(match[0]);
            }
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === 'even' || match[3] === 'odd'));
            match[5] = +(match[7] + match[8] || match[3] === 'odd');
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }
          return match;
        },
        'PSEUDO': function (match) {
          var excess, unquoted = !match[5] && match[2];
          if (matchExpr['CHILD'].test(match[0])) {
            return null;
          }
          if (match[3] && match[4] !== undefined) {
            match[2] = match[4];
          } else if (unquoted && rpseudo.test(unquoted) && (excess = tokenize(unquoted, true)) && (excess = unquoted.indexOf(')', unquoted.length - excess) - unquoted.length)) {
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }
          return match.slice(0, 3);
        }
      },
      filter: {
        'TAG': function (nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === '*' ? function () {
            return true;
          } : function (elem) {
            return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
          };
        },
        'CLASS': function (className) {
          var pattern = classCache[className + ' '];
          return pattern || (pattern = new RegExp('(^|' + whitespace + ')' + className + '(' + whitespace + '|$)')) && classCache(className, function (elem) {
            return pattern.test(typeof elem.className === 'string' && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute('class') || '');
          });
        },
        'ATTR': function (name, operator, check) {
          return function (elem) {
            var result = Sizzle.attr(elem, name);
            if (result == null) {
              return operator === '!=';
            }
            if (!operator) {
              return true;
            }
            result += '';
            return operator === '=' ? result === check : operator === '!=' ? result !== check : operator === '^=' ? check && result.indexOf(check) === 0 : operator === '*=' ? check && result.indexOf(check) > -1 : operator === '$=' ? check && result.slice(-check.length) === check : operator === '~=' ? (' ' + result + ' ').indexOf(check) > -1 : operator === '|=' ? result === check || result.slice(0, check.length + 1) === check + '-' : false;
          };
        },
        'CHILD': function (type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== 'nth', forward = type.slice(-4) !== 'last', ofType = what === 'of-type';
          return first === 1 && last === 0 ? function (elem) {
            return !!elem.parentNode;
          } : function (elem, context, xml) {
            var cache, outerCache, node, diff, nodeIndex, start, dir = simple !== forward ? 'nextSibling' : 'previousSibling', parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType;
            if (parent) {
              if (simple) {
                while (dir) {
                  node = elem;
                  while (node = node[dir]) {
                    if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                      return false;
                    }
                  }
                  start = dir = type === 'only' && !start && 'nextSibling';
                }
                return true;
              }
              start = [forward ? parent.firstChild : parent.lastChild];
              if (forward && useCache) {
                outerCache = parent[expando] || (parent[expando] = {});
                cache = outerCache[type] || [];
                nodeIndex = cache[0] === dirruns && cache[1];
                diff = cache[0] === dirruns && cache[2];
                node = nodeIndex && parent.childNodes[nodeIndex];
                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                  if (node.nodeType === 1 && ++diff && node === elem) {
                    outerCache[type] = [
                      dirruns,
                      nodeIndex,
                      diff
                    ];
                    break;
                  }
                }
              } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                diff = cache[1];
              } else {
                while (node = ++nodeIndex && node && node[dir] || (diff = nodeIndex = 0) || start.pop()) {
                  if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                    if (useCache) {
                      (node[expando] || (node[expando] = {}))[type] = [
                        dirruns,
                        diff
                      ];
                    }
                    if (node === elem) {
                      break;
                    }
                  }
                }
              }
              diff -= last;
              return diff === first || diff % first === 0 && diff / first >= 0;
            }
          };
        },
        'PSEUDO': function (pseudo, argument) {
          var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle.error('unsupported pseudo: ' + pseudo);
          if (fn[expando]) {
            return fn(argument);
          }
          if (fn.length > 1) {
            args = [
              pseudo,
              pseudo,
              '',
              argument
            ];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function (seed, matches) {
              var idx, matched = fn(seed, argument), i = matched.length;
              while (i--) {
                idx = indexOf.call(seed, matched[i]);
                seed[idx] = !(matches[idx] = matched[i]);
              }
            }) : function (elem) {
              return fn(elem, 0, args);
            };
          }
          return fn;
        }
      },
      pseudos: {
        'not': markFunction(function (selector) {
          var input = [], results = [], matcher = compile(selector.replace(rtrim, '$1'));
          return matcher[expando] ? markFunction(function (seed, matches, context, xml) {
            var elem, unmatched = matcher(seed, null, xml, []), i = seed.length;
            while (i--) {
              if (elem = unmatched[i]) {
                seed[i] = !(matches[i] = elem);
              }
            }
          }) : function (elem, context, xml) {
            input[0] = elem;
            matcher(input, null, xml, results);
            return !results.pop();
          };
        }),
        'has': markFunction(function (selector) {
          return function (elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),
        'contains': markFunction(function (text) {
          return function (elem) {
            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
          };
        }),
        'lang': markFunction(function (lang) {
          if (!ridentifier.test(lang || '')) {
            Sizzle.error('unsupported lang: ' + lang);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function (elem) {
            var elemLang;
            do {
              if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute('xml:lang') || elem.getAttribute('lang')) {
                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + '-') === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),
        'target': function (elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },
        'root': function (elem) {
          return elem === docElem;
        },
        'focus': function (elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },
        'enabled': function (elem) {
          return elem.disabled === false;
        },
        'disabled': function (elem) {
          return elem.disabled === true;
        },
        'checked': function (elem) {
          var nodeName = elem.nodeName.toLowerCase();
          return nodeName === 'input' && !!elem.checked || nodeName === 'option' && !!elem.selected;
        },
        'selected': function (elem) {
          if (elem.parentNode) {
            elem.parentNode.selectedIndex;
          }
          return elem.selected === true;
        },
        'empty': function (elem) {
          for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
            if (elem.nodeName > '@' || elem.nodeType === 3 || elem.nodeType === 4) {
              return false;
            }
          }
          return true;
        },
        'parent': function (elem) {
          return !Expr.pseudos['empty'](elem);
        },
        'header': function (elem) {
          return rheader.test(elem.nodeName);
        },
        'input': function (elem) {
          return rinputs.test(elem.nodeName);
        },
        'button': function (elem) {
          var name = elem.nodeName.toLowerCase();
          return name === 'input' && elem.type === 'button' || name === 'button';
        },
        'text': function (elem) {
          var attr;
          return elem.nodeName.toLowerCase() === 'input' && elem.type === 'text' && ((attr = elem.getAttribute('type')) == null || attr.toLowerCase() === elem.type);
        },
        'first': createPositionalPseudo(function () {
          return [0];
        }),
        'last': createPositionalPseudo(function (matchIndexes, length) {
          return [length - 1];
        }),
        'eq': createPositionalPseudo(function (matchIndexes, length, argument) {
          return [argument < 0 ? argument + length : argument];
        }),
        'even': createPositionalPseudo(function (matchIndexes, length) {
          var i = 0;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'odd': createPositionalPseudo(function (matchIndexes, length) {
          var i = 1;
          for (; i < length; i += 2) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'lt': createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; --i >= 0;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        }),
        'gt': createPositionalPseudo(function (matchIndexes, length, argument) {
          var i = argument < 0 ? argument + length : argument;
          for (; ++i < length;) {
            matchIndexes.push(i);
          }
          return matchIndexes;
        })
      }
    };
    for (i in {
        radio: true,
        checkbox: true,
        file: true,
        password: true,
        image: true
      }) {
      Expr.pseudos[i] = createInputPseudo(i);
    }
    for (i in {
        submit: true,
        reset: true
      }) {
      Expr.pseudos[i] = createButtonPseudo(i);
    }
    function tokenize(selector, parseOnly) {
      var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + ' '];
      if (cached) {
        return parseOnly ? 0 : cached.slice(0);
      }
      soFar = selector;
      groups = [];
      preFilters = Expr.preFilter;
      while (soFar) {
        if (!matched || (match = rcomma.exec(soFar))) {
          if (match) {
            soFar = soFar.slice(match[0].length) || soFar;
          }
          groups.push(tokens = []);
        }
        matched = false;
        if (match = rcombinators.exec(soFar)) {
          matched = match.shift();
          tokens.push({
            value: matched,
            type: match[0].replace(rtrim, ' ')
          });
          soFar = soFar.slice(matched.length);
        }
        for (type in Expr.filter) {
          if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
            matched = match.shift();
            tokens.push({
              value: matched,
              type: type,
              matches: match
            });
            soFar = soFar.slice(matched.length);
          }
        }
        if (!matched) {
          break;
        }
      }
      return parseOnly ? soFar.length : soFar ? Sizzle.error(selector) : tokenCache(selector, groups).slice(0);
    }
    function toSelector(tokens) {
      var i = 0, len = tokens.length, selector = '';
      for (; i < len; i++) {
        selector += tokens[i].value;
      }
      return selector;
    }
    function addCombinator(matcher, combinator, base) {
      var dir = combinator.dir, checkNonElements = base && dir === 'parentNode', doneName = done++;
      return combinator.first ? function (elem, context, xml) {
        while (elem = elem[dir]) {
          if (elem.nodeType === 1 || checkNonElements) {
            return matcher(elem, context, xml);
          }
        }
      } : function (elem, context, xml) {
        var data, cache, outerCache, dirkey = dirruns + ' ' + doneName;
        if (xml) {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              if (matcher(elem, context, xml)) {
                return true;
              }
            }
          }
        } else {
          while (elem = elem[dir]) {
            if (elem.nodeType === 1 || checkNonElements) {
              outerCache = elem[expando] || (elem[expando] = {});
              if ((cache = outerCache[dir]) && cache[0] === dirkey) {
                if ((data = cache[1]) === true || data === cachedruns) {
                  return data === true;
                }
              } else {
                cache = outerCache[dir] = [dirkey];
                cache[1] = matcher(elem, context, xml) || cachedruns;
                if (cache[1] === true) {
                  return true;
                }
              }
            }
          }
        }
      };
    }
    function elementMatcher(matchers) {
      return matchers.length > 1 ? function (elem, context, xml) {
        var i = matchers.length;
        while (i--) {
          if (!matchers[i](elem, context, xml)) {
            return false;
          }
        }
        return true;
      } : matchers[0];
    }
    function condense(unmatched, map, filter, context, xml) {
      var elem, newUnmatched = [], i = 0, len = unmatched.length, mapped = map != null;
      for (; i < len; i++) {
        if (elem = unmatched[i]) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }
      return newUnmatched;
    }
    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function (seed, results, context, xml) {
        var temp, i, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(selector || '*', context.nodeType ? [context] : context, []), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? postFinder || (seed ? preFilter : preexisting || postFilter) ? [] : results : matcherIn;
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        }
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);
          i = temp.length;
          while (i--) {
            if (elem = temp[i]) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }
        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if (elem = matcherOut[i]) {
                  temp.push(matcherIn[i] = elem);
                }
              }
              postFinder(null, matcherOut = [], temp, xml);
            }
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) && (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {
                seed[temp] = !(results[temp] = elem);
              }
            }
          }
        } else {
          matcherOut = condense(matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut);
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }
    function matcherFromTokens(tokens) {
      var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[' '], i = leadingRelative ? 1 : 0, matchContext = addCombinator(function (elem) {
          return elem === checkContext;
        }, implicitRelative, true), matchAnyContext = addCombinator(function (elem) {
          return indexOf.call(checkContext, elem) > -1;
        }, implicitRelative, true), matchers = [function (elem, context, xml) {
            return !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
          }];
      for (; i < len; i++) {
        if (matcher = Expr.relative[tokens[i].type]) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);
          if (matcher[expando]) {
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(i > 1 && elementMatcher(matchers), i > 1 && toSelector(tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === ' ' ? '*' : '' })).replace(rtrim, '$1'), matcher, i < j && matcherFromTokens(tokens.slice(i, j)), j < len && matcherFromTokens(tokens = tokens.slice(j)), j < len && toSelector(tokens));
          }
          matchers.push(matcher);
        }
      }
      return elementMatcher(matchers);
    }
    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var matcherCachedRuns = 0, bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function (seed, context, xml, results, expandContext) {
          var elem, j, matcher, setMatched = [], matchedCount = 0, i = '0', unmatched = seed && [], outermost = expandContext != null, contextBackup = outermostContext, elems = seed || byElement && Expr.find['TAG']('*', expandContext && context.parentNode || context), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1;
          if (outermost) {
            outermostContext = context !== document && context;
            cachedruns = matcherCachedRuns;
          }
          for (; (elem = elems[i]) != null; i++) {
            if (byElement && elem) {
              j = 0;
              while (matcher = elementMatchers[j++]) {
                if (matcher(elem, context, xml)) {
                  results.push(elem);
                  break;
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
                cachedruns = ++matcherCachedRuns;
              }
            }
            if (bySet) {
              if (elem = !matcher && elem) {
                matchedCount--;
              }
              if (seed) {
                unmatched.push(elem);
              }
            }
          }
          matchedCount += i;
          if (bySet && i !== matchedCount) {
            j = 0;
            while (matcher = setMatchers[j++]) {
              matcher(unmatched, setMatched, context, xml);
            }
            if (seed) {
              if (matchedCount > 0) {
                while (i--) {
                  if (!(unmatched[i] || setMatched[i])) {
                    setMatched[i] = pop.call(results);
                  }
                }
              }
              setMatched = condense(setMatched);
            }
            push.apply(results, setMatched);
            if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
              Sizzle.uniqueSort(results);
            }
          }
          if (outermost) {
            dirruns = dirrunsUnique;
            outermostContext = contextBackup;
          }
          return unmatched;
        };
      return bySet ? markFunction(superMatcher) : superMatcher;
    }
    compile = Sizzle.compile = function (selector, group) {
      var i, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + ' '];
      if (!cached) {
        if (!group) {
          group = tokenize(selector);
        }
        i = group.length;
        while (i--) {
          cached = matcherFromTokens(group[i]);
          if (cached[expando]) {
            setMatchers.push(cached);
          } else {
            elementMatchers.push(cached);
          }
        }
        cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));
      }
      return cached;
    };
    function multipleContexts(selector, contexts, results) {
      var i = 0, len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }
    function select(selector, context, results, seed) {
      var i, tokens, token, type, find, match = tokenize(selector);
      if (!seed) {
        if (match.length === 1) {
          tokens = match[0] = match[0].slice(0);
          if (tokens.length > 2 && (token = tokens[0]).type === 'ID' && support.getById && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
            context = (Expr.find['ID'](token.matches[0].replace(runescape, funescape), context) || [])[0];
            if (!context) {
              return results;
            }
            selector = selector.slice(tokens.shift().value.length);
          }
          i = matchExpr['needsContext'].test(selector) ? 0 : tokens.length;
          while (i--) {
            token = tokens[i];
            if (Expr.relative[type = token.type]) {
              break;
            }
            if (find = Expr.find[type]) {
              if (seed = find(token.matches[0].replace(runescape, funescape), rsibling.test(tokens[0].type) && context.parentNode || context)) {
                tokens.splice(i, 1);
                selector = seed.length && toSelector(tokens);
                if (!selector) {
                  push.apply(results, seed);
                  return results;
                }
                break;
              }
            }
          }
        }
      }
      compile(selector, match)(seed, context, !documentIsHTML, results, rsibling.test(selector));
      return results;
    }
    Expr.pseudos['nth'] = Expr.pseudos['eq'];
    function setFilters() {
    }
    setFilters.prototype = Expr.filters = Expr.pseudos;
    Expr.setFilters = new setFilters();
    support.sortStable = expando.split('').sort(sortOrder).join('') === expando;
    setDocument();
    [
      0,
      0
    ].sort(sortOrder);
    support.detectDuplicates = hasDuplicate;
    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[':'] = jQuery.expr.pseudos;
    jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;
  }(window));
  var optionsCache = {};
  function createOptions(options) {
    var object = optionsCache[options] = {};
    jQuery.each(options.match(core_rnotwhite) || [], function (_, flag) {
      object[flag] = true;
    });
    return object;
  }
  jQuery.Callbacks = function (options) {
    options = typeof options === 'string' ? optionsCache[options] || createOptions(options) : jQuery.extend({}, options);
    var memory, fired, firing, firingStart, firingLength, firingIndex, list = [], stack = !options.once && [], fire = function (data) {
        memory = options.memory && data;
        fired = true;
        firingIndex = firingStart || 0;
        firingStart = 0;
        firingLength = list.length;
        firing = true;
        for (; list && firingIndex < firingLength; firingIndex++) {
          if (list[firingIndex].apply(data[0], data[1]) === false && options.stopOnFalse) {
            memory = false;
            break;
          }
        }
        firing = false;
        if (list) {
          if (stack) {
            if (stack.length) {
              fire(stack.shift());
            }
          } else if (memory) {
            list = [];
          } else {
            self.disable();
          }
        }
      }, self = {
        add: function () {
          if (list) {
            var start = list.length;
            (function add(args) {
              jQuery.each(args, function (_, arg) {
                var type = jQuery.type(arg);
                if (type === 'function') {
                  if (!options.unique || !self.has(arg)) {
                    list.push(arg);
                  }
                } else if (arg && arg.length && type !== 'string') {
                  add(arg);
                }
              });
            }(arguments));
            if (firing) {
              firingLength = list.length;
            } else if (memory) {
              firingStart = start;
              fire(memory);
            }
          }
          return this;
        },
        remove: function () {
          if (list) {
            jQuery.each(arguments, function (_, arg) {
              var index;
              while ((index = jQuery.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);
                if (firing) {
                  if (index <= firingLength) {
                    firingLength--;
                  }
                  if (index <= firingIndex) {
                    firingIndex--;
                  }
                }
              }
            });
          }
          return this;
        },
        has: function (fn) {
          return fn ? jQuery.inArray(fn, list) > -1 : !!(list && list.length);
        },
        empty: function () {
          list = [];
          firingLength = 0;
          return this;
        },
        disable: function () {
          list = stack = memory = undefined;
          return this;
        },
        disabled: function () {
          return !list;
        },
        lock: function () {
          stack = undefined;
          if (!memory) {
            self.disable();
          }
          return this;
        },
        locked: function () {
          return !stack;
        },
        fireWith: function (context, args) {
          args = args || [];
          args = [
            context,
            args.slice ? args.slice() : args
          ];
          if (list && (!fired || stack)) {
            if (firing) {
              stack.push(args);
            } else {
              fire(args);
            }
          }
          return this;
        },
        fire: function () {
          self.fireWith(this, arguments);
          return this;
        },
        fired: function () {
          return !!fired;
        }
      };
    return self;
  };
  jQuery.extend({
    Deferred: function (func) {
      var tuples = [
          [
            'resolve',
            'done',
            jQuery.Callbacks('once memory'),
            'resolved'
          ],
          [
            'reject',
            'fail',
            jQuery.Callbacks('once memory'),
            'rejected'
          ],
          [
            'notify',
            'progress',
            jQuery.Callbacks('memory')
          ]
        ], state = 'pending', promise = {
          state: function () {
            return state;
          },
          always: function () {
            deferred.done(arguments).fail(arguments);
            return this;
          },
          then: function () {
            var fns = arguments;
            return jQuery.Deferred(function (newDefer) {
              jQuery.each(tuples, function (i, tuple) {
                var action = tuple[0], fn = jQuery.isFunction(fns[i]) && fns[i];
                deferred[tuple[1]](function () {
                  var returned = fn && fn.apply(this, arguments);
                  if (returned && jQuery.isFunction(returned.promise)) {
                    returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify);
                  } else {
                    newDefer[action + 'With'](this === promise ? newDefer.promise() : this, fn ? [returned] : arguments);
                  }
                });
              });
              fns = null;
            }).promise();
          },
          promise: function (obj) {
            return obj != null ? jQuery.extend(obj, promise) : promise;
          }
        }, deferred = {};
      promise.pipe = promise.then;
      jQuery.each(tuples, function (i, tuple) {
        var list = tuple[2], stateString = tuple[3];
        promise[tuple[1]] = list.add;
        if (stateString) {
          list.add(function () {
            state = stateString;
          }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
        }
        deferred[tuple[0]] = function () {
          deferred[tuple[0] + 'With'](this === deferred ? promise : this, arguments);
          return this;
        };
        deferred[tuple[0] + 'With'] = list.fireWith;
      });
      promise.promise(deferred);
      if (func) {
        func.call(deferred, deferred);
      }
      return deferred;
    },
    when: function (subordinate) {
      var i = 0, resolveValues = core_slice.call(arguments), length = resolveValues.length, remaining = length !== 1 || subordinate && jQuery.isFunction(subordinate.promise) ? length : 0, deferred = remaining === 1 ? subordinate : jQuery.Deferred(), updateFunc = function (i, contexts, values) {
          return function (value) {
            contexts[i] = this;
            values[i] = arguments.length > 1 ? core_slice.call(arguments) : value;
            if (values === progressValues) {
              deferred.notifyWith(contexts, values);
            } else if (!--remaining) {
              deferred.resolveWith(contexts, values);
            }
          };
        }, progressValues, progressContexts, resolveContexts;
      if (length > 1) {
        progressValues = new Array(length);
        progressContexts = new Array(length);
        resolveContexts = new Array(length);
        for (; i < length; i++) {
          if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
            resolveValues[i].promise().done(updateFunc(i, resolveContexts, resolveValues)).fail(deferred.reject).progress(updateFunc(i, progressContexts, progressValues));
          } else {
            --remaining;
          }
        }
      }
      if (!remaining) {
        deferred.resolveWith(resolveContexts, resolveValues);
      }
      return deferred.promise();
    }
  });
  jQuery.support = function (support) {
    var input = document.createElement('input'), fragment = document.createDocumentFragment(), div = document.createElement('div'), select = document.createElement('select'), opt = select.appendChild(document.createElement('option'));
    if (!input.type) {
      return support;
    }
    input.type = 'checkbox';
    support.checkOn = input.value !== '';
    support.optSelected = opt.selected;
    support.reliableMarginRight = true;
    support.boxSizingReliable = true;
    support.pixelPosition = false;
    input.checked = true;
    support.noCloneChecked = input.cloneNode(true).checked;
    select.disabled = true;
    support.optDisabled = !opt.disabled;
    input = document.createElement('input');
    input.value = 't';
    input.type = 'radio';
    support.radioValue = input.value === 't';
    input.setAttribute('checked', 't');
    input.setAttribute('name', 't');
    fragment.appendChild(input);
    support.checkClone = fragment.cloneNode(true).cloneNode(true).lastChild.checked;
    support.focusinBubbles = 'onfocusin' in window;
    div.style.backgroundClip = 'content-box';
    div.cloneNode(true).style.backgroundClip = '';
    support.clearCloneStyle = div.style.backgroundClip === 'content-box';
    jQuery(function () {
      var container, marginDiv, divReset = 'padding:0;margin:0;border:0;display:block;-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box', body = document.getElementsByTagName('body')[0];
      if (!body) {
        return;
      }
      container = document.createElement('div');
      container.style.cssText = 'border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px';
      body.appendChild(container).appendChild(div);
      div.innerHTML = '';
      div.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%';
      jQuery.swap(body, body.style.zoom != null ? { zoom: 1 } : {}, function () {
        support.boxSizing = div.offsetWidth === 4;
      });
      if (window.getComputedStyle) {
        support.pixelPosition = (window.getComputedStyle(div, null) || {}).top !== '1%';
        support.boxSizingReliable = (window.getComputedStyle(div, null) || { width: '4px' }).width === '4px';
        marginDiv = div.appendChild(document.createElement('div'));
        marginDiv.style.cssText = div.style.cssText = divReset;
        marginDiv.style.marginRight = marginDiv.style.width = '0';
        div.style.width = '1px';
        support.reliableMarginRight = !parseFloat((window.getComputedStyle(marginDiv, null) || {}).marginRight);
      }
      body.removeChild(container);
    });
    return support;
  }({});
  var data_user, data_priv, rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/, rmultiDash = /([A-Z])/g;
  function Data() {
    Object.defineProperty(this.cache = {}, 0, {
      get: function () {
        return {};
      }
    });
    this.expando = jQuery.expando + Math.random();
  }
  Data.uid = 1;
  Data.accepts = function (owner) {
    return owner.nodeType ? owner.nodeType === 1 || owner.nodeType === 9 : true;
  };
  Data.prototype = {
    key: function (owner) {
      if (!Data.accepts(owner)) {
        return 0;
      }
      var descriptor = {}, unlock = owner[this.expando];
      if (!unlock) {
        unlock = Data.uid++;
        try {
          descriptor[this.expando] = { value: unlock };
          Object.defineProperties(owner, descriptor);
        } catch (e) {
          descriptor[this.expando] = unlock;
          jQuery.extend(owner, descriptor);
        }
      }
      if (!this.cache[unlock]) {
        this.cache[unlock] = {};
      }
      return unlock;
    },
    set: function (owner, data, value) {
      var prop, unlock = this.key(owner), cache = this.cache[unlock];
      if (typeof data === 'string') {
        cache[data] = value;
      } else {
        if (jQuery.isEmptyObject(cache)) {
          jQuery.extend(this.cache[unlock], data);
        } else {
          for (prop in data) {
            cache[prop] = data[prop];
          }
        }
      }
      return cache;
    },
    get: function (owner, key) {
      var cache = this.cache[this.key(owner)];
      return key === undefined ? cache : cache[key];
    },
    access: function (owner, key, value) {
      if (key === undefined || key && typeof key === 'string' && value === undefined) {
        return this.get(owner, key);
      }
      this.set(owner, key, value);
      return value !== undefined ? value : key;
    },
    remove: function (owner, key) {
      var i, name, camel, unlock = this.key(owner), cache = this.cache[unlock];
      if (key === undefined) {
        this.cache[unlock] = {};
      } else {
        if (jQuery.isArray(key)) {
          name = key.concat(key.map(jQuery.camelCase));
        } else {
          camel = jQuery.camelCase(key);
          if (key in cache) {
            name = [
              key,
              camel
            ];
          } else {
            name = camel;
            name = name in cache ? [name] : name.match(core_rnotwhite) || [];
          }
        }
        i = name.length;
        while (i--) {
          delete cache[name[i]];
        }
      }
    },
    hasData: function (owner) {
      return !jQuery.isEmptyObject(this.cache[owner[this.expando]] || {});
    },
    discard: function (owner) {
      if (owner[this.expando]) {
        delete this.cache[owner[this.expando]];
      }
    }
  };
  data_user = new Data();
  data_priv = new Data();
  jQuery.extend({
    acceptData: Data.accepts,
    hasData: function (elem) {
      return data_user.hasData(elem) || data_priv.hasData(elem);
    },
    data: function (elem, name, data) {
      return data_user.access(elem, name, data);
    },
    removeData: function (elem, name) {
      data_user.remove(elem, name);
    },
    _data: function (elem, name, data) {
      return data_priv.access(elem, name, data);
    },
    _removeData: function (elem, name) {
      data_priv.remove(elem, name);
    }
  });
  jQuery.fn.extend({
    data: function (key, value) {
      var attrs, name, elem = this[0], i = 0, data = null;
      if (key === undefined) {
        if (this.length) {
          data = data_user.get(elem);
          if (elem.nodeType === 1 && !data_priv.get(elem, 'hasDataAttrs')) {
            attrs = elem.attributes;
            for (; i < attrs.length; i++) {
              name = attrs[i].name;
              if (name.indexOf('data-') === 0) {
                name = jQuery.camelCase(name.slice(5));
                dataAttr(elem, name, data[name]);
              }
            }
            data_priv.set(elem, 'hasDataAttrs', true);
          }
        }
        return data;
      }
      if (typeof key === 'object') {
        return this.each(function () {
          data_user.set(this, key);
        });
      }
      return jQuery.access(this, function (value) {
        var data, camelKey = jQuery.camelCase(key);
        if (elem && value === undefined) {
          data = data_user.get(elem, key);
          if (data !== undefined) {
            return data;
          }
          data = data_user.get(elem, camelKey);
          if (data !== undefined) {
            return data;
          }
          data = dataAttr(elem, camelKey, undefined);
          if (data !== undefined) {
            return data;
          }
          return;
        }
        this.each(function () {
          var data = data_user.get(this, camelKey);
          data_user.set(this, camelKey, value);
          if (key.indexOf('-') !== -1 && data !== undefined) {
            data_user.set(this, key, value);
          }
        });
      }, null, value, arguments.length > 1, null, true);
    },
    removeData: function (key) {
      return this.each(function () {
        data_user.remove(this, key);
      });
    }
  });
  function dataAttr(elem, key, data) {
    var name;
    if (data === undefined && elem.nodeType === 1) {
      name = 'data-' + key.replace(rmultiDash, '-$1').toLowerCase();
      data = elem.getAttribute(name);
      if (typeof data === 'string') {
        try {
          data = data === 'true' ? true : data === 'false' ? false : data === 'null' ? null : +data + '' === data ? +data : rbrace.test(data) ? JSON.parse(data) : data;
        } catch (e) {
        }
        data_user.set(elem, key, data);
      } else {
        data = undefined;
      }
    }
    return data;
  }
  jQuery.extend({
    queue: function (elem, type, data) {
      var queue;
      if (elem) {
        type = (type || 'fx') + 'queue';
        queue = data_priv.get(elem, type);
        if (data) {
          if (!queue || jQuery.isArray(data)) {
            queue = data_priv.access(elem, type, jQuery.makeArray(data));
          } else {
            queue.push(data);
          }
        }
        return queue || [];
      }
    },
    dequeue: function (elem, type) {
      type = type || 'fx';
      var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function () {
          jQuery.dequeue(elem, type);
        };
      if (fn === 'inprogress') {
        fn = queue.shift();
        startLength--;
      }
      if (fn) {
        if (type === 'fx') {
          queue.unshift('inprogress');
        }
        delete hooks.stop;
        fn.call(elem, next, hooks);
      }
      if (!startLength && hooks) {
        hooks.empty.fire();
      }
    },
    _queueHooks: function (elem, type) {
      var key = type + 'queueHooks';
      return data_priv.get(elem, key) || data_priv.access(elem, key, {
        empty: jQuery.Callbacks('once memory').add(function () {
          data_priv.remove(elem, [
            type + 'queue',
            key
          ]);
        })
      });
    }
  });
  jQuery.fn.extend({
    queue: function (type, data) {
      var setter = 2;
      if (typeof type !== 'string') {
        data = type;
        type = 'fx';
        setter--;
      }
      if (arguments.length < setter) {
        return jQuery.queue(this[0], type);
      }
      return data === undefined ? this : this.each(function () {
        var queue = jQuery.queue(this, type, data);
        jQuery._queueHooks(this, type);
        if (type === 'fx' && queue[0] !== 'inprogress') {
          jQuery.dequeue(this, type);
        }
      });
    },
    dequeue: function (type) {
      return this.each(function () {
        jQuery.dequeue(this, type);
      });
    },
    delay: function (time, type) {
      time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
      type = type || 'fx';
      return this.queue(type, function (next, hooks) {
        var timeout = setTimeout(next, time);
        hooks.stop = function () {
          clearTimeout(timeout);
        };
      });
    },
    clearQueue: function (type) {
      return this.queue(type || 'fx', []);
    },
    promise: function (type, obj) {
      var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function () {
          if (!--count) {
            defer.resolveWith(elements, [elements]);
          }
        };
      if (typeof type !== 'string') {
        obj = type;
        type = undefined;
      }
      type = type || 'fx';
      while (i--) {
        tmp = data_priv.get(elements[i], type + 'queueHooks');
        if (tmp && tmp.empty) {
          count++;
          tmp.empty.add(resolve);
        }
      }
      resolve();
      return defer.promise(obj);
    }
  });
  var nodeHook, boolHook, rclass = /[\t\r\n\f]/g, rreturn = /\r/g, rfocusable = /^(?:input|select|textarea|button)$/i;
  jQuery.fn.extend({
    attr: function (name, value) {
      return jQuery.access(this, jQuery.attr, name, value, arguments.length > 1);
    },
    removeAttr: function (name) {
      return this.each(function () {
        jQuery.removeAttr(this, name);
      });
    },
    prop: function (name, value) {
      return jQuery.access(this, jQuery.prop, name, value, arguments.length > 1);
    },
    removeProp: function (name) {
      return this.each(function () {
        delete this[jQuery.propFix[name] || name];
      });
    },
    addClass: function (value) {
      var classes, elem, cur, clazz, j, i = 0, len = this.length, proceed = typeof value === 'string' && value;
      if (jQuery.isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).addClass(value.call(this, j, this.className));
        });
      }
      if (proceed) {
        classes = (value || '').match(core_rnotwhite) || [];
        for (; i < len; i++) {
          elem = this[i];
          cur = elem.nodeType === 1 && (elem.className ? (' ' + elem.className + ' ').replace(rclass, ' ') : ' ');
          if (cur) {
            j = 0;
            while (clazz = classes[j++]) {
              if (cur.indexOf(' ' + clazz + ' ') < 0) {
                cur += clazz + ' ';
              }
            }
            elem.className = jQuery.trim(cur);
          }
        }
      }
      return this;
    },
    removeClass: function (value) {
      var classes, elem, cur, clazz, j, i = 0, len = this.length, proceed = arguments.length === 0 || typeof value === 'string' && value;
      if (jQuery.isFunction(value)) {
        return this.each(function (j) {
          jQuery(this).removeClass(value.call(this, j, this.className));
        });
      }
      if (proceed) {
        classes = (value || '').match(core_rnotwhite) || [];
        for (; i < len; i++) {
          elem = this[i];
          cur = elem.nodeType === 1 && (elem.className ? (' ' + elem.className + ' ').replace(rclass, ' ') : '');
          if (cur) {
            j = 0;
            while (clazz = classes[j++]) {
              while (cur.indexOf(' ' + clazz + ' ') >= 0) {
                cur = cur.replace(' ' + clazz + ' ', ' ');
              }
            }
            elem.className = value ? jQuery.trim(cur) : '';
          }
        }
      }
      return this;
    },
    toggleClass: function (value, stateVal) {
      var type = typeof value, isBool = typeof stateVal === 'boolean';
      if (jQuery.isFunction(value)) {
        return this.each(function (i) {
          jQuery(this).toggleClass(value.call(this, i, this.className, stateVal), stateVal);
        });
      }
      return this.each(function () {
        if (type === 'string') {
          var className, i = 0, self = jQuery(this), state = stateVal, classNames = value.match(core_rnotwhite) || [];
          while (className = classNames[i++]) {
            state = isBool ? state : !self.hasClass(className);
            self[state ? 'addClass' : 'removeClass'](className);
          }
        } else if (type === core_strundefined || type === 'boolean') {
          if (this.className) {
            data_priv.set(this, '__className__', this.className);
          }
          this.className = this.className || value === false ? '' : data_priv.get(this, '__className__') || '';
        }
      });
    },
    hasClass: function (selector) {
      var className = ' ' + selector + ' ', i = 0, l = this.length;
      for (; i < l; i++) {
        if (this[i].nodeType === 1 && (' ' + this[i].className + ' ').replace(rclass, ' ').indexOf(className) >= 0) {
          return true;
        }
      }
      return false;
    },
    val: function (value) {
      var hooks, ret, isFunction, elem = this[0];
      if (!arguments.length) {
        if (elem) {
          hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
          if (hooks && 'get' in hooks && (ret = hooks.get(elem, 'value')) !== undefined) {
            return ret;
          }
          ret = elem.value;
          return typeof ret === 'string' ? ret.replace(rreturn, '') : ret == null ? '' : ret;
        }
        return;
      }
      isFunction = jQuery.isFunction(value);
      return this.each(function (i) {
        var val;
        if (this.nodeType !== 1) {
          return;
        }
        if (isFunction) {
          val = value.call(this, i, jQuery(this).val());
        } else {
          val = value;
        }
        if (val == null) {
          val = '';
        } else if (typeof val === 'number') {
          val += '';
        } else if (jQuery.isArray(val)) {
          val = jQuery.map(val, function (value) {
            return value == null ? '' : value + '';
          });
        }
        hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
        if (!hooks || !('set' in hooks) || hooks.set(this, val, 'value') === undefined) {
          this.value = val;
        }
      });
    }
  });
  jQuery.extend({
    valHooks: {
      option: {
        get: function (elem) {
          var val = elem.attributes.value;
          return !val || val.specified ? elem.value : elem.text;
        }
      },
      select: {
        get: function (elem) {
          var value, option, options = elem.options, index = elem.selectedIndex, one = elem.type === 'select-one' || index < 0, values = one ? null : [], max = one ? index + 1 : options.length, i = index < 0 ? max : one ? index : 0;
          for (; i < max; i++) {
            option = options[i];
            if ((option.selected || i === index) && (jQuery.support.optDisabled ? !option.disabled : option.getAttribute('disabled') === null) && (!option.parentNode.disabled || !jQuery.nodeName(option.parentNode, 'optgroup'))) {
              value = jQuery(option).val();
              if (one) {
                return value;
              }
              values.push(value);
            }
          }
          return values;
        },
        set: function (elem, value) {
          var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
          while (i--) {
            option = options[i];
            if (option.selected = jQuery.inArray(jQuery(option).val(), values) >= 0) {
              optionSet = true;
            }
          }
          if (!optionSet) {
            elem.selectedIndex = -1;
          }
          return values;
        }
      }
    },
    attr: function (elem, name, value) {
      var hooks, ret, nType = elem.nodeType;
      if (!elem || nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      if (typeof elem.getAttribute === core_strundefined) {
        return jQuery.prop(elem, name, value);
      }
      if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
        name = name.toLowerCase();
        hooks = jQuery.attrHooks[name] || (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
      }
      if (value !== undefined) {
        if (value === null) {
          jQuery.removeAttr(elem, name);
        } else if (hooks && 'set' in hooks && (ret = hooks.set(elem, value, name)) !== undefined) {
          return ret;
        } else {
          elem.setAttribute(name, value + '');
          return value;
        }
      } else if (hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null) {
        return ret;
      } else {
        ret = jQuery.find.attr(elem, name);
        return ret == null ? undefined : ret;
      }
    },
    removeAttr: function (elem, value) {
      var name, propName, i = 0, attrNames = value && value.match(core_rnotwhite);
      if (attrNames && elem.nodeType === 1) {
        while (name = attrNames[i++]) {
          propName = jQuery.propFix[name] || name;
          if (jQuery.expr.match.bool.test(name)) {
            elem[propName] = false;
          }
          elem.removeAttribute(name);
        }
      }
    },
    attrHooks: {
      type: {
        set: function (elem, value) {
          if (!jQuery.support.radioValue && value === 'radio' && jQuery.nodeName(elem, 'input')) {
            var val = elem.value;
            elem.setAttribute('type', value);
            if (val) {
              elem.value = val;
            }
            return value;
          }
        }
      }
    },
    propFix: {
      'for': 'htmlFor',
      'class': 'className'
    },
    prop: function (elem, name, value) {
      var ret, hooks, notxml, nType = elem.nodeType;
      if (!elem || nType === 3 || nType === 8 || nType === 2) {
        return;
      }
      notxml = nType !== 1 || !jQuery.isXMLDoc(elem);
      if (notxml) {
        name = jQuery.propFix[name] || name;
        hooks = jQuery.propHooks[name];
      }
      if (value !== undefined) {
        return hooks && 'set' in hooks && (ret = hooks.set(elem, value, name)) !== undefined ? ret : elem[name] = value;
      } else {
        return hooks && 'get' in hooks && (ret = hooks.get(elem, name)) !== null ? ret : elem[name];
      }
    },
    propHooks: {
      tabIndex: {
        get: function (elem) {
          return elem.hasAttribute('tabindex') || rfocusable.test(elem.nodeName) || elem.href ? elem.tabIndex : -1;
        }
      }
    }
  });
  boolHook = {
    set: function (elem, value, name) {
      if (value === false) {
        jQuery.removeAttr(elem, name);
      } else {
        elem.setAttribute(name, name);
      }
      return name;
    }
  };
  jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function (i, name) {
    var getter = jQuery.expr.attrHandle[name] || jQuery.find.attr;
    jQuery.expr.attrHandle[name] = function (elem, name, isXML) {
      var fn = jQuery.expr.attrHandle[name], ret = isXML ? undefined : (jQuery.expr.attrHandle[name] = undefined) != getter(elem, name, isXML) ? name.toLowerCase() : null;
      jQuery.expr.attrHandle[name] = fn;
      return ret;
    };
  });
  if (!jQuery.support.optSelected) {
    jQuery.propHooks.selected = {
      get: function (elem) {
        var parent = elem.parentNode;
        if (parent && parent.parentNode) {
          parent.parentNode.selectedIndex;
        }
        return null;
      }
    };
  }
  jQuery.each([
    'tabIndex',
    'readOnly',
    'maxLength',
    'cellSpacing',
    'cellPadding',
    'rowSpan',
    'colSpan',
    'useMap',
    'frameBorder',
    'contentEditable'
  ], function () {
    jQuery.propFix[this.toLowerCase()] = this;
  });
  jQuery.each([
    'radio',
    'checkbox'
  ], function () {
    jQuery.valHooks[this] = {
      set: function (elem, value) {
        if (jQuery.isArray(value)) {
          return elem.checked = jQuery.inArray(jQuery(elem).val(), value) >= 0;
        }
      }
    };
    if (!jQuery.support.checkOn) {
      jQuery.valHooks[this].get = function (elem) {
        return elem.getAttribute('value') === null ? 'on' : elem.value;
      };
    }
  });
  var rkeyEvent = /^key/, rmouseEvent = /^(?:mouse|contextmenu)|click/, rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;
  function returnTrue() {
    return true;
  }
  function returnFalse() {
    return false;
  }
  function safeActiveElement() {
    try {
      return document.activeElement;
    } catch (err) {
    }
  }
  jQuery.event = {
    global: {},
    add: function (elem, types, handler, data, selector) {
      var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.get(elem);
      if (!elemData) {
        return;
      }
      if (handler.handler) {
        handleObjIn = handler;
        handler = handleObjIn.handler;
        selector = handleObjIn.selector;
      }
      if (!handler.guid) {
        handler.guid = jQuery.guid++;
      }
      if (!(events = elemData.events)) {
        events = elemData.events = {};
      }
      if (!(eventHandle = elemData.handle)) {
        eventHandle = elemData.handle = function (e) {
          return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ? jQuery.event.dispatch.apply(eventHandle.elem, arguments) : undefined;
        };
        eventHandle.elem = elem;
      }
      types = (types || '').match(core_rnotwhite) || [''];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || '').split('.').sort();
        if (!type) {
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        special = jQuery.event.special[type] || {};
        handleObj = jQuery.extend({
          type: type,
          origType: origType,
          data: data,
          handler: handler,
          guid: handler.guid,
          selector: selector,
          needsContext: selector && jQuery.expr.match.needsContext.test(selector),
          namespace: namespaces.join('.')
        }, handleObjIn);
        if (!(handlers = events[type])) {
          handlers = events[type] = [];
          handlers.delegateCount = 0;
          if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
            if (elem.addEventListener) {
              elem.addEventListener(type, eventHandle, false);
            }
          }
        }
        if (special.add) {
          special.add.call(elem, handleObj);
          if (!handleObj.handler.guid) {
            handleObj.handler.guid = handler.guid;
          }
        }
        if (selector) {
          handlers.splice(handlers.delegateCount++, 0, handleObj);
        } else {
          handlers.push(handleObj);
        }
        jQuery.event.global[type] = true;
      }
      elem = null;
    },
    remove: function (elem, types, handler, selector, mappedTypes) {
      var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = data_priv.hasData(elem) && data_priv.get(elem);
      if (!elemData || !(events = elemData.events)) {
        return;
      }
      types = (types || '').match(core_rnotwhite) || [''];
      t = types.length;
      while (t--) {
        tmp = rtypenamespace.exec(types[t]) || [];
        type = origType = tmp[1];
        namespaces = (tmp[2] || '').split('.').sort();
        if (!type) {
          for (type in events) {
            jQuery.event.remove(elem, type + types[t], handler, selector, true);
          }
          continue;
        }
        special = jQuery.event.special[type] || {};
        type = (selector ? special.delegateType : special.bindType) || type;
        handlers = events[type] || [];
        tmp = tmp[2] && new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)');
        origCount = j = handlers.length;
        while (j--) {
          handleObj = handlers[j];
          if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === '**' && handleObj.selector)) {
            handlers.splice(j, 1);
            if (handleObj.selector) {
              handlers.delegateCount--;
            }
            if (special.remove) {
              special.remove.call(elem, handleObj);
            }
          }
        }
        if (origCount && !handlers.length) {
          if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
            jQuery.removeEvent(elem, type, elemData.handle);
          }
          delete events[type];
        }
      }
      if (jQuery.isEmptyObject(events)) {
        delete elemData.handle;
        data_priv.remove(elem, 'events');
      }
    },
    trigger: function (event, data, elem, onlyHandlers) {
      var i, cur, tmp, bubbleType, ontype, handle, special, eventPath = [elem || document], type = core_hasOwn.call(event, 'type') ? event.type : event, namespaces = core_hasOwn.call(event, 'namespace') ? event.namespace.split('.') : [];
      cur = tmp = elem = elem || document;
      if (elem.nodeType === 3 || elem.nodeType === 8) {
        return;
      }
      if (rfocusMorph.test(type + jQuery.event.triggered)) {
        return;
      }
      if (type.indexOf('.') >= 0) {
        namespaces = type.split('.');
        type = namespaces.shift();
        namespaces.sort();
      }
      ontype = type.indexOf(':') < 0 && 'on' + type;
      event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === 'object' && event);
      event.isTrigger = onlyHandlers ? 2 : 3;
      event.namespace = namespaces.join('.');
      event.namespace_re = event.namespace ? new RegExp('(^|\\.)' + namespaces.join('\\.(?:.*\\.|)') + '(\\.|$)') : null;
      event.result = undefined;
      if (!event.target) {
        event.target = elem;
      }
      data = data == null ? [event] : jQuery.makeArray(data, [event]);
      special = jQuery.event.special[type] || {};
      if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
        return;
      }
      if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {
        bubbleType = special.delegateType || type;
        if (!rfocusMorph.test(bubbleType + type)) {
          cur = cur.parentNode;
        }
        for (; cur; cur = cur.parentNode) {
          eventPath.push(cur);
          tmp = cur;
        }
        if (tmp === (elem.ownerDocument || document)) {
          eventPath.push(tmp.defaultView || tmp.parentWindow || window);
        }
      }
      i = 0;
      while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
        event.type = i > 1 ? bubbleType : special.bindType || type;
        handle = (data_priv.get(cur, 'events') || {})[event.type] && data_priv.get(cur, 'handle');
        if (handle) {
          handle.apply(cur, data);
        }
        handle = ontype && cur[ontype];
        if (handle && jQuery.acceptData(cur) && handle.apply && handle.apply(cur, data) === false) {
          event.preventDefault();
        }
      }
      event.type = type;
      if (!onlyHandlers && !event.isDefaultPrevented()) {
        if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && jQuery.acceptData(elem)) {
          if (ontype && jQuery.isFunction(elem[type]) && !jQuery.isWindow(elem)) {
            tmp = elem[ontype];
            if (tmp) {
              elem[ontype] = null;
            }
            jQuery.event.triggered = type;
            elem[type]();
            jQuery.event.triggered = undefined;
            if (tmp) {
              elem[ontype] = tmp;
            }
          }
        }
      }
      return event.result;
    },
    dispatch: function (event) {
      event = jQuery.event.fix(event);
      var i, j, ret, matched, handleObj, handlerQueue = [], args = core_slice.call(arguments), handlers = (data_priv.get(this, 'events') || {})[event.type] || [], special = jQuery.event.special[event.type] || {};
      args[0] = event;
      event.delegateTarget = this;
      if (special.preDispatch && special.preDispatch.call(this, event) === false) {
        return;
      }
      handlerQueue = jQuery.event.handlers.call(this, event, handlers);
      i = 0;
      while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
        event.currentTarget = matched.elem;
        j = 0;
        while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
          if (!event.namespace_re || event.namespace_re.test(handleObj.namespace)) {
            event.handleObj = handleObj;
            event.data = handleObj.data;
            ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
            if (ret !== undefined) {
              if ((event.result = ret) === false) {
                event.preventDefault();
                event.stopPropagation();
              }
            }
          }
        }
      }
      if (special.postDispatch) {
        special.postDispatch.call(this, event);
      }
      return event.result;
    },
    handlers: function (event, handlers) {
      var i, matches, sel, handleObj, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
      if (delegateCount && cur.nodeType && (!event.button || event.type !== 'click')) {
        for (; cur !== this; cur = cur.parentNode || this) {
          if (cur.disabled !== true || event.type !== 'click') {
            matches = [];
            for (i = 0; i < delegateCount; i++) {
              handleObj = handlers[i];
              sel = handleObj.selector + ' ';
              if (matches[sel] === undefined) {
                matches[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) >= 0 : jQuery.find(sel, this, null, [cur]).length;
              }
              if (matches[sel]) {
                matches.push(handleObj);
              }
            }
            if (matches.length) {
              handlerQueue.push({
                elem: cur,
                handlers: matches
              });
            }
          }
        }
      }
      if (delegateCount < handlers.length) {
        handlerQueue.push({
          elem: this,
          handlers: handlers.slice(delegateCount)
        });
      }
      return handlerQueue;
    },
    props: 'altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(' '),
    fixHooks: {},
    keyHooks: {
      props: 'char charCode key keyCode'.split(' '),
      filter: function (event, original) {
        if (event.which == null) {
          event.which = original.charCode != null ? original.charCode : original.keyCode;
        }
        return event;
      }
    },
    mouseHooks: {
      props: 'button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement'.split(' '),
      filter: function (event, original) {
        var eventDoc, doc, body, button = original.button;
        if (event.pageX == null && original.clientX != null) {
          eventDoc = event.target.ownerDocument || document;
          doc = eventDoc.documentElement;
          body = eventDoc.body;
          event.pageX = original.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0);
          event.pageY = original.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc && doc.clientTop || body && body.clientTop || 0);
        }
        if (!event.which && button !== undefined) {
          event.which = button & 1 ? 1 : button & 2 ? 3 : button & 4 ? 2 : 0;
        }
        return event;
      }
    },
    fix: function (event) {
      if (event[jQuery.expando]) {
        return event;
      }
      var i, prop, copy, type = event.type, originalEvent = event, fixHook = this.fixHooks[type];
      if (!fixHook) {
        this.fixHooks[type] = fixHook = rmouseEvent.test(type) ? this.mouseHooks : rkeyEvent.test(type) ? this.keyHooks : {};
      }
      copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;
      event = new jQuery.Event(originalEvent);
      i = copy.length;
      while (i--) {
        prop = copy[i];
        event[prop] = originalEvent[prop];
      }
      if (!event.target) {
        event.target = document;
      }
      if (event.target.nodeType === 3) {
        event.target = event.target.parentNode;
      }
      return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
    },
    special: {
      load: { noBubble: true },
      focus: {
        trigger: function () {
          if (this !== safeActiveElement() && this.focus) {
            this.focus();
            return false;
          }
        },
        delegateType: 'focusin'
      },
      blur: {
        trigger: function () {
          if (this === safeActiveElement() && this.blur) {
            this.blur();
            return false;
          }
        },
        delegateType: 'focusout'
      },
      click: {
        trigger: function () {
          if (this.type === 'checkbox' && this.click && jQuery.nodeName(this, 'input')) {
            this.click();
            return false;
          }
        },
        _default: function (event) {
          return jQuery.nodeName(event.target, 'a');
        }
      },
      beforeunload: {
        postDispatch: function (event) {
          if (event.result !== undefined) {
            event.originalEvent.returnValue = event.result;
          }
        }
      }
    },
    simulate: function (type, elem, event, bubble) {
      var e = jQuery.extend(new jQuery.Event(), event, {
          type: type,
          isSimulated: true,
          originalEvent: {}
        });
      if (bubble) {
        jQuery.event.trigger(e, null, elem);
      } else {
        jQuery.event.dispatch.call(elem, e);
      }
      if (e.isDefaultPrevented()) {
        event.preventDefault();
      }
    }
  };
  jQuery.removeEvent = function (elem, type, handle) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, handle, false);
    }
  };
  jQuery.Event = function (src, props) {
    if (!(this instanceof jQuery.Event)) {
      return new jQuery.Event(src, props);
    }
    if (src && src.type) {
      this.originalEvent = src;
      this.type = src.type;
      this.isDefaultPrevented = src.defaultPrevented || src.getPreventDefault && src.getPreventDefault() ? returnTrue : returnFalse;
    } else {
      this.type = src;
    }
    if (props) {
      jQuery.extend(this, props);
    }
    this.timeStamp = src && src.timeStamp || jQuery.now();
    this[jQuery.expando] = true;
  };
  jQuery.Event.prototype = {
    isDefaultPrevented: returnFalse,
    isPropagationStopped: returnFalse,
    isImmediatePropagationStopped: returnFalse,
    preventDefault: function () {
      var e = this.originalEvent;
      this.isDefaultPrevented = returnTrue;
      if (e && e.preventDefault) {
        e.preventDefault();
      }
    },
    stopPropagation: function () {
      var e = this.originalEvent;
      this.isPropagationStopped = returnTrue;
      if (e && e.stopPropagation) {
        e.stopPropagation();
      }
    },
    stopImmediatePropagation: function () {
      this.isImmediatePropagationStopped = returnTrue;
      this.stopPropagation();
    }
  };
  jQuery.each({
    mouseenter: 'mouseover',
    mouseleave: 'mouseout'
  }, function (orig, fix) {
    jQuery.event.special[orig] = {
      delegateType: fix,
      bindType: fix,
      handle: function (event) {
        var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
        if (!related || related !== target && !jQuery.contains(target, related)) {
          event.type = handleObj.origType;
          ret = handleObj.handler.apply(this, arguments);
          event.type = fix;
        }
        return ret;
      }
    };
  });
  if (!jQuery.support.focusinBubbles) {
    jQuery.each({
      focus: 'focusin',
      blur: 'focusout'
    }, function (orig, fix) {
      var attaches = 0, handler = function (event) {
          jQuery.event.simulate(fix, event.target, jQuery.event.fix(event), true);
        };
      jQuery.event.special[fix] = {
        setup: function () {
          if (attaches++ === 0) {
            document.addEventListener(orig, handler, true);
          }
        },
        teardown: function () {
          if (--attaches === 0) {
            document.removeEventListener(orig, handler, true);
          }
        }
      };
    });
  }
  jQuery.fn.extend({
    on: function (types, selector, data, fn, one) {
      var origFn, type;
      if (typeof types === 'object') {
        if (typeof selector !== 'string') {
          data = data || selector;
          selector = undefined;
        }
        for (type in types) {
          this.on(type, selector, data, types[type], one);
        }
        return this;
      }
      if (data == null && fn == null) {
        fn = selector;
        data = selector = undefined;
      } else if (fn == null) {
        if (typeof selector === 'string') {
          fn = data;
          data = undefined;
        } else {
          fn = data;
          data = selector;
          selector = undefined;
        }
      }
      if (fn === false) {
        fn = returnFalse;
      } else if (!fn) {
        return this;
      }
      if (one === 1) {
        origFn = fn;
        fn = function (event) {
          jQuery().off(event);
          return origFn.apply(this, arguments);
        };
        fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
      }
      return this.each(function () {
        jQuery.event.add(this, types, fn, data, selector);
      });
    },
    one: function (types, selector, data, fn) {
      return this.on(types, selector, data, fn, 1);
    },
    off: function (types, selector, fn) {
      var handleObj, type;
      if (types && types.preventDefault && types.handleObj) {
        handleObj = types.handleObj;
        jQuery(types.delegateTarget).off(handleObj.namespace ? handleObj.origType + '.' + handleObj.namespace : handleObj.origType, handleObj.selector, handleObj.handler);
        return this;
      }
      if (typeof types === 'object') {
        for (type in types) {
          this.off(type, selector, types[type]);
        }
        return this;
      }
      if (selector === false || typeof selector === 'function') {
        fn = selector;
        selector = undefined;
      }
      if (fn === false) {
        fn = returnFalse;
      }
      return this.each(function () {
        jQuery.event.remove(this, types, fn, selector);
      });
    },
    trigger: function (type, data) {
      return this.each(function () {
        jQuery.event.trigger(type, data, this);
      });
    },
    triggerHandler: function (type, data) {
      var elem = this[0];
      if (elem) {
        return jQuery.event.trigger(type, data, elem, true);
      }
    }
  });
  var isSimple = /^.[^:#\[\.,]*$/, rparentsprev = /^(?:parents|prev(?:Until|All))/, rneedsContext = jQuery.expr.match.needsContext, guaranteedUnique = {
      children: true,
      contents: true,
      next: true,
      prev: true
    };
  jQuery.fn.extend({
    find: function (selector) {
      var i, ret = [], self = this, len = self.length;
      if (typeof selector !== 'string') {
        return this.pushStack(jQuery(selector).filter(function () {
          for (i = 0; i < len; i++) {
            if (jQuery.contains(self[i], this)) {
              return true;
            }
          }
        }));
      }
      for (i = 0; i < len; i++) {
        jQuery.find(selector, self[i], ret);
      }
      ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
      ret.selector = this.selector ? this.selector + ' ' + selector : selector;
      return ret;
    },
    has: function (target) {
      var targets = jQuery(target, this), l = targets.length;
      return this.filter(function () {
        var i = 0;
        for (; i < l; i++) {
          if (jQuery.contains(this, targets[i])) {
            return true;
          }
        }
      });
    },
    not: function (selector) {
      return this.pushStack(winnow(this, selector || [], true));
    },
    filter: function (selector) {
      return this.pushStack(winnow(this, selector || [], false));
    },
    is: function (selector) {
      return !!winnow(this, typeof selector === 'string' && rneedsContext.test(selector) ? jQuery(selector) : selector || [], false).length;
    },
    closest: function (selectors, context) {
      var cur, i = 0, l = this.length, matched = [], pos = rneedsContext.test(selectors) || typeof selectors !== 'string' ? jQuery(selectors, context || this.context) : 0;
      for (; i < l; i++) {
        for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
          if (cur.nodeType < 11 && (pos ? pos.index(cur) > -1 : cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors))) {
            cur = matched.push(cur);
            break;
          }
        }
      }
      return this.pushStack(matched.length > 1 ? jQuery.unique(matched) : matched);
    },
    index: function (elem) {
      if (!elem) {
        return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
      }
      if (typeof elem === 'string') {
        return core_indexOf.call(jQuery(elem), this[0]);
      }
      return core_indexOf.call(this, elem.jquery ? elem[0] : elem);
    },
    add: function (selector, context) {
      var set = typeof selector === 'string' ? jQuery(selector, context) : jQuery.makeArray(selector && selector.nodeType ? [selector] : selector), all = jQuery.merge(this.get(), set);
      return this.pushStack(jQuery.unique(all));
    },
    addBack: function (selector) {
      return this.add(selector == null ? this.prevObject : this.prevObject.filter(selector));
    }
  });
  function sibling(cur, dir) {
    while ((cur = cur[dir]) && cur.nodeType !== 1) {
    }
    return cur;
  }
  jQuery.each({
    parent: function (elem) {
      var parent = elem.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    parents: function (elem) {
      return jQuery.dir(elem, 'parentNode');
    },
    parentsUntil: function (elem, i, until) {
      return jQuery.dir(elem, 'parentNode', until);
    },
    next: function (elem) {
      return sibling(elem, 'nextSibling');
    },
    prev: function (elem) {
      return sibling(elem, 'previousSibling');
    },
    nextAll: function (elem) {
      return jQuery.dir(elem, 'nextSibling');
    },
    prevAll: function (elem) {
      return jQuery.dir(elem, 'previousSibling');
    },
    nextUntil: function (elem, i, until) {
      return jQuery.dir(elem, 'nextSibling', until);
    },
    prevUntil: function (elem, i, until) {
      return jQuery.dir(elem, 'previousSibling', until);
    },
    siblings: function (elem) {
      return jQuery.sibling((elem.parentNode || {}).firstChild, elem);
    },
    children: function (elem) {
      return jQuery.sibling(elem.firstChild);
    },
    contents: function (elem) {
      return elem.contentDocument || jQuery.merge([], elem.childNodes);
    }
  }, function (name, fn) {
    jQuery.fn[name] = function (until, selector) {
      var matched = jQuery.map(this, fn, until);
      if (name.slice(-5) !== 'Until') {
        selector = until;
      }
      if (selector && typeof selector === 'string') {
        matched = jQuery.filter(selector, matched);
      }
      if (this.length > 1) {
        if (!guaranteedUnique[name]) {
          jQuery.unique(matched);
        }
        if (rparentsprev.test(name)) {
          matched.reverse();
        }
      }
      return this.pushStack(matched);
    };
  });
  jQuery.extend({
    filter: function (expr, elems, not) {
      var elem = elems[0];
      if (not) {
        expr = ':not(' + expr + ')';
      }
      return elems.length === 1 && elem.nodeType === 1 ? jQuery.find.matchesSelector(elem, expr) ? [elem] : [] : jQuery.find.matches(expr, jQuery.grep(elems, function (elem) {
        return elem.nodeType === 1;
      }));
    },
    dir: function (elem, dir, until) {
      var matched = [], truncate = until !== undefined;
      while ((elem = elem[dir]) && elem.nodeType !== 9) {
        if (elem.nodeType === 1) {
          if (truncate && jQuery(elem).is(until)) {
            break;
          }
          matched.push(elem);
        }
      }
      return matched;
    },
    sibling: function (n, elem) {
      var matched = [];
      for (; n; n = n.nextSibling) {
        if (n.nodeType === 1 && n !== elem) {
          matched.push(n);
        }
      }
      return matched;
    }
  });
  function winnow(elements, qualifier, not) {
    if (jQuery.isFunction(qualifier)) {
      return jQuery.grep(elements, function (elem, i) {
        return !!qualifier.call(elem, i, elem) !== not;
      });
    }
    if (qualifier.nodeType) {
      return jQuery.grep(elements, function (elem) {
        return elem === qualifier !== not;
      });
    }
    if (typeof qualifier === 'string') {
      if (isSimple.test(qualifier)) {
        return jQuery.filter(qualifier, elements, not);
      }
      qualifier = jQuery.filter(qualifier, elements);
    }
    return jQuery.grep(elements, function (elem) {
      return core_indexOf.call(qualifier, elem) >= 0 !== not;
    });
  }
  var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, rtagName = /<([\w:]+)/, rhtml = /<|&#?\w+;/, rnoInnerhtml = /<(?:script|style|link)/i, manipulation_rcheckableType = /^(?:checkbox|radio)$/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rscriptType = /^$|\/(?:java|ecma)script/i, rscriptTypeMasked = /^true\/(.*)/, rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, wrapMap = {
      option: [
        1,
        '<select multiple=\'multiple\'>',
        '</select>'
      ],
      thead: [
        1,
        '<table>',
        '</table>'
      ],
      col: [
        2,
        '<table><colgroup>',
        '</colgroup></table>'
      ],
      tr: [
        2,
        '<table><tbody>',
        '</tbody></table>'
      ],
      td: [
        3,
        '<table><tbody><tr>',
        '</tr></tbody></table>'
      ],
      _default: [
        0,
        '',
        ''
      ]
    };
  wrapMap.optgroup = wrapMap.option;
  wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
  wrapMap.th = wrapMap.td;
  jQuery.fn.extend({
    text: function (value) {
      return jQuery.access(this, function (value) {
        return value === undefined ? jQuery.text(this) : this.empty().append((this[0] && this[0].ownerDocument || document).createTextNode(value));
      }, null, value, arguments.length);
    },
    append: function () {
      return this.domManip(arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.appendChild(elem);
        }
      });
    },
    prepend: function () {
      return this.domManip(arguments, function (elem) {
        if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
          var target = manipulationTarget(this, elem);
          target.insertBefore(elem, target.firstChild);
        }
      });
    },
    before: function () {
      return this.domManip(arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this);
        }
      });
    },
    after: function () {
      return this.domManip(arguments, function (elem) {
        if (this.parentNode) {
          this.parentNode.insertBefore(elem, this.nextSibling);
        }
      });
    },
    remove: function (selector, keepData) {
      var elem, elems = selector ? jQuery.filter(selector, this) : this, i = 0;
      for (; (elem = elems[i]) != null; i++) {
        if (!keepData && elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem));
        }
        if (elem.parentNode) {
          if (keepData && jQuery.contains(elem.ownerDocument, elem)) {
            setGlobalEval(getAll(elem, 'script'));
          }
          elem.parentNode.removeChild(elem);
        }
      }
      return this;
    },
    empty: function () {
      var elem, i = 0;
      for (; (elem = this[i]) != null; i++) {
        if (elem.nodeType === 1) {
          jQuery.cleanData(getAll(elem, false));
          elem.textContent = '';
        }
      }
      return this;
    },
    clone: function (dataAndEvents, deepDataAndEvents) {
      dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
      deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
      return this.map(function () {
        return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
      });
    },
    html: function (value) {
      return jQuery.access(this, function (value) {
        var elem = this[0] || {}, i = 0, l = this.length;
        if (value === undefined && elem.nodeType === 1) {
          return elem.innerHTML;
        }
        if (typeof value === 'string' && !rnoInnerhtml.test(value) && !wrapMap[(rtagName.exec(value) || [
            '',
            ''
          ])[1].toLowerCase()]) {
          value = value.replace(rxhtmlTag, '<$1></$2>');
          try {
            for (; i < l; i++) {
              elem = this[i] || {};
              if (elem.nodeType === 1) {
                jQuery.cleanData(getAll(elem, false));
                elem.innerHTML = value;
              }
            }
            elem = 0;
          } catch (e) {
          }
        }
        if (elem) {
          this.empty().append(value);
        }
      }, null, value, arguments.length);
    },
    replaceWith: function () {
      var args = jQuery.map(this, function (elem) {
          return [
            elem.nextSibling,
            elem.parentNode
          ];
        }), i = 0;
      this.domManip(arguments, function (elem) {
        var next = args[i++], parent = args[i++];
        if (parent) {
          if (next && next.parentNode !== parent) {
            next = this.nextSibling;
          }
          jQuery(this).remove();
          parent.insertBefore(elem, next);
        }
      }, true);
      return i ? this : this.remove();
    },
    detach: function (selector) {
      return this.remove(selector, true);
    },
    domManip: function (args, callback, allowIntersection) {
      args = core_concat.apply([], args);
      var fragment, first, scripts, hasScripts, node, doc, i = 0, l = this.length, set = this, iNoClone = l - 1, value = args[0], isFunction = jQuery.isFunction(value);
      if (isFunction || !(l <= 1 || typeof value !== 'string' || jQuery.support.checkClone || !rchecked.test(value))) {
        return this.each(function (index) {
          var self = set.eq(index);
          if (isFunction) {
            args[0] = value.call(this, index, self.html());
          }
          self.domManip(args, callback, allowIntersection);
        });
      }
      if (l) {
        fragment = jQuery.buildFragment(args, this[0].ownerDocument, false, !allowIntersection && this);
        first = fragment.firstChild;
        if (fragment.childNodes.length === 1) {
          fragment = first;
        }
        if (first) {
          scripts = jQuery.map(getAll(fragment, 'script'), disableScript);
          hasScripts = scripts.length;
          for (; i < l; i++) {
            node = fragment;
            if (i !== iNoClone) {
              node = jQuery.clone(node, true, true);
              if (hasScripts) {
                jQuery.merge(scripts, getAll(node, 'script'));
              }
            }
            callback.call(this[i], node, i);
          }
          if (hasScripts) {
            doc = scripts[scripts.length - 1].ownerDocument;
            jQuery.map(scripts, restoreScript);
            for (i = 0; i < hasScripts; i++) {
              node = scripts[i];
              if (rscriptType.test(node.type || '') && !data_priv.access(node, 'globalEval') && jQuery.contains(doc, node)) {
                if (node.src) {
                  jQuery._evalUrl(node.src);
                } else {
                  jQuery.globalEval(node.textContent.replace(rcleanScript, ''));
                }
              }
            }
          }
        }
      }
      return this;
    }
  });
  jQuery.each({
    appendTo: 'append',
    prependTo: 'prepend',
    insertBefore: 'before',
    insertAfter: 'after',
    replaceAll: 'replaceWith'
  }, function (name, original) {
    jQuery.fn[name] = function (selector) {
      var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
      for (; i <= last; i++) {
        elems = i === last ? this : this.clone(true);
        jQuery(insert[i])[original](elems);
        core_push.apply(ret, elems.get());
      }
      return this.pushStack(ret);
    };
  });
  jQuery.extend({
    clone: function (elem, dataAndEvents, deepDataAndEvents) {
      var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = jQuery.contains(elem.ownerDocument, elem);
      if (!jQuery.support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
        destElements = getAll(clone);
        srcElements = getAll(elem);
        for (i = 0, l = srcElements.length; i < l; i++) {
          fixInput(srcElements[i], destElements[i]);
        }
      }
      if (dataAndEvents) {
        if (deepDataAndEvents) {
          srcElements = srcElements || getAll(elem);
          destElements = destElements || getAll(clone);
          for (i = 0, l = srcElements.length; i < l; i++) {
            cloneCopyEvent(srcElements[i], destElements[i]);
          }
        } else {
          cloneCopyEvent(elem, clone);
        }
      }
      destElements = getAll(clone, 'script');
      if (destElements.length > 0) {
        setGlobalEval(destElements, !inPage && getAll(elem, 'script'));
      }
      return clone;
    },
    buildFragment: function (elems, context, scripts, selection) {
      var elem, tmp, tag, wrap, contains, j, i = 0, l = elems.length, fragment = context.createDocumentFragment(), nodes = [];
      for (; i < l; i++) {
        elem = elems[i];
        if (elem || elem === 0) {
          if (jQuery.type(elem) === 'object') {
            jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
          } else if (!rhtml.test(elem)) {
            nodes.push(context.createTextNode(elem));
          } else {
            tmp = tmp || fragment.appendChild(context.createElement('div'));
            tag = (rtagName.exec(elem) || [
              '',
              ''
            ])[1].toLowerCase();
            wrap = wrapMap[tag] || wrapMap._default;
            tmp.innerHTML = wrap[1] + elem.replace(rxhtmlTag, '<$1></$2>') + wrap[2];
            j = wrap[0];
            while (j--) {
              tmp = tmp.firstChild;
            }
            jQuery.merge(nodes, tmp.childNodes);
            tmp = fragment.firstChild;
            tmp.textContent = '';
          }
        }
      }
      fragment.textContent = '';
      i = 0;
      while (elem = nodes[i++]) {
        if (selection && jQuery.inArray(elem, selection) !== -1) {
          continue;
        }
        contains = jQuery.contains(elem.ownerDocument, elem);
        tmp = getAll(fragment.appendChild(elem), 'script');
        if (contains) {
          setGlobalEval(tmp);
        }
        if (scripts) {
          j = 0;
          while (elem = tmp[j++]) {
            if (rscriptType.test(elem.type || '')) {
              scripts.push(elem);
            }
          }
        }
      }
      return fragment;
    },
    cleanData: function (elems) {
      var data, elem, events, type, key, j, special = jQuery.event.special, i = 0;
      for (; (elem = elems[i]) !== undefined; i++) {
        if (Data.accepts(elem)) {
          key = elem[data_priv.expando];
          if (key && (data = data_priv.cache[key])) {
            events = Object.keys(data.events || {});
            if (events.length) {
              for (j = 0; (type = events[j]) !== undefined; j++) {
                if (special[type]) {
                  jQuery.event.remove(elem, type);
                } else {
                  jQuery.removeEvent(elem, type, data.handle);
                }
              }
            }
            if (data_priv.cache[key]) {
              delete data_priv.cache[key];
            }
          }
        }
        delete data_user.cache[elem[data_user.expando]];
      }
    },
    _evalUrl: function (url) {
      return jQuery.ajax({
        url: url,
        type: 'GET',
        dataType: 'script',
        async: false,
        global: false,
        'throws': true
      });
    }
  });
  function manipulationTarget(elem, content) {
    return jQuery.nodeName(elem, 'table') && jQuery.nodeName(content.nodeType === 1 ? content : content.firstChild, 'tr') ? elem.getElementsByTagName('tbody')[0] || elem.appendChild(elem.ownerDocument.createElement('tbody')) : elem;
  }
  function disableScript(elem) {
    elem.type = (elem.getAttribute('type') !== null) + '/' + elem.type;
    return elem;
  }
  function restoreScript(elem) {
    var match = rscriptTypeMasked.exec(elem.type);
    if (match) {
      elem.type = match[1];
    } else {
      elem.removeAttribute('type');
    }
    return elem;
  }
  function setGlobalEval(elems, refElements) {
    var l = elems.length, i = 0;
    for (; i < l; i++) {
      data_priv.set(elems[i], 'globalEval', !refElements || data_priv.get(refElements[i], 'globalEval'));
    }
  }
  function cloneCopyEvent(src, dest) {
    var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
    if (dest.nodeType !== 1) {
      return;
    }
    if (data_priv.hasData(src)) {
      pdataOld = data_priv.access(src);
      pdataCur = data_priv.set(dest, pdataOld);
      events = pdataOld.events;
      if (events) {
        delete pdataCur.handle;
        pdataCur.events = {};
        for (type in events) {
          for (i = 0, l = events[type].length; i < l; i++) {
            jQuery.event.add(dest, type, events[type][i]);
          }
        }
      }
    }
    if (data_user.hasData(src)) {
      udataOld = data_user.access(src);
      udataCur = jQuery.extend({}, udataOld);
      data_user.set(dest, udataCur);
    }
  }
  function getAll(context, tag) {
    var ret = context.getElementsByTagName ? context.getElementsByTagName(tag || '*') : context.querySelectorAll ? context.querySelectorAll(tag || '*') : [];
    return tag === undefined || tag && jQuery.nodeName(context, tag) ? jQuery.merge([context], ret) : ret;
  }
  function fixInput(src, dest) {
    var nodeName = dest.nodeName.toLowerCase();
    if (nodeName === 'input' && manipulation_rcheckableType.test(src.type)) {
      dest.checked = src.checked;
    } else if (nodeName === 'input' || nodeName === 'textarea') {
      dest.defaultValue = src.defaultValue;
    }
  }
  jQuery.fn.extend({
    wrapAll: function (html) {
      var wrap;
      if (jQuery.isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapAll(html.call(this, i));
        });
      }
      if (this[0]) {
        wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
        if (this[0].parentNode) {
          wrap.insertBefore(this[0]);
        }
        wrap.map(function () {
          var elem = this;
          while (elem.firstElementChild) {
            elem = elem.firstElementChild;
          }
          return elem;
        }).append(this);
      }
      return this;
    },
    wrapInner: function (html) {
      if (jQuery.isFunction(html)) {
        return this.each(function (i) {
          jQuery(this).wrapInner(html.call(this, i));
        });
      }
      return this.each(function () {
        var self = jQuery(this), contents = self.contents();
        if (contents.length) {
          contents.wrapAll(html);
        } else {
          self.append(html);
        }
      });
    },
    wrap: function (html) {
      var isFunction = jQuery.isFunction(html);
      return this.each(function (i) {
        jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
      });
    },
    unwrap: function () {
      return this.parent().each(function () {
        if (!jQuery.nodeName(this, 'body')) {
          jQuery(this).replaceWith(this.childNodes);
        }
      }).end();
    }
  });
  var curCSS, iframe, rdisplayswap = /^(none|table(?!-c[ea]).+)/, rmargin = /^margin/, rnumsplit = new RegExp('^(' + core_pnum + ')(.*)$', 'i'), rnumnonpx = new RegExp('^(' + core_pnum + ')(?!px)[a-z%]+$', 'i'), rrelNum = new RegExp('^([+-])=(' + core_pnum + ')', 'i'), elemdisplay = { BODY: 'block' }, cssShow = {
      position: 'absolute',
      visibility: 'hidden',
      display: 'block'
    }, cssNormalTransform = {
      letterSpacing: 0,
      fontWeight: 400
    }, cssExpand = [
      'Top',
      'Right',
      'Bottom',
      'Left'
    ], cssPrefixes = [
      'Webkit',
      'O',
      'Moz',
      'ms'
    ];
  function vendorPropName(style, name) {
    if (name in style) {
      return name;
    }
    var capName = name.charAt(0).toUpperCase() + name.slice(1), origName = name, i = cssPrefixes.length;
    while (i--) {
      name = cssPrefixes[i] + capName;
      if (name in style) {
        return name;
      }
    }
    return origName;
  }
  function isHidden(elem, el) {
    elem = el || elem;
    return jQuery.css(elem, 'display') === 'none' || !jQuery.contains(elem.ownerDocument, elem);
  }
  function getStyles(elem) {
    return window.getComputedStyle(elem, null);
  }
  function showHide(elements, show) {
    var display, elem, hidden, values = [], index = 0, length = elements.length;
    for (; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      values[index] = data_priv.get(elem, 'olddisplay');
      display = elem.style.display;
      if (show) {
        if (!values[index] && display === 'none') {
          elem.style.display = '';
        }
        if (elem.style.display === '' && isHidden(elem)) {
          values[index] = data_priv.access(elem, 'olddisplay', css_defaultDisplay(elem.nodeName));
        }
      } else {
        if (!values[index]) {
          hidden = isHidden(elem);
          if (display && display !== 'none' || !hidden) {
            data_priv.set(elem, 'olddisplay', hidden ? display : jQuery.css(elem, 'display'));
          }
        }
      }
    }
    for (index = 0; index < length; index++) {
      elem = elements[index];
      if (!elem.style) {
        continue;
      }
      if (!show || elem.style.display === 'none' || elem.style.display === '') {
        elem.style.display = show ? values[index] || '' : 'none';
      }
    }
    return elements;
  }
  jQuery.fn.extend({
    css: function (name, value) {
      return jQuery.access(this, function (elem, name, value) {
        var styles, len, map = {}, i = 0;
        if (jQuery.isArray(name)) {
          styles = getStyles(elem);
          len = name.length;
          for (; i < len; i++) {
            map[name[i]] = jQuery.css(elem, name[i], false, styles);
          }
          return map;
        }
        return value !== undefined ? jQuery.style(elem, name, value) : jQuery.css(elem, name);
      }, name, value, arguments.length > 1);
    },
    show: function () {
      return showHide(this, true);
    },
    hide: function () {
      return showHide(this);
    },
    toggle: function (state) {
      var bool = typeof state === 'boolean';
      return this.each(function () {
        if (bool ? state : isHidden(this)) {
          jQuery(this).show();
        } else {
          jQuery(this).hide();
        }
      });
    }
  });
  jQuery.extend({
    cssHooks: {
      opacity: {
        get: function (elem, computed) {
          if (computed) {
            var ret = curCSS(elem, 'opacity');
            return ret === '' ? '1' : ret;
          }
        }
      }
    },
    cssNumber: {
      'columnCount': true,
      'fillOpacity': true,
      'fontWeight': true,
      'lineHeight': true,
      'opacity': true,
      'orphans': true,
      'widows': true,
      'zIndex': true,
      'zoom': true
    },
    cssProps: { 'float': 'cssFloat' },
    style: function (elem, name, value, extra) {
      if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
        return;
      }
      var ret, type, hooks, origName = jQuery.camelCase(name), style = elem.style;
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(style, origName));
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (value !== undefined) {
        type = typeof value;
        if (type === 'string' && (ret = rrelNum.exec(value))) {
          value = (ret[1] + 1) * ret[2] + parseFloat(jQuery.css(elem, name));
          type = 'number';
        }
        if (value == null || type === 'number' && isNaN(value)) {
          return;
        }
        if (type === 'number' && !jQuery.cssNumber[origName]) {
          value += 'px';
        }
        if (!jQuery.support.clearCloneStyle && value === '' && name.indexOf('background') === 0) {
          style[name] = 'inherit';
        }
        if (!hooks || !('set' in hooks) || (value = hooks.set(elem, value, extra)) !== undefined) {
          style[name] = value;
        }
      } else {
        if (hooks && 'get' in hooks && (ret = hooks.get(elem, false, extra)) !== undefined) {
          return ret;
        }
        return style[name];
      }
    },
    css: function (elem, name, extra, styles) {
      var val, num, hooks, origName = jQuery.camelCase(name);
      name = jQuery.cssProps[origName] || (jQuery.cssProps[origName] = vendorPropName(elem.style, origName));
      hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
      if (hooks && 'get' in hooks) {
        val = hooks.get(elem, true, extra);
      }
      if (val === undefined) {
        val = curCSS(elem, name, styles);
      }
      if (val === 'normal' && name in cssNormalTransform) {
        val = cssNormalTransform[name];
      }
      if (extra === '' || extra) {
        num = parseFloat(val);
        return extra === true || jQuery.isNumeric(num) ? num || 0 : val;
      }
      return val;
    }
  });
  curCSS = function (elem, name, _computed) {
    var width, minWidth, maxWidth, computed = _computed || getStyles(elem), ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined, style = elem.style;
    if (computed) {
      if (ret === '' && !jQuery.contains(elem.ownerDocument, elem)) {
        ret = jQuery.style(elem, name);
      }
      if (rnumnonpx.test(ret) && rmargin.test(name)) {
        width = style.width;
        minWidth = style.minWidth;
        maxWidth = style.maxWidth;
        style.minWidth = style.maxWidth = style.width = ret;
        ret = computed.width;
        style.width = width;
        style.minWidth = minWidth;
        style.maxWidth = maxWidth;
      }
    }
    return ret;
  };
  function setPositiveNumber(elem, value, subtract) {
    var matches = rnumsplit.exec(value);
    return matches ? Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || 'px') : value;
  }
  function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
    var i = extra === (isBorderBox ? 'border' : 'content') ? 4 : name === 'width' ? 1 : 0, val = 0;
    for (; i < 4; i += 2) {
      if (extra === 'margin') {
        val += jQuery.css(elem, extra + cssExpand[i], true, styles);
      }
      if (isBorderBox) {
        if (extra === 'content') {
          val -= jQuery.css(elem, 'padding' + cssExpand[i], true, styles);
        }
        if (extra !== 'margin') {
          val -= jQuery.css(elem, 'border' + cssExpand[i] + 'Width', true, styles);
        }
      } else {
        val += jQuery.css(elem, 'padding' + cssExpand[i], true, styles);
        if (extra !== 'padding') {
          val += jQuery.css(elem, 'border' + cssExpand[i] + 'Width', true, styles);
        }
      }
    }
    return val;
  }
  function getWidthOrHeight(elem, name, extra) {
    var valueIsBorderBox = true, val = name === 'width' ? elem.offsetWidth : elem.offsetHeight, styles = getStyles(elem), isBorderBox = jQuery.support.boxSizing && jQuery.css(elem, 'boxSizing', false, styles) === 'border-box';
    if (val <= 0 || val == null) {
      val = curCSS(elem, name, styles);
      if (val < 0 || val == null) {
        val = elem.style[name];
      }
      if (rnumnonpx.test(val)) {
        return val;
      }
      valueIsBorderBox = isBorderBox && (jQuery.support.boxSizingReliable || val === elem.style[name]);
      val = parseFloat(val) || 0;
    }
    return val + augmentWidthOrHeight(elem, name, extra || (isBorderBox ? 'border' : 'content'), valueIsBorderBox, styles) + 'px';
  }
  function css_defaultDisplay(nodeName) {
    var doc = document, display = elemdisplay[nodeName];
    if (!display) {
      display = actualDisplay(nodeName, doc);
      if (display === 'none' || !display) {
        iframe = (iframe || jQuery('<iframe frameborder=\'0\' width=\'0\' height=\'0\'/>').css('cssText', 'display:block !important')).appendTo(doc.documentElement);
        doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;
        doc.write('<!doctype html><html><body>');
        doc.close();
        display = actualDisplay(nodeName, doc);
        iframe.detach();
      }
      elemdisplay[nodeName] = display;
    }
    return display;
  }
  function actualDisplay(name, doc) {
    var elem = jQuery(doc.createElement(name)).appendTo(doc.body), display = jQuery.css(elem[0], 'display');
    elem.remove();
    return display;
  }
  jQuery.each([
    'height',
    'width'
  ], function (i, name) {
    jQuery.cssHooks[name] = {
      get: function (elem, computed, extra) {
        if (computed) {
          return elem.offsetWidth === 0 && rdisplayswap.test(jQuery.css(elem, 'display')) ? jQuery.swap(elem, cssShow, function () {
            return getWidthOrHeight(elem, name, extra);
          }) : getWidthOrHeight(elem, name, extra);
        }
      },
      set: function (elem, value, extra) {
        var styles = extra && getStyles(elem);
        return setPositiveNumber(elem, value, extra ? augmentWidthOrHeight(elem, name, extra, jQuery.support.boxSizing && jQuery.css(elem, 'boxSizing', false, styles) === 'border-box', styles) : 0);
      }
    };
  });
  jQuery(function () {
    if (!jQuery.support.reliableMarginRight) {
      jQuery.cssHooks.marginRight = {
        get: function (elem, computed) {
          if (computed) {
            return jQuery.swap(elem, { 'display': 'inline-block' }, curCSS, [
              elem,
              'marginRight'
            ]);
          }
        }
      };
    }
    if (!jQuery.support.pixelPosition && jQuery.fn.position) {
      jQuery.each([
        'top',
        'left'
      ], function (i, prop) {
        jQuery.cssHooks[prop] = {
          get: function (elem, computed) {
            if (computed) {
              computed = curCSS(elem, prop);
              return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + 'px' : computed;
            }
          }
        };
      });
    }
  });
  if (jQuery.expr && jQuery.expr.filters) {
    jQuery.expr.filters.hidden = function (elem) {
      return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
    };
    jQuery.expr.filters.visible = function (elem) {
      return !jQuery.expr.filters.hidden(elem);
    };
  }
  jQuery.each({
    margin: '',
    padding: '',
    border: 'Width'
  }, function (prefix, suffix) {
    jQuery.cssHooks[prefix + suffix] = {
      expand: function (value) {
        var i = 0, expanded = {}, parts = typeof value === 'string' ? value.split(' ') : [value];
        for (; i < 4; i++) {
          expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
        }
        return expanded;
      }
    };
    if (!rmargin.test(prefix)) {
      jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
    }
  });
  var r20 = /%20/g, rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
  jQuery.fn.extend({
    serialize: function () {
      return jQuery.param(this.serializeArray());
    },
    serializeArray: function () {
      return this.map(function () {
        var elements = jQuery.prop(this, 'elements');
        return elements ? jQuery.makeArray(elements) : this;
      }).filter(function () {
        var type = this.type;
        return this.name && !jQuery(this).is(':disabled') && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !manipulation_rcheckableType.test(type));
      }).map(function (i, elem) {
        var val = jQuery(this).val();
        return val == null ? null : jQuery.isArray(val) ? jQuery.map(val, function (val) {
          return {
            name: elem.name,
            value: val.replace(rCRLF, '\r\n')
          };
        }) : {
          name: elem.name,
          value: val.replace(rCRLF, '\r\n')
        };
      }).get();
    }
  });
  jQuery.param = function (a, traditional) {
    var prefix, s = [], add = function (key, value) {
        value = jQuery.isFunction(value) ? value() : value == null ? '' : value;
        s[s.length] = encodeURIComponent(key) + '=' + encodeURIComponent(value);
      };
    if (traditional === undefined) {
      traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
    }
    if (jQuery.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
      jQuery.each(a, function () {
        add(this.name, this.value);
      });
    } else {
      for (prefix in a) {
        buildParams(prefix, a[prefix], traditional, add);
      }
    }
    return s.join('&').replace(r20, '+');
  };
  function buildParams(prefix, obj, traditional, add) {
    var name;
    if (jQuery.isArray(obj)) {
      jQuery.each(obj, function (i, v) {
        if (traditional || rbracket.test(prefix)) {
          add(prefix, v);
        } else {
          buildParams(prefix + '[' + (typeof v === 'object' ? i : '') + ']', v, traditional, add);
        }
      });
    } else if (!traditional && jQuery.type(obj) === 'object') {
      for (name in obj) {
        buildParams(prefix + '[' + name + ']', obj[name], traditional, add);
      }
    } else {
      add(prefix, obj);
    }
  }
  jQuery.each(('blur focus focusin focusout load resize scroll unload click dblclick ' + 'mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave ' + 'change select submit keydown keypress keyup error contextmenu').split(' '), function (i, name) {
    jQuery.fn[name] = function (data, fn) {
      return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
    };
  });
  jQuery.fn.extend({
    hover: function (fnOver, fnOut) {
      return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
    },
    bind: function (types, data, fn) {
      return this.on(types, null, data, fn);
    },
    unbind: function (types, fn) {
      return this.off(types, null, fn);
    },
    delegate: function (selector, types, data, fn) {
      return this.on(types, selector, data, fn);
    },
    undelegate: function (selector, types, fn) {
      return arguments.length === 1 ? this.off(selector, '**') : this.off(types, selector || '**', fn);
    }
  });
  var ajaxLocParts, ajaxLocation, ajax_nonce = jQuery.now(), ajax_rquery = /\?/, rhash = /#.*$/, rts = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/gm, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, _load = jQuery.fn.load, prefilters = {}, transports = {}, allTypes = '*/'.concat('*');
  try {
    ajaxLocation = location.href;
  } catch (e) {
    ajaxLocation = document.createElement('a');
    ajaxLocation.href = '';
    ajaxLocation = ajaxLocation.href;
  }
  ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
  function addToPrefiltersOrTransports(structure) {
    return function (dataTypeExpression, func) {
      if (typeof dataTypeExpression !== 'string') {
        func = dataTypeExpression;
        dataTypeExpression = '*';
      }
      var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(core_rnotwhite) || [];
      if (jQuery.isFunction(func)) {
        while (dataType = dataTypes[i++]) {
          if (dataType[0] === '+') {
            dataType = dataType.slice(1) || '*';
            (structure[dataType] = structure[dataType] || []).unshift(func);
          } else {
            (structure[dataType] = structure[dataType] || []).push(func);
          }
        }
      }
    };
  }
  function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
    var inspected = {}, seekingTransport = structure === transports;
    function inspect(dataType) {
      var selected;
      inspected[dataType] = true;
      jQuery.each(structure[dataType] || [], function (_, prefilterOrFactory) {
        var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
        if (typeof dataTypeOrTransport === 'string' && !seekingTransport && !inspected[dataTypeOrTransport]) {
          options.dataTypes.unshift(dataTypeOrTransport);
          inspect(dataTypeOrTransport);
          return false;
        } else if (seekingTransport) {
          return !(selected = dataTypeOrTransport);
        }
      });
      return selected;
    }
    return inspect(options.dataTypes[0]) || !inspected['*'] && inspect('*');
  }
  function ajaxExtend(target, src) {
    var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
    for (key in src) {
      if (src[key] !== undefined) {
        (flatOptions[key] ? target : deep || (deep = {}))[key] = src[key];
      }
    }
    if (deep) {
      jQuery.extend(true, target, deep);
    }
    return target;
  }
  jQuery.fn.load = function (url, params, callback) {
    if (typeof url !== 'string' && _load) {
      return _load.apply(this, arguments);
    }
    var selector, type, response, self = this, off = url.indexOf(' ');
    if (off >= 0) {
      selector = url.slice(off);
      url = url.slice(0, off);
    }
    if (jQuery.isFunction(params)) {
      callback = params;
      params = undefined;
    } else if (params && typeof params === 'object') {
      type = 'POST';
    }
    if (self.length > 0) {
      jQuery.ajax({
        url: url,
        type: type,
        dataType: 'html',
        data: params
      }).done(function (responseText) {
        response = arguments;
        self.html(selector ? jQuery('<div>').append(jQuery.parseHTML(responseText)).find(selector) : responseText);
      }).complete(callback && function (jqXHR, status) {
        self.each(callback, response || [
          jqXHR.responseText,
          status,
          jqXHR
        ]);
      });
    }
    return this;
  };
  jQuery.each([
    'ajaxStart',
    'ajaxStop',
    'ajaxComplete',
    'ajaxError',
    'ajaxSuccess',
    'ajaxSend'
  ], function (i, type) {
    jQuery.fn[type] = function (fn) {
      return this.on(type, fn);
    };
  });
  jQuery.extend({
    active: 0,
    lastModified: {},
    etag: {},
    ajaxSettings: {
      url: ajaxLocation,
      type: 'GET',
      isLocal: rlocalProtocol.test(ajaxLocParts[1]),
      global: true,
      processData: true,
      async: true,
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      accepts: {
        '*': allTypes,
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript'
      },
      contents: {
        xml: /xml/,
        html: /html/,
        json: /json/
      },
      responseFields: {
        xml: 'responseXML',
        text: 'responseText',
        json: 'responseJSON'
      },
      converters: {
        '* text': String,
        'text html': true,
        'text json': jQuery.parseJSON,
        'text xml': jQuery.parseXML
      },
      flatOptions: {
        url: true,
        context: true
      }
    },
    ajaxSetup: function (target, settings) {
      return settings ? ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) : ajaxExtend(jQuery.ajaxSettings, target);
    },
    ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
    ajaxTransport: addToPrefiltersOrTransports(transports),
    ajax: function (url, options) {
      if (typeof url === 'object') {
        options = url;
        url = undefined;
      }
      options = options || {};
      var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, parts, fireGlobals, i, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks('once memory'), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, state = 0, strAbort = 'canceled', jqXHR = {
          readyState: 0,
          getResponseHeader: function (key) {
            var match;
            if (state === 2) {
              if (!responseHeaders) {
                responseHeaders = {};
                while (match = rheaders.exec(responseHeadersString)) {
                  responseHeaders[match[1].toLowerCase()] = match[2];
                }
              }
              match = responseHeaders[key.toLowerCase()];
            }
            return match == null ? null : match;
          },
          getAllResponseHeaders: function () {
            return state === 2 ? responseHeadersString : null;
          },
          setRequestHeader: function (name, value) {
            var lname = name.toLowerCase();
            if (!state) {
              name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
              requestHeaders[name] = value;
            }
            return this;
          },
          overrideMimeType: function (type) {
            if (!state) {
              s.mimeType = type;
            }
            return this;
          },
          statusCode: function (map) {
            var code;
            if (map) {
              if (state < 2) {
                for (code in map) {
                  statusCode[code] = [
                    statusCode[code],
                    map[code]
                  ];
                }
              } else {
                jqXHR.always(map[jqXHR.status]);
              }
            }
            return this;
          },
          abort: function (statusText) {
            var finalText = statusText || strAbort;
            if (transport) {
              transport.abort(finalText);
            }
            done(0, finalText);
            return this;
          }
        };
      deferred.promise(jqXHR).complete = completeDeferred.add;
      jqXHR.success = jqXHR.done;
      jqXHR.error = jqXHR.fail;
      s.url = ((url || s.url || ajaxLocation) + '').replace(rhash, '').replace(rprotocol, ajaxLocParts[1] + '//');
      s.type = options.method || options.type || s.method || s.type;
      s.dataTypes = jQuery.trim(s.dataType || '*').toLowerCase().match(core_rnotwhite) || [''];
      if (s.crossDomain == null) {
        parts = rurl.exec(s.url.toLowerCase());
        s.crossDomain = !!(parts && (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] || (parts[3] || (parts[1] === 'http:' ? '80' : '443')) !== (ajaxLocParts[3] || (ajaxLocParts[1] === 'http:' ? '80' : '443'))));
      }
      if (s.data && s.processData && typeof s.data !== 'string') {
        s.data = jQuery.param(s.data, s.traditional);
      }
      inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
      if (state === 2) {
        return jqXHR;
      }
      fireGlobals = s.global;
      if (fireGlobals && jQuery.active++ === 0) {
        jQuery.event.trigger('ajaxStart');
      }
      s.type = s.type.toUpperCase();
      s.hasContent = !rnoContent.test(s.type);
      cacheURL = s.url;
      if (!s.hasContent) {
        if (s.data) {
          cacheURL = s.url += (ajax_rquery.test(cacheURL) ? '&' : '?') + s.data;
          delete s.data;
        }
        if (s.cache === false) {
          s.url = rts.test(cacheURL) ? cacheURL.replace(rts, '$1_=' + ajax_nonce++) : cacheURL + (ajax_rquery.test(cacheURL) ? '&' : '?') + '_=' + ajax_nonce++;
        }
      }
      if (s.ifModified) {
        if (jQuery.lastModified[cacheURL]) {
          jqXHR.setRequestHeader('If-Modified-Since', jQuery.lastModified[cacheURL]);
        }
        if (jQuery.etag[cacheURL]) {
          jqXHR.setRequestHeader('If-None-Match', jQuery.etag[cacheURL]);
        }
      }
      if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
        jqXHR.setRequestHeader('Content-Type', s.contentType);
      }
      jqXHR.setRequestHeader('Accept', s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== '*' ? ', ' + allTypes + '; q=0.01' : '') : s.accepts['*']);
      for (i in s.headers) {
        jqXHR.setRequestHeader(i, s.headers[i]);
      }
      if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {
        return jqXHR.abort();
      }
      strAbort = 'abort';
      for (i in {
          success: 1,
          error: 1,
          complete: 1
        }) {
        jqXHR[i](s[i]);
      }
      transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
      if (!transport) {
        done(-1, 'No Transport');
      } else {
        jqXHR.readyState = 1;
        if (fireGlobals) {
          globalEventContext.trigger('ajaxSend', [
            jqXHR,
            s
          ]);
        }
        if (s.async && s.timeout > 0) {
          timeoutTimer = setTimeout(function () {
            jqXHR.abort('timeout');
          }, s.timeout);
        }
        try {
          state = 1;
          transport.send(requestHeaders, done);
        } catch (e) {
          if (state < 2) {
            done(-1, e);
          } else {
            throw e;
          }
        }
      }
      function done(status, nativeStatusText, responses, headers) {
        var isSuccess, success, error, response, modified, statusText = nativeStatusText;
        if (state === 2) {
          return;
        }
        state = 2;
        if (timeoutTimer) {
          clearTimeout(timeoutTimer);
        }
        transport = undefined;
        responseHeadersString = headers || '';
        jqXHR.readyState = status > 0 ? 4 : 0;
        isSuccess = status >= 200 && status < 300 || status === 304;
        if (responses) {
          response = ajaxHandleResponses(s, jqXHR, responses);
        }
        response = ajaxConvert(s, response, jqXHR, isSuccess);
        if (isSuccess) {
          if (s.ifModified) {
            modified = jqXHR.getResponseHeader('Last-Modified');
            if (modified) {
              jQuery.lastModified[cacheURL] = modified;
            }
            modified = jqXHR.getResponseHeader('etag');
            if (modified) {
              jQuery.etag[cacheURL] = modified;
            }
          }
          if (status === 204 || s.type === 'HEAD') {
            statusText = 'nocontent';
          } else if (status === 304) {
            statusText = 'notmodified';
          } else {
            statusText = response.state;
            success = response.data;
            error = response.error;
            isSuccess = !error;
          }
        } else {
          error = statusText;
          if (status || !statusText) {
            statusText = 'error';
            if (status < 0) {
              status = 0;
            }
          }
        }
        jqXHR.status = status;
        jqXHR.statusText = (nativeStatusText || statusText) + '';
        if (isSuccess) {
          deferred.resolveWith(callbackContext, [
            success,
            statusText,
            jqXHR
          ]);
        } else {
          deferred.rejectWith(callbackContext, [
            jqXHR,
            statusText,
            error
          ]);
        }
        jqXHR.statusCode(statusCode);
        statusCode = undefined;
        if (fireGlobals) {
          globalEventContext.trigger(isSuccess ? 'ajaxSuccess' : 'ajaxError', [
            jqXHR,
            s,
            isSuccess ? success : error
          ]);
        }
        completeDeferred.fireWith(callbackContext, [
          jqXHR,
          statusText
        ]);
        if (fireGlobals) {
          globalEventContext.trigger('ajaxComplete', [
            jqXHR,
            s
          ]);
          if (!--jQuery.active) {
            jQuery.event.trigger('ajaxStop');
          }
        }
      }
      return jqXHR;
    },
    getJSON: function (url, data, callback) {
      return jQuery.get(url, data, callback, 'json');
    },
    getScript: function (url, callback) {
      return jQuery.get(url, undefined, callback, 'script');
    }
  });
  jQuery.each([
    'get',
    'post'
  ], function (i, method) {
    jQuery[method] = function (url, data, callback, type) {
      if (jQuery.isFunction(data)) {
        type = type || callback;
        callback = data;
        data = undefined;
      }
      return jQuery.ajax({
        url: url,
        type: method,
        dataType: type,
        data: data,
        success: callback
      });
    };
  });
  function ajaxHandleResponses(s, jqXHR, responses) {
    var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
    while (dataTypes[0] === '*') {
      dataTypes.shift();
      if (ct === undefined) {
        ct = s.mimeType || jqXHR.getResponseHeader('Content-Type');
      }
    }
    if (ct) {
      for (type in contents) {
        if (contents[type] && contents[type].test(ct)) {
          dataTypes.unshift(type);
          break;
        }
      }
    }
    if (dataTypes[0] in responses) {
      finalDataType = dataTypes[0];
    } else {
      for (type in responses) {
        if (!dataTypes[0] || s.converters[type + ' ' + dataTypes[0]]) {
          finalDataType = type;
          break;
        }
        if (!firstDataType) {
          firstDataType = type;
        }
      }
      finalDataType = finalDataType || firstDataType;
    }
    if (finalDataType) {
      if (finalDataType !== dataTypes[0]) {
        dataTypes.unshift(finalDataType);
      }
      return responses[finalDataType];
    }
  }
  function ajaxConvert(s, response, jqXHR, isSuccess) {
    var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
    if (dataTypes[1]) {
      for (conv in s.converters) {
        converters[conv.toLowerCase()] = s.converters[conv];
      }
    }
    current = dataTypes.shift();
    while (current) {
      if (s.responseFields[current]) {
        jqXHR[s.responseFields[current]] = response;
      }
      if (!prev && isSuccess && s.dataFilter) {
        response = s.dataFilter(response, s.dataType);
      }
      prev = current;
      current = dataTypes.shift();
      if (current) {
        if (current === '*') {
          current = prev;
        } else if (prev !== '*' && prev !== current) {
          conv = converters[prev + ' ' + current] || converters['* ' + current];
          if (!conv) {
            for (conv2 in converters) {
              tmp = conv2.split(' ');
              if (tmp[1] === current) {
                conv = converters[prev + ' ' + tmp[0]] || converters['* ' + tmp[0]];
                if (conv) {
                  if (conv === true) {
                    conv = converters[conv2];
                  } else if (converters[conv2] !== true) {
                    current = tmp[0];
                    dataTypes.unshift(tmp[1]);
                  }
                  break;
                }
              }
            }
          }
          if (conv !== true) {
            if (conv && s['throws']) {
              response = conv(response);
            } else {
              try {
                response = conv(response);
              } catch (e) {
                return {
                  state: 'parsererror',
                  error: conv ? e : 'No conversion from ' + prev + ' to ' + current
                };
              }
            }
          }
        }
      }
    }
    return {
      state: 'success',
      data: response
    };
  }
  jQuery.ajaxSetup({
    accepts: { script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript' },
    contents: { script: /(?:java|ecma)script/ },
    converters: {
      'text script': function (text) {
        jQuery.globalEval(text);
        return text;
      }
    }
  });
  jQuery.ajaxPrefilter('script', function (s) {
    if (s.cache === undefined) {
      s.cache = false;
    }
    if (s.crossDomain) {
      s.type = 'GET';
    }
  });
  jQuery.ajaxTransport('script', function (s) {
    if (s.crossDomain) {
      var script, callback;
      return {
        send: function (_, complete) {
          script = jQuery('<script>').prop({
            async: true,
            charset: s.scriptCharset,
            src: s.url
          }).on('load error', callback = function (evt) {
            script.remove();
            callback = null;
            if (evt) {
              complete(evt.type === 'error' ? 404 : 200, evt.type);
            }
          });
          document.head.appendChild(script[0]);
        },
        abort: function () {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
  jQuery.ajaxSetup({
    jsonp: 'callback',
    jsonpCallback: function () {
      var callback = oldCallbacks.pop() || jQuery.expando + '_' + ajax_nonce++;
      this[callback] = true;
      return callback;
    }
  });
  jQuery.ajaxPrefilter('json jsonp', function (s, originalSettings, jqXHR) {
    var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? 'url' : typeof s.data === 'string' && !(s.contentType || '').indexOf('application/x-www-form-urlencoded') && rjsonp.test(s.data) && 'data');
    if (jsonProp || s.dataTypes[0] === 'jsonp') {
      callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
      if (jsonProp) {
        s[jsonProp] = s[jsonProp].replace(rjsonp, '$1' + callbackName);
      } else if (s.jsonp !== false) {
        s.url += (ajax_rquery.test(s.url) ? '&' : '?') + s.jsonp + '=' + callbackName;
      }
      s.converters['script json'] = function () {
        if (!responseContainer) {
          jQuery.error(callbackName + ' was not called');
        }
        return responseContainer[0];
      };
      s.dataTypes[0] = 'json';
      overwritten = window[callbackName];
      window[callbackName] = function () {
        responseContainer = arguments;
      };
      jqXHR.always(function () {
        window[callbackName] = overwritten;
        if (s[callbackName]) {
          s.jsonpCallback = originalSettings.jsonpCallback;
          oldCallbacks.push(callbackName);
        }
        if (responseContainer && jQuery.isFunction(overwritten)) {
          overwritten(responseContainer[0]);
        }
        responseContainer = overwritten = undefined;
      });
      return 'script';
    }
  });
  jQuery.ajaxSettings.xhr = function () {
    try {
      return new XMLHttpRequest();
    } catch (e) {
    }
  };
  var xhrSupported = jQuery.ajaxSettings.xhr(), xhrSuccessStatus = {
      0: 200,
      1223: 204
    }, xhrId = 0, xhrCallbacks = {};
  if (window.ActiveXObject) {
    jQuery(window).on('unload', function () {
      for (var key in xhrCallbacks) {
        xhrCallbacks[key]();
      }
      xhrCallbacks = undefined;
    });
  }
  jQuery.support.cors = !!xhrSupported && 'withCredentials' in xhrSupported;
  jQuery.support.ajax = xhrSupported = !!xhrSupported;
  jQuery.ajaxTransport(function (options) {
    var callback;
    if (jQuery.support.cors || xhrSupported && !options.crossDomain) {
      return {
        send: function (headers, complete) {
          var i, id, xhr = options.xhr();
          xhr.open(options.type, options.url, options.async, options.username, options.password);
          if (options.xhrFields) {
            for (i in options.xhrFields) {
              xhr[i] = options.xhrFields[i];
            }
          }
          if (options.mimeType && xhr.overrideMimeType) {
            xhr.overrideMimeType(options.mimeType);
          }
          if (!options.crossDomain && !headers['X-Requested-With']) {
            headers['X-Requested-With'] = 'XMLHttpRequest';
          }
          for (i in headers) {
            xhr.setRequestHeader(i, headers[i]);
          }
          callback = function (type) {
            return function () {
              if (callback) {
                delete xhrCallbacks[id];
                callback = xhr.onload = xhr.onerror = null;
                if (type === 'abort') {
                  xhr.abort();
                } else if (type === 'error') {
                  complete(xhr.status || 404, xhr.statusText);
                } else {
                  complete(xhrSuccessStatus[xhr.status] || xhr.status, xhr.statusText, typeof xhr.responseText === 'string' ? { text: xhr.responseText } : undefined, xhr.getAllResponseHeaders());
                }
              }
            };
          };
          xhr.onload = callback();
          xhr.onerror = callback('error');
          callback = xhrCallbacks[id = xhrId++] = callback('abort');
          xhr.send(options.hasContent && options.data || null);
        },
        abort: function () {
          if (callback) {
            callback();
          }
        }
      };
    }
  });
  var fxNow, timerId, rfxtypes = /^(?:toggle|show|hide)$/, rfxnum = new RegExp('^(?:([+-])=|)(' + core_pnum + ')([a-z%]*)$', 'i'), rrun = /queueHooks$/, animationPrefilters = [defaultPrefilter], tweeners = {
      '*': [function (prop, value) {
          var tween = this.createTween(prop, value), target = tween.cur(), parts = rfxnum.exec(value), unit = parts && parts[3] || (jQuery.cssNumber[prop] ? '' : 'px'), start = (jQuery.cssNumber[prop] || unit !== 'px' && +target) && rfxnum.exec(jQuery.css(tween.elem, prop)), scale = 1, maxIterations = 20;
          if (start && start[3] !== unit) {
            unit = unit || start[3];
            parts = parts || [];
            start = +target || 1;
            do {
              scale = scale || '.5';
              start = start / scale;
              jQuery.style(tween.elem, prop, start + unit);
            } while (scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations);
          }
          if (parts) {
            start = tween.start = +start || +target || 0;
            tween.unit = unit;
            tween.end = parts[1] ? start + (parts[1] + 1) * parts[2] : +parts[2];
          }
          return tween;
        }]
    };
  function createFxNow() {
    setTimeout(function () {
      fxNow = undefined;
    });
    return fxNow = jQuery.now();
  }
  function createTween(value, prop, animation) {
    var tween, collection = (tweeners[prop] || []).concat(tweeners['*']), index = 0, length = collection.length;
    for (; index < length; index++) {
      if (tween = collection[index].call(animation, prop, value)) {
        return tween;
      }
    }
  }
  function Animation(elem, properties, options) {
    var result, stopped, index = 0, length = animationPrefilters.length, deferred = jQuery.Deferred().always(function () {
        delete tick.elem;
      }), tick = function () {
        if (stopped) {
          return false;
        }
        var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index = 0, length = animation.tweens.length;
        for (; index < length; index++) {
          animation.tweens[index].run(percent);
        }
        deferred.notifyWith(elem, [
          animation,
          percent,
          remaining
        ]);
        if (percent < 1 && length) {
          return remaining;
        } else {
          deferred.resolveWith(elem, [animation]);
          return false;
        }
      }, animation = deferred.promise({
        elem: elem,
        props: jQuery.extend({}, properties),
        opts: jQuery.extend(true, { specialEasing: {} }, options),
        originalProperties: properties,
        originalOptions: options,
        startTime: fxNow || createFxNow(),
        duration: options.duration,
        tweens: [],
        createTween: function (prop, end) {
          var tween = jQuery.Tween(elem, animation.opts, prop, end, animation.opts.specialEasing[prop] || animation.opts.easing);
          animation.tweens.push(tween);
          return tween;
        },
        stop: function (gotoEnd) {
          var index = 0, length = gotoEnd ? animation.tweens.length : 0;
          if (stopped) {
            return this;
          }
          stopped = true;
          for (; index < length; index++) {
            animation.tweens[index].run(1);
          }
          if (gotoEnd) {
            deferred.resolveWith(elem, [
              animation,
              gotoEnd
            ]);
          } else {
            deferred.rejectWith(elem, [
              animation,
              gotoEnd
            ]);
          }
          return this;
        }
      }), props = animation.props;
    propFilter(props, animation.opts.specialEasing);
    for (; index < length; index++) {
      result = animationPrefilters[index].call(animation, elem, props, animation.opts);
      if (result) {
        return result;
      }
    }
    jQuery.map(props, createTween, animation);
    if (jQuery.isFunction(animation.opts.start)) {
      animation.opts.start.call(elem, animation);
    }
    jQuery.fx.timer(jQuery.extend(tick, {
      elem: elem,
      anim: animation,
      queue: animation.opts.queue
    }));
    return animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
  }
  function propFilter(props, specialEasing) {
    var index, name, easing, value, hooks;
    for (index in props) {
      name = jQuery.camelCase(index);
      easing = specialEasing[name];
      value = props[index];
      if (jQuery.isArray(value)) {
        easing = value[1];
        value = props[index] = value[0];
      }
      if (index !== name) {
        props[name] = value;
        delete props[index];
      }
      hooks = jQuery.cssHooks[name];
      if (hooks && 'expand' in hooks) {
        value = hooks.expand(value);
        delete props[name];
        for (index in value) {
          if (!(index in props)) {
            props[index] = value[index];
            specialEasing[index] = easing;
          }
        }
      } else {
        specialEasing[name] = easing;
      }
    }
  }
  jQuery.Animation = jQuery.extend(Animation, {
    tweener: function (props, callback) {
      if (jQuery.isFunction(props)) {
        callback = props;
        props = ['*'];
      } else {
        props = props.split(' ');
      }
      var prop, index = 0, length = props.length;
      for (; index < length; index++) {
        prop = props[index];
        tweeners[prop] = tweeners[prop] || [];
        tweeners[prop].unshift(callback);
      }
    },
    prefilter: function (callback, prepend) {
      if (prepend) {
        animationPrefilters.unshift(callback);
      } else {
        animationPrefilters.push(callback);
      }
    }
  });
  function defaultPrefilter(elem, props, opts) {
    var prop, value, toggle, tween, hooks, oldfire, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHidden(elem), dataShow = data_priv.get(elem, 'fxshow');
    if (!opts.queue) {
      hooks = jQuery._queueHooks(elem, 'fx');
      if (hooks.unqueued == null) {
        hooks.unqueued = 0;
        oldfire = hooks.empty.fire;
        hooks.empty.fire = function () {
          if (!hooks.unqueued) {
            oldfire();
          }
        };
      }
      hooks.unqueued++;
      anim.always(function () {
        anim.always(function () {
          hooks.unqueued--;
          if (!jQuery.queue(elem, 'fx').length) {
            hooks.empty.fire();
          }
        });
      });
    }
    if (elem.nodeType === 1 && ('height' in props || 'width' in props)) {
      opts.overflow = [
        style.overflow,
        style.overflowX,
        style.overflowY
      ];
      if (jQuery.css(elem, 'display') === 'inline' && jQuery.css(elem, 'float') === 'none') {
        style.display = 'inline-block';
      }
    }
    if (opts.overflow) {
      style.overflow = 'hidden';
      anim.always(function () {
        style.overflow = opts.overflow[0];
        style.overflowX = opts.overflow[1];
        style.overflowY = opts.overflow[2];
      });
    }
    for (prop in props) {
      value = props[prop];
      if (rfxtypes.exec(value)) {
        delete props[prop];
        toggle = toggle || value === 'toggle';
        if (value === (hidden ? 'hide' : 'show')) {
          if (value === 'show' && dataShow && dataShow[prop] !== undefined) {
            hidden = true;
          } else {
            continue;
          }
        }
        orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
      }
    }
    if (!jQuery.isEmptyObject(orig)) {
      if (dataShow) {
        if ('hidden' in dataShow) {
          hidden = dataShow.hidden;
        }
      } else {
        dataShow = data_priv.access(elem, 'fxshow', {});
      }
      if (toggle) {
        dataShow.hidden = !hidden;
      }
      if (hidden) {
        jQuery(elem).show();
      } else {
        anim.done(function () {
          jQuery(elem).hide();
        });
      }
      anim.done(function () {
        var prop;
        data_priv.remove(elem, 'fxshow');
        for (prop in orig) {
          jQuery.style(elem, prop, orig[prop]);
        }
      });
      for (prop in orig) {
        tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
        if (!(prop in dataShow)) {
          dataShow[prop] = tween.start;
          if (hidden) {
            tween.end = tween.start;
            tween.start = prop === 'width' || prop === 'height' ? 1 : 0;
          }
        }
      }
    }
  }
  function Tween(elem, options, prop, end, easing) {
    return new Tween.prototype.init(elem, options, prop, end, easing);
  }
  jQuery.Tween = Tween;
  Tween.prototype = {
    constructor: Tween,
    init: function (elem, options, prop, end, easing, unit) {
      this.elem = elem;
      this.prop = prop;
      this.easing = easing || 'swing';
      this.options = options;
      this.start = this.now = this.cur();
      this.end = end;
      this.unit = unit || (jQuery.cssNumber[prop] ? '' : 'px');
    },
    cur: function () {
      var hooks = Tween.propHooks[this.prop];
      return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
    },
    run: function (percent) {
      var eased, hooks = Tween.propHooks[this.prop];
      if (this.options.duration) {
        this.pos = eased = jQuery.easing[this.easing](percent, this.options.duration * percent, 0, 1, this.options.duration);
      } else {
        this.pos = eased = percent;
      }
      this.now = (this.end - this.start) * eased + this.start;
      if (this.options.step) {
        this.options.step.call(this.elem, this.now, this);
      }
      if (hooks && hooks.set) {
        hooks.set(this);
      } else {
        Tween.propHooks._default.set(this);
      }
      return this;
    }
  };
  Tween.prototype.init.prototype = Tween.prototype;
  Tween.propHooks = {
    _default: {
      get: function (tween) {
        var result;
        if (tween.elem[tween.prop] != null && (!tween.elem.style || tween.elem.style[tween.prop] == null)) {
          return tween.elem[tween.prop];
        }
        result = jQuery.css(tween.elem, tween.prop, '');
        return !result || result === 'auto' ? 0 : result;
      },
      set: function (tween) {
        if (jQuery.fx.step[tween.prop]) {
          jQuery.fx.step[tween.prop](tween);
        } else if (tween.elem.style && (tween.elem.style[jQuery.cssProps[tween.prop]] != null || jQuery.cssHooks[tween.prop])) {
          jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
        } else {
          tween.elem[tween.prop] = tween.now;
        }
      }
    }
  };
  Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
    set: function (tween) {
      if (tween.elem.nodeType && tween.elem.parentNode) {
        tween.elem[tween.prop] = tween.now;
      }
    }
  };
  jQuery.each([
    'toggle',
    'show',
    'hide'
  ], function (i, name) {
    var cssFn = jQuery.fn[name];
    jQuery.fn[name] = function (speed, easing, callback) {
      return speed == null || typeof speed === 'boolean' ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
    };
  });
  jQuery.fn.extend({
    fadeTo: function (speed, to, easing, callback) {
      return this.filter(isHidden).css('opacity', 0).show().end().animate({ opacity: to }, speed, easing, callback);
    },
    animate: function (prop, speed, easing, callback) {
      var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function () {
          var anim = Animation(this, jQuery.extend({}, prop), optall);
          if (empty || data_priv.get(this, 'finish')) {
            anim.stop(true);
          }
        };
      doAnimation.finish = doAnimation;
      return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
    },
    stop: function (type, clearQueue, gotoEnd) {
      var stopQueue = function (hooks) {
        var stop = hooks.stop;
        delete hooks.stop;
        stop(gotoEnd);
      };
      if (typeof type !== 'string') {
        gotoEnd = clearQueue;
        clearQueue = type;
        type = undefined;
      }
      if (clearQueue && type !== false) {
        this.queue(type || 'fx', []);
      }
      return this.each(function () {
        var dequeue = true, index = type != null && type + 'queueHooks', timers = jQuery.timers, data = data_priv.get(this);
        if (index) {
          if (data[index] && data[index].stop) {
            stopQueue(data[index]);
          }
        } else {
          for (index in data) {
            if (data[index] && data[index].stop && rrun.test(index)) {
              stopQueue(data[index]);
            }
          }
        }
        for (index = timers.length; index--;) {
          if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
            timers[index].anim.stop(gotoEnd);
            dequeue = false;
            timers.splice(index, 1);
          }
        }
        if (dequeue || !gotoEnd) {
          jQuery.dequeue(this, type);
        }
      });
    },
    finish: function (type) {
      if (type !== false) {
        type = type || 'fx';
      }
      return this.each(function () {
        var index, data = data_priv.get(this), queue = data[type + 'queue'], hooks = data[type + 'queueHooks'], timers = jQuery.timers, length = queue ? queue.length : 0;
        data.finish = true;
        jQuery.queue(this, type, []);
        if (hooks && hooks.stop) {
          hooks.stop.call(this, true);
        }
        for (index = timers.length; index--;) {
          if (timers[index].elem === this && timers[index].queue === type) {
            timers[index].anim.stop(true);
            timers.splice(index, 1);
          }
        }
        for (index = 0; index < length; index++) {
          if (queue[index] && queue[index].finish) {
            queue[index].finish.call(this);
          }
        }
        delete data.finish;
      });
    }
  });
  function genFx(type, includeWidth) {
    var which, attrs = { height: type }, i = 0;
    includeWidth = includeWidth ? 1 : 0;
    for (; i < 4; i += 2 - includeWidth) {
      which = cssExpand[i];
      attrs['margin' + which] = attrs['padding' + which] = type;
    }
    if (includeWidth) {
      attrs.opacity = attrs.width = type;
    }
    return attrs;
  }
  jQuery.each({
    slideDown: genFx('show'),
    slideUp: genFx('hide'),
    slideToggle: genFx('toggle'),
    fadeIn: { opacity: 'show' },
    fadeOut: { opacity: 'hide' },
    fadeToggle: { opacity: 'toggle' }
  }, function (name, props) {
    jQuery.fn[name] = function (speed, easing, callback) {
      return this.animate(props, speed, easing, callback);
    };
  });
  jQuery.speed = function (speed, easing, fn) {
    var opt = speed && typeof speed === 'object' ? jQuery.extend({}, speed) : {
        complete: fn || !fn && easing || jQuery.isFunction(speed) && speed,
        duration: speed,
        easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
      };
    opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === 'number' ? opt.duration : opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;
    if (opt.queue == null || opt.queue === true) {
      opt.queue = 'fx';
    }
    opt.old = opt.complete;
    opt.complete = function () {
      if (jQuery.isFunction(opt.old)) {
        opt.old.call(this);
      }
      if (opt.queue) {
        jQuery.dequeue(this, opt.queue);
      }
    };
    return opt;
  };
  jQuery.easing = {
    linear: function (p) {
      return p;
    },
    swing: function (p) {
      return 0.5 - Math.cos(p * Math.PI) / 2;
    }
  };
  jQuery.timers = [];
  jQuery.fx = Tween.prototype.init;
  jQuery.fx.tick = function () {
    var timer, timers = jQuery.timers, i = 0;
    fxNow = jQuery.now();
    for (; i < timers.length; i++) {
      timer = timers[i];
      if (!timer() && timers[i] === timer) {
        timers.splice(i--, 1);
      }
    }
    if (!timers.length) {
      jQuery.fx.stop();
    }
    fxNow = undefined;
  };
  jQuery.fx.timer = function (timer) {
    if (timer() && jQuery.timers.push(timer)) {
      jQuery.fx.start();
    }
  };
  jQuery.fx.interval = 13;
  jQuery.fx.start = function () {
    if (!timerId) {
      timerId = setInterval(jQuery.fx.tick, jQuery.fx.interval);
    }
  };
  jQuery.fx.stop = function () {
    clearInterval(timerId);
    timerId = null;
  };
  jQuery.fx.speeds = {
    slow: 600,
    fast: 200,
    _default: 400
  };
  jQuery.fx.step = {};
  if (jQuery.expr && jQuery.expr.filters) {
    jQuery.expr.filters.animated = function (elem) {
      return jQuery.grep(jQuery.timers, function (fn) {
        return elem === fn.elem;
      }).length;
    };
  }
  jQuery.fn.offset = function (options) {
    if (arguments.length) {
      return options === undefined ? this : this.each(function (i) {
        jQuery.offset.setOffset(this, options, i);
      });
    }
    var docElem, win, elem = this[0], box = {
        top: 0,
        left: 0
      }, doc = elem && elem.ownerDocument;
    if (!doc) {
      return;
    }
    docElem = doc.documentElement;
    if (!jQuery.contains(docElem, elem)) {
      return box;
    }
    if (typeof elem.getBoundingClientRect !== core_strundefined) {
      box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    };
  };
  jQuery.offset = {
    setOffset: function (elem, options, i) {
      var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, 'position'), curElem = jQuery(elem), props = {};
      if (position === 'static') {
        elem.style.position = 'relative';
      }
      curOffset = curElem.offset();
      curCSSTop = jQuery.css(elem, 'top');
      curCSSLeft = jQuery.css(elem, 'left');
      calculatePosition = (position === 'absolute' || position === 'fixed') && (curCSSTop + curCSSLeft).indexOf('auto') > -1;
      if (calculatePosition) {
        curPosition = curElem.position();
        curTop = curPosition.top;
        curLeft = curPosition.left;
      } else {
        curTop = parseFloat(curCSSTop) || 0;
        curLeft = parseFloat(curCSSLeft) || 0;
      }
      if (jQuery.isFunction(options)) {
        options = options.call(elem, i, curOffset);
      }
      if (options.top != null) {
        props.top = options.top - curOffset.top + curTop;
      }
      if (options.left != null) {
        props.left = options.left - curOffset.left + curLeft;
      }
      if ('using' in options) {
        options.using.call(elem, props);
      } else {
        curElem.css(props);
      }
    }
  };
  jQuery.fn.extend({
    position: function () {
      if (!this[0]) {
        return;
      }
      var offsetParent, offset, elem = this[0], parentOffset = {
          top: 0,
          left: 0
        };
      if (jQuery.css(elem, 'position') === 'fixed') {
        offset = elem.getBoundingClientRect();
      } else {
        offsetParent = this.offsetParent();
        offset = this.offset();
        if (!jQuery.nodeName(offsetParent[0], 'html')) {
          parentOffset = offsetParent.offset();
        }
        parentOffset.top += jQuery.css(offsetParent[0], 'borderTopWidth', true);
        parentOffset.left += jQuery.css(offsetParent[0], 'borderLeftWidth', true);
      }
      return {
        top: offset.top - parentOffset.top - jQuery.css(elem, 'marginTop', true),
        left: offset.left - parentOffset.left - jQuery.css(elem, 'marginLeft', true)
      };
    },
    offsetParent: function () {
      return this.map(function () {
        var offsetParent = this.offsetParent || docElem;
        while (offsetParent && (!jQuery.nodeName(offsetParent, 'html') && jQuery.css(offsetParent, 'position') === 'static')) {
          offsetParent = offsetParent.offsetParent;
        }
        return offsetParent || docElem;
      });
    }
  });
  jQuery.each({
    scrollLeft: 'pageXOffset',
    scrollTop: 'pageYOffset'
  }, function (method, prop) {
    var top = 'pageYOffset' === prop;
    jQuery.fn[method] = function (val) {
      return jQuery.access(this, function (elem, method, val) {
        var win = getWindow(elem);
        if (val === undefined) {
          return win ? win[prop] : elem[method];
        }
        if (win) {
          win.scrollTo(!top ? val : window.pageXOffset, top ? val : window.pageYOffset);
        } else {
          elem[method] = val;
        }
      }, method, val, arguments.length, null);
    };
  });
  function getWindow(elem) {
    return jQuery.isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }
  jQuery.each({
    Height: 'height',
    Width: 'width'
  }, function (name, type) {
    jQuery.each({
      padding: 'inner' + name,
      content: type,
      '': 'outer' + name
    }, function (defaultExtra, funcName) {
      jQuery.fn[funcName] = function (margin, value) {
        var chainable = arguments.length && (defaultExtra || typeof margin !== 'boolean'), extra = defaultExtra || (margin === true || value === true ? 'margin' : 'border');
        return jQuery.access(this, function (elem, type, value) {
          var doc;
          if (jQuery.isWindow(elem)) {
            return elem.document.documentElement['client' + name];
          }
          if (elem.nodeType === 9) {
            doc = elem.documentElement;
            return Math.max(elem.body['scroll' + name], doc['scroll' + name], elem.body['offset' + name], doc['offset' + name], doc['client' + name]);
          }
          return value === undefined ? jQuery.css(elem, type, extra) : jQuery.style(elem, type, value, extra);
        }, type, chainable ? margin : undefined, chainable, null);
      };
    });
  });
  jQuery.fn.size = function () {
    return this.length;
  };
  jQuery.fn.andSelf = jQuery.fn.addBack;
  if (typeof module === 'object' && module && typeof module.exports === 'object') {
    module.exports = jQuery;
  } else {
    if (typeof define === 'function' && define.amd) {
      define('jquery', [], function () {
        return jQuery;
      });
    }
  }
  if (typeof window === 'object' && typeof window.document === 'object') {
    window.jQuery = window.$ = jQuery;
  }
}(window));
(function (window, document, undefined) {
  'use strict';
  var lowercase = function (string) {
    return isString(string) ? string.toLowerCase() : string;
  };
  var uppercase = function (string) {
    return isString(string) ? string.toUpperCase() : string;
  };
  var manualLowercase = function (s) {
    return isString(s) ? s.replace(/[A-Z]/g, function (ch) {
      return String.fromCharCode(ch.charCodeAt(0) | 32);
    }) : s;
  };
  var manualUppercase = function (s) {
    return isString(s) ? s.replace(/[a-z]/g, function (ch) {
      return String.fromCharCode(ch.charCodeAt(0) & ~32);
    }) : s;
  };
  if ('i' !== 'I'.toLowerCase()) {
    lowercase = manualLowercase;
    uppercase = manualUppercase;
  }
  var msie = int((/msie (\d+)/.exec(lowercase(navigator.userAgent)) || [])[1]), jqLite, jQuery, slice = [].slice, push = [].push, toString = Object.prototype.toString, _angular = window.angular, angular = window.angular || (window.angular = {}), angularModule, nodeName_, uid = [
      '0',
      '0',
      '0'
    ];
  function noConflict() {
    var a = window.angular;
    window.angular = _angular;
    return a;
  }
  function isArrayLike(obj) {
    if (!obj || typeof obj.length !== 'number')
      return false;
    if (typeof obj.hasOwnProperty != 'function' && typeof obj.constructor != 'function') {
      return true;
    } else {
      return obj instanceof JQLite || jQuery && obj instanceof jQuery || toString.call(obj) !== '[object Object]' || typeof obj.callee === 'function';
    }
  }
  function forEach(obj, iterator, context) {
    var key;
    if (obj) {
      if (isFunction(obj)) {
        for (key in obj) {
          if (key != 'prototype' && key != 'length' && key != 'name' && obj.hasOwnProperty(key)) {
            iterator.call(context, obj[key], key);
          }
        }
      } else if (obj.forEach && obj.forEach !== forEach) {
        obj.forEach(iterator, context);
      } else if (isArrayLike(obj)) {
        for (key = 0; key < obj.length; key++)
          iterator.call(context, obj[key], key);
      } else {
        for (key in obj) {
          if (obj.hasOwnProperty(key)) {
            iterator.call(context, obj[key], key);
          }
        }
      }
    }
    return obj;
  }
  function sortedKeys(obj) {
    var keys = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        keys.push(key);
      }
    }
    return keys.sort();
  }
  function forEachSorted(obj, iterator, context) {
    var keys = sortedKeys(obj);
    for (var i = 0; i < keys.length; i++) {
      iterator.call(context, obj[keys[i]], keys[i]);
    }
    return keys;
  }
  function reverseParams(iteratorFn) {
    return function (value, key) {
      iteratorFn(key, value);
    };
  }
  function nextUid() {
    var index = uid.length;
    var digit;
    while (index) {
      index--;
      digit = uid[index].charCodeAt(0);
      if (digit == 57) {
        uid[index] = 'A';
        return uid.join('');
      }
      if (digit == 90) {
        uid[index] = '0';
      } else {
        uid[index] = String.fromCharCode(digit + 1);
        return uid.join('');
      }
    }
    uid.unshift('0');
    return uid.join('');
  }
  function setHashKey(obj, h) {
    if (h) {
      obj.$$hashKey = h;
    } else {
      delete obj.$$hashKey;
    }
  }
  function extend(dst) {
    var h = dst.$$hashKey;
    forEach(arguments, function (obj) {
      if (obj !== dst) {
        forEach(obj, function (value, key) {
          dst[key] = value;
        });
      }
    });
    setHashKey(dst, h);
    return dst;
  }
  function int(str) {
    return parseInt(str, 10);
  }
  function inherit(parent, extra) {
    return extend(new (extend(function () {
    }, { prototype: parent }))(), extra);
  }
  var START_SPACE = /^\s*/;
  var END_SPACE = /\s*$/;
  function stripWhitespace(str) {
    return isString(str) ? str.replace(START_SPACE, '').replace(END_SPACE, '') : str;
  }
  function noop() {
  }
  noop.$inject = [];
  function identity($) {
    return $;
  }
  identity.$inject = [];
  function valueFn(value) {
    return function () {
      return value;
    };
  }
  function isUndefined(value) {
    return typeof value == 'undefined';
  }
  function isDefined(value) {
    return typeof value != 'undefined';
  }
  function isObject(value) {
    return value != null && typeof value == 'object';
  }
  function isString(value) {
    return typeof value == 'string';
  }
  function isNumber(value) {
    return typeof value == 'number';
  }
  function isDate(value) {
    return toString.apply(value) == '[object Date]';
  }
  function isArray(value) {
    return toString.apply(value) == '[object Array]';
  }
  function isFunction(value) {
    return typeof value == 'function';
  }
  function isWindow(obj) {
    return obj && obj.document && obj.location && obj.alert && obj.setInterval;
  }
  function isScope(obj) {
    return obj && obj.$evalAsync && obj.$watch;
  }
  function isFile(obj) {
    return toString.apply(obj) === '[object File]';
  }
  function isBoolean(value) {
    return typeof value == 'boolean';
  }
  function trim(value) {
    return isString(value) ? value.replace(/^\s*/, '').replace(/\s*$/, '') : value;
  }
  function isElement(node) {
    return node && (node.nodeName || node.bind && node.find);
  }
  function makeMap(str) {
    var obj = {}, items = str.split(','), i;
    for (i = 0; i < items.length; i++)
      obj[items[i]] = true;
    return obj;
  }
  if (msie < 9) {
    nodeName_ = function (element) {
      element = element.nodeName ? element : element[0];
      return element.scopeName && element.scopeName != 'HTML' ? uppercase(element.scopeName + ':' + element.nodeName) : element.nodeName;
    };
  } else {
    nodeName_ = function (element) {
      return element.nodeName ? element.nodeName : element[0].nodeName;
    };
  }
  function map(obj, iterator, context) {
    var results = [];
    forEach(obj, function (value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  }
  function size(obj, ownPropsOnly) {
    var size = 0, key;
    if (isArray(obj) || isString(obj)) {
      return obj.length;
    } else if (isObject(obj)) {
      for (key in obj)
        if (!ownPropsOnly || obj.hasOwnProperty(key))
          size++;
    }
    return size;
  }
  function includes(array, obj) {
    return indexOf(array, obj) != -1;
  }
  function indexOf(array, obj) {
    if (array.indexOf)
      return array.indexOf(obj);
    for (var i = 0; i < array.length; i++) {
      if (obj === array[i])
        return i;
    }
    return -1;
  }
  function arrayRemove(array, value) {
    var index = indexOf(array, value);
    if (index >= 0)
      array.splice(index, 1);
    return value;
  }
  function isLeafNode(node) {
    if (node) {
      switch (node.nodeName) {
      case 'OPTION':
      case 'PRE':
      case 'TITLE':
        return true;
      }
    }
    return false;
  }
  function copy(source, destination) {
    if (isWindow(source) || isScope(source))
      throw Error('Can\'t copy Window or Scope');
    if (!destination) {
      destination = source;
      if (source) {
        if (isArray(source)) {
          destination = copy(source, []);
        } else if (isDate(source)) {
          destination = new Date(source.getTime());
        } else if (isObject(source)) {
          destination = copy(source, {});
        }
      }
    } else {
      if (source === destination)
        throw Error('Can\'t copy equivalent objects or arrays');
      if (isArray(source)) {
        destination.length = 0;
        for (var i = 0; i < source.length; i++) {
          destination.push(copy(source[i]));
        }
      } else {
        var h = destination.$$hashKey;
        forEach(destination, function (value, key) {
          delete destination[key];
        });
        for (var key in source) {
          destination[key] = copy(source[key]);
        }
        setHashKey(destination, h);
      }
    }
    return destination;
  }
  function shallowCopy(src, dst) {
    dst = dst || {};
    for (var key in src) {
      if (src.hasOwnProperty(key) && key.substr(0, 2) !== '$$') {
        dst[key] = src[key];
      }
    }
    return dst;
  }
  function equals(o1, o2) {
    if (o1 === o2)
      return true;
    if (o1 === null || o2 === null)
      return false;
    if (o1 !== o1 && o2 !== o2)
      return true;
    var t1 = typeof o1, t2 = typeof o2, length, key, keySet;
    if (t1 == t2) {
      if (t1 == 'object') {
        if (isArray(o1)) {
          if ((length = o1.length) == o2.length) {
            for (key = 0; key < length; key++) {
              if (!equals(o1[key], o2[key]))
                return false;
            }
            return true;
          }
        } else if (isDate(o1)) {
          return isDate(o2) && o1.getTime() == o2.getTime();
        } else {
          if (isScope(o1) || isScope(o2) || isWindow(o1) || isWindow(o2))
            return false;
          keySet = {};
          for (key in o1) {
            if (key.charAt(0) === '$' || isFunction(o1[key]))
              continue;
            if (!equals(o1[key], o2[key]))
              return false;
            keySet[key] = true;
          }
          for (key in o2) {
            if (!keySet[key] && key.charAt(0) !== '$' && o2[key] !== undefined && !isFunction(o2[key]))
              return false;
          }
          return true;
        }
      }
    }
    return false;
  }
  function concat(array1, array2, index) {
    return array1.concat(slice.call(array2, index));
  }
  function sliceArgs(args, startIndex) {
    return slice.call(args, startIndex || 0);
  }
  function bind(self, fn) {
    var curryArgs = arguments.length > 2 ? sliceArgs(arguments, 2) : [];
    if (isFunction(fn) && !(fn instanceof RegExp)) {
      return curryArgs.length ? function () {
        return arguments.length ? fn.apply(self, curryArgs.concat(slice.call(arguments, 0))) : fn.apply(self, curryArgs);
      } : function () {
        return arguments.length ? fn.apply(self, arguments) : fn.call(self);
      };
    } else {
      return fn;
    }
  }
  function toJsonReplacer(key, value) {
    var val = value;
    if (/^\$+/.test(key)) {
      val = undefined;
    } else if (isWindow(value)) {
      val = '$WINDOW';
    } else if (value && document === value) {
      val = '$DOCUMENT';
    } else if (isScope(value)) {
      val = '$SCOPE';
    }
    return val;
  }
  function toJson(obj, pretty) {
    return JSON.stringify(obj, toJsonReplacer, pretty ? '  ' : null);
  }
  function fromJson(json) {
    return isString(json) ? JSON.parse(json) : json;
  }
  function toBoolean(value) {
    if (value && value.length !== 0) {
      var v = lowercase('' + value);
      value = !(v == 'f' || v == '0' || v == 'false' || v == 'no' || v == 'n' || v == '[]');
    } else {
      value = false;
    }
    return value;
  }
  function startingTag(element) {
    element = jqLite(element).clone();
    try {
      element.html('');
    } catch (e) {
    }
    var TEXT_NODE = 3;
    var elemHtml = jqLite('<div>').append(element).html();
    try {
      return element[0].nodeType === TEXT_NODE ? lowercase(elemHtml) : elemHtml.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function (match, nodeName) {
        return '<' + lowercase(nodeName);
      });
    } catch (e) {
      return lowercase(elemHtml);
    }
  }
  function parseKeyValue(keyValue) {
    var obj = {}, key_value, key;
    forEach((keyValue || '').split('&'), function (keyValue) {
      if (keyValue) {
        key_value = keyValue.split('=');
        key = decodeURIComponent(key_value[0]);
        obj[key] = isDefined(key_value[1]) ? decodeURIComponent(key_value[1]) : true;
      }
    });
    return obj;
  }
  function toKeyValue(obj) {
    var parts = [];
    forEach(obj, function (value, key) {
      parts.push(encodeUriQuery(key, true) + (value === true ? '' : '=' + encodeUriQuery(value, true)));
    });
    return parts.length ? parts.join('&') : '';
  }
  function encodeUriSegment(val) {
    return encodeUriQuery(val, true).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
  }
  function encodeUriQuery(val, pctEncodeSpaces) {
    return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, pctEncodeSpaces ? '%20' : '+');
  }
  function angularInit(element, bootstrap) {
    var elements = [element], appElement, module, names = [
        'ng:app',
        'ng-app',
        'x-ng-app',
        'data-ng-app'
      ], NG_APP_CLASS_REGEXP = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
    function append(element) {
      element && elements.push(element);
    }
    forEach(names, function (name) {
      names[name] = true;
      append(document.getElementById(name));
      name = name.replace(':', '\\:');
      if (element.querySelectorAll) {
        forEach(element.querySelectorAll('.' + name), append);
        forEach(element.querySelectorAll('.' + name + '\\:'), append);
        forEach(element.querySelectorAll('[' + name + ']'), append);
      }
    });
    forEach(elements, function (element) {
      if (!appElement) {
        var className = ' ' + element.className + ' ';
        var match = NG_APP_CLASS_REGEXP.exec(className);
        if (match) {
          appElement = element;
          module = (match[2] || '').replace(/\s+/g, ',');
        } else {
          forEach(element.attributes, function (attr) {
            if (!appElement && names[attr.name]) {
              appElement = element;
              module = attr.value;
            }
          });
        }
      }
    });
    if (appElement) {
      bootstrap(appElement, module ? [module] : []);
    }
  }
  function bootstrap(element, modules) {
    var resumeBootstrapInternal = function () {
      element = jqLite(element);
      modules = modules || [];
      modules.unshift([
        '$provide',
        function ($provide) {
          $provide.value('$rootElement', element);
        }
      ]);
      modules.unshift('ng');
      var injector = createInjector(modules);
      injector.invoke([
        '$rootScope',
        '$rootElement',
        '$compile',
        '$injector',
        '$animator',
        function (scope, element, compile, injector, animator) {
          scope.$apply(function () {
            element.data('$injector', injector);
            compile(element)(scope);
          });
          animator.enabled(true);
        }
      ]);
      return injector;
    };
    var NG_DEFER_BOOTSTRAP = /^NG_DEFER_BOOTSTRAP!/;
    if (window && !NG_DEFER_BOOTSTRAP.test(window.name)) {
      return resumeBootstrapInternal();
    }
    window.name = window.name.replace(NG_DEFER_BOOTSTRAP, '');
    angular.resumeBootstrap = function (extraModules) {
      forEach(extraModules, function (module) {
        modules.push(module);
      });
      resumeBootstrapInternal();
    };
  }
  var SNAKE_CASE_REGEXP = /[A-Z]/g;
  function snake_case(name, separator) {
    separator = separator || '_';
    return name.replace(SNAKE_CASE_REGEXP, function (letter, pos) {
      return (pos ? separator : '') + letter.toLowerCase();
    });
  }
  function bindJQuery() {
    jQuery = window.jQuery;
    if (jQuery) {
      jqLite = jQuery;
      extend(jQuery.fn, {
        scope: JQLitePrototype.scope,
        controller: JQLitePrototype.controller,
        injector: JQLitePrototype.injector,
        inheritedData: JQLitePrototype.inheritedData
      });
      JQLitePatchJQueryRemove('remove', true);
      JQLitePatchJQueryRemove('empty');
      JQLitePatchJQueryRemove('html');
    } else {
      jqLite = JQLite;
    }
    angular.element = jqLite;
  }
  function assertArg(arg, name, reason) {
    if (!arg) {
      throw new Error('Argument \'' + (name || '?') + '\' is ' + (reason || 'required'));
    }
    return arg;
  }
  function assertArgFn(arg, name, acceptArrayAnnotation) {
    if (acceptArrayAnnotation && isArray(arg)) {
      arg = arg[arg.length - 1];
    }
    assertArg(isFunction(arg), name, 'not a function, got ' + (arg && typeof arg == 'object' ? arg.constructor.name || 'Object' : typeof arg));
    return arg;
  }
  function setupModuleLoader(window) {
    function ensure(obj, name, factory) {
      return obj[name] || (obj[name] = factory());
    }
    return ensure(ensure(window, 'angular', Object), 'module', function () {
      var modules = {};
      return function module(name, requires, configFn) {
        if (requires && modules.hasOwnProperty(name)) {
          modules[name] = null;
        }
        return ensure(modules, name, function () {
          if (!requires) {
            throw Error('No module: ' + name);
          }
          var invokeQueue = [];
          var runBlocks = [];
          var config = invokeLater('$injector', 'invoke');
          var moduleInstance = {
              _invokeQueue: invokeQueue,
              _runBlocks: runBlocks,
              requires: requires,
              name: name,
              provider: invokeLater('$provide', 'provider'),
              factory: invokeLater('$provide', 'factory'),
              service: invokeLater('$provide', 'service'),
              value: invokeLater('$provide', 'value'),
              constant: invokeLater('$provide', 'constant', 'unshift'),
              animation: invokeLater('$animationProvider', 'register'),
              filter: invokeLater('$filterProvider', 'register'),
              controller: invokeLater('$controllerProvider', 'register'),
              directive: invokeLater('$compileProvider', 'directive'),
              config: config,
              run: function (block) {
                runBlocks.push(block);
                return this;
              }
            };
          if (configFn) {
            config(configFn);
          }
          return moduleInstance;
          function invokeLater(provider, method, insertMethod) {
            return function () {
              invokeQueue[insertMethod || 'push']([
                provider,
                method,
                arguments
              ]);
              return moduleInstance;
            };
          }
        });
      };
    });
  }
  var version = {
      full: '1.1.5',
      major: 1,
      minor: 1,
      dot: 5,
      codeName: 'triangle-squarification'
    };
  function publishExternalAPI(angular) {
    extend(angular, {
      'bootstrap': bootstrap,
      'copy': copy,
      'extend': extend,
      'equals': equals,
      'element': jqLite,
      'forEach': forEach,
      'injector': createInjector,
      'noop': noop,
      'bind': bind,
      'toJson': toJson,
      'fromJson': fromJson,
      'identity': identity,
      'isUndefined': isUndefined,
      'isDefined': isDefined,
      'isString': isString,
      'isFunction': isFunction,
      'isObject': isObject,
      'isNumber': isNumber,
      'isElement': isElement,
      'isArray': isArray,
      'version': version,
      'isDate': isDate,
      'lowercase': lowercase,
      'uppercase': uppercase,
      'callbacks': { counter: 0 },
      'noConflict': noConflict
    });
    angularModule = setupModuleLoader(window);
    try {
      angularModule('ngLocale');
    } catch (e) {
      angularModule('ngLocale', []).provider('$locale', $LocaleProvider);
    }
    angularModule('ng', ['ngLocale'], [
      '$provide',
      function ngModule($provide) {
        $provide.provider('$compile', $CompileProvider).directive({
          a: htmlAnchorDirective,
          input: inputDirective,
          textarea: inputDirective,
          form: formDirective,
          script: scriptDirective,
          select: selectDirective,
          style: styleDirective,
          option: optionDirective,
          ngBind: ngBindDirective,
          ngBindHtmlUnsafe: ngBindHtmlUnsafeDirective,
          ngBindTemplate: ngBindTemplateDirective,
          ngClass: ngClassDirective,
          ngClassEven: ngClassEvenDirective,
          ngClassOdd: ngClassOddDirective,
          ngCsp: ngCspDirective,
          ngCloak: ngCloakDirective,
          ngController: ngControllerDirective,
          ngForm: ngFormDirective,
          ngHide: ngHideDirective,
          ngIf: ngIfDirective,
          ngInclude: ngIncludeDirective,
          ngInit: ngInitDirective,
          ngNonBindable: ngNonBindableDirective,
          ngPluralize: ngPluralizeDirective,
          ngRepeat: ngRepeatDirective,
          ngShow: ngShowDirective,
          ngSubmit: ngSubmitDirective,
          ngStyle: ngStyleDirective,
          ngSwitch: ngSwitchDirective,
          ngSwitchWhen: ngSwitchWhenDirective,
          ngSwitchDefault: ngSwitchDefaultDirective,
          ngOptions: ngOptionsDirective,
          ngView: ngViewDirective,
          ngTransclude: ngTranscludeDirective,
          ngModel: ngModelDirective,
          ngList: ngListDirective,
          ngChange: ngChangeDirective,
          required: requiredDirective,
          ngRequired: requiredDirective,
          ngValue: ngValueDirective
        }).directive(ngAttributeAliasDirectives).directive(ngEventDirectives);
        $provide.provider({
          $anchorScroll: $AnchorScrollProvider,
          $animation: $AnimationProvider,
          $animator: $AnimatorProvider,
          $browser: $BrowserProvider,
          $cacheFactory: $CacheFactoryProvider,
          $controller: $ControllerProvider,
          $document: $DocumentProvider,
          $exceptionHandler: $ExceptionHandlerProvider,
          $filter: $FilterProvider,
          $interpolate: $InterpolateProvider,
          $http: $HttpProvider,
          $httpBackend: $HttpBackendProvider,
          $location: $LocationProvider,
          $log: $LogProvider,
          $parse: $ParseProvider,
          $route: $RouteProvider,
          $routeParams: $RouteParamsProvider,
          $rootScope: $RootScopeProvider,
          $q: $QProvider,
          $sniffer: $SnifferProvider,
          $templateCache: $TemplateCacheProvider,
          $timeout: $TimeoutProvider,
          $window: $WindowProvider
        });
      }
    ]);
  }
  var jqCache = JQLite.cache = {}, jqName = JQLite.expando = 'ng-' + new Date().getTime(), jqId = 1, addEventListenerFn = window.document.addEventListener ? function (element, type, fn) {
      element.addEventListener(type, fn, false);
    } : function (element, type, fn) {
      element.attachEvent('on' + type, fn);
    }, removeEventListenerFn = window.document.removeEventListener ? function (element, type, fn) {
      element.removeEventListener(type, fn, false);
    } : function (element, type, fn) {
      element.detachEvent('on' + type, fn);
    };
  function jqNextId() {
    return ++jqId;
  }
  var SPECIAL_CHARS_REGEXP = /([\:\-\_]+(.))/g;
  var MOZ_HACK_REGEXP = /^moz([A-Z])/;
  function camelCase(name) {
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
      return offset ? letter.toUpperCase() : letter;
    }).replace(MOZ_HACK_REGEXP, 'Moz$1');
  }
  function JQLitePatchJQueryRemove(name, dispatchThis) {
    var originalJqFn = jQuery.fn[name];
    originalJqFn = originalJqFn.$original || originalJqFn;
    removePatch.$original = originalJqFn;
    jQuery.fn[name] = removePatch;
    function removePatch() {
      var list = [this], fireEvent = dispatchThis, set, setIndex, setLength, element, childIndex, childLength, children, fns, events;
      while (list.length) {
        set = list.shift();
        for (setIndex = 0, setLength = set.length; setIndex < setLength; setIndex++) {
          element = jqLite(set[setIndex]);
          if (fireEvent) {
            element.triggerHandler('$destroy');
          } else {
            fireEvent = !fireEvent;
          }
          for (childIndex = 0, childLength = (children = element.children()).length; childIndex < childLength; childIndex++) {
            list.push(jQuery(children[childIndex]));
          }
        }
      }
      return originalJqFn.apply(this, arguments);
    }
  }
  function JQLite(element) {
    if (element instanceof JQLite) {
      return element;
    }
    if (!(this instanceof JQLite)) {
      if (isString(element) && element.charAt(0) != '<') {
        throw Error('selectors not implemented');
      }
      return new JQLite(element);
    }
    if (isString(element)) {
      var div = document.createElement('div');
      div.innerHTML = '<div>&#160;</div>' + element;
      div.removeChild(div.firstChild);
      JQLiteAddNodes(this, div.childNodes);
      this.remove();
    } else {
      JQLiteAddNodes(this, element);
    }
  }
  function JQLiteClone(element) {
    return element.cloneNode(true);
  }
  function JQLiteDealoc(element) {
    JQLiteRemoveData(element);
    for (var i = 0, children = element.childNodes || []; i < children.length; i++) {
      JQLiteDealoc(children[i]);
    }
  }
  function JQLiteUnbind(element, type, fn) {
    var events = JQLiteExpandoStore(element, 'events'), handle = JQLiteExpandoStore(element, 'handle');
    if (!handle)
      return;
    if (isUndefined(type)) {
      forEach(events, function (eventHandler, type) {
        removeEventListenerFn(element, type, eventHandler);
        delete events[type];
      });
    } else {
      if (isUndefined(fn)) {
        removeEventListenerFn(element, type, events[type]);
        delete events[type];
      } else {
        arrayRemove(events[type], fn);
      }
    }
  }
  function JQLiteRemoveData(element) {
    var expandoId = element[jqName], expandoStore = jqCache[expandoId];
    if (expandoStore) {
      if (expandoStore.handle) {
        expandoStore.events.$destroy && expandoStore.handle({}, '$destroy');
        JQLiteUnbind(element);
      }
      delete jqCache[expandoId];
      element[jqName] = undefined;
    }
  }
  function JQLiteExpandoStore(element, key, value) {
    var expandoId = element[jqName], expandoStore = jqCache[expandoId || -1];
    if (isDefined(value)) {
      if (!expandoStore) {
        element[jqName] = expandoId = jqNextId();
        expandoStore = jqCache[expandoId] = {};
      }
      expandoStore[key] = value;
    } else {
      return expandoStore && expandoStore[key];
    }
  }
  function JQLiteData(element, key, value) {
    var data = JQLiteExpandoStore(element, 'data'), isSetter = isDefined(value), keyDefined = !isSetter && isDefined(key), isSimpleGetter = keyDefined && !isObject(key);
    if (!data && !isSimpleGetter) {
      JQLiteExpandoStore(element, 'data', data = {});
    }
    if (isSetter) {
      data[key] = value;
    } else {
      if (keyDefined) {
        if (isSimpleGetter) {
          return data && data[key];
        } else {
          extend(data, key);
        }
      } else {
        return data;
      }
    }
  }
  function JQLiteHasClass(element, selector) {
    return (' ' + element.className + ' ').replace(/[\n\t]/g, ' ').indexOf(' ' + selector + ' ') > -1;
  }
  function JQLiteRemoveClass(element, cssClasses) {
    if (cssClasses) {
      forEach(cssClasses.split(' '), function (cssClass) {
        element.className = trim((' ' + element.className + ' ').replace(/[\n\t]/g, ' ').replace(' ' + trim(cssClass) + ' ', ' '));
      });
    }
  }
  function JQLiteAddClass(element, cssClasses) {
    if (cssClasses) {
      forEach(cssClasses.split(' '), function (cssClass) {
        if (!JQLiteHasClass(element, cssClass)) {
          element.className = trim(element.className + ' ' + trim(cssClass));
        }
      });
    }
  }
  function JQLiteAddNodes(root, elements) {
    if (elements) {
      elements = !elements.nodeName && isDefined(elements.length) && !isWindow(elements) ? elements : [elements];
      for (var i = 0; i < elements.length; i++) {
        root.push(elements[i]);
      }
    }
  }
  function JQLiteController(element, name) {
    return JQLiteInheritedData(element, '$' + (name || 'ngController') + 'Controller');
  }
  function JQLiteInheritedData(element, name, value) {
    element = jqLite(element);
    if (element[0].nodeType == 9) {
      element = element.find('html');
    }
    while (element.length) {
      if (value = element.data(name))
        return value;
      element = element.parent();
    }
  }
  var JQLitePrototype = JQLite.prototype = {
      ready: function (fn) {
        var fired = false;
        function trigger() {
          if (fired)
            return;
          fired = true;
          fn();
        }
        if (document.readyState === 'complete') {
          setTimeout(trigger);
        } else {
          this.bind('DOMContentLoaded', trigger);
          JQLite(window).bind('load', trigger);
        }
      },
      toString: function () {
        var value = [];
        forEach(this, function (e) {
          value.push('' + e);
        });
        return '[' + value.join(', ') + ']';
      },
      eq: function (index) {
        return index >= 0 ? jqLite(this[index]) : jqLite(this[this.length + index]);
      },
      length: 0,
      push: push,
      sort: [].sort,
      splice: [].splice
    };
  var BOOLEAN_ATTR = {};
  forEach('multiple,selected,checked,disabled,readOnly,required,open'.split(','), function (value) {
    BOOLEAN_ATTR[lowercase(value)] = value;
  });
  var BOOLEAN_ELEMENTS = {};
  forEach('input,select,option,textarea,button,form,details'.split(','), function (value) {
    BOOLEAN_ELEMENTS[uppercase(value)] = true;
  });
  function getBooleanAttrName(element, name) {
    var booleanAttr = BOOLEAN_ATTR[name.toLowerCase()];
    return booleanAttr && BOOLEAN_ELEMENTS[element.nodeName] && booleanAttr;
  }
  forEach({
    data: JQLiteData,
    inheritedData: JQLiteInheritedData,
    scope: function (element) {
      return JQLiteInheritedData(element, '$scope');
    },
    controller: JQLiteController,
    injector: function (element) {
      return JQLiteInheritedData(element, '$injector');
    },
    removeAttr: function (element, name) {
      element.removeAttribute(name);
    },
    hasClass: JQLiteHasClass,
    css: function (element, name, value) {
      name = camelCase(name);
      if (isDefined(value)) {
        element.style[name] = value;
      } else {
        var val;
        if (msie <= 8) {
          val = element.currentStyle && element.currentStyle[name];
          if (val === '')
            val = 'auto';
        }
        val = val || element.style[name];
        if (msie <= 8) {
          val = val === '' ? undefined : val;
        }
        return val;
      }
    },
    attr: function (element, name, value) {
      var lowercasedName = lowercase(name);
      if (BOOLEAN_ATTR[lowercasedName]) {
        if (isDefined(value)) {
          if (!!value) {
            element[name] = true;
            element.setAttribute(name, lowercasedName);
          } else {
            element[name] = false;
            element.removeAttribute(lowercasedName);
          }
        } else {
          return element[name] || (element.attributes.getNamedItem(name) || noop).specified ? lowercasedName : undefined;
        }
      } else if (isDefined(value)) {
        element.setAttribute(name, value);
      } else if (element.getAttribute) {
        var ret = element.getAttribute(name, 2);
        return ret === null ? undefined : ret;
      }
    },
    prop: function (element, name, value) {
      if (isDefined(value)) {
        element[name] = value;
      } else {
        return element[name];
      }
    },
    text: extend(msie < 9 ? function (element, value) {
      if (element.nodeType == 1) {
        if (isUndefined(value))
          return element.innerText;
        element.innerText = value;
      } else {
        if (isUndefined(value))
          return element.nodeValue;
        element.nodeValue = value;
      }
    } : function (element, value) {
      if (isUndefined(value)) {
        return element.textContent;
      }
      element.textContent = value;
    }, { $dv: '' }),
    val: function (element, value) {
      if (isUndefined(value)) {
        return element.value;
      }
      element.value = value;
    },
    html: function (element, value) {
      if (isUndefined(value)) {
        return element.innerHTML;
      }
      for (var i = 0, childNodes = element.childNodes; i < childNodes.length; i++) {
        JQLiteDealoc(childNodes[i]);
      }
      element.innerHTML = value;
    }
  }, function (fn, name) {
    JQLite.prototype[name] = function (arg1, arg2) {
      var i, key;
      if ((fn.length == 2 && (fn !== JQLiteHasClass && fn !== JQLiteController) ? arg1 : arg2) === undefined) {
        if (isObject(arg1)) {
          for (i = 0; i < this.length; i++) {
            if (fn === JQLiteData) {
              fn(this[i], arg1);
            } else {
              for (key in arg1) {
                fn(this[i], key, arg1[key]);
              }
            }
          }
          return this;
        } else {
          if (this.length)
            return fn(this[0], arg1, arg2);
        }
      } else {
        for (i = 0; i < this.length; i++) {
          fn(this[i], arg1, arg2);
        }
        return this;
      }
      return fn.$dv;
    };
  });
  function createEventHandler(element, events) {
    var eventHandler = function (event, type) {
      if (!event.preventDefault) {
        event.preventDefault = function () {
          event.returnValue = false;
        };
      }
      if (!event.stopPropagation) {
        event.stopPropagation = function () {
          event.cancelBubble = true;
        };
      }
      if (!event.target) {
        event.target = event.srcElement || document;
      }
      if (isUndefined(event.defaultPrevented)) {
        var prevent = event.preventDefault;
        event.preventDefault = function () {
          event.defaultPrevented = true;
          prevent.call(event);
        };
        event.defaultPrevented = false;
      }
      event.isDefaultPrevented = function () {
        return event.defaultPrevented || event.returnValue == false;
      };
      forEach(events[type || event.type], function (fn) {
        fn.call(element, event);
      });
      if (msie <= 8) {
        event.preventDefault = null;
        event.stopPropagation = null;
        event.isDefaultPrevented = null;
      } else {
        delete event.preventDefault;
        delete event.stopPropagation;
        delete event.isDefaultPrevented;
      }
    };
    eventHandler.elem = element;
    return eventHandler;
  }
  forEach({
    removeData: JQLiteRemoveData,
    dealoc: JQLiteDealoc,
    bind: function bindFn(element, type, fn) {
      var events = JQLiteExpandoStore(element, 'events'), handle = JQLiteExpandoStore(element, 'handle');
      if (!events)
        JQLiteExpandoStore(element, 'events', events = {});
      if (!handle)
        JQLiteExpandoStore(element, 'handle', handle = createEventHandler(element, events));
      forEach(type.split(' '), function (type) {
        var eventFns = events[type];
        if (!eventFns) {
          if (type == 'mouseenter' || type == 'mouseleave') {
            var contains = document.body.contains || document.body.compareDocumentPosition ? function (a, b) {
                var adown = a.nodeType === 9 ? a.documentElement : a, bup = b && b.parentNode;
                return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
              } : function (a, b) {
                if (b) {
                  while (b = b.parentNode) {
                    if (b === a) {
                      return true;
                    }
                  }
                }
                return false;
              };
            events[type] = [];
            var eventmap = {
                mouseleave: 'mouseout',
                mouseenter: 'mouseover'
              };
            bindFn(element, eventmap[type], function (event) {
              var ret, target = this, related = event.relatedTarget;
              if (!related || related !== target && !contains(target, related)) {
                handle(event, type);
              }
            });
          } else {
            addEventListenerFn(element, type, handle);
            events[type] = [];
          }
          eventFns = events[type];
        }
        eventFns.push(fn);
      });
    },
    unbind: JQLiteUnbind,
    replaceWith: function (element, replaceNode) {
      var index, parent = element.parentNode;
      JQLiteDealoc(element);
      forEach(new JQLite(replaceNode), function (node) {
        if (index) {
          parent.insertBefore(node, index.nextSibling);
        } else {
          parent.replaceChild(node, element);
        }
        index = node;
      });
    },
    children: function (element) {
      var children = [];
      forEach(element.childNodes, function (element) {
        if (element.nodeType === 1)
          children.push(element);
      });
      return children;
    },
    contents: function (element) {
      return element.childNodes || [];
    },
    append: function (element, node) {
      forEach(new JQLite(node), function (child) {
        if (element.nodeType === 1 || element.nodeType === 11) {
          element.appendChild(child);
        }
      });
    },
    prepend: function (element, node) {
      if (element.nodeType === 1) {
        var index = element.firstChild;
        forEach(new JQLite(node), function (child) {
          if (index) {
            element.insertBefore(child, index);
          } else {
            element.appendChild(child);
            index = child;
          }
        });
      }
    },
    wrap: function (element, wrapNode) {
      wrapNode = jqLite(wrapNode)[0];
      var parent = element.parentNode;
      if (parent) {
        parent.replaceChild(wrapNode, element);
      }
      wrapNode.appendChild(element);
    },
    remove: function (element) {
      JQLiteDealoc(element);
      var parent = element.parentNode;
      if (parent)
        parent.removeChild(element);
    },
    after: function (element, newElement) {
      var index = element, parent = element.parentNode;
      forEach(new JQLite(newElement), function (node) {
        parent.insertBefore(node, index.nextSibling);
        index = node;
      });
    },
    addClass: JQLiteAddClass,
    removeClass: JQLiteRemoveClass,
    toggleClass: function (element, selector, condition) {
      if (isUndefined(condition)) {
        condition = !JQLiteHasClass(element, selector);
      }
      (condition ? JQLiteAddClass : JQLiteRemoveClass)(element, selector);
    },
    parent: function (element) {
      var parent = element.parentNode;
      return parent && parent.nodeType !== 11 ? parent : null;
    },
    next: function (element) {
      if (element.nextElementSibling) {
        return element.nextElementSibling;
      }
      var elm = element.nextSibling;
      while (elm != null && elm.nodeType !== 1) {
        elm = elm.nextSibling;
      }
      return elm;
    },
    find: function (element, selector) {
      return element.getElementsByTagName(selector);
    },
    clone: JQLiteClone,
    triggerHandler: function (element, eventName) {
      var eventFns = (JQLiteExpandoStore(element, 'events') || {})[eventName];
      var event;
      forEach(eventFns, function (fn) {
        fn.call(element, { preventDefault: noop });
      });
    }
  }, function (fn, name) {
    JQLite.prototype[name] = function (arg1, arg2) {
      var value;
      for (var i = 0; i < this.length; i++) {
        if (value == undefined) {
          value = fn(this[i], arg1, arg2);
          if (value !== undefined) {
            value = jqLite(value);
          }
        } else {
          JQLiteAddNodes(value, fn(this[i], arg1, arg2));
        }
      }
      return value == undefined ? this : value;
    };
  });
  function hashKey(obj) {
    var objType = typeof obj, key;
    if (objType == 'object' && obj !== null) {
      if (typeof (key = obj.$$hashKey) == 'function') {
        key = obj.$$hashKey();
      } else if (key === undefined) {
        key = obj.$$hashKey = nextUid();
      }
    } else {
      key = obj;
    }
    return objType + ':' + key;
  }
  function HashMap(array) {
    forEach(array, this.put, this);
  }
  HashMap.prototype = {
    put: function (key, value) {
      this[hashKey(key)] = value;
    },
    get: function (key) {
      return this[hashKey(key)];
    },
    remove: function (key) {
      var value = this[key = hashKey(key)];
      delete this[key];
      return value;
    }
  };
  var FN_ARGS = /^function\s*[^\(]*\(\s*([^\)]*)\)/m;
  var FN_ARG_SPLIT = /,/;
  var FN_ARG = /^\s*(_?)(\S+?)\1\s*$/;
  var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
  function annotate(fn) {
    var $inject, fnText, argDecl, last;
    if (typeof fn == 'function') {
      if (!($inject = fn.$inject)) {
        $inject = [];
        fnText = fn.toString().replace(STRIP_COMMENTS, '');
        argDecl = fnText.match(FN_ARGS);
        forEach(argDecl[1].split(FN_ARG_SPLIT), function (arg) {
          arg.replace(FN_ARG, function (all, underscore, name) {
            $inject.push(name);
          });
        });
        fn.$inject = $inject;
      }
    } else if (isArray(fn)) {
      last = fn.length - 1;
      assertArgFn(fn[last], 'fn');
      $inject = fn.slice(0, last);
    } else {
      assertArgFn(fn, 'fn', true);
    }
    return $inject;
  }
  function createInjector(modulesToLoad) {
    var INSTANTIATING = {}, providerSuffix = 'Provider', path = [], loadedModules = new HashMap(), providerCache = {
        $provide: {
          provider: supportObject(provider),
          factory: supportObject(factory),
          service: supportObject(service),
          value: supportObject(value),
          constant: supportObject(constant),
          decorator: decorator
        }
      }, providerInjector = providerCache.$injector = createInternalInjector(providerCache, function () {
        throw Error('Unknown provider: ' + path.join(' <- '));
      }), instanceCache = {}, instanceInjector = instanceCache.$injector = createInternalInjector(instanceCache, function (servicename) {
        var provider = providerInjector.get(servicename + providerSuffix);
        return instanceInjector.invoke(provider.$get, provider);
      });
    forEach(loadModules(modulesToLoad), function (fn) {
      instanceInjector.invoke(fn || noop);
    });
    return instanceInjector;
    function supportObject(delegate) {
      return function (key, value) {
        if (isObject(key)) {
          forEach(key, reverseParams(delegate));
        } else {
          return delegate(key, value);
        }
      };
    }
    function provider(name, provider_) {
      if (isFunction(provider_) || isArray(provider_)) {
        provider_ = providerInjector.instantiate(provider_);
      }
      if (!provider_.$get) {
        throw Error('Provider ' + name + ' must define $get factory method.');
      }
      return providerCache[name + providerSuffix] = provider_;
    }
    function factory(name, factoryFn) {
      return provider(name, { $get: factoryFn });
    }
    function service(name, constructor) {
      return factory(name, [
        '$injector',
        function ($injector) {
          return $injector.instantiate(constructor);
        }
      ]);
    }
    function value(name, value) {
      return factory(name, valueFn(value));
    }
    function constant(name, value) {
      providerCache[name] = value;
      instanceCache[name] = value;
    }
    function decorator(serviceName, decorFn) {
      var origProvider = providerInjector.get(serviceName + providerSuffix), orig$get = origProvider.$get;
      origProvider.$get = function () {
        var origInstance = instanceInjector.invoke(orig$get, origProvider);
        return instanceInjector.invoke(decorFn, null, { $delegate: origInstance });
      };
    }
    function loadModules(modulesToLoad) {
      var runBlocks = [];
      forEach(modulesToLoad, function (module) {
        if (loadedModules.get(module))
          return;
        loadedModules.put(module, true);
        if (isString(module)) {
          var moduleFn = angularModule(module);
          runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks);
          try {
            for (var invokeQueue = moduleFn._invokeQueue, i = 0, ii = invokeQueue.length; i < ii; i++) {
              var invokeArgs = invokeQueue[i], provider = providerInjector.get(invokeArgs[0]);
              provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
            }
          } catch (e) {
            if (e.message)
              e.message += ' from ' + module;
            throw e;
          }
        } else if (isFunction(module)) {
          try {
            runBlocks.push(providerInjector.invoke(module));
          } catch (e) {
            if (e.message)
              e.message += ' from ' + module;
            throw e;
          }
        } else if (isArray(module)) {
          try {
            runBlocks.push(providerInjector.invoke(module));
          } catch (e) {
            if (e.message)
              e.message += ' from ' + String(module[module.length - 1]);
            throw e;
          }
        } else {
          assertArgFn(module, 'module');
        }
      });
      return runBlocks;
    }
    function createInternalInjector(cache, factory) {
      function getService(serviceName) {
        if (typeof serviceName !== 'string') {
          throw Error('Service name expected');
        }
        if (cache.hasOwnProperty(serviceName)) {
          if (cache[serviceName] === INSTANTIATING) {
            throw Error('Circular dependency: ' + path.join(' <- '));
          }
          return cache[serviceName];
        } else {
          try {
            path.unshift(serviceName);
            cache[serviceName] = INSTANTIATING;
            return cache[serviceName] = factory(serviceName);
          } finally {
            path.shift();
          }
        }
      }
      function invoke(fn, self, locals) {
        var args = [], $inject = annotate(fn), length, i, key;
        for (i = 0, length = $inject.length; i < length; i++) {
          key = $inject[i];
          args.push(locals && locals.hasOwnProperty(key) ? locals[key] : getService(key));
        }
        if (!fn.$inject) {
          fn = fn[length];
        }
        switch (self ? -1 : args.length) {
        case 0:
          return fn();
        case 1:
          return fn(args[0]);
        case 2:
          return fn(args[0], args[1]);
        case 3:
          return fn(args[0], args[1], args[2]);
        case 4:
          return fn(args[0], args[1], args[2], args[3]);
        case 5:
          return fn(args[0], args[1], args[2], args[3], args[4]);
        case 6:
          return fn(args[0], args[1], args[2], args[3], args[4], args[5]);
        case 7:
          return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
        case 8:
          return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7]);
        case 9:
          return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8]);
        case 10:
          return fn(args[0], args[1], args[2], args[3], args[4], args[5], args[6], args[7], args[8], args[9]);
        default:
          return fn.apply(self, args);
        }
      }
      function instantiate(Type, locals) {
        var Constructor = function () {
          }, instance, returnedValue;
        Constructor.prototype = (isArray(Type) ? Type[Type.length - 1] : Type).prototype;
        instance = new Constructor();
        returnedValue = invoke(Type, instance, locals);
        return isObject(returnedValue) ? returnedValue : instance;
      }
      return {
        invoke: invoke,
        instantiate: instantiate,
        get: getService,
        annotate: annotate,
        has: function (name) {
          return providerCache.hasOwnProperty(name + providerSuffix) || cache.hasOwnProperty(name);
        }
      };
    }
  }
  function $AnchorScrollProvider() {
    var autoScrollingEnabled = true;
    this.disableAutoScrolling = function () {
      autoScrollingEnabled = false;
    };
    this.$get = [
      '$window',
      '$location',
      '$rootScope',
      function ($window, $location, $rootScope) {
        var document = $window.document;
        function getFirstAnchor(list) {
          var result = null;
          forEach(list, function (element) {
            if (!result && lowercase(element.nodeName) === 'a')
              result = element;
          });
          return result;
        }
        function scroll() {
          var hash = $location.hash(), elm;
          if (!hash)
            $window.scrollTo(0, 0);
          else if (elm = document.getElementById(hash))
            elm.scrollIntoView();
          else if (elm = getFirstAnchor(document.getElementsByName(hash)))
            elm.scrollIntoView();
          else if (hash === 'top')
            $window.scrollTo(0, 0);
        }
        if (autoScrollingEnabled) {
          $rootScope.$watch(function autoScrollWatch() {
            return $location.hash();
          }, function autoScrollWatchAction() {
            $rootScope.$evalAsync(scroll);
          });
        }
        return scroll;
      }
    ];
  }
  $AnimationProvider.$inject = ['$provide'];
  function $AnimationProvider($provide) {
    var suffix = 'Animation';
    this.register = function (name, factory) {
      $provide.factory(camelCase(name) + suffix, factory);
    };
    this.$get = [
      '$injector',
      function ($injector) {
        return function $animation(name) {
          if (name) {
            var animationName = camelCase(name) + suffix;
            if ($injector.has(animationName)) {
              return $injector.get(animationName);
            }
          }
        };
      }
    ];
  }
  var $AnimatorProvider = function () {
    var NG_ANIMATE_CONTROLLER = '$ngAnimateController';
    var rootAnimateController = { running: true };
    this.$get = [
      '$animation',
      '$window',
      '$sniffer',
      '$rootElement',
      '$rootScope',
      function ($animation, $window, $sniffer, $rootElement, $rootScope) {
        $rootElement.data(NG_ANIMATE_CONTROLLER, rootAnimateController);
        var AnimatorService = function (scope, attrs) {
          var animator = {};
          animator.enter = animateActionFactory('enter', insert, noop);
          animator.leave = animateActionFactory('leave', noop, remove);
          animator.move = animateActionFactory('move', move, noop);
          animator.show = animateActionFactory('show', show, noop);
          animator.hide = animateActionFactory('hide', noop, hide);
          animator.animate = function (event, element) {
            animateActionFactory(event, noop, noop)(element);
          };
          return animator;
          function animateActionFactory(type, beforeFn, afterFn) {
            return function (element, parent, after) {
              var ngAnimateValue = scope.$eval(attrs.ngAnimate);
              var className = ngAnimateValue ? isObject(ngAnimateValue) ? ngAnimateValue[type] : ngAnimateValue + '-' + type : '';
              var animationPolyfill = $animation(className);
              var polyfillSetup = animationPolyfill && animationPolyfill.setup;
              var polyfillStart = animationPolyfill && animationPolyfill.start;
              var polyfillCancel = animationPolyfill && animationPolyfill.cancel;
              if (!className) {
                beforeFn(element, parent, after);
                afterFn(element, parent, after);
              } else {
                var activeClassName = className + '-active';
                if (!parent) {
                  parent = after ? after.parent() : element.parent();
                }
                if (!$sniffer.transitions && !polyfillSetup && !polyfillStart || (parent.inheritedData(NG_ANIMATE_CONTROLLER) || noop).running) {
                  beforeFn(element, parent, after);
                  afterFn(element, parent, after);
                  return;
                }
                var animationData = element.data(NG_ANIMATE_CONTROLLER) || {};
                if (animationData.running) {
                  (polyfillCancel || noop)(element);
                  animationData.done();
                }
                element.data(NG_ANIMATE_CONTROLLER, {
                  running: true,
                  done: done
                });
                element.addClass(className);
                beforeFn(element, parent, after);
                if (element.length == 0)
                  return done();
                var memento = (polyfillSetup || noop)(element);
                $window.setTimeout(beginAnimation, 1);
              }
              function parseMaxTime(str) {
                var total = 0, values = isString(str) ? str.split(/\s*,\s*/) : [];
                forEach(values, function (value) {
                  total = Math.max(parseFloat(value) || 0, total);
                });
                return total;
              }
              function beginAnimation() {
                element.addClass(activeClassName);
                if (polyfillStart) {
                  polyfillStart(element, done, memento);
                } else if (isFunction($window.getComputedStyle)) {
                  var w3cAnimationProp = 'animation';
                  var w3cTransitionProp = 'transition';
                  var vendorAnimationProp = $sniffer.vendorPrefix + 'Animation';
                  var vendorTransitionProp = $sniffer.vendorPrefix + 'Transition';
                  var durationKey = 'Duration', delayKey = 'Delay', animationIterationCountKey = 'IterationCount', duration = 0;
                  var ELEMENT_NODE = 1;
                  forEach(element, function (element) {
                    if (element.nodeType == ELEMENT_NODE) {
                      var w3cProp = w3cTransitionProp, vendorProp = vendorTransitionProp, iterations = 1, elementStyles = $window.getComputedStyle(element) || {};
                      if (parseFloat(elementStyles[w3cAnimationProp + durationKey]) > 0 || parseFloat(elementStyles[vendorAnimationProp + durationKey]) > 0) {
                        w3cProp = w3cAnimationProp;
                        vendorProp = vendorAnimationProp;
                        iterations = Math.max(parseInt(elementStyles[w3cProp + animationIterationCountKey]) || 0, parseInt(elementStyles[vendorProp + animationIterationCountKey]) || 0, iterations);
                      }
                      var parsedDelay = Math.max(parseMaxTime(elementStyles[w3cProp + delayKey]), parseMaxTime(elementStyles[vendorProp + delayKey]));
                      var parsedDuration = Math.max(parseMaxTime(elementStyles[w3cProp + durationKey]), parseMaxTime(elementStyles[vendorProp + durationKey]));
                      duration = Math.max(parsedDelay + iterations * parsedDuration, duration);
                    }
                  });
                  $window.setTimeout(done, duration * 1000);
                } else {
                  done();
                }
              }
              function done() {
                if (!done.run) {
                  done.run = true;
                  afterFn(element, parent, after);
                  element.removeClass(className);
                  element.removeClass(activeClassName);
                  element.removeData(NG_ANIMATE_CONTROLLER);
                }
              }
            };
          }
          function show(element) {
            element.css('display', '');
          }
          function hide(element) {
            element.css('display', 'none');
          }
          function insert(element, parent, after) {
            if (after) {
              after.after(element);
            } else {
              parent.append(element);
            }
          }
          function remove(element) {
            element.remove();
          }
          function move(element, parent, after) {
            insert(element, parent, after);
          }
        };
        AnimatorService.enabled = function (value) {
          if (arguments.length) {
            rootAnimateController.running = !value;
          }
          return !rootAnimateController.running;
        };
        return AnimatorService;
      }
    ];
  };
  function Browser(window, document, $log, $sniffer) {
    var self = this, rawDocument = document[0], location = window.location, history = window.history, setTimeout = window.setTimeout, clearTimeout = window.clearTimeout, pendingDeferIds = {};
    self.isMock = false;
    var outstandingRequestCount = 0;
    var outstandingRequestCallbacks = [];
    self.$$completeOutstandingRequest = completeOutstandingRequest;
    self.$$incOutstandingRequestCount = function () {
      outstandingRequestCount++;
    };
    function completeOutstandingRequest(fn) {
      try {
        fn.apply(null, sliceArgs(arguments, 1));
      } finally {
        outstandingRequestCount--;
        if (outstandingRequestCount === 0) {
          while (outstandingRequestCallbacks.length) {
            try {
              outstandingRequestCallbacks.pop()();
            } catch (e) {
              $log.error(e);
            }
          }
        }
      }
    }
    self.notifyWhenNoOutstandingRequests = function (callback) {
      forEach(pollFns, function (pollFn) {
        pollFn();
      });
      if (outstandingRequestCount === 0) {
        callback();
      } else {
        outstandingRequestCallbacks.push(callback);
      }
    };
    var pollFns = [], pollTimeout;
    self.addPollFn = function (fn) {
      if (isUndefined(pollTimeout))
        startPoller(100, setTimeout);
      pollFns.push(fn);
      return fn;
    };
    function startPoller(interval, setTimeout) {
      (function check() {
        forEach(pollFns, function (pollFn) {
          pollFn();
        });
        pollTimeout = setTimeout(check, interval);
      }());
    }
    var lastBrowserUrl = location.href, baseElement = document.find('base');
    self.url = function (url, replace) {
      if (url) {
        if (lastBrowserUrl == url)
          return;
        lastBrowserUrl = url;
        if ($sniffer.history) {
          if (replace)
            history.replaceState(null, '', url);
          else {
            history.pushState(null, '', url);
            baseElement.attr('href', baseElement.attr('href'));
          }
        } else {
          if (replace)
            location.replace(url);
          else
            location.href = url;
        }
        return self;
      } else {
        return location.href.replace(/%27/g, '\'');
      }
    };
    var urlChangeListeners = [], urlChangeInit = false;
    function fireUrlChange() {
      if (lastBrowserUrl == self.url())
        return;
      lastBrowserUrl = self.url();
      forEach(urlChangeListeners, function (listener) {
        listener(self.url());
      });
    }
    self.onUrlChange = function (callback) {
      if (!urlChangeInit) {
        if ($sniffer.history)
          jqLite(window).bind('popstate', fireUrlChange);
        if ($sniffer.hashchange)
          jqLite(window).bind('hashchange', fireUrlChange);
        else
          self.addPollFn(fireUrlChange);
        urlChangeInit = true;
      }
      urlChangeListeners.push(callback);
      return callback;
    };
    self.baseHref = function () {
      var href = baseElement.attr('href');
      return href ? href.replace(/^https?\:\/\/[^\/]*/, '') : '';
    };
    var lastCookies = {};
    var lastCookieString = '';
    var cookiePath = self.baseHref();
    self.cookies = function (name, value) {
      var cookieLength, cookieArray, cookie, i, index;
      if (name) {
        if (value === undefined) {
          rawDocument.cookie = escape(name) + '=;path=' + cookiePath + ';expires=Thu, 01 Jan 1970 00:00:00 GMT';
        } else {
          if (isString(value)) {
            cookieLength = (rawDocument.cookie = escape(name) + '=' + escape(value) + ';path=' + cookiePath).length + 1;
            if (cookieLength > 4096) {
              $log.warn('Cookie \'' + name + '\' possibly not set or overflowed because it was too large (' + cookieLength + ' > 4096 bytes)!');
            }
          }
        }
      } else {
        if (rawDocument.cookie !== lastCookieString) {
          lastCookieString = rawDocument.cookie;
          cookieArray = lastCookieString.split('; ');
          lastCookies = {};
          for (i = 0; i < cookieArray.length; i++) {
            cookie = cookieArray[i];
            index = cookie.indexOf('=');
            if (index > 0) {
              var name = unescape(cookie.substring(0, index));
              if (lastCookies[name] === undefined) {
                lastCookies[name] = unescape(cookie.substring(index + 1));
              }
            }
          }
        }
        return lastCookies;
      }
    };
    self.defer = function (fn, delay) {
      var timeoutId;
      outstandingRequestCount++;
      timeoutId = setTimeout(function () {
        delete pendingDeferIds[timeoutId];
        completeOutstandingRequest(fn);
      }, delay || 0);
      pendingDeferIds[timeoutId] = true;
      return timeoutId;
    };
    self.defer.cancel = function (deferId) {
      if (pendingDeferIds[deferId]) {
        delete pendingDeferIds[deferId];
        clearTimeout(deferId);
        completeOutstandingRequest(noop);
        return true;
      }
      return false;
    };
  }
  function $BrowserProvider() {
    this.$get = [
      '$window',
      '$log',
      '$sniffer',
      '$document',
      function ($window, $log, $sniffer, $document) {
        return new Browser($window, $document, $log, $sniffer);
      }
    ];
  }
  function $CacheFactoryProvider() {
    this.$get = function () {
      var caches = {};
      function cacheFactory(cacheId, options) {
        if (cacheId in caches) {
          throw Error('cacheId ' + cacheId + ' taken');
        }
        var size = 0, stats = extend({}, options, { id: cacheId }), data = {}, capacity = options && options.capacity || Number.MAX_VALUE, lruHash = {}, freshEnd = null, staleEnd = null;
        return caches[cacheId] = {
          put: function (key, value) {
            var lruEntry = lruHash[key] || (lruHash[key] = { key: key });
            refresh(lruEntry);
            if (isUndefined(value))
              return;
            if (!(key in data))
              size++;
            data[key] = value;
            if (size > capacity) {
              this.remove(staleEnd.key);
            }
            return value;
          },
          get: function (key) {
            var lruEntry = lruHash[key];
            if (!lruEntry)
              return;
            refresh(lruEntry);
            return data[key];
          },
          remove: function (key) {
            var lruEntry = lruHash[key];
            if (!lruEntry)
              return;
            if (lruEntry == freshEnd)
              freshEnd = lruEntry.p;
            if (lruEntry == staleEnd)
              staleEnd = lruEntry.n;
            link(lruEntry.n, lruEntry.p);
            delete lruHash[key];
            delete data[key];
            size--;
          },
          removeAll: function () {
            data = {};
            size = 0;
            lruHash = {};
            freshEnd = staleEnd = null;
          },
          destroy: function () {
            data = null;
            stats = null;
            lruHash = null;
            delete caches[cacheId];
          },
          info: function () {
            return extend({}, stats, { size: size });
          }
        };
        function refresh(entry) {
          if (entry != freshEnd) {
            if (!staleEnd) {
              staleEnd = entry;
            } else if (staleEnd == entry) {
              staleEnd = entry.n;
            }
            link(entry.n, entry.p);
            link(entry, freshEnd);
            freshEnd = entry;
            freshEnd.n = null;
          }
        }
        function link(nextEntry, prevEntry) {
          if (nextEntry != prevEntry) {
            if (nextEntry)
              nextEntry.p = prevEntry;
            if (prevEntry)
              prevEntry.n = nextEntry;
          }
        }
      }
      cacheFactory.info = function () {
        var info = {};
        forEach(caches, function (cache, cacheId) {
          info[cacheId] = cache.info();
        });
        return info;
      };
      cacheFactory.get = function (cacheId) {
        return caches[cacheId];
      };
      return cacheFactory;
    };
  }
  function $TemplateCacheProvider() {
    this.$get = [
      '$cacheFactory',
      function ($cacheFactory) {
        return $cacheFactory('templates');
      }
    ];
  }
  var NON_ASSIGNABLE_MODEL_EXPRESSION = 'Non-assignable model expression: ';
  $CompileProvider.$inject = ['$provide'];
  function $CompileProvider($provide) {
    var hasDirectives = {}, Suffix = 'Directive', COMMENT_DIRECTIVE_REGEXP = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/, CLASS_DIRECTIVE_REGEXP = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/, MULTI_ROOT_TEMPLATE_ERROR = 'Template must have exactly one root element. was: ', urlSanitizationWhitelist = /^\s*(https?|ftp|mailto|file):/;
    this.directive = function registerDirective(name, directiveFactory) {
      if (isString(name)) {
        assertArg(directiveFactory, 'directive');
        if (!hasDirectives.hasOwnProperty(name)) {
          hasDirectives[name] = [];
          $provide.factory(name + Suffix, [
            '$injector',
            '$exceptionHandler',
            function ($injector, $exceptionHandler) {
              var directives = [];
              forEach(hasDirectives[name], function (directiveFactory) {
                try {
                  var directive = $injector.invoke(directiveFactory);
                  if (isFunction(directive)) {
                    directive = { compile: valueFn(directive) };
                  } else if (!directive.compile && directive.link) {
                    directive.compile = valueFn(directive.link);
                  }
                  directive.priority = directive.priority || 0;
                  directive.name = directive.name || name;
                  directive.require = directive.require || directive.controller && directive.name;
                  directive.restrict = directive.restrict || 'A';
                  directives.push(directive);
                } catch (e) {
                  $exceptionHandler(e);
                }
              });
              return directives;
            }
          ]);
        }
        hasDirectives[name].push(directiveFactory);
      } else {
        forEach(name, reverseParams(registerDirective));
      }
      return this;
    };
    this.urlSanitizationWhitelist = function (regexp) {
      if (isDefined(regexp)) {
        urlSanitizationWhitelist = regexp;
        return this;
      }
      return urlSanitizationWhitelist;
    };
    this.$get = [
      '$injector',
      '$interpolate',
      '$exceptionHandler',
      '$http',
      '$templateCache',
      '$parse',
      '$controller',
      '$rootScope',
      '$document',
      function ($injector, $interpolate, $exceptionHandler, $http, $templateCache, $parse, $controller, $rootScope, $document) {
        var Attributes = function (element, attr) {
          this.$$element = element;
          this.$attr = attr || {};
        };
        Attributes.prototype = {
          $normalize: directiveNormalize,
          $set: function (key, value, writeAttr, attrName) {
            var booleanKey = getBooleanAttrName(this.$$element[0], key), $$observers = this.$$observers, normalizedVal;
            if (booleanKey) {
              this.$$element.prop(key, value);
              attrName = booleanKey;
            }
            this[key] = value;
            if (attrName) {
              this.$attr[key] = attrName;
            } else {
              attrName = this.$attr[key];
              if (!attrName) {
                this.$attr[key] = attrName = snake_case(key, '-');
              }
            }
            if (nodeName_(this.$$element[0]) === 'A' && key === 'href') {
              urlSanitizationNode.setAttribute('href', value);
              normalizedVal = urlSanitizationNode.href;
              if (!normalizedVal.match(urlSanitizationWhitelist)) {
                this[key] = value = 'unsafe:' + normalizedVal;
              }
            }
            if (writeAttr !== false) {
              if (value === null || value === undefined) {
                this.$$element.removeAttr(attrName);
              } else {
                this.$$element.attr(attrName, value);
              }
            }
            $$observers && forEach($$observers[key], function (fn) {
              try {
                fn(value);
              } catch (e) {
                $exceptionHandler(e);
              }
            });
          },
          $observe: function (key, fn) {
            var attrs = this, $$observers = attrs.$$observers || (attrs.$$observers = {}), listeners = $$observers[key] || ($$observers[key] = []);
            listeners.push(fn);
            $rootScope.$evalAsync(function () {
              if (!listeners.$$inter) {
                fn(attrs[key]);
              }
            });
            return fn;
          }
        };
        var urlSanitizationNode = $document[0].createElement('a'), startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol(), denormalizeTemplate = startSymbol == '{{' || endSymbol == '}}' ? identity : function denormalizeTemplate(template) {
            return template.replace(/\{\{/g, startSymbol).replace(/}}/g, endSymbol);
          }, NG_ATTR_BINDING = /^ngAttr[A-Z]/;
        return compile;
        function compile($compileNodes, transcludeFn, maxPriority) {
          if (!($compileNodes instanceof jqLite)) {
            $compileNodes = jqLite($compileNodes);
          }
          forEach($compileNodes, function (node, index) {
            if (node.nodeType == 3 && node.nodeValue.match(/\S+/)) {
              $compileNodes[index] = jqLite(node).wrap('<span></span>').parent()[0];
            }
          });
          var compositeLinkFn = compileNodes($compileNodes, transcludeFn, $compileNodes, maxPriority);
          return function publicLinkFn(scope, cloneConnectFn) {
            assertArg(scope, 'scope');
            var $linkNode = cloneConnectFn ? JQLitePrototype.clone.call($compileNodes) : $compileNodes;
            for (var i = 0, ii = $linkNode.length; i < ii; i++) {
              var node = $linkNode[i];
              if (node.nodeType == 1 || node.nodeType == 9) {
                $linkNode.eq(i).data('$scope', scope);
              }
            }
            safeAddClass($linkNode, 'ng-scope');
            if (cloneConnectFn)
              cloneConnectFn($linkNode, scope);
            if (compositeLinkFn)
              compositeLinkFn(scope, $linkNode, $linkNode);
            return $linkNode;
          };
        }
        function wrongMode(localName, mode) {
          throw Error('Unsupported \'' + mode + '\' for \'' + localName + '\'.');
        }
        function safeAddClass($element, className) {
          try {
            $element.addClass(className);
          } catch (e) {
          }
        }
        function compileNodes(nodeList, transcludeFn, $rootElement, maxPriority) {
          var linkFns = [], nodeLinkFn, childLinkFn, directives, attrs, linkFnFound;
          for (var i = 0; i < nodeList.length; i++) {
            attrs = new Attributes();
            directives = collectDirectives(nodeList[i], [], attrs, maxPriority);
            nodeLinkFn = directives.length ? applyDirectivesToNode(directives, nodeList[i], attrs, transcludeFn, $rootElement) : null;
            childLinkFn = nodeLinkFn && nodeLinkFn.terminal || !nodeList[i].childNodes || !nodeList[i].childNodes.length ? null : compileNodes(nodeList[i].childNodes, nodeLinkFn ? nodeLinkFn.transclude : transcludeFn);
            linkFns.push(nodeLinkFn);
            linkFns.push(childLinkFn);
            linkFnFound = linkFnFound || nodeLinkFn || childLinkFn;
          }
          return linkFnFound ? compositeLinkFn : null;
          function compositeLinkFn(scope, nodeList, $rootElement, boundTranscludeFn) {
            var nodeLinkFn, childLinkFn, node, childScope, childTranscludeFn, i, ii, n;
            var stableNodeList = [];
            for (i = 0, ii = nodeList.length; i < ii; i++) {
              stableNodeList.push(nodeList[i]);
            }
            for (i = 0, n = 0, ii = linkFns.length; i < ii; n++) {
              node = stableNodeList[n];
              nodeLinkFn = linkFns[i++];
              childLinkFn = linkFns[i++];
              if (nodeLinkFn) {
                if (nodeLinkFn.scope) {
                  childScope = scope.$new(isObject(nodeLinkFn.scope));
                  jqLite(node).data('$scope', childScope);
                } else {
                  childScope = scope;
                }
                childTranscludeFn = nodeLinkFn.transclude;
                if (childTranscludeFn || !boundTranscludeFn && transcludeFn) {
                  nodeLinkFn(childLinkFn, childScope, node, $rootElement, function (transcludeFn) {
                    return function (cloneFn) {
                      var transcludeScope = scope.$new();
                      transcludeScope.$$transcluded = true;
                      return transcludeFn(transcludeScope, cloneFn).bind('$destroy', bind(transcludeScope, transcludeScope.$destroy));
                    };
                  }(childTranscludeFn || transcludeFn));
                } else {
                  nodeLinkFn(childLinkFn, childScope, node, undefined, boundTranscludeFn);
                }
              } else if (childLinkFn) {
                childLinkFn(scope, node.childNodes, undefined, boundTranscludeFn);
              }
            }
          }
        }
        function collectDirectives(node, directives, attrs, maxPriority) {
          var nodeType = node.nodeType, attrsMap = attrs.$attr, match, className;
          switch (nodeType) {
          case 1:
            addDirective(directives, directiveNormalize(nodeName_(node).toLowerCase()), 'E', maxPriority);
            for (var attr, name, nName, ngAttrName, value, nAttrs = node.attributes, j = 0, jj = nAttrs && nAttrs.length; j < jj; j++) {
              attr = nAttrs[j];
              if (attr.specified) {
                name = attr.name;
                ngAttrName = directiveNormalize(name);
                if (NG_ATTR_BINDING.test(ngAttrName)) {
                  name = ngAttrName.substr(6).toLowerCase();
                }
                nName = directiveNormalize(name.toLowerCase());
                attrsMap[nName] = name;
                attrs[nName] = value = trim(msie && name == 'href' ? decodeURIComponent(node.getAttribute(name, 2)) : attr.value);
                if (getBooleanAttrName(node, nName)) {
                  attrs[nName] = true;
                }
                addAttrInterpolateDirective(node, directives, value, nName);
                addDirective(directives, nName, 'A', maxPriority);
              }
            }
            className = node.className;
            if (isString(className) && className !== '') {
              while (match = CLASS_DIRECTIVE_REGEXP.exec(className)) {
                nName = directiveNormalize(match[2]);
                if (addDirective(directives, nName, 'C', maxPriority)) {
                  attrs[nName] = trim(match[3]);
                }
                className = className.substr(match.index + match[0].length);
              }
            }
            break;
          case 3:
            addTextInterpolateDirective(directives, node.nodeValue);
            break;
          case 8:
            try {
              match = COMMENT_DIRECTIVE_REGEXP.exec(node.nodeValue);
              if (match) {
                nName = directiveNormalize(match[1]);
                if (addDirective(directives, nName, 'M', maxPriority)) {
                  attrs[nName] = trim(match[2]);
                }
              }
            } catch (e) {
            }
            break;
          }
          directives.sort(byPriority);
          return directives;
        }
        function applyDirectivesToNode(directives, compileNode, templateAttrs, transcludeFn, jqCollection) {
          var terminalPriority = -Number.MAX_VALUE, preLinkFns = [], postLinkFns = [], newScopeDirective = null, newIsolateScopeDirective = null, templateDirective = null, $compileNode = templateAttrs.$$element = jqLite(compileNode), directive, directiveName, $template, transcludeDirective, childTranscludeFn = transcludeFn, controllerDirectives, linkFn, directiveValue;
          for (var i = 0, ii = directives.length; i < ii; i++) {
            directive = directives[i];
            $template = undefined;
            if (terminalPriority > directive.priority) {
              break;
            }
            if (directiveValue = directive.scope) {
              assertNoDuplicate('isolated scope', newIsolateScopeDirective, directive, $compileNode);
              if (isObject(directiveValue)) {
                safeAddClass($compileNode, 'ng-isolate-scope');
                newIsolateScopeDirective = directive;
              }
              safeAddClass($compileNode, 'ng-scope');
              newScopeDirective = newScopeDirective || directive;
            }
            directiveName = directive.name;
            if (directiveValue = directive.controller) {
              controllerDirectives = controllerDirectives || {};
              assertNoDuplicate('\'' + directiveName + '\' controller', controllerDirectives[directiveName], directive, $compileNode);
              controllerDirectives[directiveName] = directive;
            }
            if (directiveValue = directive.transclude) {
              assertNoDuplicate('transclusion', transcludeDirective, directive, $compileNode);
              transcludeDirective = directive;
              terminalPriority = directive.priority;
              if (directiveValue == 'element') {
                $template = jqLite(compileNode);
                $compileNode = templateAttrs.$$element = jqLite(document.createComment(' ' + directiveName + ': ' + templateAttrs[directiveName] + ' '));
                compileNode = $compileNode[0];
                replaceWith(jqCollection, jqLite($template[0]), compileNode);
                childTranscludeFn = compile($template, transcludeFn, terminalPriority);
              } else {
                $template = jqLite(JQLiteClone(compileNode)).contents();
                $compileNode.html('');
                childTranscludeFn = compile($template, transcludeFn);
              }
            }
            if (directive.template) {
              assertNoDuplicate('template', templateDirective, directive, $compileNode);
              templateDirective = directive;
              directiveValue = isFunction(directive.template) ? directive.template($compileNode, templateAttrs) : directive.template;
              directiveValue = denormalizeTemplate(directiveValue);
              if (directive.replace) {
                $template = jqLite('<div>' + trim(directiveValue) + '</div>').contents();
                compileNode = $template[0];
                if ($template.length != 1 || compileNode.nodeType !== 1) {
                  throw new Error(MULTI_ROOT_TEMPLATE_ERROR + directiveValue);
                }
                replaceWith(jqCollection, $compileNode, compileNode);
                var newTemplateAttrs = { $attr: {} };
                directives = directives.concat(collectDirectives(compileNode, directives.splice(i + 1, directives.length - (i + 1)), newTemplateAttrs));
                mergeTemplateAttributes(templateAttrs, newTemplateAttrs);
                ii = directives.length;
              } else {
                $compileNode.html(directiveValue);
              }
            }
            if (directive.templateUrl) {
              assertNoDuplicate('template', templateDirective, directive, $compileNode);
              templateDirective = directive;
              nodeLinkFn = compileTemplateUrl(directives.splice(i, directives.length - i), nodeLinkFn, $compileNode, templateAttrs, jqCollection, directive.replace, childTranscludeFn);
              ii = directives.length;
            } else if (directive.compile) {
              try {
                linkFn = directive.compile($compileNode, templateAttrs, childTranscludeFn);
                if (isFunction(linkFn)) {
                  addLinkFns(null, linkFn);
                } else if (linkFn) {
                  addLinkFns(linkFn.pre, linkFn.post);
                }
              } catch (e) {
                $exceptionHandler(e, startingTag($compileNode));
              }
            }
            if (directive.terminal) {
              nodeLinkFn.terminal = true;
              terminalPriority = Math.max(terminalPriority, directive.priority);
            }
          }
          nodeLinkFn.scope = newScopeDirective && newScopeDirective.scope;
          nodeLinkFn.transclude = transcludeDirective && childTranscludeFn;
          return nodeLinkFn;
          function addLinkFns(pre, post) {
            if (pre) {
              pre.require = directive.require;
              preLinkFns.push(pre);
            }
            if (post) {
              post.require = directive.require;
              postLinkFns.push(post);
            }
          }
          function getControllers(require, $element) {
            var value, retrievalMethod = 'data', optional = false;
            if (isString(require)) {
              while ((value = require.charAt(0)) == '^' || value == '?') {
                require = require.substr(1);
                if (value == '^') {
                  retrievalMethod = 'inheritedData';
                }
                optional = optional || value == '?';
              }
              value = $element[retrievalMethod]('$' + require + 'Controller');
              if (!value && !optional) {
                throw Error('No controller: ' + require);
              }
              return value;
            } else if (isArray(require)) {
              value = [];
              forEach(require, function (require) {
                value.push(getControllers(require, $element));
              });
            }
            return value;
          }
          function nodeLinkFn(childLinkFn, scope, linkNode, $rootElement, boundTranscludeFn) {
            var attrs, $element, i, ii, linkFn, controller;
            if (compileNode === linkNode) {
              attrs = templateAttrs;
            } else {
              attrs = shallowCopy(templateAttrs, new Attributes(jqLite(linkNode), templateAttrs.$attr));
            }
            $element = attrs.$$element;
            if (newIsolateScopeDirective) {
              var LOCAL_REGEXP = /^\s*([@=&])(\??)\s*(\w*)\s*$/;
              var parentScope = scope.$parent || scope;
              forEach(newIsolateScopeDirective.scope, function (definiton, scopeName) {
                var match = definiton.match(LOCAL_REGEXP) || [], attrName = match[3] || scopeName, optional = match[2] == '?', mode = match[1], lastValue, parentGet, parentSet;
                scope.$$isolateBindings[scopeName] = mode + attrName;
                switch (mode) {
                case '@': {
                    attrs.$observe(attrName, function (value) {
                      scope[scopeName] = value;
                    });
                    attrs.$$observers[attrName].$$scope = parentScope;
                    if (attrs[attrName]) {
                      scope[scopeName] = $interpolate(attrs[attrName])(parentScope);
                    }
                    break;
                  }
                case '=': {
                    if (optional && !attrs[attrName]) {
                      return;
                    }
                    parentGet = $parse(attrs[attrName]);
                    parentSet = parentGet.assign || function () {
                      lastValue = scope[scopeName] = parentGet(parentScope);
                      throw Error(NON_ASSIGNABLE_MODEL_EXPRESSION + attrs[attrName] + ' (directive: ' + newIsolateScopeDirective.name + ')');
                    };
                    lastValue = scope[scopeName] = parentGet(parentScope);
                    scope.$watch(function parentValueWatch() {
                      var parentValue = parentGet(parentScope);
                      if (parentValue !== scope[scopeName]) {
                        if (parentValue !== lastValue) {
                          lastValue = scope[scopeName] = parentValue;
                        } else {
                          parentSet(parentScope, parentValue = lastValue = scope[scopeName]);
                        }
                      }
                      return parentValue;
                    });
                    break;
                  }
                case '&': {
                    parentGet = $parse(attrs[attrName]);
                    scope[scopeName] = function (locals) {
                      return parentGet(parentScope, locals);
                    };
                    break;
                  }
                default: {
                    throw Error('Invalid isolate scope definition for directive ' + newIsolateScopeDirective.name + ': ' + definiton);
                  }
                }
              });
            }
            if (controllerDirectives) {
              forEach(controllerDirectives, function (directive) {
                var locals = {
                    $scope: scope,
                    $element: $element,
                    $attrs: attrs,
                    $transclude: boundTranscludeFn
                  };
                controller = directive.controller;
                if (controller == '@') {
                  controller = attrs[directive.name];
                }
                $element.data('$' + directive.name + 'Controller', $controller(controller, locals));
              });
            }
            for (i = 0, ii = preLinkFns.length; i < ii; i++) {
              try {
                linkFn = preLinkFns[i];
                linkFn(scope, $element, attrs, linkFn.require && getControllers(linkFn.require, $element));
              } catch (e) {
                $exceptionHandler(e, startingTag($element));
              }
            }
            childLinkFn && childLinkFn(scope, linkNode.childNodes, undefined, boundTranscludeFn);
            for (i = 0, ii = postLinkFns.length; i < ii; i++) {
              try {
                linkFn = postLinkFns[i];
                linkFn(scope, $element, attrs, linkFn.require && getControllers(linkFn.require, $element));
              } catch (e) {
                $exceptionHandler(e, startingTag($element));
              }
            }
          }
        }
        function addDirective(tDirectives, name, location, maxPriority) {
          var match = false;
          if (hasDirectives.hasOwnProperty(name)) {
            for (var directive, directives = $injector.get(name + Suffix), i = 0, ii = directives.length; i < ii; i++) {
              try {
                directive = directives[i];
                if ((maxPriority === undefined || maxPriority > directive.priority) && directive.restrict.indexOf(location) != -1) {
                  tDirectives.push(directive);
                  match = true;
                }
              } catch (e) {
                $exceptionHandler(e);
              }
            }
          }
          return match;
        }
        function mergeTemplateAttributes(dst, src) {
          var srcAttr = src.$attr, dstAttr = dst.$attr, $element = dst.$$element;
          forEach(dst, function (value, key) {
            if (key.charAt(0) != '$') {
              if (src[key]) {
                value += (key === 'style' ? ';' : ' ') + src[key];
              }
              dst.$set(key, value, true, srcAttr[key]);
            }
          });
          forEach(src, function (value, key) {
            if (key == 'class') {
              safeAddClass($element, value);
              dst['class'] = (dst['class'] ? dst['class'] + ' ' : '') + value;
            } else if (key == 'style') {
              $element.attr('style', $element.attr('style') + ';' + value);
            } else if (key.charAt(0) != '$' && !dst.hasOwnProperty(key)) {
              dst[key] = value;
              dstAttr[key] = srcAttr[key];
            }
          });
        }
        function compileTemplateUrl(directives, beforeTemplateNodeLinkFn, $compileNode, tAttrs, $rootElement, replace, childTranscludeFn) {
          var linkQueue = [], afterTemplateNodeLinkFn, afterTemplateChildLinkFn, beforeTemplateCompileNode = $compileNode[0], origAsyncDirective = directives.shift(), derivedSyncDirective = extend({}, origAsyncDirective, {
              controller: null,
              templateUrl: null,
              transclude: null,
              scope: null
            }), templateUrl = isFunction(origAsyncDirective.templateUrl) ? origAsyncDirective.templateUrl($compileNode, tAttrs) : origAsyncDirective.templateUrl;
          $compileNode.html('');
          $http.get(templateUrl, { cache: $templateCache }).success(function (content) {
            var compileNode, tempTemplateAttrs, $template;
            content = denormalizeTemplate(content);
            if (replace) {
              $template = jqLite('<div>' + trim(content) + '</div>').contents();
              compileNode = $template[0];
              if ($template.length != 1 || compileNode.nodeType !== 1) {
                throw new Error(MULTI_ROOT_TEMPLATE_ERROR + content);
              }
              tempTemplateAttrs = { $attr: {} };
              replaceWith($rootElement, $compileNode, compileNode);
              collectDirectives(compileNode, directives, tempTemplateAttrs);
              mergeTemplateAttributes(tAttrs, tempTemplateAttrs);
            } else {
              compileNode = beforeTemplateCompileNode;
              $compileNode.html(content);
            }
            directives.unshift(derivedSyncDirective);
            afterTemplateNodeLinkFn = applyDirectivesToNode(directives, compileNode, tAttrs, childTranscludeFn);
            afterTemplateChildLinkFn = compileNodes($compileNode[0].childNodes, childTranscludeFn);
            while (linkQueue.length) {
              var scope = linkQueue.shift(), beforeTemplateLinkNode = linkQueue.shift(), linkRootElement = linkQueue.shift(), controller = linkQueue.shift(), linkNode = compileNode;
              if (beforeTemplateLinkNode !== beforeTemplateCompileNode) {
                linkNode = JQLiteClone(compileNode);
                replaceWith(linkRootElement, jqLite(beforeTemplateLinkNode), linkNode);
              }
              afterTemplateNodeLinkFn(function () {
                beforeTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, linkNode, $rootElement, controller);
              }, scope, linkNode, $rootElement, controller);
            }
            linkQueue = null;
          }).error(function (response, code, headers, config) {
            throw Error('Failed to load template: ' + config.url);
          });
          return function delayedNodeLinkFn(ignoreChildLinkFn, scope, node, rootElement, controller) {
            if (linkQueue) {
              linkQueue.push(scope);
              linkQueue.push(node);
              linkQueue.push(rootElement);
              linkQueue.push(controller);
            } else {
              afterTemplateNodeLinkFn(function () {
                beforeTemplateNodeLinkFn(afterTemplateChildLinkFn, scope, node, rootElement, controller);
              }, scope, node, rootElement, controller);
            }
          };
        }
        function byPriority(a, b) {
          return b.priority - a.priority;
        }
        function assertNoDuplicate(what, previousDirective, directive, element) {
          if (previousDirective) {
            throw Error('Multiple directives [' + previousDirective.name + ', ' + directive.name + '] asking for ' + what + ' on: ' + startingTag(element));
          }
        }
        function addTextInterpolateDirective(directives, text) {
          var interpolateFn = $interpolate(text, true);
          if (interpolateFn) {
            directives.push({
              priority: 0,
              compile: valueFn(function textInterpolateLinkFn(scope, node) {
                var parent = node.parent(), bindings = parent.data('$binding') || [];
                bindings.push(interpolateFn);
                safeAddClass(parent.data('$binding', bindings), 'ng-binding');
                scope.$watch(interpolateFn, function interpolateFnWatchAction(value) {
                  node[0].nodeValue = value;
                });
              })
            });
          }
        }
        function addAttrInterpolateDirective(node, directives, value, name) {
          var interpolateFn = $interpolate(value, true);
          if (!interpolateFn)
            return;
          directives.push({
            priority: 100,
            compile: valueFn(function attrInterpolateLinkFn(scope, element, attr) {
              var $$observers = attr.$$observers || (attr.$$observers = {});
              interpolateFn = $interpolate(attr[name], true);
              if (!interpolateFn)
                return;
              attr[name] = interpolateFn(scope);
              ($$observers[name] || ($$observers[name] = [])).$$inter = true;
              (attr.$$observers && attr.$$observers[name].$$scope || scope).$watch(interpolateFn, function interpolateFnWatchAction(value) {
                attr.$set(name, value);
              });
            })
          });
        }
        function replaceWith($rootElement, $element, newNode) {
          var oldNode = $element[0], parent = oldNode.parentNode, i, ii;
          if ($rootElement) {
            for (i = 0, ii = $rootElement.length; i < ii; i++) {
              if ($rootElement[i] == oldNode) {
                $rootElement[i] = newNode;
                break;
              }
            }
          }
          if (parent) {
            parent.replaceChild(newNode, oldNode);
          }
          newNode[jqLite.expando] = oldNode[jqLite.expando];
          $element[0] = newNode;
        }
      }
    ];
  }
  var PREFIX_REGEXP = /^(x[\:\-_]|data[\:\-_])/i;
  function directiveNormalize(name) {
    return camelCase(name.replace(PREFIX_REGEXP, ''));
  }
  function nodesetLinkingFn(scope, nodeList, rootElement, boundTranscludeFn) {
  }
  function directiveLinkingFn(nodesetLinkingFn, scope, node, rootElement, boundTranscludeFn) {
  }
  function $ControllerProvider() {
    var controllers = {}, CNTRL_REG = /^(\S+)(\s+as\s+(\w+))?$/;
    this.register = function (name, constructor) {
      if (isObject(name)) {
        extend(controllers, name);
      } else {
        controllers[name] = constructor;
      }
    };
    this.$get = [
      '$injector',
      '$window',
      function ($injector, $window) {
        return function (expression, locals) {
          var instance, match, constructor, identifier;
          if (isString(expression)) {
            match = expression.match(CNTRL_REG), constructor = match[1], identifier = match[3];
            expression = controllers.hasOwnProperty(constructor) ? controllers[constructor] : getter(locals.$scope, constructor, true) || getter($window, constructor, true);
            assertArgFn(expression, constructor, true);
          }
          instance = $injector.instantiate(expression, locals);
          if (identifier) {
            if (typeof locals.$scope !== 'object') {
              throw new Error('Can not export controller as "' + identifier + '". ' + 'No scope object provided!');
            }
            locals.$scope[identifier] = instance;
          }
          return instance;
        };
      }
    ];
  }
  function $DocumentProvider() {
    this.$get = [
      '$window',
      function (window) {
        return jqLite(window.document);
      }
    ];
  }
  function $ExceptionHandlerProvider() {
    this.$get = [
      '$log',
      function ($log) {
        return function (exception, cause) {
          $log.error.apply($log, arguments);
        };
      }
    ];
  }
  function $InterpolateProvider() {
    var startSymbol = '{{';
    var endSymbol = '}}';
    this.startSymbol = function (value) {
      if (value) {
        startSymbol = value;
        return this;
      } else {
        return startSymbol;
      }
    };
    this.endSymbol = function (value) {
      if (value) {
        endSymbol = value;
        return this;
      } else {
        return endSymbol;
      }
    };
    this.$get = [
      '$parse',
      '$exceptionHandler',
      function ($parse, $exceptionHandler) {
        var startSymbolLength = startSymbol.length, endSymbolLength = endSymbol.length;
        function $interpolate(text, mustHaveExpression) {
          var startIndex, endIndex, index = 0, parts = [], length = text.length, hasInterpolation = false, fn, exp, concat = [];
          while (index < length) {
            if ((startIndex = text.indexOf(startSymbol, index)) != -1 && (endIndex = text.indexOf(endSymbol, startIndex + startSymbolLength)) != -1) {
              index != startIndex && parts.push(text.substring(index, startIndex));
              parts.push(fn = $parse(exp = text.substring(startIndex + startSymbolLength, endIndex)));
              fn.exp = exp;
              index = endIndex + endSymbolLength;
              hasInterpolation = true;
            } else {
              index != length && parts.push(text.substring(index));
              index = length;
            }
          }
          if (!(length = parts.length)) {
            parts.push('');
            length = 1;
          }
          if (!mustHaveExpression || hasInterpolation) {
            concat.length = length;
            fn = function (context) {
              try {
                for (var i = 0, ii = length, part; i < ii; i++) {
                  if (typeof (part = parts[i]) == 'function') {
                    part = part(context);
                    if (part == null || part == undefined) {
                      part = '';
                    } else if (typeof part != 'string') {
                      part = toJson(part);
                    }
                  }
                  concat[i] = part;
                }
                return concat.join('');
              } catch (err) {
                var newErr = new Error('Error while interpolating: ' + text + '\n' + err.toString());
                $exceptionHandler(newErr);
              }
            };
            fn.exp = text;
            fn.parts = parts;
            return fn;
          }
        }
        $interpolate.startSymbol = function () {
          return startSymbol;
        };
        $interpolate.endSymbol = function () {
          return endSymbol;
        };
        return $interpolate;
      }
    ];
  }
  var SERVER_MATCH = /^([^:]+):\/\/(\w+:{0,1}\w*@)?(\{?[\w\.-]*\}?)(:([0-9]+))?(\/[^\?#]*)?(\?([^#]*))?(#(.*))?$/, PATH_MATCH = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/, DEFAULT_PORTS = {
      'http': 80,
      'https': 443,
      'ftp': 21
    };
  function encodePath(path) {
    var segments = path.split('/'), i = segments.length;
    while (i--) {
      segments[i] = encodeUriSegment(segments[i]);
    }
    return segments.join('/');
  }
  function matchUrl(url, obj) {
    var match = SERVER_MATCH.exec(url);
    obj.$$protocol = match[1];
    obj.$$host = match[3];
    obj.$$port = int(match[5]) || DEFAULT_PORTS[match[1]] || null;
  }
  function matchAppUrl(url, obj) {
    var match = PATH_MATCH.exec(url);
    obj.$$path = decodeURIComponent(match[1]);
    obj.$$search = parseKeyValue(match[3]);
    obj.$$hash = decodeURIComponent(match[5] || '');
    if (obj.$$path && obj.$$path.charAt(0) != '/')
      obj.$$path = '/' + obj.$$path;
  }
  function composeProtocolHostPort(protocol, host, port) {
    return protocol + '://' + host + (port == DEFAULT_PORTS[protocol] ? '' : ':' + port);
  }
  function beginsWith(begin, whole, otherwise) {
    return whole.indexOf(begin) == 0 ? whole.substr(begin.length) : otherwise;
  }
  function stripHash(url) {
    var index = url.indexOf('#');
    return index == -1 ? url : url.substr(0, index);
  }
  function stripFile(url) {
    return url.substr(0, stripHash(url).lastIndexOf('/') + 1);
  }
  function serverBase(url) {
    return url.substring(0, url.indexOf('/', url.indexOf('//') + 2));
  }
  function LocationHtml5Url(appBase, basePrefix) {
    basePrefix = basePrefix || '';
    var appBaseNoFile = stripFile(appBase);
    this.$$parse = function (url) {
      var parsed = {};
      matchUrl(url, parsed);
      var pathUrl = beginsWith(appBaseNoFile, url);
      if (!isString(pathUrl)) {
        throw Error('Invalid url "' + url + '", missing path prefix "' + appBaseNoFile + '".');
      }
      matchAppUrl(pathUrl, parsed);
      extend(this, parsed);
      if (!this.$$path) {
        this.$$path = '/';
      }
      this.$$compose();
    };
    this.$$compose = function () {
      var search = toKeyValue(this.$$search), hash = this.$$hash ? '#' + encodeUriSegment(this.$$hash) : '';
      this.$$url = encodePath(this.$$path) + (search ? '?' + search : '') + hash;
      this.$$absUrl = appBaseNoFile + this.$$url.substr(1);
    };
    this.$$rewrite = function (url) {
      var appUrl, prevAppUrl;
      if ((appUrl = beginsWith(appBase, url)) !== undefined) {
        prevAppUrl = appUrl;
        if ((appUrl = beginsWith(basePrefix, appUrl)) !== undefined) {
          return appBaseNoFile + (beginsWith('/', appUrl) || appUrl);
        } else {
          return appBase + prevAppUrl;
        }
      } else if ((appUrl = beginsWith(appBaseNoFile, url)) !== undefined) {
        return appBaseNoFile + appUrl;
      } else if (appBaseNoFile == url + '/') {
        return appBaseNoFile;
      }
    };
  }
  function LocationHashbangUrl(appBase, hashPrefix) {
    var appBaseNoFile = stripFile(appBase);
    this.$$parse = function (url) {
      matchUrl(url, this);
      var withoutBaseUrl = beginsWith(appBase, url) || beginsWith(appBaseNoFile, url);
      if (!isString(withoutBaseUrl)) {
        throw new Error('Invalid url "' + url + '", does not start with "' + appBase + '".');
      }
      var withoutHashUrl = withoutBaseUrl.charAt(0) == '#' ? beginsWith(hashPrefix, withoutBaseUrl) : withoutBaseUrl;
      if (!isString(withoutHashUrl)) {
        throw new Error('Invalid url "' + url + '", missing hash prefix "' + hashPrefix + '".');
      }
      matchAppUrl(withoutHashUrl, this);
      this.$$compose();
    };
    this.$$compose = function () {
      var search = toKeyValue(this.$$search), hash = this.$$hash ? '#' + encodeUriSegment(this.$$hash) : '';
      this.$$url = encodePath(this.$$path) + (search ? '?' + search : '') + hash;
      this.$$absUrl = appBase + (this.$$url ? hashPrefix + this.$$url : '');
    };
    this.$$rewrite = function (url) {
      if (stripHash(appBase) == stripHash(url)) {
        return url;
      }
    };
  }
  function LocationHashbangInHtml5Url(appBase, hashPrefix) {
    LocationHashbangUrl.apply(this, arguments);
    var appBaseNoFile = stripFile(appBase);
    this.$$rewrite = function (url) {
      var appUrl;
      if (appBase == stripHash(url)) {
        return url;
      } else if (appUrl = beginsWith(appBaseNoFile, url)) {
        return appBase + hashPrefix + appUrl;
      } else if (appBaseNoFile === url + '/') {
        return appBaseNoFile;
      }
    };
  }
  LocationHashbangInHtml5Url.prototype = LocationHashbangUrl.prototype = LocationHtml5Url.prototype = {
    $$replace: false,
    absUrl: locationGetter('$$absUrl'),
    url: function (url, replace) {
      if (isUndefined(url))
        return this.$$url;
      var match = PATH_MATCH.exec(url);
      if (match[1])
        this.path(decodeURIComponent(match[1]));
      if (match[2] || match[1])
        this.search(match[3] || '');
      this.hash(match[5] || '', replace);
      return this;
    },
    protocol: locationGetter('$$protocol'),
    host: locationGetter('$$host'),
    port: locationGetter('$$port'),
    path: locationGetterSetter('$$path', function (path) {
      return path.charAt(0) == '/' ? path : '/' + path;
    }),
    search: function (search, paramValue) {
      if (isUndefined(search))
        return this.$$search;
      if (isDefined(paramValue)) {
        if (paramValue === null) {
          delete this.$$search[search];
        } else {
          this.$$search[search] = paramValue;
        }
      } else {
        this.$$search = isString(search) ? parseKeyValue(search) : search;
      }
      this.$$compose();
      return this;
    },
    hash: locationGetterSetter('$$hash', identity),
    replace: function () {
      this.$$replace = true;
      return this;
    }
  };
  function locationGetter(property) {
    return function () {
      return this[property];
    };
  }
  function locationGetterSetter(property, preprocess) {
    return function (value) {
      if (isUndefined(value))
        return this[property];
      this[property] = preprocess(value);
      this.$$compose();
      return this;
    };
  }
  function $LocationProvider() {
    var hashPrefix = '', html5Mode = false;
    this.hashPrefix = function (prefix) {
      if (isDefined(prefix)) {
        hashPrefix = prefix;
        return this;
      } else {
        return hashPrefix;
      }
    };
    this.html5Mode = function (mode) {
      if (isDefined(mode)) {
        html5Mode = mode;
        return this;
      } else {
        return html5Mode;
      }
    };
    this.$get = [
      '$rootScope',
      '$browser',
      '$sniffer',
      '$rootElement',
      function ($rootScope, $browser, $sniffer, $rootElement) {
        var $location, LocationMode, baseHref = $browser.baseHref(), initialUrl = $browser.url(), appBase;
        if (html5Mode) {
          appBase = baseHref ? serverBase(initialUrl) + baseHref : initialUrl;
          LocationMode = $sniffer.history ? LocationHtml5Url : LocationHashbangInHtml5Url;
        } else {
          appBase = stripHash(initialUrl);
          LocationMode = LocationHashbangUrl;
        }
        $location = new LocationMode(appBase, '#' + hashPrefix);
        $location.$$parse($location.$$rewrite(initialUrl));
        $rootElement.bind('click', function (event) {
          if (event.ctrlKey || event.metaKey || event.which == 2)
            return;
          var elm = jqLite(event.target);
          while (lowercase(elm[0].nodeName) !== 'a') {
            if (elm[0] === $rootElement[0] || !(elm = elm.parent())[0])
              return;
          }
          var absHref = elm.prop('href');
          var rewrittenUrl = $location.$$rewrite(absHref);
          if (absHref && !elm.attr('target') && rewrittenUrl && !event.isDefaultPrevented()) {
            event.preventDefault();
            if (rewrittenUrl != $browser.url()) {
              $location.$$parse(rewrittenUrl);
              $rootScope.$apply();
              window.angular['ff-684208-preventDefault'] = true;
            }
          }
        });
        if ($location.absUrl() != initialUrl) {
          $browser.url($location.absUrl(), true);
        }
        $browser.onUrlChange(function (newUrl) {
          if ($location.absUrl() != newUrl) {
            if ($rootScope.$broadcast('$locationChangeStart', newUrl, $location.absUrl()).defaultPrevented) {
              $browser.url($location.absUrl());
              return;
            }
            $rootScope.$evalAsync(function () {
              var oldUrl = $location.absUrl();
              $location.$$parse(newUrl);
              afterLocationChange(oldUrl);
            });
            if (!$rootScope.$$phase)
              $rootScope.$digest();
          }
        });
        var changeCounter = 0;
        $rootScope.$watch(function $locationWatch() {
          var oldUrl = $browser.url();
          var currentReplace = $location.$$replace;
          if (!changeCounter || oldUrl != $location.absUrl()) {
            changeCounter++;
            $rootScope.$evalAsync(function () {
              if ($rootScope.$broadcast('$locationChangeStart', $location.absUrl(), oldUrl).defaultPrevented) {
                $location.$$parse(oldUrl);
              } else {
                $browser.url($location.absUrl(), currentReplace);
                afterLocationChange(oldUrl);
              }
            });
          }
          $location.$$replace = false;
          return changeCounter;
        });
        return $location;
        function afterLocationChange(oldUrl) {
          $rootScope.$broadcast('$locationChangeSuccess', $location.absUrl(), oldUrl);
        }
      }
    ];
  }
  function $LogProvider() {
    var debug = true, self = this;
    this.debugEnabled = function (flag) {
      if (isDefined(flag)) {
        debug = flag;
        return this;
      } else {
        return debug;
      }
    };
    this.$get = [
      '$window',
      function ($window) {
        return {
          log: consoleLog('log'),
          warn: consoleLog('warn'),
          info: consoleLog('info'),
          error: consoleLog('error'),
          debug: function () {
            var fn = consoleLog('debug');
            return function () {
              if (debug) {
                fn.apply(self, arguments);
              }
            };
          }()
        };
        function formatError(arg) {
          if (arg instanceof Error) {
            if (arg.stack) {
              arg = arg.message && arg.stack.indexOf(arg.message) === -1 ? 'Error: ' + arg.message + '\n' + arg.stack : arg.stack;
            } else if (arg.sourceURL) {
              arg = arg.message + '\n' + arg.sourceURL + ':' + arg.line;
            }
          }
          return arg;
        }
        function consoleLog(type) {
          var console = $window.console || {}, logFn = console[type] || console.log || noop;
          if (logFn.apply) {
            return function () {
              var args = [];
              forEach(arguments, function (arg) {
                args.push(formatError(arg));
              });
              return logFn.apply(console, args);
            };
          }
          return function (arg1, arg2) {
            logFn(arg1, arg2);
          };
        }
      }
    ];
  }
  var OPERATORS = {
      'null': function () {
        return null;
      },
      'true': function () {
        return true;
      },
      'false': function () {
        return false;
      },
      undefined: noop,
      '+': function (self, locals, a, b) {
        a = a(self, locals);
        b = b(self, locals);
        if (isDefined(a)) {
          if (isDefined(b)) {
            return a + b;
          }
          return a;
        }
        return isDefined(b) ? b : undefined;
      },
      '-': function (self, locals, a, b) {
        a = a(self, locals);
        b = b(self, locals);
        return (isDefined(a) ? a : 0) - (isDefined(b) ? b : 0);
      },
      '*': function (self, locals, a, b) {
        return a(self, locals) * b(self, locals);
      },
      '/': function (self, locals, a, b) {
        return a(self, locals) / b(self, locals);
      },
      '%': function (self, locals, a, b) {
        return a(self, locals) % b(self, locals);
      },
      '^': function (self, locals, a, b) {
        return a(self, locals) ^ b(self, locals);
      },
      '=': noop,
      '===': function (self, locals, a, b) {
        return a(self, locals) === b(self, locals);
      },
      '!==': function (self, locals, a, b) {
        return a(self, locals) !== b(self, locals);
      },
      '==': function (self, locals, a, b) {
        return a(self, locals) == b(self, locals);
      },
      '!=': function (self, locals, a, b) {
        return a(self, locals) != b(self, locals);
      },
      '<': function (self, locals, a, b) {
        return a(self, locals) < b(self, locals);
      },
      '>': function (self, locals, a, b) {
        return a(self, locals) > b(self, locals);
      },
      '<=': function (self, locals, a, b) {
        return a(self, locals) <= b(self, locals);
      },
      '>=': function (self, locals, a, b) {
        return a(self, locals) >= b(self, locals);
      },
      '&&': function (self, locals, a, b) {
        return a(self, locals) && b(self, locals);
      },
      '||': function (self, locals, a, b) {
        return a(self, locals) || b(self, locals);
      },
      '&': function (self, locals, a, b) {
        return a(self, locals) & b(self, locals);
      },
      '|': function (self, locals, a, b) {
        return b(self, locals)(self, locals, a(self, locals));
      },
      '!': function (self, locals, a) {
        return !a(self, locals);
      }
    };
  var ESCAPE = {
      'n': '\n',
      'f': '\f',
      'r': '\r',
      't': '\t',
      'v': '\x0B',
      '\'': '\'',
      '"': '"'
    };
  function lex(text, csp) {
    var tokens = [], token, index = 0, json = [], ch, lastCh = ':';
    while (index < text.length) {
      ch = text.charAt(index);
      if (is('"\'')) {
        readString(ch);
      } else if (isNumber(ch) || is('.') && isNumber(peek())) {
        readNumber();
      } else if (isIdent(ch)) {
        readIdent();
        if (was('{,') && json[0] == '{' && (token = tokens[tokens.length - 1])) {
          token.json = token.text.indexOf('.') == -1;
        }
      } else if (is('(){}[].,;:?')) {
        tokens.push({
          index: index,
          text: ch,
          json: was(':[,') && is('{[') || is('}]:,')
        });
        if (is('{['))
          json.unshift(ch);
        if (is('}]'))
          json.shift();
        index++;
      } else if (isWhitespace(ch)) {
        index++;
        continue;
      } else {
        var ch2 = ch + peek(), ch3 = ch2 + peek(2), fn = OPERATORS[ch], fn2 = OPERATORS[ch2], fn3 = OPERATORS[ch3];
        if (fn3) {
          tokens.push({
            index: index,
            text: ch3,
            fn: fn3
          });
          index += 3;
        } else if (fn2) {
          tokens.push({
            index: index,
            text: ch2,
            fn: fn2
          });
          index += 2;
        } else if (fn) {
          tokens.push({
            index: index,
            text: ch,
            fn: fn,
            json: was('[,:') && is('+-')
          });
          index += 1;
        } else {
          throwError('Unexpected next character ', index, index + 1);
        }
      }
      lastCh = ch;
    }
    return tokens;
    function is(chars) {
      return chars.indexOf(ch) != -1;
    }
    function was(chars) {
      return chars.indexOf(lastCh) != -1;
    }
    function peek(i) {
      var num = i || 1;
      return index + num < text.length ? text.charAt(index + num) : false;
    }
    function isNumber(ch) {
      return '0' <= ch && ch <= '9';
    }
    function isWhitespace(ch) {
      return ch == ' ' || ch == '\r' || ch == '\t' || ch == '\n' || ch == '\x0B' || ch == '\xa0';
    }
    function isIdent(ch) {
      return 'a' <= ch && ch <= 'z' || 'A' <= ch && ch <= 'Z' || '_' == ch || ch == '$';
    }
    function isExpOperator(ch) {
      return ch == '-' || ch == '+' || isNumber(ch);
    }
    function throwError(error, start, end) {
      end = end || index;
      throw Error('Lexer Error: ' + error + ' at column' + (isDefined(start) ? 's ' + start + '-' + index + ' [' + text.substring(start, end) + ']' : ' ' + end) + ' in expression [' + text + '].');
    }
    function readNumber() {
      var number = '';
      var start = index;
      while (index < text.length) {
        var ch = lowercase(text.charAt(index));
        if (ch == '.' || isNumber(ch)) {
          number += ch;
        } else {
          var peekCh = peek();
          if (ch == 'e' && isExpOperator(peekCh)) {
            number += ch;
          } else if (isExpOperator(ch) && peekCh && isNumber(peekCh) && number.charAt(number.length - 1) == 'e') {
            number += ch;
          } else if (isExpOperator(ch) && (!peekCh || !isNumber(peekCh)) && number.charAt(number.length - 1) == 'e') {
            throwError('Invalid exponent');
          } else {
            break;
          }
        }
        index++;
      }
      number = 1 * number;
      tokens.push({
        index: start,
        text: number,
        json: true,
        fn: function () {
          return number;
        }
      });
    }
    function readIdent() {
      var ident = '', start = index, lastDot, peekIndex, methodName, ch;
      while (index < text.length) {
        ch = text.charAt(index);
        if (ch == '.' || isIdent(ch) || isNumber(ch)) {
          if (ch == '.')
            lastDot = index;
          ident += ch;
        } else {
          break;
        }
        index++;
      }
      if (lastDot) {
        peekIndex = index;
        while (peekIndex < text.length) {
          ch = text.charAt(peekIndex);
          if (ch == '(') {
            methodName = ident.substr(lastDot - start + 1);
            ident = ident.substr(0, lastDot - start);
            index = peekIndex;
            break;
          }
          if (isWhitespace(ch)) {
            peekIndex++;
          } else {
            break;
          }
        }
      }
      var token = {
          index: start,
          text: ident
        };
      if (OPERATORS.hasOwnProperty(ident)) {
        token.fn = token.json = OPERATORS[ident];
      } else {
        var getter = getterFn(ident, csp);
        token.fn = extend(function (self, locals) {
          return getter(self, locals);
        }, {
          assign: function (self, value) {
            return setter(self, ident, value);
          }
        });
      }
      tokens.push(token);
      if (methodName) {
        tokens.push({
          index: lastDot,
          text: '.',
          json: false
        });
        tokens.push({
          index: lastDot + 1,
          text: methodName,
          json: false
        });
      }
    }
    function readString(quote) {
      var start = index;
      index++;
      var string = '';
      var rawString = quote;
      var escape = false;
      while (index < text.length) {
        var ch = text.charAt(index);
        rawString += ch;
        if (escape) {
          if (ch == 'u') {
            var hex = text.substring(index + 1, index + 5);
            if (!hex.match(/[\da-f]{4}/i))
              throwError('Invalid unicode escape [\\u' + hex + ']');
            index += 4;
            string += String.fromCharCode(parseInt(hex, 16));
          } else {
            var rep = ESCAPE[ch];
            if (rep) {
              string += rep;
            } else {
              string += ch;
            }
          }
          escape = false;
        } else if (ch == '\\') {
          escape = true;
        } else if (ch == quote) {
          index++;
          tokens.push({
            index: start,
            text: rawString,
            string: string,
            json: true,
            fn: function () {
              return string;
            }
          });
          return;
        } else {
          string += ch;
        }
        index++;
      }
      throwError('Unterminated quote', start);
    }
  }
  function parser(text, json, $filter, csp) {
    var ZERO = valueFn(0), value, tokens = lex(text, csp), assignment = _assignment, functionCall = _functionCall, fieldAccess = _fieldAccess, objectIndex = _objectIndex, filterChain = _filterChain;
    if (json) {
      assignment = logicalOR;
      functionCall = fieldAccess = objectIndex = filterChain = function () {
        throwError('is not valid json', {
          text: text,
          index: 0
        });
      };
      value = primary();
    } else {
      value = statements();
    }
    if (tokens.length !== 0) {
      throwError('is an unexpected token', tokens[0]);
    }
    value.literal = !!value.literal;
    value.constant = !!value.constant;
    return value;
    function throwError(msg, token) {
      throw Error('Syntax Error: Token \'' + token.text + '\' ' + msg + ' at column ' + (token.index + 1) + ' of the expression [' + text + '] starting at [' + text.substring(token.index) + '].');
    }
    function peekToken() {
      if (tokens.length === 0)
        throw Error('Unexpected end of expression: ' + text);
      return tokens[0];
    }
    function peek(e1, e2, e3, e4) {
      if (tokens.length > 0) {
        var token = tokens[0];
        var t = token.text;
        if (t == e1 || t == e2 || t == e3 || t == e4 || !e1 && !e2 && !e3 && !e4) {
          return token;
        }
      }
      return false;
    }
    function expect(e1, e2, e3, e4) {
      var token = peek(e1, e2, e3, e4);
      if (token) {
        if (json && !token.json) {
          throwError('is not valid json', token);
        }
        tokens.shift();
        return token;
      }
      return false;
    }
    function consume(e1) {
      if (!expect(e1)) {
        throwError('is unexpected, expecting [' + e1 + ']', peek());
      }
    }
    function unaryFn(fn, right) {
      return extend(function (self, locals) {
        return fn(self, locals, right);
      }, { constant: right.constant });
    }
    function ternaryFn(left, middle, right) {
      return extend(function (self, locals) {
        return left(self, locals) ? middle(self, locals) : right(self, locals);
      }, { constant: left.constant && middle.constant && right.constant });
    }
    function binaryFn(left, fn, right) {
      return extend(function (self, locals) {
        return fn(self, locals, left, right);
      }, { constant: left.constant && right.constant });
    }
    function statements() {
      var statements = [];
      while (true) {
        if (tokens.length > 0 && !peek('}', ')', ';', ']'))
          statements.push(filterChain());
        if (!expect(';')) {
          return statements.length == 1 ? statements[0] : function (self, locals) {
            var value;
            for (var i = 0; i < statements.length; i++) {
              var statement = statements[i];
              if (statement)
                value = statement(self, locals);
            }
            return value;
          };
        }
      }
    }
    function _filterChain() {
      var left = expression();
      var token;
      while (true) {
        if (token = expect('|')) {
          left = binaryFn(left, token.fn, filter());
        } else {
          return left;
        }
      }
    }
    function filter() {
      var token = expect();
      var fn = $filter(token.text);
      var argsFn = [];
      while (true) {
        if (token = expect(':')) {
          argsFn.push(expression());
        } else {
          var fnInvoke = function (self, locals, input) {
            var args = [input];
            for (var i = 0; i < argsFn.length; i++) {
              args.push(argsFn[i](self, locals));
            }
            return fn.apply(self, args);
          };
          return function () {
            return fnInvoke;
          };
        }
      }
    }
    function expression() {
      return assignment();
    }
    function _assignment() {
      var left = ternary();
      var right;
      var token;
      if (token = expect('=')) {
        if (!left.assign) {
          throwError('implies assignment but [' + text.substring(0, token.index) + '] can not be assigned to', token);
        }
        right = ternary();
        return function (scope, locals) {
          return left.assign(scope, right(scope, locals), locals);
        };
      } else {
        return left;
      }
    }
    function ternary() {
      var left = logicalOR();
      var middle;
      var token;
      if (token = expect('?')) {
        middle = ternary();
        if (token = expect(':')) {
          return ternaryFn(left, middle, ternary());
        } else {
          throwError('expected :', token);
        }
      } else {
        return left;
      }
    }
    function logicalOR() {
      var left = logicalAND();
      var token;
      while (true) {
        if (token = expect('||')) {
          left = binaryFn(left, token.fn, logicalAND());
        } else {
          return left;
        }
      }
    }
    function logicalAND() {
      var left = equality();
      var token;
      if (token = expect('&&')) {
        left = binaryFn(left, token.fn, logicalAND());
      }
      return left;
    }
    function equality() {
      var left = relational();
      var token;
      if (token = expect('==', '!=', '===', '!==')) {
        left = binaryFn(left, token.fn, equality());
      }
      return left;
    }
    function relational() {
      var left = additive();
      var token;
      if (token = expect('<', '>', '<=', '>=')) {
        left = binaryFn(left, token.fn, relational());
      }
      return left;
    }
    function additive() {
      var left = multiplicative();
      var token;
      while (token = expect('+', '-')) {
        left = binaryFn(left, token.fn, multiplicative());
      }
      return left;
    }
    function multiplicative() {
      var left = unary();
      var token;
      while (token = expect('*', '/', '%')) {
        left = binaryFn(left, token.fn, unary());
      }
      return left;
    }
    function unary() {
      var token;
      if (expect('+')) {
        return primary();
      } else if (token = expect('-')) {
        return binaryFn(ZERO, token.fn, unary());
      } else if (token = expect('!')) {
        return unaryFn(token.fn, unary());
      } else {
        return primary();
      }
    }
    function primary() {
      var primary;
      if (expect('(')) {
        primary = filterChain();
        consume(')');
      } else if (expect('[')) {
        primary = arrayDeclaration();
      } else if (expect('{')) {
        primary = object();
      } else {
        var token = expect();
        primary = token.fn;
        if (!primary) {
          throwError('not a primary expression', token);
        }
        if (token.json) {
          primary.constant = primary.literal = true;
        }
      }
      var next, context;
      while (next = expect('(', '[', '.')) {
        if (next.text === '(') {
          primary = functionCall(primary, context);
          context = null;
        } else if (next.text === '[') {
          context = primary;
          primary = objectIndex(primary);
        } else if (next.text === '.') {
          context = primary;
          primary = fieldAccess(primary);
        } else {
          throwError('IMPOSSIBLE');
        }
      }
      return primary;
    }
    function _fieldAccess(object) {
      var field = expect().text;
      var getter = getterFn(field, csp);
      return extend(function (scope, locals, self) {
        return getter(self || object(scope, locals), locals);
      }, {
        assign: function (scope, value, locals) {
          return setter(object(scope, locals), field, value);
        }
      });
    }
    function _objectIndex(obj) {
      var indexFn = expression();
      consume(']');
      return extend(function (self, locals) {
        var o = obj(self, locals), i = indexFn(self, locals), v, p;
        if (!o)
          return undefined;
        v = o[i];
        if (v && v.then) {
          p = v;
          if (!('$$v' in v)) {
            p.$$v = undefined;
            p.then(function (val) {
              p.$$v = val;
            });
          }
          v = v.$$v;
        }
        return v;
      }, {
        assign: function (self, value, locals) {
          return obj(self, locals)[indexFn(self, locals)] = value;
        }
      });
    }
    function _functionCall(fn, contextGetter) {
      var argsFn = [];
      if (peekToken().text != ')') {
        do {
          argsFn.push(expression());
        } while (expect(','));
      }
      consume(')');
      return function (scope, locals) {
        var args = [], context = contextGetter ? contextGetter(scope, locals) : scope;
        for (var i = 0; i < argsFn.length; i++) {
          args.push(argsFn[i](scope, locals));
        }
        var fnPtr = fn(scope, locals, context) || noop;
        return fnPtr.apply ? fnPtr.apply(context, args) : fnPtr(args[0], args[1], args[2], args[3], args[4]);
      };
    }
    function arrayDeclaration() {
      var elementFns = [];
      var allConstant = true;
      if (peekToken().text != ']') {
        do {
          var elementFn = expression();
          elementFns.push(elementFn);
          if (!elementFn.constant) {
            allConstant = false;
          }
        } while (expect(','));
      }
      consume(']');
      return extend(function (self, locals) {
        var array = [];
        for (var i = 0; i < elementFns.length; i++) {
          array.push(elementFns[i](self, locals));
        }
        return array;
      }, {
        literal: true,
        constant: allConstant
      });
    }
    function object() {
      var keyValues = [];
      var allConstant = true;
      if (peekToken().text != '}') {
        do {
          var token = expect(), key = token.string || token.text;
          consume(':');
          var value = expression();
          keyValues.push({
            key: key,
            value: value
          });
          if (!value.constant) {
            allConstant = false;
          }
        } while (expect(','));
      }
      consume('}');
      return extend(function (self, locals) {
        var object = {};
        for (var i = 0; i < keyValues.length; i++) {
          var keyValue = keyValues[i];
          object[keyValue.key] = keyValue.value(self, locals);
        }
        return object;
      }, {
        literal: true,
        constant: allConstant
      });
    }
  }
  function setter(obj, path, setValue) {
    var element = path.split('.');
    for (var i = 0; element.length > 1; i++) {
      var key = element.shift();
      var propertyObj = obj[key];
      if (!propertyObj) {
        propertyObj = {};
        obj[key] = propertyObj;
      }
      obj = propertyObj;
    }
    obj[element.shift()] = setValue;
    return setValue;
  }
  function getter(obj, path, bindFnToScope) {
    if (!path)
      return obj;
    var keys = path.split('.');
    var key;
    var lastInstance = obj;
    var len = keys.length;
    for (var i = 0; i < len; i++) {
      key = keys[i];
      if (obj) {
        obj = (lastInstance = obj)[key];
      }
    }
    if (!bindFnToScope && isFunction(obj)) {
      return bind(lastInstance, obj);
    }
    return obj;
  }
  var getterFnCache = {};
  function cspSafeGetterFn(key0, key1, key2, key3, key4) {
    return function (scope, locals) {
      var pathVal = locals && locals.hasOwnProperty(key0) ? locals : scope, promise;
      if (pathVal === null || pathVal === undefined)
        return pathVal;
      pathVal = pathVal[key0];
      if (pathVal && pathVal.then) {
        if (!('$$v' in pathVal)) {
          promise = pathVal;
          promise.$$v = undefined;
          promise.then(function (val) {
            promise.$$v = val;
          });
        }
        pathVal = pathVal.$$v;
      }
      if (!key1 || pathVal === null || pathVal === undefined)
        return pathVal;
      pathVal = pathVal[key1];
      if (pathVal && pathVal.then) {
        if (!('$$v' in pathVal)) {
          promise = pathVal;
          promise.$$v = undefined;
          promise.then(function (val) {
            promise.$$v = val;
          });
        }
        pathVal = pathVal.$$v;
      }
      if (!key2 || pathVal === null || pathVal === undefined)
        return pathVal;
      pathVal = pathVal[key2];
      if (pathVal && pathVal.then) {
        if (!('$$v' in pathVal)) {
          promise = pathVal;
          promise.$$v = undefined;
          promise.then(function (val) {
            promise.$$v = val;
          });
        }
        pathVal = pathVal.$$v;
      }
      if (!key3 || pathVal === null || pathVal === undefined)
        return pathVal;
      pathVal = pathVal[key3];
      if (pathVal && pathVal.then) {
        if (!('$$v' in pathVal)) {
          promise = pathVal;
          promise.$$v = undefined;
          promise.then(function (val) {
            promise.$$v = val;
          });
        }
        pathVal = pathVal.$$v;
      }
      if (!key4 || pathVal === null || pathVal === undefined)
        return pathVal;
      pathVal = pathVal[key4];
      if (pathVal && pathVal.then) {
        if (!('$$v' in pathVal)) {
          promise = pathVal;
          promise.$$v = undefined;
          promise.then(function (val) {
            promise.$$v = val;
          });
        }
        pathVal = pathVal.$$v;
      }
      return pathVal;
    };
  }
  function getterFn(path, csp) {
    if (getterFnCache.hasOwnProperty(path)) {
      return getterFnCache[path];
    }
    var pathKeys = path.split('.'), pathKeysLength = pathKeys.length, fn;
    if (csp) {
      fn = pathKeysLength < 6 ? cspSafeGetterFn(pathKeys[0], pathKeys[1], pathKeys[2], pathKeys[3], pathKeys[4]) : function (scope, locals) {
        var i = 0, val;
        do {
          val = cspSafeGetterFn(pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++], pathKeys[i++])(scope, locals);
          locals = undefined;
          scope = val;
        } while (i < pathKeysLength);
        return val;
      };
    } else {
      var code = 'var l, fn, p;\n';
      forEach(pathKeys, function (key, index) {
        code += 'if(s === null || s === undefined) return s;\n' + 'l=s;\n' + 's=' + (index ? 's' : '((k&&k.hasOwnProperty("' + key + '"))?k:s)') + '["' + key + '"]' + ';\n' + 'if (s && s.then) {\n' + ' if (!("$$v" in s)) {\n' + ' p=s;\n' + ' p.$$v = undefined;\n' + ' p.then(function(v) {p.$$v=v;});\n' + '}\n' + ' s=s.$$v\n' + '}\n';
      });
      code += 'return s;';
      fn = Function('s', 'k', code);
      fn.toString = function () {
        return code;
      };
    }
    return getterFnCache[path] = fn;
  }
  function $ParseProvider() {
    var cache = {};
    this.$get = [
      '$filter',
      '$sniffer',
      function ($filter, $sniffer) {
        return function (exp) {
          switch (typeof exp) {
          case 'string':
            return cache.hasOwnProperty(exp) ? cache[exp] : cache[exp] = parser(exp, false, $filter, $sniffer.csp);
          case 'function':
            return exp;
          default:
            return noop;
          }
        };
      }
    ];
  }
  function $QProvider() {
    this.$get = [
      '$rootScope',
      '$exceptionHandler',
      function ($rootScope, $exceptionHandler) {
        return qFactory(function (callback) {
          $rootScope.$evalAsync(callback);
        }, $exceptionHandler);
      }
    ];
  }
  function qFactory(nextTick, exceptionHandler) {
    var defer = function () {
      var pending = [], value, deferred;
      deferred = {
        resolve: function (val) {
          if (pending) {
            var callbacks = pending;
            pending = undefined;
            value = ref(val);
            if (callbacks.length) {
              nextTick(function () {
                var callback;
                for (var i = 0, ii = callbacks.length; i < ii; i++) {
                  callback = callbacks[i];
                  value.then(callback[0], callback[1]);
                }
              });
            }
          }
        },
        reject: function (reason) {
          deferred.resolve(reject(reason));
        },
        promise: {
          then: function (callback, errback) {
            var result = defer();
            var wrappedCallback = function (value) {
              try {
                result.resolve((callback || defaultCallback)(value));
              } catch (e) {
                exceptionHandler(e);
                result.reject(e);
              }
            };
            var wrappedErrback = function (reason) {
              try {
                result.resolve((errback || defaultErrback)(reason));
              } catch (e) {
                exceptionHandler(e);
                result.reject(e);
              }
            };
            if (pending) {
              pending.push([
                wrappedCallback,
                wrappedErrback
              ]);
            } else {
              value.then(wrappedCallback, wrappedErrback);
            }
            return result.promise;
          },
          always: function (callback) {
            function makePromise(value, resolved) {
              var result = defer();
              if (resolved) {
                result.resolve(value);
              } else {
                result.reject(value);
              }
              return result.promise;
            }
            function handleCallback(value, isResolved) {
              var callbackOutput = null;
              try {
                callbackOutput = (callback || defaultCallback)();
              } catch (e) {
                return makePromise(e, false);
              }
              if (callbackOutput && callbackOutput.then) {
                return callbackOutput.then(function () {
                  return makePromise(value, isResolved);
                }, function (error) {
                  return makePromise(error, false);
                });
              } else {
                return makePromise(value, isResolved);
              }
            }
            return this.then(function (value) {
              return handleCallback(value, true);
            }, function (error) {
              return handleCallback(error, false);
            });
          }
        }
      };
      return deferred;
    };
    var ref = function (value) {
      if (value && value.then)
        return value;
      return {
        then: function (callback) {
          var result = defer();
          nextTick(function () {
            result.resolve(callback(value));
          });
          return result.promise;
        }
      };
    };
    var reject = function (reason) {
      return {
        then: function (callback, errback) {
          var result = defer();
          nextTick(function () {
            result.resolve((errback || defaultErrback)(reason));
          });
          return result.promise;
        }
      };
    };
    var when = function (value, callback, errback) {
      var result = defer(), done;
      var wrappedCallback = function (value) {
        try {
          return (callback || defaultCallback)(value);
        } catch (e) {
          exceptionHandler(e);
          return reject(e);
        }
      };
      var wrappedErrback = function (reason) {
        try {
          return (errback || defaultErrback)(reason);
        } catch (e) {
          exceptionHandler(e);
          return reject(e);
        }
      };
      nextTick(function () {
        ref(value).then(function (value) {
          if (done)
            return;
          done = true;
          result.resolve(ref(value).then(wrappedCallback, wrappedErrback));
        }, function (reason) {
          if (done)
            return;
          done = true;
          result.resolve(wrappedErrback(reason));
        });
      });
      return result.promise;
    };
    function defaultCallback(value) {
      return value;
    }
    function defaultErrback(reason) {
      return reject(reason);
    }
    function all(promises) {
      var deferred = defer(), counter = 0, results = isArray(promises) ? [] : {};
      forEach(promises, function (promise, key) {
        counter++;
        ref(promise).then(function (value) {
          if (results.hasOwnProperty(key))
            return;
          results[key] = value;
          if (!--counter)
            deferred.resolve(results);
        }, function (reason) {
          if (results.hasOwnProperty(key))
            return;
          deferred.reject(reason);
        });
      });
      if (counter === 0) {
        deferred.resolve(results);
      }
      return deferred.promise;
    }
    return {
      defer: defer,
      reject: reject,
      when: when,
      all: all
    };
  }
  function $RouteProvider() {
    var routes = {};
    this.when = function (path, route) {
      routes[path] = extend({
        reloadOnSearch: true,
        caseInsensitiveMatch: false
      }, route);
      if (path) {
        var redirectPath = path[path.length - 1] == '/' ? path.substr(0, path.length - 1) : path + '/';
        routes[redirectPath] = { redirectTo: path };
      }
      return this;
    };
    this.otherwise = function (params) {
      this.when(null, params);
      return this;
    };
    this.$get = [
      '$rootScope',
      '$location',
      '$routeParams',
      '$q',
      '$injector',
      '$http',
      '$templateCache',
      function ($rootScope, $location, $routeParams, $q, $injector, $http, $templateCache) {
        var forceReload = false, $route = {
            routes: routes,
            reload: function () {
              forceReload = true;
              $rootScope.$evalAsync(updateRoute);
            }
          };
        $rootScope.$on('$locationChangeSuccess', updateRoute);
        return $route;
        function switchRouteMatcher(on, when, whenProperties) {
          when = '^' + when.replace(/[-\/\\^$:*+?.()|[\]{}]/g, '\\$&') + '$';
          var regex = '', params = [], dst = {};
          var re = /\\([:*])(\w+)/g, paramMatch, lastMatchedIndex = 0;
          while ((paramMatch = re.exec(when)) !== null) {
            regex += when.slice(lastMatchedIndex, paramMatch.index);
            switch (paramMatch[1]) {
            case ':':
              regex += '([^\\/]*)';
              break;
            case '*':
              regex += '(.*)';
              break;
            }
            params.push(paramMatch[2]);
            lastMatchedIndex = re.lastIndex;
          }
          regex += when.substr(lastMatchedIndex);
          var match = on.match(new RegExp(regex, whenProperties.caseInsensitiveMatch ? 'i' : ''));
          if (match) {
            forEach(params, function (name, index) {
              dst[name] = match[index + 1];
            });
          }
          return match ? dst : null;
        }
        function updateRoute() {
          var next = parseRoute(), last = $route.current;
          if (next && last && next.$$route === last.$$route && equals(next.pathParams, last.pathParams) && !next.reloadOnSearch && !forceReload) {
            last.params = next.params;
            copy(last.params, $routeParams);
            $rootScope.$broadcast('$routeUpdate', last);
          } else if (next || last) {
            forceReload = false;
            $rootScope.$broadcast('$routeChangeStart', next, last);
            $route.current = next;
            if (next) {
              if (next.redirectTo) {
                if (isString(next.redirectTo)) {
                  $location.path(interpolate(next.redirectTo, next.params)).search(next.params).replace();
                } else {
                  $location.url(next.redirectTo(next.pathParams, $location.path(), $location.search())).replace();
                }
              }
            }
            $q.when(next).then(function () {
              if (next) {
                var locals = extend({}, next.resolve), template;
                forEach(locals, function (value, key) {
                  locals[key] = isString(value) ? $injector.get(value) : $injector.invoke(value);
                });
                if (isDefined(template = next.template)) {
                  if (isFunction(template)) {
                    template = template(next.params);
                  }
                } else if (isDefined(template = next.templateUrl)) {
                  if (isFunction(template)) {
                    template = template(next.params);
                  }
                  if (isDefined(template)) {
                    next.loadedTemplateUrl = template;
                    template = $http.get(template, { cache: $templateCache }).then(function (response) {
                      return response.data;
                    });
                  }
                }
                if (isDefined(template)) {
                  locals['$template'] = template;
                }
                return $q.all(locals);
              }
            }).then(function (locals) {
              if (next == $route.current) {
                if (next) {
                  next.locals = locals;
                  copy(next.params, $routeParams);
                }
                $rootScope.$broadcast('$routeChangeSuccess', next, last);
              }
            }, function (error) {
              if (next == $route.current) {
                $rootScope.$broadcast('$routeChangeError', next, last, error);
              }
            });
          }
        }
        function parseRoute() {
          var params, match;
          forEach(routes, function (route, path) {
            if (!match && (params = switchRouteMatcher($location.path(), path, route))) {
              match = inherit(route, {
                params: extend({}, $location.search(), params),
                pathParams: params
              });
              match.$$route = route;
            }
          });
          return match || routes[null] && inherit(routes[null], {
            params: {},
            pathParams: {}
          });
        }
        function interpolate(string, params) {
          var result = [];
          forEach((string || '').split(':'), function (segment, i) {
            if (i == 0) {
              result.push(segment);
            } else {
              var segmentMatch = segment.match(/(\w+)(.*)/);
              var key = segmentMatch[1];
              result.push(params[key]);
              result.push(segmentMatch[2] || '');
              delete params[key];
            }
          });
          return result.join('');
        }
      }
    ];
  }
  function $RouteParamsProvider() {
    this.$get = valueFn({});
  }
  function $RootScopeProvider() {
    var TTL = 10;
    this.digestTtl = function (value) {
      if (arguments.length) {
        TTL = value;
      }
      return TTL;
    };
    this.$get = [
      '$injector',
      '$exceptionHandler',
      '$parse',
      function ($injector, $exceptionHandler, $parse) {
        function Scope() {
          this.$id = nextUid();
          this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
          this['this'] = this.$root = this;
          this.$$destroyed = false;
          this.$$asyncQueue = [];
          this.$$listeners = {};
          this.$$isolateBindings = {};
        }
        Scope.prototype = {
          $new: function (isolate) {
            var Child, child;
            if (isFunction(isolate)) {
              throw Error('API-CHANGE: Use $controller to instantiate controllers.');
            }
            if (isolate) {
              child = new Scope();
              child.$root = this.$root;
            } else {
              Child = function () {
              };
              Child.prototype = this;
              child = new Child();
              child.$id = nextUid();
            }
            child['this'] = child;
            child.$$listeners = {};
            child.$parent = this;
            child.$$watchers = child.$$nextSibling = child.$$childHead = child.$$childTail = null;
            child.$$prevSibling = this.$$childTail;
            if (this.$$childHead) {
              this.$$childTail.$$nextSibling = child;
              this.$$childTail = child;
            } else {
              this.$$childHead = this.$$childTail = child;
            }
            return child;
          },
          $watch: function (watchExp, listener, objectEquality) {
            var scope = this, get = compileToFn(watchExp, 'watch'), array = scope.$$watchers, watcher = {
                fn: listener,
                last: initWatchVal,
                get: get,
                exp: watchExp,
                eq: !!objectEquality
              };
            if (!isFunction(listener)) {
              var listenFn = compileToFn(listener || noop, 'listener');
              watcher.fn = function (newVal, oldVal, scope) {
                listenFn(scope);
              };
            }
            if (typeof watchExp == 'string' && get.constant) {
              var originalFn = watcher.fn;
              watcher.fn = function (newVal, oldVal, scope) {
                originalFn.call(this, newVal, oldVal, scope);
                arrayRemove(array, watcher);
              };
            }
            if (!array) {
              array = scope.$$watchers = [];
            }
            array.unshift(watcher);
            return function () {
              arrayRemove(array, watcher);
            };
          },
          $watchCollection: function (obj, listener) {
            var self = this;
            var oldValue;
            var newValue;
            var changeDetected = 0;
            var objGetter = $parse(obj);
            var internalArray = [];
            var internalObject = {};
            var oldLength = 0;
            function $watchCollectionWatch() {
              newValue = objGetter(self);
              var newLength, key;
              if (!isObject(newValue)) {
                if (oldValue !== newValue) {
                  oldValue = newValue;
                  changeDetected++;
                }
              } else if (isArrayLike(newValue)) {
                if (oldValue !== internalArray) {
                  oldValue = internalArray;
                  oldLength = oldValue.length = 0;
                  changeDetected++;
                }
                newLength = newValue.length;
                if (oldLength !== newLength) {
                  changeDetected++;
                  oldValue.length = oldLength = newLength;
                }
                for (var i = 0; i < newLength; i++) {
                  if (oldValue[i] !== newValue[i]) {
                    changeDetected++;
                    oldValue[i] = newValue[i];
                  }
                }
              } else {
                if (oldValue !== internalObject) {
                  oldValue = internalObject = {};
                  oldLength = 0;
                  changeDetected++;
                }
                newLength = 0;
                for (key in newValue) {
                  if (newValue.hasOwnProperty(key)) {
                    newLength++;
                    if (oldValue.hasOwnProperty(key)) {
                      if (oldValue[key] !== newValue[key]) {
                        changeDetected++;
                        oldValue[key] = newValue[key];
                      }
                    } else {
                      oldLength++;
                      oldValue[key] = newValue[key];
                      changeDetected++;
                    }
                  }
                }
                if (oldLength > newLength) {
                  changeDetected++;
                  for (key in oldValue) {
                    if (oldValue.hasOwnProperty(key) && !newValue.hasOwnProperty(key)) {
                      oldLength--;
                      delete oldValue[key];
                    }
                  }
                }
              }
              return changeDetected;
            }
            function $watchCollectionAction() {
              listener(newValue, oldValue, self);
            }
            return this.$watch($watchCollectionWatch, $watchCollectionAction);
          },
          $digest: function () {
            var watch, value, last, watchers, asyncQueue = this.$$asyncQueue, length, dirty, ttl = TTL, next, current, target = this, watchLog = [], logIdx, logMsg;
            beginPhase('$digest');
            do {
              dirty = false;
              current = target;
              while (asyncQueue.length) {
                try {
                  current.$eval(asyncQueue.shift());
                } catch (e) {
                  $exceptionHandler(e);
                }
              }
              do {
                if (watchers = current.$$watchers) {
                  length = watchers.length;
                  while (length--) {
                    try {
                      watch = watchers[length];
                      if ((value = watch.get(current)) !== (last = watch.last) && !(watch.eq ? equals(value, last) : typeof value == 'number' && typeof last == 'number' && isNaN(value) && isNaN(last))) {
                        dirty = true;
                        watch.last = watch.eq ? copy(value) : value;
                        watch.fn(value, last === initWatchVal ? value : last, current);
                        if (ttl < 5) {
                          logIdx = 4 - ttl;
                          if (!watchLog[logIdx])
                            watchLog[logIdx] = [];
                          logMsg = isFunction(watch.exp) ? 'fn: ' + (watch.exp.name || watch.exp.toString()) : watch.exp;
                          logMsg += '; newVal: ' + toJson(value) + '; oldVal: ' + toJson(last);
                          watchLog[logIdx].push(logMsg);
                        }
                      }
                    } catch (e) {
                      $exceptionHandler(e);
                    }
                  }
                }
                if (!(next = current.$$childHead || current !== target && current.$$nextSibling)) {
                  while (current !== target && !(next = current.$$nextSibling)) {
                    current = current.$parent;
                  }
                }
              } while (current = next);
              if (dirty && !ttl--) {
                clearPhase();
                throw Error(TTL + ' $digest() iterations reached. Aborting!\n' + 'Watchers fired in the last 5 iterations: ' + toJson(watchLog));
              }
            } while (dirty || asyncQueue.length);
            clearPhase();
          },
          $destroy: function () {
            if ($rootScope == this || this.$$destroyed)
              return;
            var parent = this.$parent;
            this.$broadcast('$destroy');
            this.$$destroyed = true;
            if (parent.$$childHead == this)
              parent.$$childHead = this.$$nextSibling;
            if (parent.$$childTail == this)
              parent.$$childTail = this.$$prevSibling;
            if (this.$$prevSibling)
              this.$$prevSibling.$$nextSibling = this.$$nextSibling;
            if (this.$$nextSibling)
              this.$$nextSibling.$$prevSibling = this.$$prevSibling;
            this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null;
          },
          $eval: function (expr, locals) {
            return $parse(expr)(this, locals);
          },
          $evalAsync: function (expr) {
            this.$$asyncQueue.push(expr);
          },
          $apply: function (expr) {
            try {
              beginPhase('$apply');
              return this.$eval(expr);
            } catch (e) {
              $exceptionHandler(e);
            } finally {
              clearPhase();
              try {
                $rootScope.$digest();
              } catch (e) {
                $exceptionHandler(e);
                throw e;
              }
            }
          },
          $on: function (name, listener) {
            var namedListeners = this.$$listeners[name];
            if (!namedListeners) {
              this.$$listeners[name] = namedListeners = [];
            }
            namedListeners.push(listener);
            return function () {
              namedListeners[indexOf(namedListeners, listener)] = null;
            };
          },
          $emit: function (name, args) {
            var empty = [], namedListeners, scope = this, stopPropagation = false, event = {
                name: name,
                targetScope: scope,
                stopPropagation: function () {
                  stopPropagation = true;
                },
                preventDefault: function () {
                  event.defaultPrevented = true;
                },
                defaultPrevented: false
              }, listenerArgs = concat([event], arguments, 1), i, length;
            do {
              namedListeners = scope.$$listeners[name] || empty;
              event.currentScope = scope;
              for (i = 0, length = namedListeners.length; i < length; i++) {
                if (!namedListeners[i]) {
                  namedListeners.splice(i, 1);
                  i--;
                  length--;
                  continue;
                }
                try {
                  namedListeners[i].apply(null, listenerArgs);
                  if (stopPropagation)
                    return event;
                } catch (e) {
                  $exceptionHandler(e);
                }
              }
              scope = scope.$parent;
            } while (scope);
            return event;
          },
          $broadcast: function (name, args) {
            var target = this, current = target, next = target, event = {
                name: name,
                targetScope: target,
                preventDefault: function () {
                  event.defaultPrevented = true;
                },
                defaultPrevented: false
              }, listenerArgs = concat([event], arguments, 1), listeners, i, length;
            do {
              current = next;
              event.currentScope = current;
              listeners = current.$$listeners[name] || [];
              for (i = 0, length = listeners.length; i < length; i++) {
                if (!listeners[i]) {
                  listeners.splice(i, 1);
                  i--;
                  length--;
                  continue;
                }
                try {
                  listeners[i].apply(null, listenerArgs);
                } catch (e) {
                  $exceptionHandler(e);
                }
              }
              if (!(next = current.$$childHead || current !== target && current.$$nextSibling)) {
                while (current !== target && !(next = current.$$nextSibling)) {
                  current = current.$parent;
                }
              }
            } while (current = next);
            return event;
          }
        };
        var $rootScope = new Scope();
        return $rootScope;
        function beginPhase(phase) {
          if ($rootScope.$$phase) {
            throw Error($rootScope.$$phase + ' already in progress');
          }
          $rootScope.$$phase = phase;
        }
        function clearPhase() {
          $rootScope.$$phase = null;
        }
        function compileToFn(exp, name) {
          var fn = $parse(exp);
          assertArgFn(fn, name);
          return fn;
        }
        function initWatchVal() {
        }
      }
    ];
  }
  function $SnifferProvider() {
    this.$get = [
      '$window',
      '$document',
      function ($window, $document) {
        var eventSupport = {}, android = int((/android (\d+)/.exec(lowercase(($window.navigator || {}).userAgent)) || [])[1]), document = $document[0] || {}, vendorPrefix, vendorRegex = /^(Moz|webkit|O|ms)(?=[A-Z])/, bodyStyle = document.body && document.body.style, transitions = false, animations = false, match;
        if (bodyStyle) {
          for (var prop in bodyStyle) {
            if (match = vendorRegex.exec(prop)) {
              vendorPrefix = match[0];
              vendorPrefix = vendorPrefix.substr(0, 1).toUpperCase() + vendorPrefix.substr(1);
              break;
            }
          }
          transitions = !!('transition' in bodyStyle || vendorPrefix + 'Transition' in bodyStyle);
          animations = !!('animation' in bodyStyle || vendorPrefix + 'Animation' in bodyStyle);
        }
        return {
          history: !!($window.history && $window.history.pushState && !(android < 4)),
          hashchange: 'onhashchange' in $window && (!document.documentMode || document.documentMode > 7),
          hasEvent: function (event) {
            if (event == 'input' && msie == 9)
              return false;
            if (isUndefined(eventSupport[event])) {
              var divElm = document.createElement('div');
              eventSupport[event] = 'on' + event in divElm;
            }
            return eventSupport[event];
          },
          csp: document.securityPolicy ? document.securityPolicy.isActive : false,
          vendorPrefix: vendorPrefix,
          transitions: transitions,
          animations: animations
        };
      }
    ];
  }
  function $WindowProvider() {
    this.$get = valueFn(window);
  }
  function parseHeaders(headers) {
    var parsed = {}, key, val, i;
    if (!headers)
      return parsed;
    forEach(headers.split('\n'), function (line) {
      i = line.indexOf(':');
      key = lowercase(trim(line.substr(0, i)));
      val = trim(line.substr(i + 1));
      if (key) {
        if (parsed[key]) {
          parsed[key] += ', ' + val;
        } else {
          parsed[key] = val;
        }
      }
    });
    return parsed;
  }
  var IS_SAME_DOMAIN_URL_MATCH = /^(([^:]+):)?\/\/(\w+:{0,1}\w*@)?([\w\.-]*)?(:([0-9]+))?(.*)$/;
  function isSameDomain(requestUrl, locationUrl) {
    var match = IS_SAME_DOMAIN_URL_MATCH.exec(requestUrl);
    if (match == null)
      return true;
    var domain1 = {
        protocol: match[2],
        host: match[4],
        port: int(match[6]) || DEFAULT_PORTS[match[2]] || null,
        relativeProtocol: match[2] === undefined || match[2] === ''
      };
    match = SERVER_MATCH.exec(locationUrl);
    var domain2 = {
        protocol: match[1],
        host: match[3],
        port: int(match[5]) || DEFAULT_PORTS[match[1]] || null
      };
    return (domain1.protocol == domain2.protocol || domain1.relativeProtocol) && domain1.host == domain2.host && (domain1.port == domain2.port || domain1.relativeProtocol && domain2.port == DEFAULT_PORTS[domain2.protocol]);
  }
  function headersGetter(headers) {
    var headersObj = isObject(headers) ? headers : undefined;
    return function (name) {
      if (!headersObj)
        headersObj = parseHeaders(headers);
      if (name) {
        return headersObj[lowercase(name)] || null;
      }
      return headersObj;
    };
  }
  function transformData(data, headers, fns) {
    if (isFunction(fns))
      return fns(data, headers);
    forEach(fns, function (fn) {
      data = fn(data, headers);
    });
    return data;
  }
  function isSuccess(status) {
    return 200 <= status && status < 300;
  }
  function $HttpProvider() {
    var JSON_START = /^\s*(\[|\{[^\{])/, JSON_END = /[\}\]]\s*$/, PROTECTION_PREFIX = /^\)\]\}',?\n/, CONTENT_TYPE_APPLICATION_JSON = { 'Content-Type': 'application/json;charset=utf-8' };
    var defaults = this.defaults = {
        transformResponse: [function (data) {
            if (isString(data)) {
              data = data.replace(PROTECTION_PREFIX, '');
              if (JSON_START.test(data) && JSON_END.test(data))
                data = fromJson(data, true);
            }
            return data;
          }],
        transformRequest: [function (d) {
            return isObject(d) && !isFile(d) ? toJson(d) : d;
          }],
        headers: {
          common: { 'Accept': 'application/json, text/plain, */*' },
          post: CONTENT_TYPE_APPLICATION_JSON,
          put: CONTENT_TYPE_APPLICATION_JSON,
          patch: CONTENT_TYPE_APPLICATION_JSON
        },
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN'
      };
    var interceptorFactories = this.interceptors = [];
    var responseInterceptorFactories = this.responseInterceptors = [];
    this.$get = [
      '$httpBackend',
      '$browser',
      '$cacheFactory',
      '$rootScope',
      '$q',
      '$injector',
      function ($httpBackend, $browser, $cacheFactory, $rootScope, $q, $injector) {
        var defaultCache = $cacheFactory('$http');
        var reversedInterceptors = [];
        forEach(interceptorFactories, function (interceptorFactory) {
          reversedInterceptors.unshift(isString(interceptorFactory) ? $injector.get(interceptorFactory) : $injector.invoke(interceptorFactory));
        });
        forEach(responseInterceptorFactories, function (interceptorFactory, index) {
          var responseFn = isString(interceptorFactory) ? $injector.get(interceptorFactory) : $injector.invoke(interceptorFactory);
          reversedInterceptors.splice(index, 0, {
            response: function (response) {
              return responseFn($q.when(response));
            },
            responseError: function (response) {
              return responseFn($q.reject(response));
            }
          });
        });
        function $http(requestConfig) {
          var config = {
              transformRequest: defaults.transformRequest,
              transformResponse: defaults.transformResponse
            };
          var headers = {};
          extend(config, requestConfig);
          config.headers = headers;
          config.method = uppercase(config.method);
          extend(headers, defaults.headers.common, defaults.headers[lowercase(config.method)], requestConfig.headers);
          var xsrfValue = isSameDomain(config.url, $browser.url()) ? $browser.cookies()[config.xsrfCookieName || defaults.xsrfCookieName] : undefined;
          if (xsrfValue) {
            headers[config.xsrfHeaderName || defaults.xsrfHeaderName] = xsrfValue;
          }
          var serverRequest = function (config) {
            var reqData = transformData(config.data, headersGetter(headers), config.transformRequest);
            if (isUndefined(config.data)) {
              delete headers['Content-Type'];
            }
            if (isUndefined(config.withCredentials) && !isUndefined(defaults.withCredentials)) {
              config.withCredentials = defaults.withCredentials;
            }
            return sendReq(config, reqData, headers).then(transformResponse, transformResponse);
          };
          var chain = [
              serverRequest,
              undefined
            ];
          var promise = $q.when(config);
          forEach(reversedInterceptors, function (interceptor) {
            if (interceptor.request || interceptor.requestError) {
              chain.unshift(interceptor.request, interceptor.requestError);
            }
            if (interceptor.response || interceptor.responseError) {
              chain.push(interceptor.response, interceptor.responseError);
            }
          });
          while (chain.length) {
            var thenFn = chain.shift();
            var rejectFn = chain.shift();
            promise = promise.then(thenFn, rejectFn);
          }
          promise.success = function (fn) {
            promise.then(function (response) {
              fn(response.data, response.status, response.headers, config);
            });
            return promise;
          };
          promise.error = function (fn) {
            promise.then(null, function (response) {
              fn(response.data, response.status, response.headers, config);
            });
            return promise;
          };
          return promise;
          function transformResponse(response) {
            var resp = extend({}, response, { data: transformData(response.data, response.headers, config.transformResponse) });
            return isSuccess(response.status) ? resp : $q.reject(resp);
          }
        }
        $http.pendingRequests = [];
        createShortMethods('get', 'delete', 'head', 'jsonp');
        createShortMethodsWithData('post', 'put');
        $http.defaults = defaults;
        return $http;
        function createShortMethods(names) {
          forEach(arguments, function (name) {
            $http[name] = function (url, config) {
              return $http(extend(config || {}, {
                method: name,
                url: url
              }));
            };
          });
        }
        function createShortMethodsWithData(name) {
          forEach(arguments, function (name) {
            $http[name] = function (url, data, config) {
              return $http(extend(config || {}, {
                method: name,
                url: url,
                data: data
              }));
            };
          });
        }
        function sendReq(config, reqData, reqHeaders) {
          var deferred = $q.defer(), promise = deferred.promise, cache, cachedResp, url = buildUrl(config.url, config.params);
          $http.pendingRequests.push(config);
          promise.then(removePendingReq, removePendingReq);
          if ((config.cache || defaults.cache) && config.cache !== false && config.method == 'GET') {
            cache = isObject(config.cache) ? config.cache : isObject(defaults.cache) ? defaults.cache : defaultCache;
          }
          if (cache) {
            cachedResp = cache.get(url);
            if (cachedResp) {
              if (cachedResp.then) {
                cachedResp.then(removePendingReq, removePendingReq);
                return cachedResp;
              } else {
                if (isArray(cachedResp)) {
                  resolvePromise(cachedResp[1], cachedResp[0], copy(cachedResp[2]));
                } else {
                  resolvePromise(cachedResp, 200, {});
                }
              }
            } else {
              cache.put(url, promise);
            }
          }
          if (!cachedResp) {
            $httpBackend(config.method, url, reqData, done, reqHeaders, config.timeout, config.withCredentials, config.responseType);
          }
          return promise;
          function done(status, response, headersString) {
            if (cache) {
              if (isSuccess(status)) {
                cache.put(url, [
                  status,
                  response,
                  parseHeaders(headersString)
                ]);
              } else {
                cache.remove(url);
              }
            }
            resolvePromise(response, status, headersString);
            if (!$rootScope.$$phase)
              $rootScope.$apply();
          }
          function resolvePromise(response, status, headers) {
            status = Math.max(status, 0);
            (isSuccess(status) ? deferred.resolve : deferred.reject)({
              data: response,
              status: status,
              headers: headersGetter(headers),
              config: config
            });
          }
          function removePendingReq() {
            var idx = indexOf($http.pendingRequests, config);
            if (idx !== -1)
              $http.pendingRequests.splice(idx, 1);
          }
        }
        function buildUrl(url, params) {
          if (!params)
            return url;
          var parts = [];
          forEachSorted(params, function (value, key) {
            if (value == null || value == undefined)
              return;
            if (!isArray(value))
              value = [value];
            forEach(value, function (v) {
              if (isObject(v)) {
                v = toJson(v);
              }
              parts.push(encodeUriQuery(key) + '=' + encodeUriQuery(v));
            });
          });
          return url + (url.indexOf('?') == -1 ? '?' : '&') + parts.join('&');
        }
      }
    ];
  }
  var XHR = window.XMLHttpRequest || function () {
      try {
        return new ActiveXObject('Msxml2.XMLHTTP.6.0');
      } catch (e1) {
      }
      try {
        return new ActiveXObject('Msxml2.XMLHTTP.3.0');
      } catch (e2) {
      }
      try {
        return new ActiveXObject('Msxml2.XMLHTTP');
      } catch (e3) {
      }
      throw new Error('This browser does not support XMLHttpRequest.');
    };
  function $HttpBackendProvider() {
    this.$get = [
      '$browser',
      '$window',
      '$document',
      function ($browser, $window, $document) {
        return createHttpBackend($browser, XHR, $browser.defer, $window.angular.callbacks, $document[0], $window.location.protocol.replace(':', ''));
      }
    ];
  }
  function createHttpBackend($browser, XHR, $browserDefer, callbacks, rawDocument, locationProtocol) {
    return function (method, url, post, callback, headers, timeout, withCredentials, responseType) {
      var status;
      $browser.$$incOutstandingRequestCount();
      url = url || $browser.url();
      if (lowercase(method) == 'jsonp') {
        var callbackId = '_' + (callbacks.counter++).toString(36);
        callbacks[callbackId] = function (data) {
          callbacks[callbackId].data = data;
        };
        var jsonpDone = jsonpReq(url.replace('JSON_CALLBACK', 'angular.callbacks.' + callbackId), function () {
            if (callbacks[callbackId].data) {
              completeRequest(callback, 200, callbacks[callbackId].data);
            } else {
              completeRequest(callback, status || -2);
            }
            delete callbacks[callbackId];
          });
      } else {
        var xhr = new XHR();
        xhr.open(method, url, true);
        forEach(headers, function (value, key) {
          if (value)
            xhr.setRequestHeader(key, value);
        });
        xhr.onreadystatechange = function () {
          if (xhr.readyState == 4) {
            var responseHeaders = xhr.getAllResponseHeaders();
            var value, simpleHeaders = [
                'Cache-Control',
                'Content-Language',
                'Content-Type',
                'Expires',
                'Last-Modified',
                'Pragma'
              ];
            if (!responseHeaders) {
              responseHeaders = '';
              forEach(simpleHeaders, function (header) {
                var value = xhr.getResponseHeader(header);
                if (value) {
                  responseHeaders += header + ': ' + value + '\n';
                }
              });
            }
            completeRequest(callback, status || xhr.status, xhr.responseType ? xhr.response : xhr.responseText, responseHeaders);
          }
        };
        if (withCredentials) {
          xhr.withCredentials = true;
        }
        if (responseType) {
          xhr.responseType = responseType;
        }
        xhr.send(post || '');
      }
      if (timeout > 0) {
        var timeoutId = $browserDefer(timeoutRequest, timeout);
      } else if (timeout && timeout.then) {
        timeout.then(timeoutRequest);
      }
      function timeoutRequest() {
        status = -1;
        jsonpDone && jsonpDone();
        xhr && xhr.abort();
      }
      function completeRequest(callback, status, response, headersString) {
        var protocol = (url.match(SERVER_MATCH) || [
            '',
            locationProtocol
          ])[1];
        timeoutId && $browserDefer.cancel(timeoutId);
        jsonpDone = xhr = null;
        status = protocol == 'file' ? response ? 200 : 404 : status;
        status = status == 1223 ? 204 : status;
        callback(status, response, headersString);
        $browser.$$completeOutstandingRequest(noop);
      }
    };
    function jsonpReq(url, done) {
      var script = rawDocument.createElement('script'), doneWrapper = function () {
          rawDocument.body.removeChild(script);
          if (done)
            done();
        };
      script.type = 'text/javascript';
      script.src = url;
      if (msie) {
        script.onreadystatechange = function () {
          if (/loaded|complete/.test(script.readyState))
            doneWrapper();
        };
      } else {
        script.onload = script.onerror = doneWrapper;
      }
      rawDocument.body.appendChild(script);
      return doneWrapper;
    }
  }
  function $LocaleProvider() {
    this.$get = function () {
      return {
        id: 'en-us',
        NUMBER_FORMATS: {
          DECIMAL_SEP: '.',
          GROUP_SEP: ',',
          PATTERNS: [
            {
              minInt: 1,
              minFrac: 0,
              maxFrac: 3,
              posPre: '',
              posSuf: '',
              negPre: '-',
              negSuf: '',
              gSize: 3,
              lgSize: 3
            },
            {
              minInt: 1,
              minFrac: 2,
              maxFrac: 2,
              posPre: '\xa4',
              posSuf: '',
              negPre: '(\xa4',
              negSuf: ')',
              gSize: 3,
              lgSize: 3
            }
          ],
          CURRENCY_SYM: '$'
        },
        DATETIME_FORMATS: {
          MONTH: 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
          SHORTMONTH: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
          DAY: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
          SHORTDAY: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(','),
          AMPMS: [
            'AM',
            'PM'
          ],
          medium: 'MMM d, y h:mm:ss a',
          short: 'M/d/yy h:mm a',
          fullDate: 'EEEE, MMMM d, y',
          longDate: 'MMMM d, y',
          mediumDate: 'MMM d, y',
          shortDate: 'M/d/yy',
          mediumTime: 'h:mm:ss a',
          shortTime: 'h:mm a'
        },
        pluralCat: function (num) {
          if (num === 1) {
            return 'one';
          }
          return 'other';
        }
      };
    };
  }
  function $TimeoutProvider() {
    this.$get = [
      '$rootScope',
      '$browser',
      '$q',
      '$exceptionHandler',
      function ($rootScope, $browser, $q, $exceptionHandler) {
        var deferreds = {};
        function timeout(fn, delay, invokeApply) {
          var deferred = $q.defer(), promise = deferred.promise, skipApply = isDefined(invokeApply) && !invokeApply, timeoutId, cleanup;
          timeoutId = $browser.defer(function () {
            try {
              deferred.resolve(fn());
            } catch (e) {
              deferred.reject(e);
              $exceptionHandler(e);
            }
            if (!skipApply)
              $rootScope.$apply();
          }, delay);
          cleanup = function () {
            delete deferreds[promise.$$timeoutId];
          };
          promise.$$timeoutId = timeoutId;
          deferreds[timeoutId] = deferred;
          promise.then(cleanup, cleanup);
          return promise;
        }
        timeout.cancel = function (promise) {
          if (promise && promise.$$timeoutId in deferreds) {
            deferreds[promise.$$timeoutId].reject('canceled');
            return $browser.defer.cancel(promise.$$timeoutId);
          }
          return false;
        };
        return timeout;
      }
    ];
  }
  $FilterProvider.$inject = ['$provide'];
  function $FilterProvider($provide) {
    var suffix = 'Filter';
    function register(name, factory) {
      return $provide.factory(name + suffix, factory);
    }
    this.register = register;
    this.$get = [
      '$injector',
      function ($injector) {
        return function (name) {
          return $injector.get(name + suffix);
        };
      }
    ];
    register('currency', currencyFilter);
    register('date', dateFilter);
    register('filter', filterFilter);
    register('json', jsonFilter);
    register('limitTo', limitToFilter);
    register('lowercase', lowercaseFilter);
    register('number', numberFilter);
    register('orderBy', orderByFilter);
    register('uppercase', uppercaseFilter);
  }
  function filterFilter() {
    return function (array, expression, comperator) {
      if (!isArray(array))
        return array;
      var predicates = [];
      predicates.check = function (value) {
        for (var j = 0; j < predicates.length; j++) {
          if (!predicates[j](value)) {
            return false;
          }
        }
        return true;
      };
      switch (typeof comperator) {
      case 'function':
        break;
      case 'boolean':
        if (comperator == true) {
          comperator = function (obj, text) {
            return angular.equals(obj, text);
          };
          break;
        }
      default:
        comperator = function (obj, text) {
          text = ('' + text).toLowerCase();
          return ('' + obj).toLowerCase().indexOf(text) > -1;
        };
      }
      var search = function (obj, text) {
        if (typeof text == 'string' && text.charAt(0) === '!') {
          return !search(obj, text.substr(1));
        }
        switch (typeof obj) {
        case 'boolean':
        case 'number':
        case 'string':
          return comperator(obj, text);
        case 'object':
          switch (typeof text) {
          case 'object':
            return comperator(obj, text);
            break;
          default:
            for (var objKey in obj) {
              if (objKey.charAt(0) !== '$' && search(obj[objKey], text)) {
                return true;
              }
            }
            break;
          }
          return false;
        case 'array':
          for (var i = 0; i < obj.length; i++) {
            if (search(obj[i], text)) {
              return true;
            }
          }
          return false;
        default:
          return false;
        }
      };
      switch (typeof expression) {
      case 'boolean':
      case 'number':
      case 'string':
        expression = { $: expression };
      case 'object':
        for (var key in expression) {
          if (key == '$') {
            (function () {
              if (!expression[key])
                return;
              var path = key;
              predicates.push(function (value) {
                return search(value, expression[path]);
              });
            }());
          } else {
            (function () {
              if (!expression[key])
                return;
              var path = key;
              predicates.push(function (value) {
                return search(getter(value, path), expression[path]);
              });
            }());
          }
        }
        break;
      case 'function':
        predicates.push(expression);
        break;
      default:
        return array;
      }
      var filtered = [];
      for (var j = 0; j < array.length; j++) {
        var value = array[j];
        if (predicates.check(value)) {
          filtered.push(value);
        }
      }
      return filtered;
    };
  }
  currencyFilter.$inject = ['$locale'];
  function currencyFilter($locale) {
    var formats = $locale.NUMBER_FORMATS;
    return function (amount, currencySymbol) {
      if (isUndefined(currencySymbol))
        currencySymbol = formats.CURRENCY_SYM;
      return formatNumber(amount, formats.PATTERNS[1], formats.GROUP_SEP, formats.DECIMAL_SEP, 2).replace(/\u00A4/g, currencySymbol);
    };
  }
  numberFilter.$inject = ['$locale'];
  function numberFilter($locale) {
    var formats = $locale.NUMBER_FORMATS;
    return function (number, fractionSize) {
      return formatNumber(number, formats.PATTERNS[0], formats.GROUP_SEP, formats.DECIMAL_SEP, fractionSize);
    };
  }
  var DECIMAL_SEP = '.';
  function formatNumber(number, pattern, groupSep, decimalSep, fractionSize) {
    if (isNaN(number) || !isFinite(number))
      return '';
    var isNegative = number < 0;
    number = Math.abs(number);
    var numStr = number + '', formatedText = '', parts = [];
    var hasExponent = false;
    if (numStr.indexOf('e') !== -1) {
      var match = numStr.match(/([\d\.]+)e(-?)(\d+)/);
      if (match && match[2] == '-' && match[3] > fractionSize + 1) {
        numStr = '0';
      } else {
        formatedText = numStr;
        hasExponent = true;
      }
    }
    if (!hasExponent) {
      var fractionLen = (numStr.split(DECIMAL_SEP)[1] || '').length;
      if (isUndefined(fractionSize)) {
        fractionSize = Math.min(Math.max(pattern.minFrac, fractionLen), pattern.maxFrac);
      }
      var pow = Math.pow(10, fractionSize);
      number = Math.round(number * pow) / pow;
      var fraction = ('' + number).split(DECIMAL_SEP);
      var whole = fraction[0];
      fraction = fraction[1] || '';
      var pos = 0, lgroup = pattern.lgSize, group = pattern.gSize;
      if (whole.length >= lgroup + group) {
        pos = whole.length - lgroup;
        for (var i = 0; i < pos; i++) {
          if ((pos - i) % group === 0 && i !== 0) {
            formatedText += groupSep;
          }
          formatedText += whole.charAt(i);
        }
      }
      for (i = pos; i < whole.length; i++) {
        if ((whole.length - i) % lgroup === 0 && i !== 0) {
          formatedText += groupSep;
        }
        formatedText += whole.charAt(i);
      }
      while (fraction.length < fractionSize) {
        fraction += '0';
      }
      if (fractionSize && fractionSize !== '0')
        formatedText += decimalSep + fraction.substr(0, fractionSize);
    }
    parts.push(isNegative ? pattern.negPre : pattern.posPre);
    parts.push(formatedText);
    parts.push(isNegative ? pattern.negSuf : pattern.posSuf);
    return parts.join('');
  }
  function padNumber(num, digits, trim) {
    var neg = '';
    if (num < 0) {
      neg = '-';
      num = -num;
    }
    num = '' + num;
    while (num.length < digits)
      num = '0' + num;
    if (trim)
      num = num.substr(num.length - digits);
    return neg + num;
  }
  function dateGetter(name, size, offset, trim) {
    offset = offset || 0;
    return function (date) {
      var value = date['get' + name]();
      if (offset > 0 || value > -offset)
        value += offset;
      if (value === 0 && offset == -12)
        value = 12;
      return padNumber(value, size, trim);
    };
  }
  function dateStrGetter(name, shortForm) {
    return function (date, formats) {
      var value = date['get' + name]();
      var get = uppercase(shortForm ? 'SHORT' + name : name);
      return formats[get][value];
    };
  }
  function timeZoneGetter(date) {
    var zone = -1 * date.getTimezoneOffset();
    var paddedZone = zone >= 0 ? '+' : '';
    paddedZone += padNumber(Math[zone > 0 ? 'floor' : 'ceil'](zone / 60), 2) + padNumber(Math.abs(zone % 60), 2);
    return paddedZone;
  }
  function ampmGetter(date, formats) {
    return date.getHours() < 12 ? formats.AMPMS[0] : formats.AMPMS[1];
  }
  var DATE_FORMATS = {
      yyyy: dateGetter('FullYear', 4),
      yy: dateGetter('FullYear', 2, 0, true),
      y: dateGetter('FullYear', 1),
      MMMM: dateStrGetter('Month'),
      MMM: dateStrGetter('Month', true),
      MM: dateGetter('Month', 2, 1),
      M: dateGetter('Month', 1, 1),
      dd: dateGetter('Date', 2),
      d: dateGetter('Date', 1),
      HH: dateGetter('Hours', 2),
      H: dateGetter('Hours', 1),
      hh: dateGetter('Hours', 2, -12),
      h: dateGetter('Hours', 1, -12),
      mm: dateGetter('Minutes', 2),
      m: dateGetter('Minutes', 1),
      ss: dateGetter('Seconds', 2),
      s: dateGetter('Seconds', 1),
      sss: dateGetter('Milliseconds', 3),
      EEEE: dateStrGetter('Day'),
      EEE: dateStrGetter('Day', true),
      a: ampmGetter,
      Z: timeZoneGetter
    };
  var DATE_FORMATS_SPLIT = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/, NUMBER_STRING = /^\d+$/;
  dateFilter.$inject = ['$locale'];
  function dateFilter($locale) {
    var R_ISO8601_STR = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
    function jsonStringToDate(string) {
      var match;
      if (match = string.match(R_ISO8601_STR)) {
        var date = new Date(0), tzHour = 0, tzMin = 0, dateSetter = match[8] ? date.setUTCFullYear : date.setFullYear, timeSetter = match[8] ? date.setUTCHours : date.setHours;
        if (match[9]) {
          tzHour = int(match[9] + match[10]);
          tzMin = int(match[9] + match[11]);
        }
        dateSetter.call(date, int(match[1]), int(match[2]) - 1, int(match[3]));
        var h = int(match[4] || 0) - tzHour;
        var m = int(match[5] || 0) - tzMin;
        var s = int(match[6] || 0);
        var ms = Math.round(parseFloat('0.' + (match[7] || 0)) * 1000);
        timeSetter.call(date, h, m, s, ms);
        return date;
      }
      return string;
    }
    return function (date, format) {
      var text = '', parts = [], fn, match;
      format = format || 'mediumDate';
      format = $locale.DATETIME_FORMATS[format] || format;
      if (isString(date)) {
        if (NUMBER_STRING.test(date)) {
          date = int(date);
        } else {
          date = jsonStringToDate(date);
        }
      }
      if (isNumber(date)) {
        date = new Date(date);
      }
      if (!isDate(date)) {
        return date;
      }
      while (format) {
        match = DATE_FORMATS_SPLIT.exec(format);
        if (match) {
          parts = concat(parts, match, 1);
          format = parts.pop();
        } else {
          parts.push(format);
          format = null;
        }
      }
      forEach(parts, function (value) {
        fn = DATE_FORMATS[value];
        text += fn ? fn(date, $locale.DATETIME_FORMATS) : value.replace(/(^'|'$)/g, '').replace(/''/g, '\'');
      });
      return text;
    };
  }
  function jsonFilter() {
    return function (object) {
      return toJson(object, true);
    };
  }
  var lowercaseFilter = valueFn(lowercase);
  var uppercaseFilter = valueFn(uppercase);
  function limitToFilter() {
    return function (input, limit) {
      if (!isArray(input) && !isString(input))
        return input;
      limit = int(limit);
      if (isString(input)) {
        if (limit) {
          return limit >= 0 ? input.slice(0, limit) : input.slice(limit, input.length);
        } else {
          return '';
        }
      }
      var out = [], i, n;
      if (limit > input.length)
        limit = input.length;
      else if (limit < -input.length)
        limit = -input.length;
      if (limit > 0) {
        i = 0;
        n = limit;
      } else {
        i = input.length + limit;
        n = input.length;
      }
      for (; i < n; i++) {
        out.push(input[i]);
      }
      return out;
    };
  }
  orderByFilter.$inject = ['$parse'];
  function orderByFilter($parse) {
    return function (array, sortPredicate, reverseOrder) {
      if (!isArray(array))
        return array;
      if (!sortPredicate)
        return array;
      sortPredicate = isArray(sortPredicate) ? sortPredicate : [sortPredicate];
      sortPredicate = map(sortPredicate, function (predicate) {
        var descending = false, get = predicate || identity;
        if (isString(predicate)) {
          if (predicate.charAt(0) == '+' || predicate.charAt(0) == '-') {
            descending = predicate.charAt(0) == '-';
            predicate = predicate.substring(1);
          }
          get = $parse(predicate);
        }
        return reverseComparator(function (a, b) {
          return compare(get(a), get(b));
        }, descending);
      });
      var arrayCopy = [];
      for (var i = 0; i < array.length; i++) {
        arrayCopy.push(array[i]);
      }
      return arrayCopy.sort(reverseComparator(comparator, reverseOrder));
      function comparator(o1, o2) {
        for (var i = 0; i < sortPredicate.length; i++) {
          var comp = sortPredicate[i](o1, o2);
          if (comp !== 0)
            return comp;
        }
        return 0;
      }
      function reverseComparator(comp, descending) {
        return toBoolean(descending) ? function (a, b) {
          return comp(b, a);
        } : comp;
      }
      function compare(v1, v2) {
        var t1 = typeof v1;
        var t2 = typeof v2;
        if (t1 == t2) {
          if (t1 == 'string')
            v1 = v1.toLowerCase();
          if (t1 == 'string')
            v2 = v2.toLowerCase();
          if (v1 === v2)
            return 0;
          return v1 < v2 ? -1 : 1;
        } else {
          return t1 < t2 ? -1 : 1;
        }
      }
    };
  }
  function ngDirective(directive) {
    if (isFunction(directive)) {
      directive = { link: directive };
    }
    directive.restrict = directive.restrict || 'AC';
    return valueFn(directive);
  }
  var htmlAnchorDirective = valueFn({
      restrict: 'E',
      compile: function (element, attr) {
        if (msie <= 8) {
          if (!attr.href && !attr.name) {
            attr.$set('href', '');
          }
          element.append(document.createComment('IE fix'));
        }
        return function (scope, element) {
          element.bind('click', function (event) {
            if (!element.attr('href')) {
              event.preventDefault();
            }
          });
        };
      }
    });
  var ngAttributeAliasDirectives = {};
  forEach(BOOLEAN_ATTR, function (propName, attrName) {
    var normalized = directiveNormalize('ng-' + attrName);
    ngAttributeAliasDirectives[normalized] = function () {
      return {
        priority: 100,
        compile: function () {
          return function (scope, element, attr) {
            scope.$watch(attr[normalized], function ngBooleanAttrWatchAction(value) {
              attr.$set(attrName, !!value);
            });
          };
        }
      };
    };
  });
  forEach([
    'src',
    'srcset',
    'href'
  ], function (attrName) {
    var normalized = directiveNormalize('ng-' + attrName);
    ngAttributeAliasDirectives[normalized] = function () {
      return {
        priority: 99,
        link: function (scope, element, attr) {
          attr.$observe(normalized, function (value) {
            if (!value)
              return;
            attr.$set(attrName, value);
            if (msie)
              element.prop(attrName, attr[attrName]);
          });
        }
      };
    };
  });
  var nullFormCtrl = {
      $addControl: noop,
      $removeControl: noop,
      $setValidity: noop,
      $setDirty: noop,
      $setPristine: noop
    };
  FormController.$inject = [
    '$element',
    '$attrs',
    '$scope'
  ];
  function FormController(element, attrs) {
    var form = this, parentForm = element.parent().controller('form') || nullFormCtrl, invalidCount = 0, errors = form.$error = {}, controls = [];
    form.$name = attrs.name;
    form.$dirty = false;
    form.$pristine = true;
    form.$valid = true;
    form.$invalid = false;
    parentForm.$addControl(form);
    element.addClass(PRISTINE_CLASS);
    toggleValidCss(true);
    function toggleValidCss(isValid, validationErrorKey) {
      validationErrorKey = validationErrorKey ? '-' + snake_case(validationErrorKey, '-') : '';
      element.removeClass((isValid ? INVALID_CLASS : VALID_CLASS) + validationErrorKey).addClass((isValid ? VALID_CLASS : INVALID_CLASS) + validationErrorKey);
    }
    form.$addControl = function (control) {
      controls.push(control);
      if (control.$name && !form.hasOwnProperty(control.$name)) {
        form[control.$name] = control;
      }
    };
    form.$removeControl = function (control) {
      if (control.$name && form[control.$name] === control) {
        delete form[control.$name];
      }
      forEach(errors, function (queue, validationToken) {
        form.$setValidity(validationToken, true, control);
      });
      arrayRemove(controls, control);
    };
    form.$setValidity = function (validationToken, isValid, control) {
      var queue = errors[validationToken];
      if (isValid) {
        if (queue) {
          arrayRemove(queue, control);
          if (!queue.length) {
            invalidCount--;
            if (!invalidCount) {
              toggleValidCss(isValid);
              form.$valid = true;
              form.$invalid = false;
            }
            errors[validationToken] = false;
            toggleValidCss(true, validationToken);
            parentForm.$setValidity(validationToken, true, form);
          }
        }
      } else {
        if (!invalidCount) {
          toggleValidCss(isValid);
        }
        if (queue) {
          if (includes(queue, control))
            return;
        } else {
          errors[validationToken] = queue = [];
          invalidCount++;
          toggleValidCss(false, validationToken);
          parentForm.$setValidity(validationToken, false, form);
        }
        queue.push(control);
        form.$valid = false;
        form.$invalid = true;
      }
    };
    form.$setDirty = function () {
      element.removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS);
      form.$dirty = true;
      form.$pristine = false;
      parentForm.$setDirty();
    };
    form.$setPristine = function () {
      element.removeClass(DIRTY_CLASS).addClass(PRISTINE_CLASS);
      form.$dirty = false;
      form.$pristine = true;
      forEach(controls, function (control) {
        control.$setPristine();
      });
    };
  }
  var formDirectiveFactory = function (isNgForm) {
    return [
      '$timeout',
      function ($timeout) {
        var formDirective = {
            name: 'form',
            restrict: 'E',
            controller: FormController,
            compile: function () {
              return {
                pre: function (scope, formElement, attr, controller) {
                  if (!attr.action) {
                    var preventDefaultListener = function (event) {
                      event.preventDefault ? event.preventDefault() : event.returnValue = false;
                    };
                    addEventListenerFn(formElement[0], 'submit', preventDefaultListener);
                    formElement.bind('$destroy', function () {
                      $timeout(function () {
                        removeEventListenerFn(formElement[0], 'submit', preventDefaultListener);
                      }, 0, false);
                    });
                  }
                  var parentFormCtrl = formElement.parent().controller('form'), alias = attr.name || attr.ngForm;
                  if (alias) {
                    scope[alias] = controller;
                  }
                  if (parentFormCtrl) {
                    formElement.bind('$destroy', function () {
                      parentFormCtrl.$removeControl(controller);
                      if (alias) {
                        scope[alias] = undefined;
                      }
                      extend(controller, nullFormCtrl);
                    });
                  }
                }
              };
            }
          };
        return isNgForm ? extend(copy(formDirective), { restrict: 'EAC' }) : formDirective;
      }
    ];
  };
  var formDirective = formDirectiveFactory();
  var ngFormDirective = formDirectiveFactory(true);
  var URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
  var EMAIL_REGEXP = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/;
  var inputType = {
      'text': textInputType,
      'number': numberInputType,
      'url': urlInputType,
      'email': emailInputType,
      'radio': radioInputType,
      'checkbox': checkboxInputType,
      'hidden': noop,
      'button': noop,
      'submit': noop,
      'reset': noop
    };
  function isEmpty(value) {
    return isUndefined(value) || value === '' || value === null || value !== value;
  }
  function textInputType(scope, element, attr, ctrl, $sniffer, $browser) {
    var listener = function () {
      var value = element.val();
      if (toBoolean(attr.ngTrim || 'T')) {
        value = trim(value);
      }
      if (ctrl.$viewValue !== value) {
        scope.$apply(function () {
          ctrl.$setViewValue(value);
        });
      }
    };
    if ($sniffer.hasEvent('input')) {
      element.bind('input', listener);
    } else {
      var timeout;
      var deferListener = function () {
        if (!timeout) {
          timeout = $browser.defer(function () {
            listener();
            timeout = null;
          });
        }
      };
      element.bind('keydown', function (event) {
        var key = event.keyCode;
        if (key === 91 || 15 < key && key < 19 || 37 <= key && key <= 40)
          return;
        deferListener();
      });
      element.bind('change', listener);
      if ($sniffer.hasEvent('paste')) {
        element.bind('paste cut', deferListener);
      }
    }
    ctrl.$render = function () {
      element.val(isEmpty(ctrl.$viewValue) ? '' : ctrl.$viewValue);
    };
    var pattern = attr.ngPattern, patternValidator, match;
    var validate = function (regexp, value) {
      if (isEmpty(value) || regexp.test(value)) {
        ctrl.$setValidity('pattern', true);
        return value;
      } else {
        ctrl.$setValidity('pattern', false);
        return undefined;
      }
    };
    if (pattern) {
      match = pattern.match(/^\/(.*)\/([gim]*)$/);
      if (match) {
        pattern = new RegExp(match[1], match[2]);
        patternValidator = function (value) {
          return validate(pattern, value);
        };
      } else {
        patternValidator = function (value) {
          var patternObj = scope.$eval(pattern);
          if (!patternObj || !patternObj.test) {
            throw new Error('Expected ' + pattern + ' to be a RegExp but was ' + patternObj);
          }
          return validate(patternObj, value);
        };
      }
      ctrl.$formatters.push(patternValidator);
      ctrl.$parsers.push(patternValidator);
    }
    if (attr.ngMinlength) {
      var minlength = int(attr.ngMinlength);
      var minLengthValidator = function (value) {
        if (!isEmpty(value) && value.length < minlength) {
          ctrl.$setValidity('minlength', false);
          return undefined;
        } else {
          ctrl.$setValidity('minlength', true);
          return value;
        }
      };
      ctrl.$parsers.push(minLengthValidator);
      ctrl.$formatters.push(minLengthValidator);
    }
    if (attr.ngMaxlength) {
      var maxlength = int(attr.ngMaxlength);
      var maxLengthValidator = function (value) {
        if (!isEmpty(value) && value.length > maxlength) {
          ctrl.$setValidity('maxlength', false);
          return undefined;
        } else {
          ctrl.$setValidity('maxlength', true);
          return value;
        }
      };
      ctrl.$parsers.push(maxLengthValidator);
      ctrl.$formatters.push(maxLengthValidator);
    }
  }
  function numberInputType(scope, element, attr, ctrl, $sniffer, $browser) {
    textInputType(scope, element, attr, ctrl, $sniffer, $browser);
    ctrl.$parsers.push(function (value) {
      var empty = isEmpty(value);
      if (empty || NUMBER_REGEXP.test(value)) {
        ctrl.$setValidity('number', true);
        return value === '' ? null : empty ? value : parseFloat(value);
      } else {
        ctrl.$setValidity('number', false);
        return undefined;
      }
    });
    ctrl.$formatters.push(function (value) {
      return isEmpty(value) ? '' : '' + value;
    });
    if (attr.min) {
      var min = parseFloat(attr.min);
      var minValidator = function (value) {
        if (!isEmpty(value) && value < min) {
          ctrl.$setValidity('min', false);
          return undefined;
        } else {
          ctrl.$setValidity('min', true);
          return value;
        }
      };
      ctrl.$parsers.push(minValidator);
      ctrl.$formatters.push(minValidator);
    }
    if (attr.max) {
      var max = parseFloat(attr.max);
      var maxValidator = function (value) {
        if (!isEmpty(value) && value > max) {
          ctrl.$setValidity('max', false);
          return undefined;
        } else {
          ctrl.$setValidity('max', true);
          return value;
        }
      };
      ctrl.$parsers.push(maxValidator);
      ctrl.$formatters.push(maxValidator);
    }
    ctrl.$formatters.push(function (value) {
      if (isEmpty(value) || isNumber(value)) {
        ctrl.$setValidity('number', true);
        return value;
      } else {
        ctrl.$setValidity('number', false);
        return undefined;
      }
    });
  }
  function urlInputType(scope, element, attr, ctrl, $sniffer, $browser) {
    textInputType(scope, element, attr, ctrl, $sniffer, $browser);
    var urlValidator = function (value) {
      if (isEmpty(value) || URL_REGEXP.test(value)) {
        ctrl.$setValidity('url', true);
        return value;
      } else {
        ctrl.$setValidity('url', false);
        return undefined;
      }
    };
    ctrl.$formatters.push(urlValidator);
    ctrl.$parsers.push(urlValidator);
  }
  function emailInputType(scope, element, attr, ctrl, $sniffer, $browser) {
    textInputType(scope, element, attr, ctrl, $sniffer, $browser);
    var emailValidator = function (value) {
      if (isEmpty(value) || EMAIL_REGEXP.test(value)) {
        ctrl.$setValidity('email', true);
        return value;
      } else {
        ctrl.$setValidity('email', false);
        return undefined;
      }
    };
    ctrl.$formatters.push(emailValidator);
    ctrl.$parsers.push(emailValidator);
  }
  function radioInputType(scope, element, attr, ctrl) {
    if (isUndefined(attr.name)) {
      element.attr('name', nextUid());
    }
    element.bind('click', function () {
      if (element[0].checked) {
        scope.$apply(function () {
          ctrl.$setViewValue(attr.value);
        });
      }
    });
    ctrl.$render = function () {
      var value = attr.value;
      element[0].checked = value == ctrl.$viewValue;
    };
    attr.$observe('value', ctrl.$render);
  }
  function checkboxInputType(scope, element, attr, ctrl) {
    var trueValue = attr.ngTrueValue, falseValue = attr.ngFalseValue;
    if (!isString(trueValue))
      trueValue = true;
    if (!isString(falseValue))
      falseValue = false;
    element.bind('click', function () {
      scope.$apply(function () {
        ctrl.$setViewValue(element[0].checked);
      });
    });
    ctrl.$render = function () {
      element[0].checked = ctrl.$viewValue;
    };
    ctrl.$formatters.push(function (value) {
      return value === trueValue;
    });
    ctrl.$parsers.push(function (value) {
      return value ? trueValue : falseValue;
    });
  }
  var inputDirective = [
      '$browser',
      '$sniffer',
      function ($browser, $sniffer) {
        return {
          restrict: 'E',
          require: '?ngModel',
          link: function (scope, element, attr, ctrl) {
            if (ctrl) {
              (inputType[lowercase(attr.type)] || inputType.text)(scope, element, attr, ctrl, $sniffer, $browser);
            }
          }
        };
      }
    ];
  var VALID_CLASS = 'ng-valid', INVALID_CLASS = 'ng-invalid', PRISTINE_CLASS = 'ng-pristine', DIRTY_CLASS = 'ng-dirty';
  var NgModelController = [
      '$scope',
      '$exceptionHandler',
      '$attrs',
      '$element',
      '$parse',
      function ($scope, $exceptionHandler, $attr, $element, $parse) {
        this.$viewValue = Number.NaN;
        this.$modelValue = Number.NaN;
        this.$parsers = [];
        this.$formatters = [];
        this.$viewChangeListeners = [];
        this.$pristine = true;
        this.$dirty = false;
        this.$valid = true;
        this.$invalid = false;
        this.$name = $attr.name;
        var ngModelGet = $parse($attr.ngModel), ngModelSet = ngModelGet.assign;
        if (!ngModelSet) {
          throw Error(NON_ASSIGNABLE_MODEL_EXPRESSION + $attr.ngModel + ' (' + startingTag($element) + ')');
        }
        this.$render = noop;
        var parentForm = $element.inheritedData('$formController') || nullFormCtrl, invalidCount = 0, $error = this.$error = {};
        $element.addClass(PRISTINE_CLASS);
        toggleValidCss(true);
        function toggleValidCss(isValid, validationErrorKey) {
          validationErrorKey = validationErrorKey ? '-' + snake_case(validationErrorKey, '-') : '';
          $element.removeClass((isValid ? INVALID_CLASS : VALID_CLASS) + validationErrorKey).addClass((isValid ? VALID_CLASS : INVALID_CLASS) + validationErrorKey);
        }
        this.$setValidity = function (validationErrorKey, isValid) {
          if ($error[validationErrorKey] === !isValid)
            return;
          if (isValid) {
            if ($error[validationErrorKey])
              invalidCount--;
            if (!invalidCount) {
              toggleValidCss(true);
              this.$valid = true;
              this.$invalid = false;
            }
          } else {
            toggleValidCss(false);
            this.$invalid = true;
            this.$valid = false;
            invalidCount++;
          }
          $error[validationErrorKey] = !isValid;
          toggleValidCss(isValid, validationErrorKey);
          parentForm.$setValidity(validationErrorKey, isValid, this);
        };
        this.$setPristine = function () {
          this.$dirty = false;
          this.$pristine = true;
          $element.removeClass(DIRTY_CLASS).addClass(PRISTINE_CLASS);
        };
        this.$setViewValue = function (value) {
          this.$viewValue = value;
          if (this.$pristine) {
            this.$dirty = true;
            this.$pristine = false;
            $element.removeClass(PRISTINE_CLASS).addClass(DIRTY_CLASS);
            parentForm.$setDirty();
          }
          forEach(this.$parsers, function (fn) {
            value = fn(value);
          });
          if (this.$modelValue !== value) {
            this.$modelValue = value;
            ngModelSet($scope, value);
            forEach(this.$viewChangeListeners, function (listener) {
              try {
                listener();
              } catch (e) {
                $exceptionHandler(e);
              }
            });
          }
        };
        var ctrl = this;
        $scope.$watch(function ngModelWatch() {
          var value = ngModelGet($scope);
          if (ctrl.$modelValue !== value) {
            var formatters = ctrl.$formatters, idx = formatters.length;
            ctrl.$modelValue = value;
            while (idx--) {
              value = formatters[idx](value);
            }
            if (ctrl.$viewValue !== value) {
              ctrl.$viewValue = value;
              ctrl.$render();
            }
          }
        });
      }
    ];
  var ngModelDirective = function () {
    return {
      require: [
        'ngModel',
        '^?form'
      ],
      controller: NgModelController,
      link: function (scope, element, attr, ctrls) {
        var modelCtrl = ctrls[0], formCtrl = ctrls[1] || nullFormCtrl;
        formCtrl.$addControl(modelCtrl);
        element.bind('$destroy', function () {
          formCtrl.$removeControl(modelCtrl);
        });
      }
    };
  };
  var ngChangeDirective = valueFn({
      require: 'ngModel',
      link: function (scope, element, attr, ctrl) {
        ctrl.$viewChangeListeners.push(function () {
          scope.$eval(attr.ngChange);
        });
      }
    });
  var requiredDirective = function () {
    return {
      require: '?ngModel',
      link: function (scope, elm, attr, ctrl) {
        if (!ctrl)
          return;
        attr.required = true;
        var validator = function (value) {
          if (attr.required && (isEmpty(value) || value === false)) {
            ctrl.$setValidity('required', false);
            return;
          } else {
            ctrl.$setValidity('required', true);
            return value;
          }
        };
        ctrl.$formatters.push(validator);
        ctrl.$parsers.unshift(validator);
        attr.$observe('required', function () {
          validator(ctrl.$viewValue);
        });
      }
    };
  };
  var ngListDirective = function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attr, ctrl) {
        var match = /\/(.*)\//.exec(attr.ngList), separator = match && new RegExp(match[1]) || attr.ngList || ',';
        var parse = function (viewValue) {
          var list = [];
          if (viewValue) {
            forEach(viewValue.split(separator), function (value) {
              if (value)
                list.push(trim(value));
            });
          }
          return list;
        };
        ctrl.$parsers.push(parse);
        ctrl.$formatters.push(function (value) {
          if (isArray(value)) {
            return value.join(', ');
          }
          return undefined;
        });
      }
    };
  };
  var CONSTANT_VALUE_REGEXP = /^(true|false|\d+)$/;
  var ngValueDirective = function () {
    return {
      priority: 100,
      compile: function (tpl, tplAttr) {
        if (CONSTANT_VALUE_REGEXP.test(tplAttr.ngValue)) {
          return function (scope, elm, attr) {
            attr.$set('value', scope.$eval(attr.ngValue));
          };
        } else {
          return function (scope, elm, attr) {
            scope.$watch(attr.ngValue, function valueWatchAction(value) {
              attr.$set('value', value, false);
            });
          };
        }
      }
    };
  };
  var ngBindDirective = ngDirective(function (scope, element, attr) {
      element.addClass('ng-binding').data('$binding', attr.ngBind);
      scope.$watch(attr.ngBind, function ngBindWatchAction(value) {
        element.text(value == undefined ? '' : value);
      });
    });
  var ngBindTemplateDirective = [
      '$interpolate',
      function ($interpolate) {
        return function (scope, element, attr) {
          var interpolateFn = $interpolate(element.attr(attr.$attr.ngBindTemplate));
          element.addClass('ng-binding').data('$binding', interpolateFn);
          attr.$observe('ngBindTemplate', function (value) {
            element.text(value);
          });
        };
      }
    ];
  var ngBindHtmlUnsafeDirective = [function () {
        return function (scope, element, attr) {
          element.addClass('ng-binding').data('$binding', attr.ngBindHtmlUnsafe);
          scope.$watch(attr.ngBindHtmlUnsafe, function ngBindHtmlUnsafeWatchAction(value) {
            element.html(value || '');
          });
        };
      }];
  function classDirective(name, selector) {
    name = 'ngClass' + name;
    return ngDirective(function (scope, element, attr) {
      var oldVal = undefined;
      scope.$watch(attr[name], ngClassWatchAction, true);
      attr.$observe('class', function (value) {
        var ngClass = scope.$eval(attr[name]);
        ngClassWatchAction(ngClass, ngClass);
      });
      if (name !== 'ngClass') {
        scope.$watch('$index', function ($index, old$index) {
          var mod = $index & 1;
          if (mod !== old$index & 1) {
            if (mod === selector) {
              addClass(scope.$eval(attr[name]));
            } else {
              removeClass(scope.$eval(attr[name]));
            }
          }
        });
      }
      function ngClassWatchAction(newVal) {
        if (selector === true || scope.$index % 2 === selector) {
          if (oldVal && !equals(newVal, oldVal)) {
            removeClass(oldVal);
          }
          addClass(newVal);
        }
        oldVal = copy(newVal);
      }
      function removeClass(classVal) {
        if (isObject(classVal) && !isArray(classVal)) {
          classVal = map(classVal, function (v, k) {
            if (v)
              return k;
          });
        }
        element.removeClass(isArray(classVal) ? classVal.join(' ') : classVal);
      }
      function addClass(classVal) {
        if (isObject(classVal) && !isArray(classVal)) {
          classVal = map(classVal, function (v, k) {
            if (v)
              return k;
          });
        }
        if (classVal) {
          element.addClass(isArray(classVal) ? classVal.join(' ') : classVal);
        }
      }
    });
  }
  var ngClassDirective = classDirective('', true);
  var ngClassOddDirective = classDirective('Odd', 0);
  var ngClassEvenDirective = classDirective('Even', 1);
  var ngCloakDirective = ngDirective({
      compile: function (element, attr) {
        attr.$set('ngCloak', undefined);
        element.removeClass('ng-cloak');
      }
    });
  var ngControllerDirective = [function () {
        return {
          scope: true,
          controller: '@'
        };
      }];
  var ngCspDirective = [
      '$sniffer',
      function ($sniffer) {
        return {
          priority: 1000,
          compile: function () {
            $sniffer.csp = true;
          }
        };
      }
    ];
  var ngEventDirectives = {};
  forEach('click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress'.split(' '), function (name) {
    var directiveName = directiveNormalize('ng-' + name);
    ngEventDirectives[directiveName] = [
      '$parse',
      function ($parse) {
        return function (scope, element, attr) {
          var fn = $parse(attr[directiveName]);
          element.bind(lowercase(name), function (event) {
            scope.$apply(function () {
              fn(scope, { $event: event });
            });
          });
        };
      }
    ];
  });
  var ngSubmitDirective = ngDirective(function (scope, element, attrs) {
      element.bind('submit', function () {
        scope.$apply(attrs.ngSubmit);
      });
    });
  var ngIfDirective = [
      '$animator',
      function ($animator) {
        return {
          transclude: 'element',
          priority: 1000,
          terminal: true,
          restrict: 'A',
          compile: function (element, attr, transclude) {
            return function ($scope, $element, $attr) {
              var animate = $animator($scope, $attr);
              var childElement, childScope;
              $scope.$watch($attr.ngIf, function ngIfWatchAction(value) {
                if (childElement) {
                  animate.leave(childElement);
                  childElement = undefined;
                }
                if (childScope) {
                  childScope.$destroy();
                  childScope = undefined;
                }
                if (toBoolean(value)) {
                  childScope = $scope.$new();
                  transclude(childScope, function (clone) {
                    childElement = clone;
                    animate.enter(clone, $element.parent(), $element);
                  });
                }
              });
            };
          }
        };
      }
    ];
  var ngIncludeDirective = [
      '$http',
      '$templateCache',
      '$anchorScroll',
      '$compile',
      '$animator',
      function ($http, $templateCache, $anchorScroll, $compile, $animator) {
        return {
          restrict: 'ECA',
          terminal: true,
          compile: function (element, attr) {
            var srcExp = attr.ngInclude || attr.src, onloadExp = attr.onload || '', autoScrollExp = attr.autoscroll;
            return function (scope, element, attr) {
              var animate = $animator(scope, attr);
              var changeCounter = 0, childScope;
              var clearContent = function () {
                if (childScope) {
                  childScope.$destroy();
                  childScope = null;
                }
                animate.leave(element.contents(), element);
              };
              scope.$watch(srcExp, function ngIncludeWatchAction(src) {
                var thisChangeId = ++changeCounter;
                if (src) {
                  $http.get(src, { cache: $templateCache }).success(function (response) {
                    if (thisChangeId !== changeCounter)
                      return;
                    if (childScope)
                      childScope.$destroy();
                    childScope = scope.$new();
                    animate.leave(element.contents(), element);
                    var contents = jqLite('<div/>').html(response).contents();
                    animate.enter(contents, element);
                    $compile(contents)(childScope);
                    if (isDefined(autoScrollExp) && (!autoScrollExp || scope.$eval(autoScrollExp))) {
                      $anchorScroll();
                    }
                    childScope.$emit('$includeContentLoaded');
                    scope.$eval(onloadExp);
                  }).error(function () {
                    if (thisChangeId === changeCounter)
                      clearContent();
                  });
                  scope.$emit('$includeContentRequested');
                } else {
                  clearContent();
                }
              });
            };
          }
        };
      }
    ];
  var ngInitDirective = ngDirective({
      compile: function () {
        return {
          pre: function (scope, element, attrs) {
            scope.$eval(attrs.ngInit);
          }
        };
      }
    });
  var ngNonBindableDirective = ngDirective({
      terminal: true,
      priority: 1000
    });
  var ngPluralizeDirective = [
      '$locale',
      '$interpolate',
      function ($locale, $interpolate) {
        var BRACE = /{}/g;
        return {
          restrict: 'EA',
          link: function (scope, element, attr) {
            var numberExp = attr.count, whenExp = element.attr(attr.$attr.when), offset = attr.offset || 0, whens = scope.$eval(whenExp), whensExpFns = {}, startSymbol = $interpolate.startSymbol(), endSymbol = $interpolate.endSymbol();
            forEach(whens, function (expression, key) {
              whensExpFns[key] = $interpolate(expression.replace(BRACE, startSymbol + numberExp + '-' + offset + endSymbol));
            });
            scope.$watch(function ngPluralizeWatch() {
              var value = parseFloat(scope.$eval(numberExp));
              if (!isNaN(value)) {
                if (!(value in whens))
                  value = $locale.pluralCat(value - offset);
                return whensExpFns[value](scope, element, true);
              } else {
                return '';
              }
            }, function ngPluralizeWatchAction(newVal) {
              element.text(newVal);
            });
          }
        };
      }
    ];
  var ngRepeatDirective = [
      '$parse',
      '$animator',
      function ($parse, $animator) {
        var NG_REMOVED = '$$NG_REMOVED';
        return {
          transclude: 'element',
          priority: 1000,
          terminal: true,
          compile: function (element, attr, linker) {
            return function ($scope, $element, $attr) {
              var animate = $animator($scope, $attr);
              var expression = $attr.ngRepeat;
              var match = expression.match(/^\s*(.+)\s+in\s+(.*?)\s*(\s+track\s+by\s+(.+)\s*)?$/), trackByExp, trackByExpGetter, trackByIdFn, lhs, rhs, valueIdentifier, keyIdentifier, hashFnLocals = { $id: hashKey };
              if (!match) {
                throw Error('Expected ngRepeat in form of \'_item_ in _collection_[ track by _id_]\' but got \'' + expression + '\'.');
              }
              lhs = match[1];
              rhs = match[2];
              trackByExp = match[4];
              if (trackByExp) {
                trackByExpGetter = $parse(trackByExp);
                trackByIdFn = function (key, value, index) {
                  if (keyIdentifier)
                    hashFnLocals[keyIdentifier] = key;
                  hashFnLocals[valueIdentifier] = value;
                  hashFnLocals.$index = index;
                  return trackByExpGetter($scope, hashFnLocals);
                };
              } else {
                trackByIdFn = function (key, value) {
                  return hashKey(value);
                };
              }
              match = lhs.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/);
              if (!match) {
                throw Error('\'item\' in \'item in collection\' should be identifier or (key, value) but got \'' + lhs + '\'.');
              }
              valueIdentifier = match[3] || match[1];
              keyIdentifier = match[2];
              var lastBlockMap = {};
              $scope.$watchCollection(rhs, function ngRepeatAction(collection) {
                var index, length, cursor = $element, nextCursor, nextBlockMap = {}, arrayLength, childScope, key, value, trackById, collectionKeys, block, nextBlockOrder = [];
                if (isArrayLike(collection)) {
                  collectionKeys = collection;
                } else {
                  collectionKeys = [];
                  for (key in collection) {
                    if (collection.hasOwnProperty(key) && key.charAt(0) != '$') {
                      collectionKeys.push(key);
                    }
                  }
                  collectionKeys.sort();
                }
                arrayLength = collectionKeys.length;
                length = nextBlockOrder.length = collectionKeys.length;
                for (index = 0; index < length; index++) {
                  key = collection === collectionKeys ? index : collectionKeys[index];
                  value = collection[key];
                  trackById = trackByIdFn(key, value, index);
                  if (lastBlockMap.hasOwnProperty(trackById)) {
                    block = lastBlockMap[trackById];
                    delete lastBlockMap[trackById];
                    nextBlockMap[trackById] = block;
                    nextBlockOrder[index] = block;
                  } else if (nextBlockMap.hasOwnProperty(trackById)) {
                    forEach(nextBlockOrder, function (block) {
                      if (block && block.element)
                        lastBlockMap[block.id] = block;
                    });
                    throw new Error('Duplicates in a repeater are not allowed. Repeater: ' + expression + ' key: ' + trackById);
                  } else {
                    nextBlockOrder[index] = { id: trackById };
                    nextBlockMap[trackById] = false;
                  }
                }
                for (key in lastBlockMap) {
                  if (lastBlockMap.hasOwnProperty(key)) {
                    block = lastBlockMap[key];
                    animate.leave(block.element);
                    block.element[0][NG_REMOVED] = true;
                    block.scope.$destroy();
                  }
                }
                for (index = 0, length = collectionKeys.length; index < length; index++) {
                  key = collection === collectionKeys ? index : collectionKeys[index];
                  value = collection[key];
                  block = nextBlockOrder[index];
                  if (block.element) {
                    childScope = block.scope;
                    nextCursor = cursor[0];
                    do {
                      nextCursor = nextCursor.nextSibling;
                    } while (nextCursor && nextCursor[NG_REMOVED]);
                    if (block.element[0] == nextCursor) {
                      cursor = block.element;
                    } else {
                      animate.move(block.element, null, cursor);
                      cursor = block.element;
                    }
                  } else {
                    childScope = $scope.$new();
                  }
                  childScope[valueIdentifier] = value;
                  if (keyIdentifier)
                    childScope[keyIdentifier] = key;
                  childScope.$index = index;
                  childScope.$first = index === 0;
                  childScope.$last = index === arrayLength - 1;
                  childScope.$middle = !(childScope.$first || childScope.$last);
                  if (!block.element) {
                    linker(childScope, function (clone) {
                      animate.enter(clone, null, cursor);
                      cursor = clone;
                      block.scope = childScope;
                      block.element = clone;
                      nextBlockMap[block.id] = block;
                    });
                  }
                }
                lastBlockMap = nextBlockMap;
              });
            };
          }
        };
      }
    ];
  var ngShowDirective = [
      '$animator',
      function ($animator) {
        return function (scope, element, attr) {
          var animate = $animator(scope, attr);
          scope.$watch(attr.ngShow, function ngShowWatchAction(value) {
            animate[toBoolean(value) ? 'show' : 'hide'](element);
          });
        };
      }
    ];
  var ngHideDirective = [
      '$animator',
      function ($animator) {
        return function (scope, element, attr) {
          var animate = $animator(scope, attr);
          scope.$watch(attr.ngHide, function ngHideWatchAction(value) {
            animate[toBoolean(value) ? 'hide' : 'show'](element);
          });
        };
      }
    ];
  var ngStyleDirective = ngDirective(function (scope, element, attr) {
      scope.$watch(attr.ngStyle, function ngStyleWatchAction(newStyles, oldStyles) {
        if (oldStyles && newStyles !== oldStyles) {
          forEach(oldStyles, function (val, style) {
            element.css(style, '');
          });
        }
        if (newStyles)
          element.css(newStyles);
      }, true);
    });
  var ngSwitchDirective = [
      '$animator',
      function ($animator) {
        return {
          restrict: 'EA',
          require: 'ngSwitch',
          controller: [
            '$scope',
            function ngSwitchController() {
              this.cases = {};
            }
          ],
          link: function (scope, element, attr, ngSwitchController) {
            var animate = $animator(scope, attr);
            var watchExpr = attr.ngSwitch || attr.on, selectedTranscludes, selectedElements, selectedScopes = [];
            scope.$watch(watchExpr, function ngSwitchWatchAction(value) {
              for (var i = 0, ii = selectedScopes.length; i < ii; i++) {
                selectedScopes[i].$destroy();
                animate.leave(selectedElements[i]);
              }
              selectedElements = [];
              selectedScopes = [];
              if (selectedTranscludes = ngSwitchController.cases['!' + value] || ngSwitchController.cases['?']) {
                scope.$eval(attr.change);
                forEach(selectedTranscludes, function (selectedTransclude) {
                  var selectedScope = scope.$new();
                  selectedScopes.push(selectedScope);
                  selectedTransclude.transclude(selectedScope, function (caseElement) {
                    var anchor = selectedTransclude.element;
                    selectedElements.push(caseElement);
                    animate.enter(caseElement, anchor.parent(), anchor);
                  });
                });
              }
            });
          }
        };
      }
    ];
  var ngSwitchWhenDirective = ngDirective({
      transclude: 'element',
      priority: 500,
      require: '^ngSwitch',
      compile: function (element, attrs, transclude) {
        return function (scope, element, attr, ctrl) {
          ctrl.cases['!' + attrs.ngSwitchWhen] = ctrl.cases['!' + attrs.ngSwitchWhen] || [];
          ctrl.cases['!' + attrs.ngSwitchWhen].push({
            transclude: transclude,
            element: element
          });
        };
      }
    });
  var ngSwitchDefaultDirective = ngDirective({
      transclude: 'element',
      priority: 500,
      require: '^ngSwitch',
      compile: function (element, attrs, transclude) {
        return function (scope, element, attr, ctrl) {
          ctrl.cases['?'] = ctrl.cases['?'] || [];
          ctrl.cases['?'].push({
            transclude: transclude,
            element: element
          });
        };
      }
    });
  var ngTranscludeDirective = ngDirective({
      controller: [
        '$transclude',
        '$element',
        function ($transclude, $element) {
          $transclude(function (clone) {
            $element.append(clone);
          });
        }
      ]
    });
  var ngViewDirective = [
      '$http',
      '$templateCache',
      '$route',
      '$anchorScroll',
      '$compile',
      '$controller',
      '$animator',
      function ($http, $templateCache, $route, $anchorScroll, $compile, $controller, $animator) {
        return {
          restrict: 'ECA',
          terminal: true,
          link: function (scope, element, attr) {
            var lastScope, onloadExp = attr.onload || '', animate = $animator(scope, attr);
            scope.$on('$routeChangeSuccess', update);
            update();
            function destroyLastScope() {
              if (lastScope) {
                lastScope.$destroy();
                lastScope = null;
              }
            }
            function clearContent() {
              animate.leave(element.contents(), element);
              destroyLastScope();
            }
            function update() {
              var locals = $route.current && $route.current.locals, template = locals && locals.$template;
              if (template) {
                clearContent();
                var enterElements = jqLite('<div></div>').html(template).contents();
                animate.enter(enterElements, element);
                var link = $compile(enterElements), current = $route.current, controller;
                lastScope = current.scope = scope.$new();
                if (current.controller) {
                  locals.$scope = lastScope;
                  controller = $controller(current.controller, locals);
                  if (current.controllerAs) {
                    lastScope[current.controllerAs] = controller;
                  }
                  element.children().data('$ngControllerController', controller);
                }
                link(lastScope);
                lastScope.$emit('$viewContentLoaded');
                lastScope.$eval(onloadExp);
                $anchorScroll();
              } else {
                clearContent();
              }
            }
          }
        };
      }
    ];
  var scriptDirective = [
      '$templateCache',
      function ($templateCache) {
        return {
          restrict: 'E',
          terminal: true,
          compile: function (element, attr) {
            if (attr.type == 'text/ng-template') {
              var templateUrl = attr.id, text = element[0].text;
              $templateCache.put(templateUrl, text);
            }
          }
        };
      }
    ];
  var ngOptionsDirective = valueFn({ terminal: true });
  var selectDirective = [
      '$compile',
      '$parse',
      function ($compile, $parse) {
        var NG_OPTIONS_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*?)(?:\s+track\s+by\s+(.*?))?$/, nullModelCtrl = { $setViewValue: noop };
        return {
          restrict: 'E',
          require: [
            'select',
            '?ngModel'
          ],
          controller: [
            '$element',
            '$scope',
            '$attrs',
            function ($element, $scope, $attrs) {
              var self = this, optionsMap = {}, ngModelCtrl = nullModelCtrl, nullOption, unknownOption;
              self.databound = $attrs.ngModel;
              self.init = function (ngModelCtrl_, nullOption_, unknownOption_) {
                ngModelCtrl = ngModelCtrl_;
                nullOption = nullOption_;
                unknownOption = unknownOption_;
              };
              self.addOption = function (value) {
                optionsMap[value] = true;
                if (ngModelCtrl.$viewValue == value) {
                  $element.val(value);
                  if (unknownOption.parent())
                    unknownOption.remove();
                }
              };
              self.removeOption = function (value) {
                if (this.hasOption(value)) {
                  delete optionsMap[value];
                  if (ngModelCtrl.$viewValue == value) {
                    this.renderUnknownOption(value);
                  }
                }
              };
              self.renderUnknownOption = function (val) {
                var unknownVal = '? ' + hashKey(val) + ' ?';
                unknownOption.val(unknownVal);
                $element.prepend(unknownOption);
                $element.val(unknownVal);
                unknownOption.prop('selected', true);
              };
              self.hasOption = function (value) {
                return optionsMap.hasOwnProperty(value);
              };
              $scope.$on('$destroy', function () {
                self.renderUnknownOption = noop;
              });
            }
          ],
          link: function (scope, element, attr, ctrls) {
            if (!ctrls[1])
              return;
            var selectCtrl = ctrls[0], ngModelCtrl = ctrls[1], multiple = attr.multiple, optionsExp = attr.ngOptions, nullOption = false, emptyOption, optionTemplate = jqLite(document.createElement('option')), optGroupTemplate = jqLite(document.createElement('optgroup')), unknownOption = optionTemplate.clone();
            for (var i = 0, children = element.children(), ii = children.length; i < ii; i++) {
              if (children[i].value == '') {
                emptyOption = nullOption = children.eq(i);
                break;
              }
            }
            selectCtrl.init(ngModelCtrl, nullOption, unknownOption);
            if (multiple && (attr.required || attr.ngRequired)) {
              var requiredValidator = function (value) {
                ngModelCtrl.$setValidity('required', !attr.required || value && value.length);
                return value;
              };
              ngModelCtrl.$parsers.push(requiredValidator);
              ngModelCtrl.$formatters.unshift(requiredValidator);
              attr.$observe('required', function () {
                requiredValidator(ngModelCtrl.$viewValue);
              });
            }
            if (optionsExp)
              Options(scope, element, ngModelCtrl);
            else if (multiple)
              Multiple(scope, element, ngModelCtrl);
            else
              Single(scope, element, ngModelCtrl, selectCtrl);
            function Single(scope, selectElement, ngModelCtrl, selectCtrl) {
              ngModelCtrl.$render = function () {
                var viewValue = ngModelCtrl.$viewValue;
                if (selectCtrl.hasOption(viewValue)) {
                  if (unknownOption.parent())
                    unknownOption.remove();
                  selectElement.val(viewValue);
                  if (viewValue === '')
                    emptyOption.prop('selected', true);
                } else {
                  if (isUndefined(viewValue) && emptyOption) {
                    selectElement.val('');
                  } else {
                    selectCtrl.renderUnknownOption(viewValue);
                  }
                }
              };
              selectElement.bind('change', function () {
                scope.$apply(function () {
                  if (unknownOption.parent())
                    unknownOption.remove();
                  ngModelCtrl.$setViewValue(selectElement.val());
                });
              });
            }
            function Multiple(scope, selectElement, ctrl) {
              var lastView;
              ctrl.$render = function () {
                var items = new HashMap(ctrl.$viewValue);
                forEach(selectElement.find('option'), function (option) {
                  option.selected = isDefined(items.get(option.value));
                });
              };
              scope.$watch(function selectMultipleWatch() {
                if (!equals(lastView, ctrl.$viewValue)) {
                  lastView = copy(ctrl.$viewValue);
                  ctrl.$render();
                }
              });
              selectElement.bind('change', function () {
                scope.$apply(function () {
                  var array = [];
                  forEach(selectElement.find('option'), function (option) {
                    if (option.selected) {
                      array.push(option.value);
                    }
                  });
                  ctrl.$setViewValue(array);
                });
              });
            }
            function Options(scope, selectElement, ctrl) {
              var match;
              if (!(match = optionsExp.match(NG_OPTIONS_REGEXP))) {
                throw Error('Expected ngOptions in form of \'_select_ (as _label_)? for (_key_,)?_value_ in _collection_ (track by _expr_)?\'' + ' but got \'' + optionsExp + '\'.');
              }
              var displayFn = $parse(match[2] || match[1]), valueName = match[4] || match[6], keyName = match[5], groupByFn = $parse(match[3] || ''), valueFn = $parse(match[2] ? match[1] : valueName), valuesFn = $parse(match[7]), track = match[8], trackFn = track ? $parse(match[8]) : null, optionGroupsCache = [[{
                      element: selectElement,
                      label: ''
                    }]];
              if (nullOption) {
                $compile(nullOption)(scope);
                nullOption.removeClass('ng-scope');
                nullOption.remove();
              }
              selectElement.html('');
              selectElement.bind('change', function () {
                scope.$apply(function () {
                  var optionGroup, collection = valuesFn(scope) || [], locals = {}, key, value, optionElement, index, groupIndex, length, groupLength;
                  if (multiple) {
                    value = [];
                    for (groupIndex = 0, groupLength = optionGroupsCache.length; groupIndex < groupLength; groupIndex++) {
                      optionGroup = optionGroupsCache[groupIndex];
                      for (index = 1, length = optionGroup.length; index < length; index++) {
                        if ((optionElement = optionGroup[index].element)[0].selected) {
                          key = optionElement.val();
                          if (keyName)
                            locals[keyName] = key;
                          if (trackFn) {
                            for (var trackIndex = 0; trackIndex < collection.length; trackIndex++) {
                              locals[valueName] = collection[trackIndex];
                              if (trackFn(scope, locals) == key)
                                break;
                            }
                          } else {
                            locals[valueName] = collection[key];
                          }
                          value.push(valueFn(scope, locals));
                        }
                      }
                    }
                  } else {
                    key = selectElement.val();
                    if (key == '?') {
                      value = undefined;
                    } else if (key == '') {
                      value = null;
                    } else {
                      if (trackFn) {
                        for (var trackIndex = 0; trackIndex < collection.length; trackIndex++) {
                          locals[valueName] = collection[trackIndex];
                          if (trackFn(scope, locals) == key) {
                            value = valueFn(scope, locals);
                            break;
                          }
                        }
                      } else {
                        locals[valueName] = collection[key];
                        if (keyName)
                          locals[keyName] = key;
                        value = valueFn(scope, locals);
                      }
                    }
                  }
                  ctrl.$setViewValue(value);
                });
              });
              ctrl.$render = render;
              scope.$watch(render);
              function render() {
                var optionGroups = { '': [] }, optionGroupNames = [''], optionGroupName, optionGroup, option, existingParent, existingOptions, existingOption, modelValue = ctrl.$modelValue, values = valuesFn(scope) || [], keys = keyName ? sortedKeys(values) : values, groupLength, length, groupIndex, index, locals = {}, selected, selectedSet = false, lastElement, element, label;
                if (multiple) {
                  if (trackFn && isArray(modelValue)) {
                    selectedSet = new HashMap([]);
                    for (var trackIndex = 0; trackIndex < modelValue.length; trackIndex++) {
                      locals[valueName] = modelValue[trackIndex];
                      selectedSet.put(trackFn(scope, locals), modelValue[trackIndex]);
                    }
                  } else {
                    selectedSet = new HashMap(modelValue);
                  }
                }
                for (index = 0; length = keys.length, index < length; index++) {
                  locals[valueName] = values[keyName ? locals[keyName] = keys[index] : index];
                  optionGroupName = groupByFn(scope, locals) || '';
                  if (!(optionGroup = optionGroups[optionGroupName])) {
                    optionGroup = optionGroups[optionGroupName] = [];
                    optionGroupNames.push(optionGroupName);
                  }
                  if (multiple) {
                    selected = selectedSet.remove(trackFn ? trackFn(scope, locals) : valueFn(scope, locals)) != undefined;
                  } else {
                    if (trackFn) {
                      var modelCast = {};
                      modelCast[valueName] = modelValue;
                      selected = trackFn(scope, modelCast) === trackFn(scope, locals);
                    } else {
                      selected = modelValue === valueFn(scope, locals);
                    }
                    selectedSet = selectedSet || selected;
                  }
                  label = displayFn(scope, locals);
                  label = label === undefined ? '' : label;
                  optionGroup.push({
                    id: trackFn ? trackFn(scope, locals) : keyName ? keys[index] : index,
                    label: label,
                    selected: selected
                  });
                }
                if (!multiple) {
                  if (nullOption || modelValue === null) {
                    optionGroups[''].unshift({
                      id: '',
                      label: '',
                      selected: !selectedSet
                    });
                  } else if (!selectedSet) {
                    optionGroups[''].unshift({
                      id: '?',
                      label: '',
                      selected: true
                    });
                  }
                }
                for (groupIndex = 0, groupLength = optionGroupNames.length; groupIndex < groupLength; groupIndex++) {
                  optionGroupName = optionGroupNames[groupIndex];
                  optionGroup = optionGroups[optionGroupName];
                  if (optionGroupsCache.length <= groupIndex) {
                    existingParent = {
                      element: optGroupTemplate.clone().attr('label', optionGroupName),
                      label: optionGroup.label
                    };
                    existingOptions = [existingParent];
                    optionGroupsCache.push(existingOptions);
                    selectElement.append(existingParent.element);
                  } else {
                    existingOptions = optionGroupsCache[groupIndex];
                    existingParent = existingOptions[0];
                    if (existingParent.label != optionGroupName) {
                      existingParent.element.attr('label', existingParent.label = optionGroupName);
                    }
                  }
                  lastElement = null;
                  for (index = 0, length = optionGroup.length; index < length; index++) {
                    option = optionGroup[index];
                    if (existingOption = existingOptions[index + 1]) {
                      lastElement = existingOption.element;
                      if (existingOption.label !== option.label) {
                        lastElement.text(existingOption.label = option.label);
                      }
                      if (existingOption.id !== option.id) {
                        lastElement.val(existingOption.id = option.id);
                      }
                      if (lastElement[0].selected !== option.selected) {
                        lastElement.prop('selected', existingOption.selected = option.selected);
                      }
                    } else {
                      if (option.id === '' && nullOption) {
                        element = nullOption;
                      } else {
                        (element = optionTemplate.clone()).val(option.id).attr('selected', option.selected).text(option.label);
                      }
                      existingOptions.push(existingOption = {
                        element: element,
                        label: option.label,
                        id: option.id,
                        selected: option.selected
                      });
                      if (lastElement) {
                        lastElement.after(element);
                      } else {
                        existingParent.element.append(element);
                      }
                      lastElement = element;
                    }
                  }
                  index++;
                  while (existingOptions.length > index) {
                    existingOptions.pop().element.remove();
                  }
                }
                while (optionGroupsCache.length > groupIndex) {
                  optionGroupsCache.pop()[0].element.remove();
                }
              }
            }
          }
        };
      }
    ];
  var optionDirective = [
      '$interpolate',
      function ($interpolate) {
        var nullSelectCtrl = {
            addOption: noop,
            removeOption: noop
          };
        return {
          restrict: 'E',
          priority: 100,
          compile: function (element, attr) {
            if (isUndefined(attr.value)) {
              var interpolateFn = $interpolate(element.text(), true);
              if (!interpolateFn) {
                attr.$set('value', element.text());
              }
            }
            return function (scope, element, attr) {
              var selectCtrlName = '$selectController', parent = element.parent(), selectCtrl = parent.data(selectCtrlName) || parent.parent().data(selectCtrlName);
              if (selectCtrl && selectCtrl.databound) {
                element.prop('selected', false);
              } else {
                selectCtrl = nullSelectCtrl;
              }
              if (interpolateFn) {
                scope.$watch(interpolateFn, function interpolateWatchAction(newVal, oldVal) {
                  attr.$set('value', newVal);
                  if (newVal !== oldVal)
                    selectCtrl.removeOption(oldVal);
                  selectCtrl.addOption(newVal);
                });
              } else {
                selectCtrl.addOption(attr.value);
              }
              element.bind('$destroy', function () {
                selectCtrl.removeOption(attr.value);
              });
            };
          }
        };
      }
    ];
  var styleDirective = valueFn({
      restrict: 'E',
      terminal: true
    });
  bindJQuery();
  publishExternalAPI(angular);
  jqLite(document).ready(function () {
    angularInit(document, bootstrap);
  });
}(window, document));
angular.element(document).find('head').append('<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak{display:none;}ng\\:form{display:block;}</style>');
(function (window, angular, undefined) {
  'use strict';
  angular.module('ngResource', ['ng']).factory('$resource', [
    '$http',
    '$parse',
    function ($http, $parse) {
      var DEFAULT_ACTIONS = {
          'get': { method: 'GET' },
          'save': { method: 'POST' },
          'query': {
            method: 'GET',
            isArray: true
          },
          'remove': { method: 'DELETE' },
          'delete': { method: 'DELETE' }
        };
      var noop = angular.noop, forEach = angular.forEach, extend = angular.extend, copy = angular.copy, isFunction = angular.isFunction, getter = function (obj, path) {
          return $parse(path)(obj);
        };
      function encodeUriSegment(val) {
        return encodeUriQuery(val, true).replace(/%26/gi, '&').replace(/%3D/gi, '=').replace(/%2B/gi, '+');
      }
      function encodeUriQuery(val, pctEncodeSpaces) {
        return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, pctEncodeSpaces ? '%20' : '+');
      }
      function Route(template, defaults) {
        this.template = template = template + '#';
        this.defaults = defaults || {};
        var urlParams = this.urlParams = {};
        forEach(template.split(/\W/), function (param) {
          if (param && new RegExp('(^|[^\\\\]):' + param + '\\W').test(template)) {
            urlParams[param] = true;
          }
        });
        this.template = template.replace(/\\:/g, ':');
      }
      Route.prototype = {
        url: function (params) {
          var self = this, url = this.template, val, encodedVal;
          params = params || {};
          forEach(this.urlParams, function (_, urlParam) {
            val = params.hasOwnProperty(urlParam) ? params[urlParam] : self.defaults[urlParam];
            if (angular.isDefined(val) && val !== null) {
              encodedVal = encodeUriSegment(val);
              url = url.replace(new RegExp(':' + urlParam + '(\\W)', 'g'), encodedVal + '$1');
            } else {
              url = url.replace(new RegExp('(/?):' + urlParam + '(\\W)', 'g'), function (match, leadingSlashes, tail) {
                if (tail.charAt(0) == '/') {
                  return tail;
                } else {
                  return leadingSlashes + tail;
                }
              });
            }
          });
          url = url.replace(/\/?#$/, '');
          var query = [];
          forEach(params, function (value, key) {
            if (!self.urlParams[key]) {
              query.push(encodeUriQuery(key) + '=' + encodeUriQuery(value));
            }
          });
          query.sort();
          url = url.replace(/\/*$/, '');
          return url + (query.length ? '?' + query.join('&') : '');
        }
      };
      function ResourceFactory(url, paramDefaults, actions) {
        var route = new Route(url);
        actions = extend({}, DEFAULT_ACTIONS, actions);
        function extractParams(data, actionParams) {
          var ids = {};
          actionParams = extend({}, paramDefaults, actionParams);
          forEach(actionParams, function (value, key) {
            ids[key] = value.charAt && value.charAt(0) == '@' ? getter(data, value.substr(1)) : value;
          });
          return ids;
        }
        function Resource(value) {
          copy(value || {}, this);
        }
        forEach(actions, function (action, name) {
          action.method = angular.uppercase(action.method);
          var hasBody = action.method == 'POST' || action.method == 'PUT' || action.method == 'PATCH';
          Resource[name] = function (a1, a2, a3, a4) {
            var params = {};
            var data;
            var success = noop;
            var error = null;
            switch (arguments.length) {
            case 4:
              error = a4;
              success = a3;
            case 3:
            case 2:
              if (isFunction(a2)) {
                if (isFunction(a1)) {
                  success = a1;
                  error = a2;
                  break;
                }
                success = a2;
                error = a3;
              } else {
                params = a1;
                data = a2;
                success = a3;
                break;
              }
            case 1:
              if (isFunction(a1))
                success = a1;
              else if (hasBody)
                data = a1;
              else
                params = a1;
              break;
            case 0:
              break;
            default:
              throw 'Expected between 0-4 arguments [params, data, success, error], got ' + arguments.length + ' arguments.';
            }
            var value = this instanceof Resource ? this : action.isArray ? [] : new Resource(data);
            $http({
              method: action.method,
              url: route.url(extend({}, extractParams(data, action.params || {}), params)),
              data: data
            }).then(function (response) {
              var data = response.data;
              if (data) {
                if (action.isArray) {
                  value.length = 0;
                  forEach(data, function (item) {
                    value.push(new Resource(item));
                  });
                } else {
                  copy(data, value);
                }
              }
              (success || noop)(value, response.headers);
            }, error);
            return value;
          };
          Resource.prototype['$' + name] = function (a1, a2, a3) {
            var params = extractParams(this), success = noop, error;
            switch (arguments.length) {
            case 3:
              params = a1;
              success = a2;
              error = a3;
              break;
            case 2:
            case 1:
              if (isFunction(a1)) {
                success = a1;
                error = a2;
              } else {
                params = a1;
                success = a2 || noop;
              }
            case 0:
              break;
            default:
              throw 'Expected between 1-3 arguments [params, success, error], got ' + arguments.length + ' arguments.';
            }
            var data = hasBody ? this : undefined;
            Resource[name].call(this, params, data, success, error);
          };
        });
        Resource.bind = function (additionalParamDefaults) {
          return ResourceFactory(url, extend({}, paramDefaults, additionalParamDefaults), actions);
        };
        return Resource;
      }
      return ResourceFactory;
    }
  ]);
}(window, window.angular));
!function ($) {
  'use strict';
  $(function () {
    $.support.transition = function () {
      var transitionEnd = function () {
          var el = document.createElement('bootstrap'), transEndEventNames = {
              'WebkitTransition': 'webkitTransitionEnd',
              'MozTransition': 'transitionend',
              'OTransition': 'oTransitionEnd otransitionend',
              'transition': 'transitionend'
            }, name;
          for (name in transEndEventNames) {
            if (el.style[name] !== undefined) {
              return transEndEventNames[name];
            }
          }
        }();
      return transitionEnd && { end: transitionEnd };
    }();
  });
}(window.jQuery);
!function ($) {
  'use strict';
  var dismiss = '[data-dismiss="alert"]', Alert = function (el) {
      $(el).on('click', dismiss, this.close);
    };
  Alert.prototype.close = function (e) {
    var $this = $(this), selector = $this.attr('data-target'), $parent;
    if (!selector) {
      selector = $this.attr('href');
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
    }
    $parent = $(selector);
    e && e.preventDefault();
    $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent());
    $parent.trigger(e = $.Event('close'));
    if (e.isDefaultPrevented())
      return;
    $parent.removeClass('in');
    function removeElement() {
      $parent.trigger('closed').remove();
    }
    $.support.transition && $parent.hasClass('fade') ? $parent.on($.support.transition.end, removeElement) : removeElement();
  };
  var old = $.fn.alert;
  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this), data = $this.data('alert');
      if (!data)
        $this.data('alert', data = new Alert(this));
      if (typeof option == 'string')
        data[option].call($this);
    });
  };
  $.fn.alert.Constructor = Alert;
  $.fn.alert.noConflict = function () {
    $.fn.alert = old;
    return this;
  };
  $(document).on('click.alert.data-api', dismiss, Alert.prototype.close);
}(window.jQuery);
!function ($) {
  'use strict';
  var Button = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, $.fn.button.defaults, options);
  };
  Button.prototype.setState = function (state) {
    var d = 'disabled', $el = this.$element, data = $el.data(), val = $el.is('input') ? 'val' : 'html';
    state = state + 'Text';
    data.resetText || $el.data('resetText', $el[val]());
    $el[val](data[state] || this.options[state]);
    setTimeout(function () {
      state == 'loadingText' ? $el.addClass(d).attr(d, d) : $el.removeClass(d).removeAttr(d);
    }, 0);
  };
  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons-radio"]');
    $parent && $parent.find('.active').removeClass('active');
    this.$element.toggleClass('active');
  };
  var old = $.fn.button;
  $.fn.button = function (option) {
    return this.each(function () {
      var $this = $(this), data = $this.data('button'), options = typeof option == 'object' && option;
      if (!data)
        $this.data('button', data = new Button(this, options));
      if (option == 'toggle')
        data.toggle();
      else if (option)
        data.setState(option);
    });
  };
  $.fn.button.defaults = { loadingText: 'loading...' };
  $.fn.button.Constructor = Button;
  $.fn.button.noConflict = function () {
    $.fn.button = old;
    return this;
  };
  $(document).on('click.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target);
    if (!$btn.hasClass('btn'))
      $btn = $btn.closest('.btn');
    $btn.button('toggle');
  });
}(window.jQuery);
!function ($) {
  'use strict';
  var Carousel = function (element, options) {
    this.$element = $(element);
    this.$indicators = this.$element.find('.carousel-indicators');
    this.options = options;
    this.options.pause == 'hover' && this.$element.on('mouseenter', $.proxy(this.pause, this)).on('mouseleave', $.proxy(this.cycle, this));
  };
  Carousel.prototype = {
    cycle: function (e) {
      if (!e)
        this.paused = false;
      if (this.interval)
        clearInterval(this.interval);
      this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval));
      return this;
    },
    getActiveIndex: function () {
      this.$active = this.$element.find('.item.active');
      this.$items = this.$active.parent().children();
      return this.$items.index(this.$active);
    },
    to: function (pos) {
      var activeIndex = this.getActiveIndex(), that = this;
      if (pos > this.$items.length - 1 || pos < 0)
        return;
      if (this.sliding) {
        return this.$element.one('slid', function () {
          that.to(pos);
        });
      }
      if (activeIndex == pos) {
        return this.pause().cycle();
      }
      return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]));
    },
    pause: function (e) {
      if (!e)
        this.paused = true;
      if (this.$element.find('.next, .prev').length && $.support.transition.end) {
        this.$element.trigger($.support.transition.end);
        this.cycle(true);
      }
      clearInterval(this.interval);
      this.interval = null;
      return this;
    },
    next: function () {
      if (this.sliding)
        return;
      return this.slide('next');
    },
    prev: function () {
      if (this.sliding)
        return;
      return this.slide('prev');
    },
    slide: function (type, next) {
      var $active = this.$element.find('.item.active'), $next = next || $active[type](), isCycling = this.interval, direction = type == 'next' ? 'left' : 'right', fallback = type == 'next' ? 'first' : 'last', that = this, e;
      this.sliding = true;
      isCycling && this.pause();
      $next = $next.length ? $next : this.$element.find('.item')[fallback]();
      e = $.Event('slide', {
        relatedTarget: $next[0],
        direction: direction
      });
      if ($next.hasClass('active'))
        return;
      if (this.$indicators.length) {
        this.$indicators.find('.active').removeClass('active');
        this.$element.one('slid', function () {
          var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()]);
          $nextIndicator && $nextIndicator.addClass('active');
        });
      }
      if ($.support.transition && this.$element.hasClass('slide')) {
        this.$element.trigger(e);
        if (e.isDefaultPrevented())
          return;
        $next.addClass(type);
        $next[0].offsetWidth;
        $active.addClass(direction);
        $next.addClass(direction);
        this.$element.one($.support.transition.end, function () {
          $next.removeClass([
            type,
            direction
          ].join(' ')).addClass('active');
          $active.removeClass([
            'active',
            direction
          ].join(' '));
          that.sliding = false;
          setTimeout(function () {
            that.$element.trigger('slid');
          }, 0);
        });
      } else {
        this.$element.trigger(e);
        if (e.isDefaultPrevented())
          return;
        $active.removeClass('active');
        $next.addClass('active');
        this.sliding = false;
        this.$element.trigger('slid');
      }
      isCycling && this.cycle();
      return this;
    }
  };
  var old = $.fn.carousel;
  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this = $(this), data = $this.data('carousel'), options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option), action = typeof option == 'string' ? option : options.slide;
      if (!data)
        $this.data('carousel', data = new Carousel(this, options));
      if (typeof option == 'number')
        data.to(option);
      else if (action)
        data[action]();
      else if (options.interval)
        data.pause().cycle();
    });
  };
  $.fn.carousel.defaults = {
    interval: 5000,
    pause: 'hover'
  };
  $.fn.carousel.Constructor = Carousel;
  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old;
    return this;
  };
  $(document).on('click.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this = $(this), href, $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')), options = $.extend({}, $target.data(), $this.data()), slideIndex;
    $target.carousel(options);
    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('carousel').pause().to(slideIndex).cycle();
    }
    e.preventDefault();
  });
}(window.jQuery);
!function ($) {
  'use strict';
  var Collapse = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, $.fn.collapse.defaults, options);
    if (this.options.parent) {
      this.$parent = $(this.options.parent);
    }
    this.options.toggle && this.toggle();
  };
  Collapse.prototype = {
    constructor: Collapse,
    dimension: function () {
      var hasWidth = this.$element.hasClass('width');
      return hasWidth ? 'width' : 'height';
    },
    show: function () {
      var dimension, scroll, actives, hasData;
      if (this.transitioning || this.$element.hasClass('in'))
        return;
      dimension = this.dimension();
      scroll = $.camelCase([
        'scroll',
        dimension
      ].join('-'));
      actives = this.$parent && this.$parent.find('> .accordion-group > .in');
      if (actives && actives.length) {
        hasData = actives.data('collapse');
        if (hasData && hasData.transitioning)
          return;
        actives.collapse('hide');
        hasData || actives.data('collapse', null);
      }
      this.$element[dimension](0);
      this.transition('addClass', $.Event('show'), 'shown');
      $.support.transition && this.$element[dimension](this.$element[0][scroll]);
    },
    hide: function () {
      var dimension;
      if (this.transitioning || !this.$element.hasClass('in'))
        return;
      dimension = this.dimension();
      this.reset(this.$element[dimension]());
      this.transition('removeClass', $.Event('hide'), 'hidden');
      this.$element[dimension](0);
    },
    reset: function (size) {
      var dimension = this.dimension();
      this.$element.removeClass('collapse')[dimension](size || 'auto')[0].offsetWidth;
      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse');
      return this;
    },
    transition: function (method, startEvent, completeEvent) {
      var that = this, complete = function () {
          if (startEvent.type == 'show')
            that.reset();
          that.transitioning = 0;
          that.$element.trigger(completeEvent);
        };
      this.$element.trigger(startEvent);
      if (startEvent.isDefaultPrevented())
        return;
      this.transitioning = 1;
      this.$element[method]('in');
      $.support.transition && this.$element.hasClass('collapse') ? this.$element.one($.support.transition.end, complete) : complete();
    },
    toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']();
    }
  };
  var old = $.fn.collapse;
  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this = $(this), data = $this.data('collapse'), options = $.extend({}, $.fn.collapse.defaults, $this.data(), typeof option == 'object' && option);
      if (!data)
        $this.data('collapse', data = new Collapse(this, options));
      if (typeof option == 'string')
        data[option]();
    });
  };
  $.fn.collapse.defaults = { toggle: true };
  $.fn.collapse.Constructor = Collapse;
  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old;
    return this;
  };
  $(document).on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this = $(this), href, target = $this.attr('data-target') || e.preventDefault() || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''), option = $(target).data('collapse') ? 'toggle' : $this.data();
    $this[$(target).hasClass('in') ? 'addClass' : 'removeClass']('collapsed');
    $(target).collapse(option);
  });
}(window.jQuery);
!function ($) {
  'use strict';
  var toggle = '[data-toggle=dropdown]', Dropdown = function (element) {
      var $el = $(element).on('click.dropdown.data-api', this.toggle);
      $('html').on('click.dropdown.data-api', function () {
        $el.parent().removeClass('open');
      });
    };
  Dropdown.prototype = {
    constructor: Dropdown,
    toggle: function (e) {
      var $this = $(this), $parent, isActive;
      if ($this.is('.disabled, :disabled'))
        return;
      $parent = getParent($this);
      isActive = $parent.hasClass('open');
      clearMenus();
      if (!isActive) {
        if ('ontouchstart' in document.documentElement) {
          $('<div class="dropdown-backdrop"/>').insertBefore($(this)).on('click', clearMenus);
        }
        $parent.toggleClass('open');
      }
      $this.focus();
      return false;
    },
    keydown: function (e) {
      var $this, $items, $active, $parent, isActive, index;
      if (!/(38|40|27)/.test(e.keyCode))
        return;
      $this = $(this);
      e.preventDefault();
      e.stopPropagation();
      if ($this.is('.disabled, :disabled'))
        return;
      $parent = getParent($this);
      isActive = $parent.hasClass('open');
      if (!isActive || isActive && e.keyCode == 27) {
        if (e.which == 27)
          $parent.find(toggle).focus();
        return $this.click();
      }
      $items = $('[role=menu] li:not(.divider):visible a', $parent);
      if (!$items.length)
        return;
      index = $items.index($items.filter(':focus'));
      if (e.keyCode == 38 && index > 0)
        index--;
      if (e.keyCode == 40 && index < $items.length - 1)
        index++;
      if (!~index)
        index = 0;
      $items.eq(index).focus();
    }
  };
  function clearMenus() {
    $('.dropdown-backdrop').remove();
    $(toggle).each(function () {
      getParent($(this)).removeClass('open');
    });
  }
  function getParent($this) {
    var selector = $this.attr('data-target'), $parent;
    if (!selector) {
      selector = $this.attr('href');
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '');
    }
    $parent = selector && $(selector);
    if (!$parent || !$parent.length)
      $parent = $this.parent();
    return $parent;
  }
  var old = $.fn.dropdown;
  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this), data = $this.data('dropdown');
      if (!data)
        $this.data('dropdown', data = new Dropdown(this));
      if (typeof option == 'string')
        data[option].call($this);
    });
  };
  $.fn.dropdown.Constructor = Dropdown;
  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old;
    return this;
  };
  $(document).on('click.dropdown.data-api', clearMenus).on('click.dropdown.data-api', '.dropdown form', function (e) {
    e.stopPropagation();
  }).on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle).on('keydown.dropdown.data-api', toggle + ', [role=menu]', Dropdown.prototype.keydown);
}(window.jQuery);
!function ($) {
  'use strict';
  var Modal = function (element, options) {
    this.options = options;
    this.$element = $(element).delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this));
    this.options.remote && this.$element.find('.modal-body').load(this.options.remote);
  };
  Modal.prototype = {
    constructor: Modal,
    toggle: function () {
      return this[!this.isShown ? 'show' : 'hide']();
    },
    show: function () {
      var that = this, e = $.Event('show');
      this.$element.trigger(e);
      if (this.isShown || e.isDefaultPrevented())
        return;
      this.isShown = true;
      this.escape();
      this.backdrop(function () {
        var transition = $.support.transition && that.$element.hasClass('fade');
        if (!that.$element.parent().length) {
          that.$element.appendTo(document.body);
        }
        that.$element.show();
        if (transition) {
          that.$element[0].offsetWidth;
        }
        that.$element.addClass('in').attr('aria-hidden', false);
        that.enforceFocus();
        transition ? that.$element.one($.support.transition.end, function () {
          that.$element.focus().trigger('shown');
        }) : that.$element.focus().trigger('shown');
      });
    },
    hide: function (e) {
      e && e.preventDefault();
      var that = this;
      e = $.Event('hide');
      this.$element.trigger(e);
      if (!this.isShown || e.isDefaultPrevented())
        return;
      this.isShown = false;
      this.escape();
      $(document).off('focusin.modal');
      this.$element.removeClass('in').attr('aria-hidden', true);
      $.support.transition && this.$element.hasClass('fade') ? this.hideWithTransition() : this.hideModal();
    },
    enforceFocus: function () {
      var that = this;
      $(document).on('focusin.modal', function (e) {
        if (that.$element[0] !== e.target && !that.$element.has(e.target).length) {
          that.$element.focus();
        }
      });
    },
    escape: function () {
      var that = this;
      if (this.isShown && this.options.keyboard) {
        this.$element.on('keyup.dismiss.modal', function (e) {
          e.which == 27 && that.hide();
        });
      } else if (!this.isShown) {
        this.$element.off('keyup.dismiss.modal');
      }
    },
    hideWithTransition: function () {
      var that = this, timeout = setTimeout(function () {
          that.$element.off($.support.transition.end);
          that.hideModal();
        }, 500);
      this.$element.one($.support.transition.end, function () {
        clearTimeout(timeout);
        that.hideModal();
      });
    },
    hideModal: function () {
      var that = this;
      this.$element.hide();
      this.backdrop(function () {
        that.removeBackdrop();
        that.$element.trigger('hidden');
      });
    },
    removeBackdrop: function () {
      this.$backdrop && this.$backdrop.remove();
      this.$backdrop = null;
    },
    backdrop: function (callback) {
      var that = this, animate = this.$element.hasClass('fade') ? 'fade' : '';
      if (this.isShown && this.options.backdrop) {
        var doAnimate = $.support.transition && animate;
        this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />').appendTo(document.body);
        this.$backdrop.click(this.options.backdrop == 'static' ? $.proxy(this.$element[0].focus, this.$element[0]) : $.proxy(this.hide, this));
        if (doAnimate)
          this.$backdrop[0].offsetWidth;
        this.$backdrop.addClass('in');
        if (!callback)
          return;
        doAnimate ? this.$backdrop.one($.support.transition.end, callback) : callback();
      } else if (!this.isShown && this.$backdrop) {
        this.$backdrop.removeClass('in');
        $.support.transition && this.$element.hasClass('fade') ? this.$backdrop.one($.support.transition.end, callback) : callback();
      } else if (callback) {
        callback();
      }
    }
  };
  var old = $.fn.modal;
  $.fn.modal = function (option) {
    return this.each(function () {
      var $this = $(this), data = $this.data('modal'), options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option);
      if (!data)
        $this.data('modal', data = new Modal(this, options));
      if (typeof option == 'string')
        data[option]();
      else if (options.show)
        data.show();
    });
  };
  $.fn.modal.defaults = {
    backdrop: true,
    keyboard: true,
    show: true
  };
  $.fn.modal.Constructor = Modal;
  $.fn.modal.noConflict = function () {
    $.fn.modal = old;
    return this;
  };
  $(document).on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this), href = $this.attr('href'), $target = $($this.attr('data-target') || href && href.replace(/.*(?=#[^\s]+$)/, '')), option = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data());
    e.preventDefault();
    $target.modal(option).one('hide', function () {
      $this.focus();
    });
  });
}(window.jQuery);
!function ($) {
  'use strict';
  var Tooltip = function (element, options) {
    this.init('tooltip', element, options);
  };
  Tooltip.prototype = {
    constructor: Tooltip,
    init: function (type, element, options) {
      var eventIn, eventOut, triggers, trigger, i;
      this.type = type;
      this.$element = $(element);
      this.options = this.getOptions(options);
      this.enabled = true;
      triggers = this.options.trigger.split(' ');
      for (i = triggers.length; i--;) {
        trigger = triggers[i];
        if (trigger == 'click') {
          this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this));
        } else if (trigger != 'manual') {
          eventIn = trigger == 'hover' ? 'mouseenter' : 'focus';
          eventOut = trigger == 'hover' ? 'mouseleave' : 'blur';
          this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this));
          this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this));
        }
      }
      this.options.selector ? this._options = $.extend({}, this.options, {
        trigger: 'manual',
        selector: ''
      }) : this.fixTitle();
    },
    getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, this.$element.data(), options);
      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay,
          hide: options.delay
        };
      }
      return options;
    },
    enter: function (e) {
      var defaults = $.fn[this.type].defaults, options = {}, self;
      this._options && $.each(this._options, function (key, value) {
        if (defaults[key] != value)
          options[key] = value;
      }, this);
      self = $(e.currentTarget)[this.type](options).data(this.type);
      if (!self.options.delay || !self.options.delay.show)
        return self.show();
      clearTimeout(this.timeout);
      self.hoverState = 'in';
      this.timeout = setTimeout(function () {
        if (self.hoverState == 'in')
          self.show();
      }, self.options.delay.show);
    },
    leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type);
      if (this.timeout)
        clearTimeout(this.timeout);
      if (!self.options.delay || !self.options.delay.hide)
        return self.hide();
      self.hoverState = 'out';
      this.timeout = setTimeout(function () {
        if (self.hoverState == 'out')
          self.hide();
      }, self.options.delay.hide);
    },
    show: function () {
      var $tip, pos, actualWidth, actualHeight, placement, tp, e = $.Event('show');
      if (this.hasContent() && this.enabled) {
        this.$element.trigger(e);
        if (e.isDefaultPrevented())
          return;
        $tip = this.tip();
        this.setContent();
        if (this.options.animation) {
          $tip.addClass('fade');
        }
        placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement;
        $tip.detach().css({
          top: 0,
          left: 0,
          display: 'block'
        });
        this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element);
        pos = this.getPosition();
        actualWidth = $tip[0].offsetWidth;
        actualHeight = $tip[0].offsetHeight;
        switch (placement) {
        case 'bottom':
          tp = {
            top: pos.top + pos.height,
            left: pos.left + pos.width / 2 - actualWidth / 2
          };
          break;
        case 'top':
          tp = {
            top: pos.top - actualHeight,
            left: pos.left + pos.width / 2 - actualWidth / 2
          };
          break;
        case 'left':
          tp = {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left - actualWidth
          };
          break;
        case 'right':
          tp = {
            top: pos.top + pos.height / 2 - actualHeight / 2,
            left: pos.left + pos.width
          };
          break;
        }
        this.applyPlacement(tp, placement);
        this.$element.trigger('shown');
      }
    },
    applyPlacement: function (offset, placement) {
      var $tip = this.tip(), width = $tip[0].offsetWidth, height = $tip[0].offsetHeight, actualWidth, actualHeight, delta, replace;
      $tip.offset(offset).addClass(placement).addClass('in');
      actualWidth = $tip[0].offsetWidth;
      actualHeight = $tip[0].offsetHeight;
      if (placement == 'top' && actualHeight != height) {
        offset.top = offset.top + height - actualHeight;
        replace = true;
      }
      if (placement == 'bottom' || placement == 'top') {
        delta = 0;
        if (offset.left < 0) {
          delta = offset.left * -2;
          offset.left = 0;
          $tip.offset(offset);
          actualWidth = $tip[0].offsetWidth;
          actualHeight = $tip[0].offsetHeight;
        }
        this.replaceArrow(delta - width + actualWidth, actualWidth, 'left');
      } else {
        this.replaceArrow(actualHeight - height, actualHeight, 'top');
      }
      if (replace)
        $tip.offset(offset);
    },
    replaceArrow: function (delta, dimension, position) {
      this.arrow().css(position, delta ? 50 * (1 - delta / dimension) + '%' : '');
    },
    setContent: function () {
      var $tip = this.tip(), title = this.getTitle();
      $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title);
      $tip.removeClass('fade in top bottom left right');
    },
    hide: function () {
      var that = this, $tip = this.tip(), e = $.Event('hide');
      this.$element.trigger(e);
      if (e.isDefaultPrevented())
        return;
      $tip.removeClass('in');
      function removeWithAnimation() {
        var timeout = setTimeout(function () {
            $tip.off($.support.transition.end).detach();
          }, 500);
        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout);
          $tip.detach();
        });
      }
      $.support.transition && this.$tip.hasClass('fade') ? removeWithAnimation() : $tip.detach();
      this.$element.trigger('hidden');
      return this;
    },
    fixTitle: function () {
      var $e = this.$element;
      if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').attr('title', '');
      }
    },
    hasContent: function () {
      return this.getTitle();
    },
    getPosition: function () {
      var el = this.$element[0];
      return $.extend({}, typeof el.getBoundingClientRect == 'function' ? el.getBoundingClientRect() : {
        width: el.offsetWidth,
        height: el.offsetHeight
      }, this.$element.offset());
    },
    getTitle: function () {
      var title, $e = this.$element, o = this.options;
      title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title);
      return title;
    },
    tip: function () {
      return this.$tip = this.$tip || $(this.options.template);
    },
    arrow: function () {
      return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow');
    },
    validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide();
        this.$element = null;
        this.options = null;
      }
    },
    enable: function () {
      this.enabled = true;
    },
    disable: function () {
      this.enabled = false;
    },
    toggleEnabled: function () {
      this.enabled = !this.enabled;
    },
    toggle: function (e) {
      var self = e ? $(e.currentTarget)[this.type](this._options).data(this.type) : this;
      self.tip().hasClass('in') ? self.hide() : self.show();
    },
    destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type);
    }
  };
  var old = $.fn.tooltip;
  $.fn.tooltip = function (option) {
    return this.each(function () {
      var $this = $(this), data = $this.data('tooltip'), options = typeof option == 'object' && option;
      if (!data)
        $this.data('tooltip', data = new Tooltip(this, options));
      if (typeof option == 'string')
        data[option]();
    });
  };
  $.fn.tooltip.Constructor = Tooltip;
  $.fn.tooltip.defaults = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false
  };
  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old;
    return this;
  };
}(window.jQuery);
!function ($) {
  'use strict';
  var Popover = function (element, options) {
    this.init('popover', element, options);
  };
  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {
    constructor: Popover,
    setContent: function () {
      var $tip = this.tip(), title = this.getTitle(), content = this.getContent();
      $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title);
      $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content);
      $tip.removeClass('fade top bottom left right in');
    },
    hasContent: function () {
      return this.getTitle() || this.getContent();
    },
    getContent: function () {
      var content, $e = this.$element, o = this.options;
      content = (typeof o.content == 'function' ? o.content.call($e[0]) : o.content) || $e.attr('data-content');
      return content;
    },
    tip: function () {
      if (!this.$tip) {
        this.$tip = $(this.options.template);
      }
      return this.$tip;
    },
    destroy: function () {
      this.hide().$element.off('.' + this.type).removeData(this.type);
    }
  });
  var old = $.fn.popover;
  $.fn.popover = function (option) {
    return this.each(function () {
      var $this = $(this), data = $this.data('popover'), options = typeof option == 'object' && option;
      if (!data)
        $this.data('popover', data = new Popover(this, options));
      if (typeof option == 'string')
        data[option]();
    });
  };
  $.fn.popover.Constructor = Popover;
  $.fn.popover.defaults = $.extend({}, $.fn.tooltip.defaults, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  });
  $.fn.popover.noConflict = function () {
    $.fn.popover = old;
    return this;
  };
}(window.jQuery);
!function ($) {
  'use strict';
  function ScrollSpy(element, options) {
    var process = $.proxy(this.process, this), $element = $(element).is('body') ? $(window) : $(element), href;
    this.options = $.extend({}, $.fn.scrollspy.defaults, options);
    this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process);
    this.selector = (this.options.target || (href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') || '') + ' .nav li > a';
    this.$body = $('body');
    this.refresh();
    this.process();
  }
  ScrollSpy.prototype = {
    constructor: ScrollSpy,
    refresh: function () {
      var self = this, $targets;
      this.offsets = $([]);
      this.targets = $([]);
      $targets = this.$body.find(this.selector).map(function () {
        var $el = $(this), href = $el.data('target') || $el.attr('href'), $href = /^#\w/.test(href) && $(href);
        return $href && $href.length && [[
            $href.position().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()),
            href
          ]] || null;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).each(function () {
        self.offsets.push(this[0]);
        self.targets.push(this[1]);
      });
    },
    process: function () {
      var scrollTop = this.$scrollElement.scrollTop() + this.options.offset, scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight, maxScroll = scrollHeight - this.$scrollElement.height(), offsets = this.offsets, targets = this.targets, activeTarget = this.activeTarget, i;
      if (scrollTop >= maxScroll) {
        return activeTarget != (i = targets.last()[0]) && this.activate(i);
      }
      for (i = offsets.length; i--;) {
        activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i]);
      }
    },
    activate: function (target) {
      var active, selector;
      this.activeTarget = target;
      $(this.selector).parent('.active').removeClass('active');
      selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]';
      active = $(selector).parent('li').addClass('active');
      if (active.parent('.dropdown-menu').length) {
        active = active.closest('li.dropdown').addClass('active');
      }
      active.trigger('activate');
    }
  };
  var old = $.fn.scrollspy;
  $.fn.scrollspy = function (option) {
    return this.each(function () {
      var $this = $(this), data = $this.data('scrollspy'), options = typeof option == 'object' && option;
      if (!data)
        $this.data('scrollspy', data = new ScrollSpy(this, options));
      if (typeof option == 'string')
        data[option]();
    });
  };
  $.fn.scrollspy.Constructor = ScrollSpy;
  $.fn.scrollspy.defaults = { offset: 10 };
  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old;
    return this;
  };
  $(window).on('load', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this);
      $spy.scrollspy($spy.data());
    });
  });
}(window.jQuery);
!function ($) {
  'use strict';
  var Tab = function (element) {
    this.element = $(element);
  };
  Tab.prototype = {
    constructor: Tab,
    show: function () {
      var $this = this.element, $ul = $this.closest('ul:not(.dropdown-menu)'), selector = $this.attr('data-target'), previous, $target, e;
      if (!selector) {
        selector = $this.attr('href');
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
      }
      if ($this.parent('li').hasClass('active'))
        return;
      previous = $ul.find('.active:last a')[0];
      e = $.Event('show', { relatedTarget: previous });
      $this.trigger(e);
      if (e.isDefaultPrevented())
        return;
      $target = $(selector);
      this.activate($this.parent('li'), $ul);
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown',
          relatedTarget: previous
        });
      });
    },
    activate: function (element, container, callback) {
      var $active = container.find('> .active'), transition = callback && $.support.transition && $active.hasClass('fade');
      function next() {
        $active.removeClass('active').find('> .dropdown-menu > .active').removeClass('active');
        element.addClass('active');
        if (transition) {
          element[0].offsetWidth;
          element.addClass('in');
        } else {
          element.removeClass('fade');
        }
        if (element.parent('.dropdown-menu')) {
          element.closest('li.dropdown').addClass('active');
        }
        callback && callback();
      }
      transition ? $active.one($.support.transition.end, next) : next();
      $active.removeClass('in');
    }
  };
  var old = $.fn.tab;
  $.fn.tab = function (option) {
    return this.each(function () {
      var $this = $(this), data = $this.data('tab');
      if (!data)
        $this.data('tab', data = new Tab(this));
      if (typeof option == 'string')
        data[option]();
    });
  };
  $.fn.tab.Constructor = Tab;
  $.fn.tab.noConflict = function () {
    $.fn.tab = old;
    return this;
  };
  $(document).on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
}(window.jQuery);
!function ($) {
  'use strict';
  var Typeahead = function (element, options) {
    this.$element = $(element);
    this.options = $.extend({}, $.fn.typeahead.defaults, options);
    this.matcher = this.options.matcher || this.matcher;
    this.sorter = this.options.sorter || this.sorter;
    this.highlighter = this.options.highlighter || this.highlighter;
    this.updater = this.options.updater || this.updater;
    this.source = this.options.source;
    this.$menu = $(this.options.menu);
    this.shown = false;
    this.listen();
  };
  Typeahead.prototype = {
    constructor: Typeahead,
    select: function () {
      var val = this.$menu.find('.active').attr('data-value');
      this.$element.val(this.updater(val)).change();
      return this.hide();
    },
    updater: function (item) {
      return item;
    },
    show: function () {
      var pos = $.extend({}, this.$element.position(), { height: this.$element[0].offsetHeight });
      this.$menu.insertAfter(this.$element).css({
        top: pos.top + pos.height,
        left: pos.left
      }).show();
      this.shown = true;
      return this;
    },
    hide: function () {
      this.$menu.hide();
      this.shown = false;
      return this;
    },
    lookup: function (event) {
      var items;
      this.query = this.$element.val();
      if (!this.query || this.query.length < this.options.minLength) {
        return this.shown ? this.hide() : this;
      }
      items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source;
      return items ? this.process(items) : this;
    },
    process: function (items) {
      var that = this;
      items = $.grep(items, function (item) {
        return that.matcher(item);
      });
      items = this.sorter(items);
      if (!items.length) {
        return this.shown ? this.hide() : this;
      }
      return this.render(items.slice(0, this.options.items)).show();
    },
    matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase());
    },
    sorter: function (items) {
      var beginswith = [], caseSensitive = [], caseInsensitive = [], item;
      while (item = items.shift()) {
        if (!item.toLowerCase().indexOf(this.query.toLowerCase()))
          beginswith.push(item);
        else if (~item.indexOf(this.query))
          caseSensitive.push(item);
        else
          caseInsensitive.push(item);
      }
      return beginswith.concat(caseSensitive, caseInsensitive);
    },
    highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
        return '<strong>' + match + '</strong>';
      });
    },
    render: function (items) {
      var that = this;
      items = $(items).map(function (i, item) {
        i = $(that.options.item).attr('data-value', item);
        i.find('a').html(that.highlighter(item));
        return i[0];
      });
      items.first().addClass('active');
      this.$menu.html(items);
      return this;
    },
    next: function (event) {
      var active = this.$menu.find('.active').removeClass('active'), next = active.next();
      if (!next.length) {
        next = $(this.$menu.find('li')[0]);
      }
      next.addClass('active');
    },
    prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active'), prev = active.prev();
      if (!prev.length) {
        prev = this.$menu.find('li').last();
      }
      prev.addClass('active');
    },
    listen: function () {
      this.$element.on('focus', $.proxy(this.focus, this)).on('blur', $.proxy(this.blur, this)).on('keypress', $.proxy(this.keypress, this)).on('keyup', $.proxy(this.keyup, this));
      if (this.eventSupported('keydown')) {
        this.$element.on('keydown', $.proxy(this.keydown, this));
      }
      this.$menu.on('click', $.proxy(this.click, this)).on('mouseenter', 'li', $.proxy(this.mouseenter, this)).on('mouseleave', 'li', $.proxy(this.mouseleave, this));
    },
    eventSupported: function (eventName) {
      var isSupported = eventName in this.$element;
      if (!isSupported) {
        this.$element.setAttribute(eventName, 'return;');
        isSupported = typeof this.$element[eventName] === 'function';
      }
      return isSupported;
    },
    move: function (e) {
      if (!this.shown)
        return;
      switch (e.keyCode) {
      case 9:
      case 13:
      case 27:
        e.preventDefault();
        break;
      case 38:
        e.preventDefault();
        this.prev();
        break;
      case 40:
        e.preventDefault();
        this.next();
        break;
      }
      e.stopPropagation();
    },
    keydown: function (e) {
      this.suppressKeyPressRepeat = ~$.inArray(e.keyCode, [
        40,
        38,
        9,
        13,
        27
      ]);
      this.move(e);
    },
    keypress: function (e) {
      if (this.suppressKeyPressRepeat)
        return;
      this.move(e);
    },
    keyup: function (e) {
      switch (e.keyCode) {
      case 40:
      case 38:
      case 16:
      case 17:
      case 18:
        break;
      case 9:
      case 13:
        if (!this.shown)
          return;
        this.select();
        break;
      case 27:
        if (!this.shown)
          return;
        this.hide();
        break;
      default:
        this.lookup();
      }
      e.stopPropagation();
      e.preventDefault();
    },
    focus: function (e) {
      this.focused = true;
    },
    blur: function (e) {
      this.focused = false;
      if (!this.mousedover && this.shown)
        this.hide();
    },
    click: function (e) {
      e.stopPropagation();
      e.preventDefault();
      this.select();
      this.$element.focus();
    },
    mouseenter: function (e) {
      this.mousedover = true;
      this.$menu.find('.active').removeClass('active');
      $(e.currentTarget).addClass('active');
    },
    mouseleave: function (e) {
      this.mousedover = false;
      if (!this.focused && this.shown)
        this.hide();
    }
  };
  var old = $.fn.typeahead;
  $.fn.typeahead = function (option) {
    return this.each(function () {
      var $this = $(this), data = $this.data('typeahead'), options = typeof option == 'object' && option;
      if (!data)
        $this.data('typeahead', data = new Typeahead(this, options));
      if (typeof option == 'string')
        data[option]();
    });
  };
  $.fn.typeahead.defaults = {
    source: [],
    items: 8,
    menu: '<ul class="typeahead dropdown-menu"></ul>',
    item: '<li><a href="#"></a></li>',
    minLength: 1
  };
  $.fn.typeahead.Constructor = Typeahead;
  $.fn.typeahead.noConflict = function () {
    $.fn.typeahead = old;
    return this;
  };
  $(document).on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
    var $this = $(this);
    if ($this.data('typeahead'))
      return;
    $this.typeahead($this.data());
  });
}(window.jQuery);
!function ($) {
  'use strict';
  var Affix = function (element, options) {
    this.options = $.extend({}, $.fn.affix.defaults, options);
    this.$window = $(window).on('scroll.affix.data-api', $.proxy(this.checkPosition, this)).on('click.affix.data-api', $.proxy(function () {
      setTimeout($.proxy(this.checkPosition, this), 1);
    }, this));
    this.$element = $(element);
    this.checkPosition();
  };
  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible'))
      return;
    var scrollHeight = $(document).height(), scrollTop = this.$window.scrollTop(), position = this.$element.offset(), offset = this.options.offset, offsetBottom = offset.bottom, offsetTop = offset.top, reset = 'affix affix-top affix-bottom', affix;
    if (typeof offset != 'object')
      offsetBottom = offsetTop = offset;
    if (typeof offsetTop == 'function')
      offsetTop = offset.top();
    if (typeof offsetBottom == 'function')
      offsetBottom = offset.bottom();
    affix = this.unpin != null && scrollTop + this.unpin <= position.top ? false : offsetBottom != null && position.top + this.$element.height() >= scrollHeight - offsetBottom ? 'bottom' : offsetTop != null && scrollTop <= offsetTop ? 'top' : false;
    if (this.affixed === affix)
      return;
    this.affixed = affix;
    this.unpin = affix == 'bottom' ? position.top - scrollTop : null;
    this.$element.removeClass(reset).addClass('affix' + (affix ? '-' + affix : ''));
  };
  var old = $.fn.affix;
  $.fn.affix = function (option) {
    return this.each(function () {
      var $this = $(this), data = $this.data('affix'), options = typeof option == 'object' && option;
      if (!data)
        $this.data('affix', data = new Affix(this, options));
      if (typeof option == 'string')
        data[option]();
    });
  };
  $.fn.affix.Constructor = Affix;
  $.fn.affix.defaults = { offset: 0 };
  $.fn.affix.noConflict = function () {
    $.fn.affix = old;
    return this;
  };
  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this), data = $spy.data();
      data.offset = data.offset || {};
      data.offsetBottom && (data.offset.bottom = data.offsetBottom);
      data.offsetTop && (data.offset.top = data.offsetTop);
      $spy.affix(data);
    });
  });
}(window.jQuery);
angular.module('$strap.config', []).value('$strapConfig', {});
angular.module('$strap.filters', ['$strap.config']);
angular.module('$strap.directives', ['$strap.config']);
angular.module('$strap', [
  '$strap.filters',
  '$strap.directives',
  '$strap.config'
]);
'use strict';
angular.module('$strap.directives').directive('bsAlert', [
  '$parse',
  '$timeout',
  '$compile',
  function ($parse, $timeout, $compile) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
        var getter = $parse(attrs.bsAlert), setter = getter.assign, value = getter(scope);
        if (!attrs.bsAlert) {
          if (angular.isUndefined(attrs.closeButton) || attrs.closeButton !== '0' && attrs.closeButton !== 'false') {
            element.prepend('<button type="button" class="close" data-dismiss="alert">&times;</button>');
          }
        } else {
          scope.$watch(attrs.bsAlert, function (newValue, oldValue) {
            value = newValue;
            element.html((newValue.title ? '<strong>' + newValue.title + '</strong>&nbsp;' : '') + newValue.content || '');
            if (!!newValue.closed) {
              element.hide();
            }
            $compile(element.contents())(scope);
            if (newValue.type || oldValue.type) {
              oldValue.type && element.removeClass('alert-' + oldValue.type);
              newValue.type && element.addClass('alert-' + newValue.type);
            }
            if (angular.isUndefined(attrs.closeButton) || attrs.closeButton !== '0' && attrs.closeButton !== 'false') {
              element.prepend('<button type="button" class="close" data-dismiss="alert">&times;</button>');
            }
          }, true);
        }
        element.addClass('alert').alert();
        if (element.hasClass('fade')) {
          element.removeClass('in');
          setTimeout(function () {
            element.addClass('in');
          });
        }
        var parentArray = attrs.ngRepeat && attrs.ngRepeat.split(' in ').pop();
        element.on('close', function (ev) {
          var removeElement;
          if (parentArray) {
            ev.preventDefault();
            element.removeClass('in');
            removeElement = function () {
              element.trigger('closed');
              if (scope.$parent) {
                scope.$parent.$apply(function () {
                  var path = parentArray.split('.');
                  var curr = scope.$parent;
                  for (var i = 0; i < path.length; ++i) {
                    if (curr) {
                      curr = curr[path[i]];
                    }
                  }
                  if (curr) {
                    curr.splice(scope.$index, 1);
                  }
                });
              }
            };
            $.support.transition && element.hasClass('fade') ? element.on($.support.transition.end, removeElement) : removeElement();
          } else if (value) {
            ev.preventDefault();
            element.removeClass('in');
            removeElement = function () {
              element.trigger('closed');
              scope.$apply(function () {
                value.closed = true;
              });
            };
            $.support.transition && element.hasClass('fade') ? element.on($.support.transition.end, removeElement) : removeElement();
          } else {
          }
        });
      }
    };
  }
]);
'use strict';
angular.module('$strap.directives').directive('bsButton', [
  '$parse',
  '$timeout',
  function ($parse, $timeout) {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function postLink(scope, element, attrs, controller) {
        if (controller) {
          if (!element.parent('[data-toggle="buttons-checkbox"], [data-toggle="buttons-radio"]').length) {
            element.attr('data-toggle', 'button');
          }
          var startValue = !!scope.$eval(attrs.ngModel);
          if (startValue) {
            element.addClass('active');
          }
          scope.$watch(attrs.ngModel, function (newValue, oldValue) {
            var bNew = !!newValue, bOld = !!oldValue;
            if (bNew !== bOld) {
              $.fn.button.Constructor.prototype.toggle.call(button);
            } else if (bNew && !startValue) {
              element.addClass('active');
            }
          });
        }
        if (!element.hasClass('btn')) {
          element.on('click.button.data-api', function (ev) {
            element.button('toggle');
          });
        }
        element.button();
        var button = element.data('button');
        button.toggle = function () {
          if (!controller) {
            return $.fn.button.Constructor.prototype.toggle.call(this);
          }
          var $parent = element.parent('[data-toggle="buttons-radio"]');
          if ($parent.length) {
            element.siblings('[ng-model]').each(function (k, v) {
              $parse($(v).attr('ng-model')).assign(scope, false);
            });
            scope.$digest();
            if (!controller.$modelValue) {
              controller.$setViewValue(!controller.$modelValue);
              scope.$digest();
            }
          } else {
            scope.$apply(function () {
              controller.$setViewValue(!controller.$modelValue);
            });
          }
        };
      }
    };
  }
]).directive('bsButtonsCheckbox', [
  '$parse',
  function ($parse) {
    return {
      restrict: 'A',
      require: '?ngModel',
      compile: function compile(tElement, tAttrs, transclude) {
        tElement.attr('data-toggle', 'buttons-checkbox').find('a, button').each(function (k, v) {
          $(v).attr('bs-button', '');
        });
      }
    };
  }
]).directive('bsButtonsRadio', [
  '$timeout',
  function ($timeout) {
    return {
      restrict: 'A',
      require: '?ngModel',
      compile: function compile(tElement, tAttrs, transclude) {
        tElement.attr('data-toggle', 'buttons-radio');
        if (!tAttrs.ngModel) {
          tElement.find('a, button').each(function (k, v) {
            $(v).attr('bs-button', '');
          });
        }
        return function postLink(scope, iElement, iAttrs, controller) {
          if (controller) {
            $timeout(function () {
              iElement.find('[value]').button().filter('[value="' + controller.$viewValue + '"]').addClass('active');
            });
            iElement.on('click.button.data-api', function (ev) {
              scope.$apply(function () {
                controller.$setViewValue($(ev.target).closest('button').attr('value'));
              });
            });
            scope.$watch(iAttrs.ngModel, function (newValue, oldValue) {
              if (newValue !== oldValue) {
                var $btn = iElement.find('[value="' + scope.$eval(iAttrs.ngModel) + '"]');
                if ($btn.length) {
                  $btn.button('toggle');
                }
              }
            });
          }
        };
      }
    };
  }
]);
'use strict';
angular.module('$strap.directives').directive('bsButtonSelect', [
  '$parse',
  '$timeout',
  function ($parse, $timeout) {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function postLink(scope, element, attrs, ctrl) {
        var getter = $parse(attrs.bsButtonSelect), setter = getter.assign;
        if (ctrl) {
          element.text(scope.$eval(attrs.ngModel));
          scope.$watch(attrs.ngModel, function (newValue, oldValue) {
            element.text(newValue);
          });
        }
        var values, value, index, newValue;
        element.bind('click', function (ev) {
          values = getter(scope);
          value = ctrl ? scope.$eval(attrs.ngModel) : element.text();
          index = values.indexOf(value);
          newValue = index > values.length - 2 ? values[0] : values[index + 1];
          scope.$apply(function () {
            element.text(newValue);
            if (ctrl) {
              ctrl.$setViewValue(newValue);
            }
          });
        });
      }
    };
  }
]);
'use strict';
angular.module('$strap.directives').directive('bsDatepicker', [
  '$timeout',
  '$strapConfig',
  function ($timeout, $strapConfig) {
    var isAppleTouch = /(iP(a|o)d|iPhone)/g.test(navigator.userAgent);
    var regexpMap = function regexpMap(language) {
      language = language || 'en';
      return {
        '/': '[\\/]',
        '-': '[-]',
        '.': '[.]',
        ' ': '[\\s]',
        'dd': '(?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1}))',
        'd': '(?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1}))',
        'mm': '(?:[0]?[1-9]|[1][012])',
        'm': '(?:[0]?[1-9]|[1][012])',
        'DD': '(?:' + $.fn.datepicker.dates[language].days.join('|') + ')',
        'D': '(?:' + $.fn.datepicker.dates[language].daysShort.join('|') + ')',
        'MM': '(?:' + $.fn.datepicker.dates[language].months.join('|') + ')',
        'M': '(?:' + $.fn.datepicker.dates[language].monthsShort.join('|') + ')',
        'yyyy': '(?:(?:[1]{1}[0-9]{1}[0-9]{1}[0-9]{1})|(?:[2]{1}[0-9]{3}))(?![[0-9]])',
        'yy': '(?:(?:[0-9]{1}[0-9]{1}))(?![[0-9]])'
      };
    };
    var regexpForDateFormat = function regexpForDateFormat(format, language) {
      var re = format, map = regexpMap(language), i;
      i = 0;
      angular.forEach(map, function (v, k) {
        re = re.split(k).join('${' + i + '}');
        i++;
      });
      i = 0;
      angular.forEach(map, function (v, k) {
        re = re.split('${' + i + '}').join(v);
        i++;
      });
      return new RegExp('^' + re + '$', ['i']);
    };
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function postLink(scope, element, attrs, controller) {
        var options = angular.extend({ autoclose: true }, $strapConfig.datepicker || {}), type = attrs.dateType || options.type || 'date';
        angular.forEach([
          'format',
          'weekStart',
          'calendarWeeks',
          'startDate',
          'endDate',
          'daysOfWeekDisabled',
          'autoclose',
          'startView',
          'minViewMode',
          'todayBtn',
          'todayHighlight',
          'keyboardNavigation',
          'language',
          'forceParse'
        ], function (key) {
          if (angular.isDefined(attrs[key]))
            options[key] = attrs[key];
        });
        var language = options.language || 'en', readFormat = attrs.dateFormat || options.format || $.fn.datepicker.dates[language] && $.fn.datepicker.dates[language].format || 'mm/dd/yyyy', format = isAppleTouch ? 'yyyy-mm-dd' : readFormat, dateFormatRegexp = regexpForDateFormat(format, language);
        if (controller) {
          controller.$formatters.unshift(function (modelValue) {
            return type === 'date' && angular.isString(modelValue) && modelValue ? $.fn.datepicker.DPGlobal.parseDate(modelValue, $.fn.datepicker.DPGlobal.parseFormat(readFormat), language) : modelValue;
          });
          controller.$parsers.unshift(function (viewValue) {
            if (!viewValue) {
              controller.$setValidity('date', true);
              return null;
            } else if (type === 'date' && angular.isDate(viewValue)) {
              controller.$setValidity('date', true);
              return viewValue;
            } else if (angular.isString(viewValue) && dateFormatRegexp.test(viewValue)) {
              controller.$setValidity('date', true);
              if (isAppleTouch)
                return new Date(viewValue);
              return type === 'string' ? viewValue : $.fn.datepicker.DPGlobal.parseDate(viewValue, $.fn.datepicker.DPGlobal.parseFormat(format), language);
            } else {
              controller.$setValidity('date', false);
              return undefined;
            }
          });
          controller.$render = function ngModelRender() {
            if (isAppleTouch) {
              var date = controller.$viewValue ? $.fn.datepicker.DPGlobal.formatDate(controller.$viewValue, $.fn.datepicker.DPGlobal.parseFormat(format), language) : '';
              element.val(date);
              return date;
            }
            if (!controller.$viewValue)
              element.val('');
            return element.datepicker('update', controller.$viewValue);
          };
        }
        if (isAppleTouch) {
          element.prop('type', 'date').css('-webkit-appearance', 'textfield');
        } else {
          if (controller) {
            element.on('changeDate', function (ev) {
              scope.$apply(function () {
                controller.$setViewValue(type === 'string' ? element.val() : ev.date);
              });
            });
          }
          element.datepicker(angular.extend(options, {
            format: format,
            language: language
          }));
          scope.$on('$destroy', function () {
            var datepicker = element.data('datepicker');
            if (datepicker) {
              datepicker.picker.remove();
              element.data('datepicker', null);
            }
          });
        }
        var component = element.siblings('[data-toggle="datepicker"]');
        if (component.length) {
          component.on('click', function () {
            element.trigger('focus');
          });
        }
      }
    };
  }
]);
'use strict';
angular.module('$strap.directives').directive('bsDropdown', [
  '$parse',
  '$compile',
  '$timeout',
  function ($parse, $compile, $timeout) {
    var buildTemplate = function (items, ul) {
      if (!ul)
        ul = [
          '<ul class="dropdown-menu" role="menu" aria-labelledby="drop1">',
          '</ul>'
        ];
      angular.forEach(items, function (item, index) {
        if (item.divider)
          return ul.splice(index + 1, 0, '<li class="divider"></li>');
        var li = '<li' + (item.submenu && item.submenu.length ? ' class="dropdown-submenu"' : '') + '>' + '<a tabindex="-1" ng-href="' + (item.href || '') + '"' + (item.click ? '" ng-click="' + item.click + '"' : '') + (item.target ? '" target="' + item.target + '"' : '') + (item.method ? '" data-method="' + item.method + '"' : '') + '>' + (item.text || '') + '</a>';
        if (item.submenu && item.submenu.length)
          li += buildTemplate(item.submenu).join('\n');
        li += '</li>';
        ul.splice(index + 1, 0, li);
      });
      return ul;
    };
    return {
      restrict: 'EA',
      scope: true,
      link: function postLink(scope, iElement, iAttrs) {
        var getter = $parse(iAttrs.bsDropdown), items = getter(scope);
        $timeout(function () {
          if (!angular.isArray(items)) {
          }
          var dropdown = angular.element(buildTemplate(items).join(''));
          dropdown.insertAfter(iElement);
          $compile(iElement.next('ul.dropdown-menu'))(scope);
        });
        iElement.addClass('dropdown-toggle').attr('data-toggle', 'dropdown');
      }
    };
  }
]);
'use strict';
angular.module('$strap.directives').factory('$modal', [
  '$rootScope',
  '$compile',
  '$http',
  '$timeout',
  '$q',
  '$templateCache',
  '$strapConfig',
  function ($rootScope, $compile, $http, $timeout, $q, $templateCache, $strapConfig) {
    var ModalFactory = function ModalFactory(config) {
      function Modal(config) {
        var options = angular.extend({ show: true }, $strapConfig.modal, config), scope = options.scope ? options.scope : $rootScope.$new(), templateUrl = options.template;
        return $q.when($templateCache.get(templateUrl) || $http.get(templateUrl, { cache: true }).then(function (res) {
          return res.data;
        })).then(function onSuccess(template) {
          var id = templateUrl.replace('.html', '').replace(/[\/|\.|:]/g, '-') + '-' + scope.$id;
          var $modal = $('<div class="modal hide" tabindex="-1"></div>').attr('id', id).addClass('fade').html(template);
          if (options.modalClass)
            $modal.addClass(options.modalClass);
          $('body').append($modal);
          $timeout(function () {
            $compile($modal)(scope);
          });
          scope.$modal = function (name) {
            $modal.modal(name);
          };
          angular.forEach([
            'show',
            'hide'
          ], function (name) {
            scope[name] = function () {
              $modal.modal(name);
            };
          });
          scope.dismiss = scope.hide;
          angular.forEach([
            'show',
            'shown',
            'hide',
            'hidden'
          ], function (name) {
            $modal.on(name, function (ev) {
              scope.$emit('modal-' + name, ev);
            });
          });
          $modal.on('shown', function (ev) {
            $('input[autofocus]', $modal).first().trigger('focus');
          });
          $modal.on('hidden', function (ev) {
            if (!options.persist)
              scope.$destroy();
          });
          scope.$on('$destroy', function () {
            $modal.remove();
          });
          $modal.modal(options);
          return $modal;
        });
      }
      return new Modal(config);
    };
    return ModalFactory;
  }
]).directive('bsModal', [
  '$q',
  '$modal',
  function ($q, $modal) {
    return {
      restrict: 'A',
      scope: true,
      link: function postLink(scope, iElement, iAttrs, controller) {
        var options = {
            template: scope.$eval(iAttrs.bsModal),
            persist: true,
            show: false,
            scope: scope
          };
        angular.forEach([
          'modalClass',
          'backdrop',
          'keyboard'
        ], function (key) {
          if (angular.isDefined(iAttrs[key]))
            options[key] = iAttrs[key];
        });
        $q.when($modal(options)).then(function onSuccess(modal) {
          iElement.attr('data-target', '#' + modal.attr('id')).attr('data-toggle', 'modal');
        });
      }
    };
  }
]);
'use strict';
angular.module('$strap.directives').directive('bsNavbar', [
  '$location',
  function ($location) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs, controller) {
        scope.$watch(function () {
          return $location.path();
        }, function (newValue, oldValue) {
          $('li[data-match-route]', element).each(function (k, li) {
            var $li = angular.element(li), pattern = $li.attr('data-match-route'), regexp = new RegExp('^' + pattern + '$', ['i']);
            if (regexp.test(newValue)) {
              $li.addClass('active');
            } else {
              $li.removeClass('active');
            }
          });
        });
      }
    };
  }
]);
'use strict';
angular.module('$strap.directives').directive('bsPopover', [
  '$parse',
  '$compile',
  '$http',
  '$timeout',
  '$q',
  '$templateCache',
  function ($parse, $compile, $http, $timeout, $q, $templateCache) {
    $('body').on('keyup', function (ev) {
      if (ev.keyCode === 27) {
        $('.popover.in').each(function () {
          $(this).popover('hide');
        });
      }
    });
    return {
      restrict: 'A',
      scope: true,
      link: function postLink(scope, element, attr, ctrl) {
        var getter = $parse(attr.bsPopover), setter = getter.assign, value = getter(scope), options = {};
        if (angular.isObject(value)) {
          options = value;
        }
        $q.when(options.content || $templateCache.get(value) || $http.get(value, { cache: true })).then(function onSuccess(template) {
          if (angular.isObject(template)) {
            template = template.data;
          }
          if (!!attr.unique) {
            element.on('show', function (ev) {
              $('.popover.in').each(function () {
                var $this = $(this), popover = $this.data('popover');
                if (popover && !popover.$element.is(element)) {
                  $this.popover('hide');
                }
              });
            });
          }
          if (!!attr.hide) {
            scope.$watch(attr.hide, function (newValue, oldValue) {
              if (!!newValue) {
                popover.hide();
              } else if (newValue !== oldValue) {
                popover.show();
              }
            });
          }
          element.popover(angular.extend({}, options, {
            content: template,
            html: true
          }));
          var popover = element.data('popover');
          popover.hasContent = function () {
            return this.getTitle() || template;
          };
          popover.getPosition = function () {
            var r = $.fn.popover.Constructor.prototype.getPosition.apply(this, arguments);
            $compile(this.$tip)(scope);
            scope.$digest();
            this.$tip.data('popover', this);
            return r;
          };
          scope.$popover = function (name) {
            popover(name);
          };
          angular.forEach([
            'show',
            'hide'
          ], function (name) {
            scope[name] = function () {
              popover[name]();
            };
          });
          scope.dismiss = scope.hide;
          angular.forEach([
            'show',
            'shown',
            'hide',
            'hidden'
          ], function (name) {
            element.on(name, function (ev) {
              scope.$emit('popover-' + name, ev);
            });
          });
        });
      }
    };
  }
]);
'use strict';
angular.module('$strap.directives').directive('bsSelect', [
  '$timeout',
  function ($timeout) {
    var NG_OPTIONS_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*)$/;
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function postLink(scope, element, attrs, controller) {
        var options = scope.$eval(attrs.bsSelect) || {};
        $timeout(function () {
          element.selectpicker(options);
          element.next().removeClass('ng-scope');
        });
        if (controller) {
          scope.$watch(attrs.ngModel, function (newValue, oldValue) {
            if (newValue !== oldValue) {
              element.selectpicker('refresh');
            }
          });
        }
      }
    };
  }
]);
'use strict';
angular.module('$strap.directives').directive('bsTabs', [
  '$parse',
  '$compile',
  '$timeout',
  function ($parse, $compile, $timeout) {
    var template = '<div class="tabs">' + '<ul class="nav nav-tabs">' + '<li ng-repeat="pane in panes" ng-class="{active:pane.active}">' + '<a data-target="#{{pane.id}}" data-index="{{$index}}" data-toggle="tab">{{pane.title}}</a>' + '</li>' + '</ul>' + '<div class="tab-content" ng-transclude>' + '</div>';
    return {
      restrict: 'A',
      require: '?ngModel',
      priority: 0,
      scope: true,
      template: template,
      replace: true,
      transclude: true,
      compile: function compile(tElement, tAttrs, transclude) {
        return function postLink(scope, iElement, iAttrs, controller) {
          var getter = $parse(iAttrs.bsTabs), setter = getter.assign, value = getter(scope);
          scope.panes = [];
          var $tabs = iElement.find('ul.nav-tabs');
          var $panes = iElement.find('div.tab-content');
          var activeTab = 0, id, title, active;
          $timeout(function () {
            $panes.find('[data-title], [data-tab]').each(function (index) {
              var $this = angular.element(this);
              id = 'tab-' + scope.$id + '-' + index;
              title = $this.data('title') || $this.data('tab');
              active = !active && $this.hasClass('active');
              $this.attr('id', id).addClass('tab-pane');
              if (iAttrs.fade)
                $this.addClass('fade');
              scope.panes.push({
                id: id,
                title: title,
                content: this.innerHTML,
                active: active
              });
            });
            if (scope.panes.length && !active) {
              $panes.find('.tab-pane:first-child').addClass('active' + (iAttrs.fade ? ' in' : ''));
              scope.panes[0].active = true;
            }
          });
          if (controller) {
            iElement.on('show', function (ev) {
              var $target = $(ev.target);
              scope.$apply(function () {
                controller.$setViewValue($target.data('index'));
              });
            });
            scope.$watch(iAttrs.ngModel, function (newValue, oldValue) {
              if (angular.isUndefined(newValue))
                return;
              activeTab = newValue;
              setTimeout(function () {
                var $next = $($tabs[0].querySelectorAll('li')[newValue * 1]);
                if (!$next.hasClass('active')) {
                  $next.children('a').tab('show');
                }
              });
            });
          }
        };
      }
    };
  }
]);
'use strict';
angular.module('$strap.directives').directive('bsTimepicker', [
  '$timeout',
  function ($timeout) {
    var TIME_REGEXP = '((?:(?:[0-1][0-9])|(?:[2][0-3])|(?:[0-9])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\\s?(?:am|AM|pm|PM))?)';
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function postLink(scope, element, attrs, controller) {
        if (controller) {
          element.on('changeTime.timepicker', function (ev) {
            $timeout(function () {
              controller.$setViewValue(element.val());
            });
          });
          var timeRegExp = new RegExp('^' + TIME_REGEXP + '$', ['i']);
          controller.$parsers.unshift(function (viewValue) {
            if (!viewValue || timeRegExp.test(viewValue)) {
              controller.$setValidity('time', true);
              return viewValue;
            } else {
              controller.$setValidity('time', false);
              return;
            }
          });
        }
        element.attr('data-toggle', 'timepicker');
        element.parent().addClass('bootstrap-timepicker');
        element.timepicker();
        var timepicker = element.data('timepicker');
        var component = element.siblings('[data-toggle="timepicker"]');
        if (component.length) {
          component.on('click', $.proxy(timepicker.showWidget, timepicker));
        }
      }
    };
  }
]);
'use strict';
angular.module('$strap.directives').directive('bsTooltip', [
  '$parse',
  '$compile',
  function ($parse, $compile) {
    return {
      restrict: 'A',
      scope: true,
      link: function postLink(scope, element, attrs, ctrl) {
        var getter = $parse(attrs.bsTooltip), setter = getter.assign, value = getter(scope);
        scope.$watch(attrs.bsTooltip, function (newValue, oldValue) {
          if (newValue !== oldValue) {
            value = newValue;
          }
        });
        if (!!attrs.unique) {
          element.on('show', function (ev) {
            $('.tooltip.in').each(function () {
              var $this = $(this), tooltip = $this.data('tooltip');
              if (tooltip && !tooltip.$element.is(element)) {
                $this.tooltip('hide');
              }
            });
          });
        }
        element.tooltip({
          title: function () {
            return angular.isFunction(value) ? value.apply(null, arguments) : value;
          },
          html: true
        });
        var tooltip = element.data('tooltip');
        tooltip.show = function () {
          var r = $.fn.tooltip.Constructor.prototype.show.apply(this, arguments);
          this.tip().data('tooltip', this);
          return r;
        };
        scope._tooltip = function (event) {
          element.tooltip(event);
        };
        scope.hide = function () {
          element.tooltip('hide');
        };
        scope.show = function () {
          element.tooltip('show');
        };
        scope.dismiss = scope.hide;
      }
    };
  }
]);
'use strict';
angular.module('$strap.directives').directive('bsTypeahead', [
  '$parse',
  function ($parse) {
    return {
      restrict: 'A',
      require: '?ngModel',
      link: function postLink(scope, element, attrs, controller) {
        var getter = $parse(attrs.bsTypeahead), setter = getter.assign, value = getter(scope);
        scope.$watch(attrs.bsTypeahead, function (newValue, oldValue) {
          if (newValue !== oldValue) {
            value = newValue;
          }
        });
        element.attr('data-provide', 'typeahead');
        element.typeahead({
          source: function (query) {
            return angular.isFunction(value) ? value.apply(null, arguments) : value;
          },
          minLength: attrs.minLength || 1,
          items: attrs.items,
          updater: function (value) {
            if (controller) {
              scope.$apply(function () {
                controller.$setViewValue(value);
              });
            }
            scope.$emit('typeahead-updated', value);
            return value;
          }
        });
        var typeahead = element.data('typeahead');
        typeahead.lookup = function (ev) {
          var items;
          this.query = this.$element.val() || '';
          if (this.query.length < this.options.minLength) {
            return this.shown ? this.hide() : this;
          }
          items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source;
          return items ? this.process(items) : this;
        };
        if (!!attrs.matchAll) {
          typeahead.matcher = function (item) {
            return true;
          };
        }
        if (attrs.minLength === '0') {
          setTimeout(function () {
            element.on('focus', function () {
              element.val().length === 0 && setTimeout(element.typeahead.bind(element, 'lookup'), 200);
            });
          });
        }
      }
    };
  }
]);
(function () {
  function v(a, b) {
    var c;
    a || (a = {});
    for (c in b)
      a[c] = b[c];
    return a;
  }
  function x() {
    var a, b = arguments.length, c = {}, d = function (a, b) {
        var c, h;
        for (h in b)
          b.hasOwnProperty(h) && (c = b[h], typeof a !== 'object' && (a = {}), a[h] = c && typeof c === 'object' && Object.prototype.toString.call(c) !== '[object Array]' && typeof c.nodeType !== 'number' ? d(a[h] || {}, c) : b[h]);
        return a;
      };
    for (a = 0; a < b; a++)
      c = d(c, arguments[a]);
    return c;
  }
  function u(a, b) {
    return parseInt(a, b || 10);
  }
  function fa(a) {
    return typeof a === 'string';
  }
  function V(a) {
    return typeof a === 'object';
  }
  function Da(a) {
    return Object.prototype.toString.call(a) === '[object Array]';
  }
  function Ea(a) {
    return typeof a === 'number';
  }
  function ka(a) {
    return I.log(a) / I.LN10;
  }
  function da(a) {
    return I.pow(10, a);
  }
  function ga(a, b) {
    for (var c = a.length; c--;)
      if (a[c] === b) {
        a.splice(c, 1);
        break;
      }
  }
  function r(a) {
    return a !== y && a !== null;
  }
  function A(a, b, c) {
    var d, e;
    if (fa(b))
      r(c) ? a.setAttribute(b, c) : a && a.getAttribute && (e = a.getAttribute(b));
    else if (r(b) && V(b))
      for (d in b)
        a.setAttribute(d, b[d]);
    return e;
  }
  function ha(a) {
    return Da(a) ? a : [a];
  }
  function o() {
    var a = arguments, b, c, d = a.length;
    for (b = 0; b < d; b++)
      if (c = a[b], typeof c !== 'undefined' && c !== null)
        return c;
  }
  function L(a, b) {
    if (Fa && b && b.opacity !== y)
      b.filter = 'alpha(opacity=' + b.opacity * 100 + ')';
    v(a.style, b);
  }
  function U(a, b, c, d, e) {
    a = z.createElement(a);
    b && v(a, b);
    e && L(a, {
      padding: 0,
      border: S,
      margin: 0
    });
    c && L(a, c);
    d && d.appendChild(a);
    return a;
  }
  function ea(a, b) {
    var c = function () {
    };
    c.prototype = new a();
    v(c.prototype, b);
    return c;
  }
  function ua(a, b, c, d) {
    var e = N.lang, f = b === -1 ? ((a || 0).toString().split('.')[1] || '').length : isNaN(b = Q(b)) ? 2 : b, b = c === void 0 ? e.decimalPoint : c, d = d === void 0 ? e.thousandsSep : d, e = a < 0 ? '-' : '', c = String(u(a = Q(+a || 0).toFixed(f))), g = c.length > 3 ? c.length % 3 : 0;
    return e + (g ? c.substr(0, g) + d : '') + c.substr(g).replace(/(\d{3})(?=\d)/g, '$1' + d) + (f ? b + Q(a - c).toFixed(f).slice(2) : '');
  }
  function va(a, b) {
    return Array((b || 2) + 1 - String(a).length).join(0) + a;
  }
  function zb(a, b, c) {
    var d = a[b];
    a[b] = function () {
      var a = Array.prototype.slice.call(arguments);
      a.unshift(d);
      return c.apply(this, a);
    };
  }
  function wa(a, b) {
    for (var c = '{', d = !1, e, f, g, h, i, j = []; (c = a.indexOf(c)) !== -1;) {
      e = a.slice(0, c);
      if (d) {
        f = e.split(':');
        g = f.shift().split('.');
        i = g.length;
        e = b;
        for (h = 0; h < i; h++)
          e = e[g[h]];
        if (f.length)
          f = f.join(':'), g = /\.([0-9])/, h = N.lang, i = void 0, /f$/.test(f) ? (i = (i = f.match(g)) ? i[1] : -1, e = ua(e, i, h.decimalPoint, f.indexOf(',') > -1 ? h.thousandsSep : '')) : e = Ua(f, e);
      }
      j.push(e);
      a = a.slice(c + 1);
      c = (d = !d) ? '}' : '{';
    }
    j.push(a);
    return j.join('');
  }
  function ib(a, b, c, d) {
    var e, c = o(c, 1);
    e = a / c;
    b || (b = [
      1,
      2,
      2.5,
      5,
      10
    ], d && d.allowDecimals === !1 && (c === 1 ? b = [
      1,
      2,
      5,
      10
    ] : c <= 0.1 && (b = [1 / c])));
    for (d = 0; d < b.length; d++)
      if (a = b[d], e <= (b[d] + (b[d + 1] || b[d])) / 2)
        break;
    a *= c;
    return a;
  }
  function Ab(a, b) {
    var c = b || [
        [
          Bb,
          [
            1,
            2,
            5,
            10,
            20,
            25,
            50,
            100,
            200,
            500
          ]
        ],
        [
          jb,
          [
            1,
            2,
            5,
            10,
            15,
            30
          ]
        ],
        [
          Va,
          [
            1,
            2,
            5,
            10,
            15,
            30
          ]
        ],
        [
          Oa,
          [
            1,
            2,
            3,
            4,
            6,
            8,
            12
          ]
        ],
        [
          oa,
          [
            1,
            2
          ]
        ],
        [
          Wa,
          [
            1,
            2
          ]
        ],
        [
          Pa,
          [
            1,
            2,
            3,
            4,
            6
          ]
        ],
        [
          xa,
          null
        ]
      ], d = c[c.length - 1], e = E[d[0]], f = d[1], g;
    for (g = 0; g < c.length; g++)
      if (d = c[g], e = E[d[0]], f = d[1], c[g + 1] && a <= (e * f[f.length - 1] + E[c[g + 1][0]]) / 2)
        break;
    e === E[xa] && a < 5 * e && (f = [
      1,
      2,
      5
    ]);
    e === E[xa] && a < 5 * e && (f = [
      1,
      2,
      5
    ]);
    c = ib(a / e, f);
    return {
      unitRange: e,
      count: c,
      unitName: d[0]
    };
  }
  function Cb(a, b, c, d) {
    var e = [], f = {}, g = N.global.useUTC, h, i = new Date(b), j = a.unitRange, k = a.count;
    if (r(b)) {
      j >= E[jb] && (i.setMilliseconds(0), i.setSeconds(j >= E[Va] ? 0 : k * T(i.getSeconds() / k)));
      if (j >= E[Va])
        i[Db](j >= E[Oa] ? 0 : k * T(i[kb]() / k));
      if (j >= E[Oa])
        i[Eb](j >= E[oa] ? 0 : k * T(i[lb]() / k));
      if (j >= E[oa])
        i[mb](j >= E[Pa] ? 1 : k * T(i[Qa]() / k));
      j >= E[Pa] && (i[Fb](j >= E[xa] ? 0 : k * T(i[Xa]() / k)), h = i[Ya]());
      j >= E[xa] && (h -= h % k, i[Gb](h));
      if (j === E[Wa])
        i[mb](i[Qa]() - i[nb]() + o(d, 1));
      b = 1;
      h = i[Ya]();
      for (var d = i.getTime(), m = i[Xa](), l = i[Qa](), p = g ? 0 : (86400000 + i.getTimezoneOffset() * 60000) % 86400000; d < c;)
        e.push(d), j === E[xa] ? d = Za(h + b * k, 0) : j === E[Pa] ? d = Za(h, m + b * k) : !g && (j === E[oa] || j === E[Wa]) ? d = Za(h, m, l + b * k * (j === E[oa] ? 1 : 7)) : d += j * k, b++;
      e.push(d);
      n(ob(e, function (a) {
        return j <= E[Oa] && a % E[oa] === p;
      }), function (a) {
        f[a] = oa;
      });
    }
    e.info = v(a, {
      higherRanks: f,
      totalRange: j * k
    });
    return e;
  }
  function Hb() {
    this.symbol = this.color = 0;
  }
  function Ib(a, b) {
    var c = a.length, d, e;
    for (e = 0; e < c; e++)
      a[e].ss_i = e;
    a.sort(function (a, c) {
      d = b(a, c);
      return d === 0 ? a.ss_i - c.ss_i : d;
    });
    for (e = 0; e < c; e++)
      delete a[e].ss_i;
  }
  function Ga(a) {
    for (var b = a.length, c = a[0]; b--;)
      a[b] < c && (c = a[b]);
    return c;
  }
  function pa(a) {
    for (var b = a.length, c = a[0]; b--;)
      a[b] > c && (c = a[b]);
    return c;
  }
  function Ha(a, b) {
    for (var c in a)
      a[c] && a[c] !== b && a[c].destroy && a[c].destroy(), delete a[c];
  }
  function Ra(a) {
    $a || ($a = U(ya));
    a && $a.appendChild(a);
    $a.innerHTML = '';
  }
  function qa(a, b) {
    var c = 'Highcharts error #' + a + ': www.highcharts.com/errors/' + a;
    if (b)
      throw c;
    else
      O.console && console.log(c);
  }
  function ia(a) {
    return parseFloat(a.toPrecision(14));
  }
  function Ia(a, b) {
    za = o(a, b.animation);
  }
  function Jb() {
    var a = N.global.useUTC, b = a ? 'getUTC' : 'get', c = a ? 'setUTC' : 'set';
    Za = a ? Date.UTC : function (a, b, c, g, h, i) {
      return new Date(a, b, o(c, 1), o(g, 0), o(h, 0), o(i, 0)).getTime();
    };
    kb = b + 'Minutes';
    lb = b + 'Hours';
    nb = b + 'Day';
    Qa = b + 'Date';
    Xa = b + 'Month';
    Ya = b + 'FullYear';
    Db = c + 'Minutes';
    Eb = c + 'Hours';
    mb = c + 'Date';
    Fb = c + 'Month';
    Gb = c + 'FullYear';
  }
  function ra() {
  }
  function Ja(a, b, c, d) {
    this.axis = a;
    this.pos = b;
    this.type = c || '';
    this.isNew = !0;
    !c && !d && this.addLabel();
  }
  function pb(a, b) {
    this.axis = a;
    if (b)
      this.options = b, this.id = b.id;
  }
  function Kb(a, b, c, d, e, f) {
    var g = a.chart.inverted;
    this.axis = a;
    this.isNegative = c;
    this.options = b;
    this.x = d;
    this.stack = e;
    this.percent = f === 'percent';
    this.alignOptions = {
      align: b.align || (g ? c ? 'left' : 'right' : 'center'),
      verticalAlign: b.verticalAlign || (g ? 'middle' : c ? 'bottom' : 'top'),
      y: o(b.y, g ? 4 : c ? 14 : -6),
      x: o(b.x, g ? c ? -6 : 6 : 0)
    };
    this.textAlign = b.textAlign || (g ? c ? 'right' : 'left' : 'center');
  }
  function ab() {
    this.init.apply(this, arguments);
  }
  function qb() {
    this.init.apply(this, arguments);
  }
  function rb(a, b) {
    this.init(a, b);
  }
  function sb(a, b) {
    this.init(a, b);
  }
  function tb() {
    this.init.apply(this, arguments);
  }
  var y, z = document, O = window, I = Math, t = I.round, T = I.floor, ja = I.ceil, q = I.max, K = I.min, Q = I.abs, Y = I.cos, ca = I.sin, Ka = I.PI, bb = Ka * 2 / 360, Aa = navigator.userAgent, Lb = O.opera, Fa = /msie/i.test(Aa) && !Lb, cb = z.documentMode === 8, db = /AppleWebKit/.test(Aa), eb = /Firefox/.test(Aa), Mb = /(Mobile|Android|Windows Phone)/.test(Aa), sa = 'http://www.w3.org/2000/svg', Z = !!z.createElementNS && !!z.createElementNS(sa, 'svg').createSVGRect, Sb = eb && parseInt(Aa.split('Firefox/')[1], 10) < 4, $ = !Z && !Fa && !!z.createElement('canvas').getContext, Sa, fb = z.documentElement.ontouchstart !== y, Nb = {}, ub = 0, $a, N, Ua, za, vb, E, ta = function () {
    }, Ba = [], ya = 'div', S = 'none', Ob = 'rgba(192,192,192,' + (Z ? 0.0001 : 0.002) + ')', Bb = 'millisecond', jb = 'second', Va = 'minute', Oa = 'hour', oa = 'day', Wa = 'week', Pa = 'month', xa = 'year', Pb = 'stroke-width', Za, kb, lb, nb, Qa, Xa, Ya, Db, Eb, mb, Fb, Gb, aa = {};
  O.Highcharts = O.Highcharts ? qa(16, !0) : {};
  Ua = function (a, b, c) {
    if (!r(b) || isNaN(b))
      return 'Invalid date';
    var a = o(a, '%Y-%m-%d %H:%M:%S'), d = new Date(b), e, f = d[lb](), g = d[nb](), h = d[Qa](), i = d[Xa](), j = d[Ya](), k = N.lang, m = k.weekdays, d = v({
        a: m[g].substr(0, 3),
        A: m[g],
        d: va(h),
        e: h,
        b: k.shortMonths[i],
        B: k.months[i],
        m: va(i + 1),
        y: j.toString().substr(2, 2),
        Y: j,
        H: va(f),
        I: va(f % 12 || 12),
        l: f % 12 || 12,
        M: va(d[kb]()),
        p: f < 12 ? 'AM' : 'PM',
        P: f < 12 ? 'am' : 'pm',
        S: va(d.getSeconds()),
        L: va(t(b % 1000), 3)
      }, Highcharts.dateFormats);
    for (e in d)
      for (; a.indexOf('%' + e) !== -1;)
        a = a.replace('%' + e, typeof d[e] === 'function' ? d[e](b) : d[e]);
    return c ? a.substr(0, 1).toUpperCase() + a.substr(1) : a;
  };
  Hb.prototype = {
    wrapColor: function (a) {
      if (this.color >= a)
        this.color = 0;
    },
    wrapSymbol: function (a) {
      if (this.symbol >= a)
        this.symbol = 0;
    }
  };
  E = function () {
    for (var a = 0, b = arguments, c = b.length, d = {}; a < c; a++)
      d[b[a++]] = b[a];
    return d;
  }(Bb, 1, jb, 1000, Va, 60000, Oa, 3600000, oa, 86400000, Wa, 604800000, Pa, 2678400000, xa, 31556952000);
  vb = {
    init: function (a, b, c) {
      var b = b || '', d = a.shift, e = b.indexOf('C') > -1, f = e ? 7 : 3, g, b = b.split(' '), c = [].concat(c), h, i, j = function (a) {
          for (g = a.length; g--;)
            a[g] === 'M' && a.splice(g + 1, 0, a[g + 1], a[g + 2], a[g + 1], a[g + 2]);
        };
      e && (j(b), j(c));
      a.isArea && (h = b.splice(b.length - 6, 6), i = c.splice(c.length - 6, 6));
      if (d <= c.length / f)
        for (; d--;)
          c = [].concat(c).splice(0, f).concat(c);
      a.shift = 0;
      if (b.length)
        for (a = c.length; b.length < a;)
          d = [].concat(b).splice(b.length - f, f), e && (d[f - 6] = d[f - 2], d[f - 5] = d[f - 1]), b = b.concat(d);
      h && (b = b.concat(h), c = c.concat(i));
      return [
        b,
        c
      ];
    },
    step: function (a, b, c, d) {
      var e = [], f = a.length;
      if (c === 1)
        e = d;
      else if (f === b.length && c < 1)
        for (; f--;)
          d = parseFloat(a[f]), e[f] = isNaN(d) ? a[f] : c * parseFloat(b[f] - d) + d;
      else
        e = b;
      return e;
    }
  };
  (function (a) {
    O.HighchartsAdapter = O.HighchartsAdapter || a && {
      init: function (b) {
        var c = a.fx, d = c.step, e, f = a.Tween, g = f && f.propHooks;
        e = a.cssHooks.opacity;
        a.extend(a.easing, {
          easeOutQuad: function (a, b, c, d, e) {
            return -d * (b /= e) * (b - 2) + c;
          }
        });
        a.each([
          'cur',
          '_default',
          'width',
          'height',
          'opacity'
        ], function (a, b) {
          var e = d, k, m;
          b === 'cur' ? e = c.prototype : b === '_default' && f && (e = g[b], b = 'set');
          (k = e[b]) && (e[b] = function (c) {
            c = a ? c : this;
            m = c.elem;
            return m.attr ? m.attr(c.prop, b === 'cur' ? y : c.now) : k.apply(this, arguments);
          });
        });
        zb(e, 'get', function (a, b, c) {
          return b.attr ? b.opacity || 0 : a.call(this, b, c);
        });
        e = function (a) {
          var c = a.elem, d;
          if (!a.started)
            d = b.init(c, c.d, c.toD), a.start = d[0], a.end = d[1], a.started = !0;
          c.attr('d', b.step(a.start, a.end, a.pos, c.toD));
        };
        f ? g.d = { set: e } : d.d = e;
        this.each = Array.prototype.forEach ? function (a, b) {
          return Array.prototype.forEach.call(a, b);
        } : function (a, b) {
          for (var c = 0, d = a.length; c < d; c++)
            if (b.call(a[c], a[c], c, a) === !1)
              return c;
        };
        a.fn.highcharts = function () {
          var a = 'Chart', b = arguments, c, d;
          fa(b[0]) && (a = b[0], b = Array.prototype.slice.call(b, 1));
          c = b[0];
          if (c !== y)
            c.chart = c.chart || {}, c.chart.renderTo = this[0], new Highcharts[a](c, b[1]), d = this;
          c === y && (d = Ba[A(this[0], 'data-highcharts-chart')]);
          return d;
        };
      },
      getScript: a.getScript,
      inArray: a.inArray,
      adapterRun: function (b, c) {
        return a(b)[c]();
      },
      grep: a.grep,
      map: function (a, c) {
        for (var d = [], e = 0, f = a.length; e < f; e++)
          d[e] = c.call(a[e], a[e], e, a);
        return d;
      },
      offset: function (b) {
        return a(b).offset();
      },
      addEvent: function (b, c, d) {
        a(b).bind(c, d);
      },
      removeEvent: function (b, c, d) {
        var e = z.removeEventListener ? 'removeEventListener' : 'detachEvent';
        z[e] && b && !b[e] && (b[e] = function () {
        });
        a(b).unbind(c, d);
      },
      fireEvent: function (b, c, d, e) {
        var f = a.Event(c), g = 'detached' + c, h;
        !Fa && d && (delete d.layerX, delete d.layerY);
        v(f, d);
        b[c] && (b[g] = b[c], b[c] = null);
        a.each([
          'preventDefault',
          'stopPropagation'
        ], function (a, b) {
          var c = f[b];
          f[b] = function () {
            try {
              c.call(f);
            } catch (a) {
              b === 'preventDefault' && (h = !0);
            }
          };
        });
        a(b).trigger(f);
        b[g] && (b[c] = b[g], b[g] = null);
        e && !f.isDefaultPrevented() && !h && e(f);
      },
      washMouseEvent: function (a) {
        var c = a.originalEvent || a;
        if (c.pageX === y)
          c.pageX = a.pageX, c.pageY = a.pageY;
        return c;
      },
      animate: function (b, c, d) {
        var e = a(b);
        if (!b.style)
          b.style = {};
        if (c.d)
          b.toD = c.d, c.d = 1;
        e.stop();
        e.animate(c, d);
      },
      stop: function (b) {
        a(b).stop();
      }
    };
  }(O.jQuery));
  var W = O.HighchartsAdapter, M = W || {};
  W && W.init.call(W, vb);
  var gb = M.adapterRun, Tb = M.getScript, la = M.inArray, n = M.each, ob = M.grep, Ub = M.offset, La = M.map, J = M.addEvent, ba = M.removeEvent, D = M.fireEvent, Qb = M.washMouseEvent, wb = M.animate, Ta = M.stop, M = {
      enabled: !0,
      align: 'center',
      x: 0,
      y: 15,
      style: {
        color: '#666',
        cursor: 'default',
        fontSize: '11px',
        lineHeight: '14px'
      }
    };
  N = {
    colors: '#2f7ed8,#0d233a,#8bbc21,#910000,#1aadce,#492970,#f28f43,#77a1e5,#c42525,#a6c96a'.split(','),
    symbols: [
      'circle',
      'diamond',
      'square',
      'triangle',
      'triangle-down'
    ],
    lang: {
      loading: 'Loading...',
      months: 'January,February,March,April,May,June,July,August,September,October,November,December'.split(','),
      shortMonths: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(','),
      weekdays: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(','),
      decimalPoint: '.',
      numericSymbols: 'k,M,G,T,P,E'.split(','),
      resetZoom: 'Reset zoom',
      resetZoomTitle: 'Reset zoom level 1:1',
      thousandsSep: ','
    },
    global: {
      useUTC: !0,
      canvasToolsURL: 'http://code.highcharts.com/3.0.2/modules/canvas-tools.js',
      VMLRadialGradientURL: 'http://code.highcharts.com/3.0.2/gfx/vml-radial-gradient.png'
    },
    chart: {
      borderColor: '#4572A7',
      borderRadius: 5,
      defaultSeriesType: 'line',
      ignoreHiddenSeries: !0,
      spacingTop: 10,
      spacingRight: 10,
      spacingBottom: 15,
      spacingLeft: 10,
      style: {
        fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Verdana, Arial, Helvetica, sans-serif',
        fontSize: '12px'
      },
      backgroundColor: '#FFFFFF',
      plotBorderColor: '#C0C0C0',
      resetZoomButton: {
        theme: { zIndex: 20 },
        position: {
          align: 'right',
          x: -10,
          y: 10
        }
      }
    },
    title: {
      text: 'Chart title',
      align: 'center',
      y: 15,
      style: {
        color: '#274b6d',
        fontSize: '16px'
      }
    },
    subtitle: {
      text: '',
      align: 'center',
      y: 30,
      style: { color: '#4d759e' }
    },
    plotOptions: {
      line: {
        allowPointSelect: !1,
        showCheckbox: !1,
        animation: { duration: 1000 },
        events: {},
        lineWidth: 2,
        marker: {
          enabled: !0,
          lineWidth: 0,
          radius: 4,
          lineColor: '#FFFFFF',
          states: {
            hover: { enabled: !0 },
            select: {
              fillColor: '#FFFFFF',
              lineColor: '#000000',
              lineWidth: 2
            }
          }
        },
        point: { events: {} },
        dataLabels: x(M, {
          enabled: !1,
          formatter: function () {
            return ua(this.y, -1);
          },
          verticalAlign: 'bottom',
          y: 0
        }),
        cropThreshold: 300,
        pointRange: 0,
        showInLegend: !0,
        states: {
          hover: { marker: {} },
          select: { marker: {} }
        },
        stickyTracking: !0
      }
    },
    labels: {
      style: {
        position: 'absolute',
        color: '#3E576F'
      }
    },
    legend: {
      enabled: !0,
      align: 'center',
      layout: 'horizontal',
      labelFormatter: function () {
        return this.name;
      },
      borderWidth: 1,
      borderColor: '#909090',
      borderRadius: 5,
      navigation: {
        activeColor: '#274b6d',
        inactiveColor: '#CCC'
      },
      shadow: !1,
      itemStyle: {
        cursor: 'pointer',
        color: '#274b6d',
        fontSize: '12px'
      },
      itemHoverStyle: { color: '#000' },
      itemHiddenStyle: { color: '#CCC' },
      itemCheckboxStyle: {
        position: 'absolute',
        width: '13px',
        height: '13px'
      },
      symbolWidth: 16,
      symbolPadding: 5,
      verticalAlign: 'bottom',
      x: 0,
      y: 0,
      title: { style: { fontWeight: 'bold' } }
    },
    loading: {
      labelStyle: {
        fontWeight: 'bold',
        position: 'relative',
        top: '1em'
      },
      style: {
        position: 'absolute',
        backgroundColor: 'white',
        opacity: 0.5,
        textAlign: 'center'
      }
    },
    tooltip: {
      enabled: !0,
      animation: Z,
      backgroundColor: 'rgba(255, 255, 255, .85)',
      borderWidth: 1,
      borderRadius: 3,
      dateTimeLabelFormats: {
        millisecond: '%A, %b %e, %H:%M:%S.%L',
        second: '%A, %b %e, %H:%M:%S',
        minute: '%A, %b %e, %H:%M',
        hour: '%A, %b %e, %H:%M',
        day: '%A, %b %e, %Y',
        week: 'Week from %A, %b %e, %Y',
        month: '%B %Y',
        year: '%Y'
      },
      headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>',
      pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
      shadow: !0,
      snap: Mb ? 25 : 10,
      style: {
        color: '#333333',
        cursor: 'default',
        fontSize: '12px',
        padding: '8px',
        whiteSpace: 'nowrap'
      }
    },
    credits: {
      enabled: !0,
      text: 'Highcharts.com',
      href: 'http://www.highcharts.com',
      position: {
        align: 'right',
        x: -10,
        verticalAlign: 'bottom',
        y: -5
      },
      style: {
        cursor: 'pointer',
        color: '#909090',
        fontSize: '9px'
      }
    }
  };
  var X = N.plotOptions, W = X.line;
  Jb();
  var ma = function (a) {
    var b = [], c, d;
    (function (a) {
      a && a.stops ? d = La(a.stops, function (a) {
        return ma(a[1]);
      }) : (c = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/.exec(a)) ? b = [
        u(c[1]),
        u(c[2]),
        u(c[3]),
        parseFloat(c[4], 10)
      ] : (c = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(a)) ? b = [
        u(c[1], 16),
        u(c[2], 16),
        u(c[3], 16),
        1
      ] : (c = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(a)) && (b = [
        u(c[1]),
        u(c[2]),
        u(c[3]),
        1
      ]);
    }(a));
    return {
      get: function (c) {
        var f;
        d ? (f = x(a), f.stops = [].concat(f.stops), n(d, function (a, b) {
          f.stops[b] = [
            f.stops[b][0],
            a.get(c)
          ];
        })) : f = b && !isNaN(b[0]) ? c === 'rgb' ? 'rgb(' + b[0] + ',' + b[1] + ',' + b[2] + ')' : c === 'a' ? b[3] : 'rgba(' + b.join(',') + ')' : a;
        return f;
      },
      brighten: function (a) {
        if (d)
          n(d, function (b) {
            b.brighten(a);
          });
        else if (Ea(a) && a !== 0) {
          var c;
          for (c = 0; c < 3; c++)
            b[c] += u(a * 255), b[c] < 0 && (b[c] = 0), b[c] > 255 && (b[c] = 255);
        }
        return this;
      },
      rgba: b,
      setOpacity: function (a) {
        b[3] = a;
        return this;
      }
    };
  };
  ra.prototype = {
    init: function (a, b) {
      this.element = b === 'span' ? U(b) : z.createElementNS(sa, b);
      this.renderer = a;
      this.attrSetters = {};
    },
    opacity: 1,
    animate: function (a, b, c) {
      b = o(b, za, !0);
      Ta(this);
      if (b) {
        b = x(b);
        if (c)
          b.complete = c;
        wb(this, a, b);
      } else
        this.attr(a), c && c();
    },
    attr: function (a, b) {
      var c, d, e, f, g = this.element, h = g.nodeName.toLowerCase(), i = this.renderer, j, k = this.attrSetters, m = this.shadows, l, p, s = this;
      fa(a) && r(b) && (c = a, a = {}, a[c] = b);
      if (fa(a))
        c = a, h === 'circle' ? c = {
          x: 'cx',
          y: 'cy'
        }[c] || c : c === 'strokeWidth' && (c = 'stroke-width'), s = A(g, c) || this[c] || 0, c !== 'd' && c !== 'visibility' && (s = parseFloat(s));
      else {
        for (c in a)
          if (j = !1, d = a[c], e = k[c] && k[c].call(this, d, c), e !== !1) {
            e !== y && (d = e);
            if (c === 'd')
              d && d.join && (d = d.join(' ')), /(NaN| {2}|^$)/.test(d) && (d = 'M 0 0');
            else if (c === 'x' && h === 'text')
              for (e = 0; e < g.childNodes.length; e++)
                f = g.childNodes[e], A(f, 'x') === A(g, 'x') && A(f, 'x', d);
            else if (this.rotation && (c === 'x' || c === 'y'))
              p = !0;
            else if (c === 'fill')
              d = i.color(d, g, c);
            else if (h === 'circle' && (c === 'x' || c === 'y'))
              c = {
                x: 'cx',
                y: 'cy'
              }[c] || c;
            else if (h === 'rect' && c === 'r')
              A(g, {
                rx: d,
                ry: d
              }), j = !0;
            else if (c === 'translateX' || c === 'translateY' || c === 'rotation' || c === 'verticalAlign' || c === 'scaleX' || c === 'scaleY')
              j = p = !0;
            else if (c === 'stroke')
              d = i.color(d, g, c);
            else if (c === 'dashstyle')
              if (c = 'stroke-dasharray', d = d && d.toLowerCase(), d === 'solid')
                d = S;
              else {
                if (d) {
                  d = d.replace('shortdashdotdot', '3,1,1,1,1,1,').replace('shortdashdot', '3,1,1,1').replace('shortdot', '1,1,').replace('shortdash', '3,1,').replace('longdash', '8,3,').replace(/dot/g, '1,3,').replace('dash', '4,3,').replace(/,$/, '').split(',');
                  for (e = d.length; e--;)
                    d[e] = u(d[e]) * a['stroke-width'];
                  d = d.join(',');
                }
              }
            else if (c === 'width')
              d = u(d);
            else if (c === 'align')
              c = 'text-anchor', d = {
                left: 'start',
                center: 'middle',
                right: 'end'
              }[d];
            else if (c === 'title')
              e = g.getElementsByTagName('title')[0], e || (e = z.createElementNS(sa, 'title'), g.appendChild(e)), e.textContent = d;
            c === 'strokeWidth' && (c = 'stroke-width');
            if (c === 'stroke-width' || c === 'stroke') {
              this[c] = d;
              if (this.stroke && this['stroke-width'])
                A(g, 'stroke', this.stroke), A(g, 'stroke-width', this['stroke-width']), this.hasStroke = !0;
              else if (c === 'stroke-width' && d === 0 && this.hasStroke)
                g.removeAttribute('stroke'), this.hasStroke = !1;
              j = !0;
            }
            this.symbolName && /^(x|y|width|height|r|start|end|innerR|anchorX|anchorY)/.test(c) && (l || (this.symbolAttr(a), l = !0), j = !0);
            if (m && /^(width|height|visibility|x|y|d|transform)$/.test(c))
              for (e = m.length; e--;)
                A(m[e], c, c === 'height' ? q(d - (m[e].cutHeight || 0), 0) : d);
            if ((c === 'width' || c === 'height') && h === 'rect' && d < 0)
              d = 0;
            this[c] = d;
            c === 'text' ? (d !== this.textStr && delete this.bBox, this.textStr = d, this.added && i.buildText(this)) : j || A(g, c, d);
          }
        p && this.updateTransform();
      }
      return s;
    },
    addClass: function (a) {
      A(this.element, 'class', A(this.element, 'class') + ' ' + a);
      return this;
    },
    symbolAttr: function (a) {
      var b = this;
      n('x,y,r,start,end,width,height,innerR,anchorX,anchorY'.split(','), function (c) {
        b[c] = o(a[c], b[c]);
      });
      b.attr({ d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b) });
    },
    clip: function (a) {
      return this.attr('clip-path', a ? 'url(' + this.renderer.url + '#' + a.id + ')' : S);
    },
    crisp: function (a, b, c, d, e) {
      var f, g = {}, h = {}, i, a = a || this.strokeWidth || this.attr && this.attr('stroke-width') || 0;
      i = t(a) % 2 / 2;
      h.x = T(b || this.x || 0) + i;
      h.y = T(c || this.y || 0) + i;
      h.width = T((d || this.width || 0) - 2 * i);
      h.height = T((e || this.height || 0) - 2 * i);
      h.strokeWidth = a;
      for (f in h)
        this[f] !== h[f] && (this[f] = g[f] = h[f]);
      return g;
    },
    css: function (a) {
      var b = this.element, c = a && a.width && b.nodeName.toLowerCase() === 'text', d, e = '', f = function (a, b) {
          return '-' + b.toLowerCase();
        };
      if (a && a.color)
        a.fill = a.color;
      this.styles = a = v(this.styles, a);
      $ && c && delete a.width;
      if (Fa && !Z)
        c && delete a.width, L(this.element, a);
      else {
        for (d in a)
          e += d.replace(/([A-Z])/g, f) + ':' + a[d] + ';';
        A(b, 'style', e);
      }
      c && this.added && this.renderer.buildText(this);
      return this;
    },
    on: function (a, b) {
      if (fb && a === 'click')
        this.element.ontouchstart = function (a) {
          a.preventDefault();
          b();
        };
      this.element['on' + a] = b;
      return this;
    },
    setRadialReference: function (a) {
      this.element.radialReference = a;
      return this;
    },
    translate: function (a, b) {
      return this.attr({
        translateX: a,
        translateY: b
      });
    },
    invert: function () {
      this.inverted = !0;
      this.updateTransform();
      return this;
    },
    htmlCss: function (a) {
      var b = this.element;
      if (b = a && b.tagName === 'SPAN' && a.width)
        delete a.width, this.textWidth = b, this.updateTransform();
      this.styles = v(this.styles, a);
      L(this.element, a);
      return this;
    },
    htmlGetBBox: function () {
      var a = this.element, b = this.bBox;
      if (!b) {
        if (a.nodeName === 'text')
          a.style.position = 'absolute';
        b = this.bBox = {
          x: a.offsetLeft,
          y: a.offsetTop,
          width: a.offsetWidth,
          height: a.offsetHeight
        };
      }
      return b;
    },
    htmlUpdateTransform: function () {
      if (this.added) {
        var a = this.renderer, b = this.element, c = this.translateX || 0, d = this.translateY || 0, e = this.x || 0, f = this.y || 0, g = this.textAlign || 'left', h = {
            left: 0,
            center: 0.5,
            right: 1
          }[g], i = g && g !== 'left', j = this.shadows;
        L(b, {
          marginLeft: c,
          marginTop: d
        });
        j && n(j, function (a) {
          L(a, {
            marginLeft: c + 1,
            marginTop: d + 1
          });
        });
        this.inverted && n(b.childNodes, function (c) {
          a.invertChild(c, b);
        });
        if (b.tagName === 'SPAN') {
          var k, m, j = this.rotation, l, p = 0, s = 1, p = 0, xb;
          l = u(this.textWidth);
          var B = this.xCorr || 0, w = this.yCorr || 0, G = [
              j,
              g,
              b.innerHTML,
              this.textWidth
            ].join(',');
          k = {};
          if (G !== this.cTT) {
            if (r(j))
              a.isSVG ? (B = Fa ? '-ms-transform' : db ? '-webkit-transform' : eb ? 'MozTransform' : Lb ? '-o-transform' : '', k[B] = k.transform = 'rotate(' + j + 'deg)') : (p = j * bb, s = Y(p), p = ca(p), k.filter = j ? [
                'progid:DXImageTransform.Microsoft.Matrix(M11=',
                s,
                ', M12=',
                -p,
                ', M21=',
                p,
                ', M22=',
                s,
                ', sizingMethod=\'auto expand\')'
              ].join('') : S), L(b, k);
            k = o(this.elemWidth, b.offsetWidth);
            m = o(this.elemHeight, b.offsetHeight);
            if (k > l && /[ \-]/.test(b.textContent || b.innerText))
              L(b, {
                width: l + 'px',
                display: 'block',
                whiteSpace: 'normal'
              }), k = l;
            l = a.fontMetrics(b.style.fontSize).b;
            B = s < 0 && -k;
            w = p < 0 && -m;
            xb = s * p < 0;
            B += p * l * (xb ? 1 - h : h);
            w -= s * l * (j ? xb ? h : 1 - h : 1);
            i && (B -= k * h * (s < 0 ? -1 : 1), j && (w -= m * h * (p < 0 ? -1 : 1)), L(b, { textAlign: g }));
            this.xCorr = B;
            this.yCorr = w;
          }
          L(b, {
            left: e + B + 'px',
            top: f + w + 'px'
          });
          if (db)
            m = b.offsetHeight;
          this.cTT = G;
        }
      } else
        this.alignOnAdd = !0;
    },
    updateTransform: function () {
      var a = this.translateX || 0, b = this.translateY || 0, c = this.scaleX, d = this.scaleY, e = this.inverted, f = this.rotation;
      e && (a += this.attr('width'), b += this.attr('height'));
      a = ['translate(' + a + ',' + b + ')'];
      e ? a.push('rotate(90) scale(-1,1)') : f && a.push('rotate(' + f + ' ' + (this.x || 0) + ' ' + (this.y || 0) + ')');
      (r(c) || r(d)) && a.push('scale(' + o(c, 1) + ' ' + o(d, 1) + ')');
      a.length && A(this.element, 'transform', a.join(' '));
    },
    toFront: function () {
      var a = this.element;
      a.parentNode.appendChild(a);
      return this;
    },
    align: function (a, b, c) {
      var d, e, f, g, h = {};
      e = this.renderer;
      f = e.alignedObjects;
      if (a) {
        if (this.alignOptions = a, this.alignByTranslate = b, !c || fa(c))
          this.alignTo = d = c || 'renderer', ga(f, this), f.push(this), c = null;
      } else
        a = this.alignOptions, b = this.alignByTranslate, d = this.alignTo;
      c = o(c, e[d], e);
      d = a.align;
      e = a.verticalAlign;
      f = (c.x || 0) + (a.x || 0);
      g = (c.y || 0) + (a.y || 0);
      if (d === 'right' || d === 'center')
        f += (c.width - (a.width || 0)) / {
          right: 1,
          center: 2
        }[d];
      h[b ? 'translateX' : 'x'] = t(f);
      if (e === 'bottom' || e === 'middle')
        g += (c.height - (a.height || 0)) / ({
          bottom: 1,
          middle: 2
        }[e] || 1);
      h[b ? 'translateY' : 'y'] = t(g);
      this[this.placed ? 'animate' : 'attr'](h);
      this.placed = !0;
      this.alignAttr = h;
      return this;
    },
    getBBox: function () {
      var a = this.bBox, b = this.renderer, c, d = this.rotation;
      c = this.element;
      var e = this.styles, f = d * bb;
      if (!a) {
        if (c.namespaceURI === sa || b.forExport) {
          try {
            a = c.getBBox ? v({}, c.getBBox()) : {
              width: c.offsetWidth,
              height: c.offsetHeight
            };
          } catch (g) {
          }
          if (!a || a.width < 0)
            a = {
              width: 0,
              height: 0
            };
        } else
          a = this.htmlGetBBox();
        if (b.isSVG) {
          b = a.width;
          c = a.height;
          if (Fa && e && e.fontSize === '11px' && c.toPrecision(3) === '22.7')
            a.height = c = 14;
          if (d)
            a.width = Q(c * ca(f)) + Q(b * Y(f)), a.height = Q(c * Y(f)) + Q(b * ca(f));
        }
        this.bBox = a;
      }
      return a;
    },
    show: function () {
      return this.attr({ visibility: 'visible' });
    },
    hide: function () {
      return this.attr({ visibility: 'hidden' });
    },
    fadeOut: function (a) {
      var b = this;
      b.animate({ opacity: 0 }, {
        duration: a || 150,
        complete: function () {
          b.hide();
        }
      });
    },
    add: function (a) {
      var b = this.renderer, c = a || b, d = c.element || b.box, e = d.childNodes, f = this.element, g = A(f, 'zIndex'), h;
      if (a)
        this.parentGroup = a;
      this.parentInverted = a && a.inverted;
      this.textStr !== void 0 && b.buildText(this);
      if (g)
        c.handleZ = !0, g = u(g);
      if (c.handleZ)
        for (c = 0; c < e.length; c++)
          if (a = e[c], b = A(a, 'zIndex'), a !== f && (u(b) > g || !r(g) && r(b))) {
            d.insertBefore(f, a);
            h = !0;
            break;
          }
      h || d.appendChild(f);
      this.added = !0;
      D(this, 'add');
      return this;
    },
    safeRemoveChild: function (a) {
      var b = a.parentNode;
      b && b.removeChild(a);
    },
    destroy: function () {
      var a = this, b = a.element || {}, c = a.shadows, d, e;
      b.onclick = b.onmouseout = b.onmouseover = b.onmousemove = b.point = null;
      Ta(a);
      if (a.clipPath)
        a.clipPath = a.clipPath.destroy();
      if (a.stops) {
        for (e = 0; e < a.stops.length; e++)
          a.stops[e] = a.stops[e].destroy();
        a.stops = null;
      }
      a.safeRemoveChild(b);
      c && n(c, function (b) {
        a.safeRemoveChild(b);
      });
      a.alignTo && ga(a.renderer.alignedObjects, a);
      for (d in a)
        delete a[d];
      return null;
    },
    shadow: function (a, b, c) {
      var d = [], e, f, g = this.element, h, i, j, k;
      if (a) {
        i = o(a.width, 3);
        j = (a.opacity || 0.15) / i;
        k = this.parentInverted ? '(-1,-1)' : '(' + o(a.offsetX, 1) + ', ' + o(a.offsetY, 1) + ')';
        for (e = 1; e <= i; e++) {
          f = g.cloneNode(0);
          h = i * 2 + 1 - 2 * e;
          A(f, {
            isShadow: 'true',
            stroke: a.color || 'black',
            'stroke-opacity': j * e,
            'stroke-width': h,
            transform: 'translate' + k,
            fill: S
          });
          if (c)
            A(f, 'height', q(A(f, 'height') - h, 0)), f.cutHeight = h;
          b ? b.element.appendChild(f) : g.parentNode.insertBefore(f, g);
          d.push(f);
        }
        this.shadows = d;
      }
      return this;
    }
  };
  var Ca = function () {
    this.init.apply(this, arguments);
  };
  Ca.prototype = {
    Element: ra,
    init: function (a, b, c, d) {
      var e = location, f;
      f = this.createElement('svg').attr({
        xmlns: sa,
        version: '1.1'
      });
      a.appendChild(f.element);
      this.isSVG = !0;
      this.box = f.element;
      this.boxWrapper = f;
      this.alignedObjects = [];
      this.url = (eb || db) && z.getElementsByTagName('base').length ? e.href.replace(/#.*?$/, '').replace(/([\('\)])/g, '\\$1').replace(/ /g, '%20') : '';
      this.createElement('desc').add().element.appendChild(z.createTextNode('Created with Highcharts 3.0.2'));
      this.defs = this.createElement('defs').add();
      this.forExport = d;
      this.gradients = {};
      this.setSize(b, c, !1);
      var g;
      if (eb && a.getBoundingClientRect)
        this.subPixelFix = b = function () {
          L(a, {
            left: 0,
            top: 0
          });
          g = a.getBoundingClientRect();
          L(a, {
            left: ja(g.left) - g.left + 'px',
            top: ja(g.top) - g.top + 'px'
          });
        }, b(), J(O, 'resize', b);
    },
    isHidden: function () {
      return !this.boxWrapper.getBBox().width;
    },
    destroy: function () {
      var a = this.defs;
      this.box = null;
      this.boxWrapper = this.boxWrapper.destroy();
      Ha(this.gradients || {});
      this.gradients = null;
      if (a)
        this.defs = a.destroy();
      this.subPixelFix && ba(O, 'resize', this.subPixelFix);
      return this.alignedObjects = null;
    },
    createElement: function (a) {
      var b = new this.Element();
      b.init(this, a);
      return b;
    },
    draw: function () {
    },
    buildText: function (a) {
      for (var b = a.element, c = this, d = c.forExport, e = o(a.textStr, '').toString().replace(/<(b|strong)>/g, '<span style="font-weight:bold">').replace(/<(i|em)>/g, '<span style="font-style:italic">').replace(/<a/g, '<span').replace(/<\/(b|strong|i|em|a)>/g, '</span>').split(/<br.*?>/g), f = b.childNodes, g = /style="([^"]+)"/, h = /href="([^"]+)"/, i = A(b, 'x'), j = a.styles, k = j && j.width && u(j.width), m = j && j.lineHeight, l = f.length; l--;)
        b.removeChild(f[l]);
      k && !a.added && this.box.appendChild(b);
      e[e.length - 1] === '' && e.pop();
      n(e, function (e, f) {
        var l, o = 0, e = e.replace(/<span/g, '|||<span').replace(/<\/span>/g, '</span>|||');
        l = e.split('|||');
        n(l, function (e) {
          if (e !== '' || l.length === 1) {
            var p = {}, n = z.createElementNS(sa, 'tspan'), q;
            g.test(e) && (q = e.match(g)[1].replace(/(;| |^)color([ :])/, '$1fill$2'), A(n, 'style', q));
            h.test(e) && !d && (A(n, 'onclick', 'location.href="' + e.match(h)[1] + '"'), L(n, { cursor: 'pointer' }));
            e = (e.replace(/<(.|\n)*?>/g, '') || ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
            n.appendChild(z.createTextNode(e));
            o ? p.dx = 0 : p.x = i;
            A(n, p);
            !o && f && (!Z && d && L(n, { display: 'block' }), A(n, 'dy', m || c.fontMetrics(/px$/.test(n.style.fontSize) ? n.style.fontSize : j.fontSize).h, db && n.offsetHeight));
            b.appendChild(n);
            o++;
            if (k)
              for (var e = e.replace(/([^\^])-/g, '$1- ').split(' '), r, t = []; e.length || t.length;)
                delete a.bBox, r = a.getBBox().width, p = r > k, !p || e.length === 1 ? (e = t, t = [], e.length && (n = z.createElementNS(sa, 'tspan'), A(n, {
                  dy: m || 16,
                  x: i
                }), q && A(n, 'style', q), b.appendChild(n), r > k && (k = r))) : (n.removeChild(n.firstChild), t.unshift(e.pop())), e.length && n.appendChild(z.createTextNode(e.join(' ').replace(/- /g, '-')));
          }
        });
      });
    },
    button: function (a, b, c, d, e, f, g) {
      var h = this.label(a, b, c, null, null, null, null, null, 'button'), i = 0, j, k, m, l, p, a = {
          x1: 0,
          y1: 0,
          x2: 0,
          y2: 1
        }, e = x({
          'stroke-width': 1,
          stroke: '#CCCCCC',
          fill: {
            linearGradient: a,
            stops: [
              [
                0,
                '#FEFEFE'
              ],
              [
                1,
                '#F6F6F6'
              ]
            ]
          },
          r: 2,
          padding: 5,
          style: { color: 'black' }
        }, e);
      m = e.style;
      delete e.style;
      f = x(e, {
        stroke: '#68A',
        fill: {
          linearGradient: a,
          stops: [
            [
              0,
              '#FFF'
            ],
            [
              1,
              '#ACF'
            ]
          ]
        }
      }, f);
      l = f.style;
      delete f.style;
      g = x(e, {
        stroke: '#68A',
        fill: {
          linearGradient: a,
          stops: [
            [
              0,
              '#9BD'
            ],
            [
              1,
              '#CDF'
            ]
          ]
        }
      }, g);
      p = g.style;
      delete g.style;
      J(h.element, 'mouseenter', function () {
        h.attr(f).css(l);
      });
      J(h.element, 'mouseleave', function () {
        j = [
          e,
          f,
          g
        ][i];
        k = [
          m,
          l,
          p
        ][i];
        h.attr(j).css(k);
      });
      h.setState = function (a) {
        (i = a) ? a === 2 && h.attr(g).css(p) : h.attr(e).css(m);
      };
      return h.on('click', function () {
        d.call(h);
      }).attr(e).css(v({ cursor: 'default' }, m));
    },
    crispLine: function (a, b) {
      a[1] === a[4] && (a[1] = a[4] = t(a[1]) - b % 2 / 2);
      a[2] === a[5] && (a[2] = a[5] = t(a[2]) + b % 2 / 2);
      return a;
    },
    path: function (a) {
      var b = { fill: S };
      Da(a) ? b.d = a : V(a) && v(b, a);
      return this.createElement('path').attr(b);
    },
    circle: function (a, b, c) {
      a = V(a) ? a : {
        x: a,
        y: b,
        r: c
      };
      return this.createElement('circle').attr(a);
    },
    arc: function (a, b, c, d, e, f) {
      if (V(a))
        b = a.y, c = a.r, d = a.innerR, e = a.start, f = a.end, a = a.x;
      return this.symbol('arc', a || 0, b || 0, c || 0, c || 0, {
        innerR: d || 0,
        start: e || 0,
        end: f || 0
      });
    },
    rect: function (a, b, c, d, e, f) {
      e = V(a) ? a.r : e;
      e = this.createElement('rect').attr({
        rx: e,
        ry: e,
        fill: S
      });
      return e.attr(V(a) ? a : e.crisp(f, a, b, q(c, 0), q(d, 0)));
    },
    setSize: function (a, b, c) {
      var d = this.alignedObjects, e = d.length;
      this.width = a;
      this.height = b;
      for (this.boxWrapper[o(c, !0) ? 'animate' : 'attr']({
          width: a,
          height: b
        }); e--;)
        d[e].align();
    },
    g: function (a) {
      var b = this.createElement('g');
      return r(a) ? b.attr({ 'class': 'highcharts-' + a }) : b;
    },
    image: function (a, b, c, d, e) {
      var f = { preserveAspectRatio: S };
      arguments.length > 1 && v(f, {
        x: b,
        y: c,
        width: d,
        height: e
      });
      f = this.createElement('image').attr(f);
      f.element.setAttributeNS ? f.element.setAttributeNS('http://www.w3.org/1999/xlink', 'href', a) : f.element.setAttribute('hc-svg-href', a);
      return f;
    },
    symbol: function (a, b, c, d, e, f) {
      var g, h = this.symbols[a], h = h && h(t(b), t(c), d, e, f), i = /^url\((.*?)\)$/, j, k;
      if (h)
        g = this.path(h), v(g, {
          symbolName: a,
          x: b,
          y: c,
          width: d,
          height: e
        }), f && v(g, f);
      else if (i.test(a))
        k = function (a, b) {
          a.element && (a.attr({
            width: b[0],
            height: b[1]
          }), a.alignByTranslate || a.translate(t((d - b[0]) / 2), t((e - b[1]) / 2)));
        }, j = a.match(i)[1], a = Nb[j], g = this.image(j).attr({
          x: b,
          y: c
        }), g.isImg = !0, a ? k(g, a) : (g.attr({
          width: 0,
          height: 0
        }), U('img', {
          onload: function () {
            k(g, Nb[j] = [
              this.width,
              this.height
            ]);
          },
          src: j
        }));
      return g;
    },
    symbols: {
      circle: function (a, b, c, d) {
        var e = 0.166 * c;
        return [
          'M',
          a + c / 2,
          b,
          'C',
          a + c + e,
          b,
          a + c + e,
          b + d,
          a + c / 2,
          b + d,
          'C',
          a - e,
          b + d,
          a - e,
          b,
          a + c / 2,
          b,
          'Z'
        ];
      },
      square: function (a, b, c, d) {
        return [
          'M',
          a,
          b,
          'L',
          a + c,
          b,
          a + c,
          b + d,
          a,
          b + d,
          'Z'
        ];
      },
      triangle: function (a, b, c, d) {
        return [
          'M',
          a + c / 2,
          b,
          'L',
          a + c,
          b + d,
          a,
          b + d,
          'Z'
        ];
      },
      'triangle-down': function (a, b, c, d) {
        return [
          'M',
          a,
          b,
          'L',
          a + c,
          b,
          a + c / 2,
          b + d,
          'Z'
        ];
      },
      diamond: function (a, b, c, d) {
        return [
          'M',
          a + c / 2,
          b,
          'L',
          a + c,
          b + d / 2,
          a + c / 2,
          b + d,
          a,
          b + d / 2,
          'Z'
        ];
      },
      arc: function (a, b, c, d, e) {
        var f = e.start, c = e.r || c || d, g = e.end - 0.001, d = e.innerR, h = e.open, i = Y(f), j = ca(f), k = Y(g), g = ca(g), e = e.end - f < Ka ? 0 : 1;
        return [
          'M',
          a + c * i,
          b + c * j,
          'A',
          c,
          c,
          0,
          e,
          1,
          a + c * k,
          b + c * g,
          h ? 'M' : 'L',
          a + d * k,
          b + d * g,
          'A',
          d,
          d,
          0,
          e,
          0,
          a + d * i,
          b + d * j,
          h ? '' : 'Z'
        ];
      }
    },
    clipRect: function (a, b, c, d) {
      var e = 'highcharts-' + ub++, f = this.createElement('clipPath').attr({ id: e }).add(this.defs), a = this.rect(a, b, c, d, 0).add(f);
      a.id = e;
      a.clipPath = f;
      return a;
    },
    color: function (a, b, c) {
      var d = this, e, f = /^rgba/, g, h, i, j, k, m, l, p = [];
      a && a.linearGradient ? g = 'linearGradient' : a && a.radialGradient && (g = 'radialGradient');
      if (g) {
        c = a[g];
        h = d.gradients;
        j = a.stops;
        b = b.radialReference;
        Da(c) && (a[g] = c = {
          x1: c[0],
          y1: c[1],
          x2: c[2],
          y2: c[3],
          gradientUnits: 'userSpaceOnUse'
        });
        g === 'radialGradient' && b && !r(c.gradientUnits) && (c = x(c, {
          cx: b[0] - b[2] / 2 + c.cx * b[2],
          cy: b[1] - b[2] / 2 + c.cy * b[2],
          r: c.r * b[2],
          gradientUnits: 'userSpaceOnUse'
        }));
        for (l in c)
          l !== 'id' && p.push(l, c[l]);
        for (l in j)
          p.push(j[l]);
        p = p.join(',');
        h[p] ? a = h[p].id : (c.id = a = 'highcharts-' + ub++, h[p] = i = d.createElement(g).attr(c).add(d.defs), i.stops = [], n(j, function (a) {
          f.test(a[1]) ? (e = ma(a[1]), k = e.get('rgb'), m = e.get('a')) : (k = a[1], m = 1);
          a = d.createElement('stop').attr({
            offset: a[0],
            'stop-color': k,
            'stop-opacity': m
          }).add(i);
          i.stops.push(a);
        }));
        return 'url(' + d.url + '#' + a + ')';
      } else
        return f.test(a) ? (e = ma(a), A(b, c + '-opacity', e.get('a')), e.get('rgb')) : (b.removeAttribute(c + '-opacity'), a);
    },
    text: function (a, b, c, d) {
      var e = N.chart.style, f = $ || !Z && this.forExport;
      if (d && !this.forExport)
        return this.html(a, b, c);
      b = t(o(b, 0));
      c = t(o(c, 0));
      a = this.createElement('text').attr({
        x: b,
        y: c,
        text: a
      }).css({
        fontFamily: e.fontFamily,
        fontSize: e.fontSize
      });
      f && a.css({ position: 'absolute' });
      a.x = b;
      a.y = c;
      return a;
    },
    html: function (a, b, c) {
      var d = N.chart.style, e = this.createElement('span'), f = e.attrSetters, g = e.element, h = e.renderer;
      f.text = function (a) {
        a !== g.innerHTML && delete this.bBox;
        g.innerHTML = a;
        return !1;
      };
      f.x = f.y = f.align = function (a, b) {
        b === 'align' && (b = 'textAlign');
        e[b] = a;
        e.htmlUpdateTransform();
        return !1;
      };
      e.attr({
        text: a,
        x: t(b),
        y: t(c)
      }).css({
        position: 'absolute',
        whiteSpace: 'nowrap',
        fontFamily: d.fontFamily,
        fontSize: d.fontSize
      });
      e.css = e.htmlCss;
      if (h.isSVG)
        e.add = function (a) {
          var b, c = h.box.parentNode, d = [];
          if (a) {
            if (b = a.div, !b) {
              for (; a;)
                d.push(a), a = a.parentGroup;
              n(d.reverse(), function (a) {
                var d;
                b = a.div = a.div || U(ya, { className: A(a.element, 'class') }, {
                  position: 'absolute',
                  left: (a.translateX || 0) + 'px',
                  top: (a.translateY || 0) + 'px'
                }, b || c);
                d = b.style;
                v(a.attrSetters, {
                  translateX: function (a) {
                    d.left = a + 'px';
                  },
                  translateY: function (a) {
                    d.top = a + 'px';
                  },
                  visibility: function (a, b) {
                    d[b] = a;
                  }
                });
              });
            }
          } else
            b = c;
          b.appendChild(g);
          e.added = !0;
          e.alignOnAdd && e.htmlUpdateTransform();
          return e;
        };
      return e;
    },
    fontMetrics: function (a) {
      var a = u(a || 11), a = a < 24 ? a + 4 : t(a * 1.2), b = t(a * 0.8);
      return {
        h: a,
        b: b
      };
    },
    label: function (a, b, c, d, e, f, g, h, i) {
      function j() {
        var a, b;
        a = o.element.style;
        w = (Ma === void 0 || yb === void 0 || s.styles.textAlign) && o.getBBox();
        s.width = (Ma || w.width || 0) + 2 * q + hb;
        s.height = (yb || w.height || 0) + 2 * q;
        A = q + p.fontMetrics(a && a.fontSize).b;
        if (z) {
          if (!B)
            a = t(-G * q), b = h ? -A : 0, s.box = B = d ? p.symbol(d, a, b, s.width, s.height) : p.rect(a, b, s.width, s.height, 0, u[Pb]), B.add(s);
          B.isImg || B.attr(x({
            width: s.width,
            height: s.height
          }, u));
          u = null;
        }
      }
      function k() {
        var a = s.styles, a = a && a.textAlign, b = hb + q * (1 - G), c;
        c = h ? 0 : A;
        if (r(Ma) && (a === 'center' || a === 'right'))
          b += {
            center: 0.5,
            right: 1
          }[a] * (Ma - w.width);
        (b !== o.x || c !== o.y) && o.attr({
          x: b,
          y: c
        });
        o.x = b;
        o.y = c;
      }
      function m(a, b) {
        B ? B.attr(a, b) : u[a] = b;
      }
      function l() {
        o.add(s);
        s.attr({
          text: a,
          x: b,
          y: c
        });
        B && r(e) && s.attr({
          anchorX: e,
          anchorY: f
        });
      }
      var p = this, s = p.g(i), o = p.text('', 0, 0, g).attr({ zIndex: 1 }), B, w, G = 0, q = 3, hb = 0, Ma, yb, P, H, C = 0, u = {}, A, g = s.attrSetters, z;
      J(s, 'add', l);
      g.width = function (a) {
        Ma = a;
        return !1;
      };
      g.height = function (a) {
        yb = a;
        return !1;
      };
      g.padding = function (a) {
        r(a) && a !== q && (q = a, k());
        return !1;
      };
      g.paddingLeft = function (a) {
        r(a) && a !== hb && (hb = a, k());
        return !1;
      };
      g.align = function (a) {
        G = {
          left: 0,
          center: 0.5,
          right: 1
        }[a];
        return !1;
      };
      g.text = function (a, b) {
        o.attr(b, a);
        j();
        k();
        return !1;
      };
      g[Pb] = function (a, b) {
        z = !0;
        C = a % 2 / 2;
        m(b, a);
        return !1;
      };
      g.stroke = g.fill = g.r = function (a, b) {
        b === 'fill' && (z = !0);
        m(b, a);
        return !1;
      };
      g.anchorX = function (a, b) {
        e = a;
        m(b, a + C - P);
        return !1;
      };
      g.anchorY = function (a, b) {
        f = a;
        m(b, a - H);
        return !1;
      };
      g.x = function (a) {
        s.x = a;
        a -= G * ((Ma || w.width) + q);
        P = t(a);
        s.attr('translateX', P);
        return !1;
      };
      g.y = function (a) {
        H = s.y = t(a);
        s.attr('translateY', H);
        return !1;
      };
      var E = s.css;
      return v(s, {
        css: function (a) {
          if (a) {
            var b = {}, a = x(a);
            n('fontSize,fontWeight,fontFamily,color,lineHeight,width,textDecoration'.split(','), function (c) {
              a[c] !== y && (b[c] = a[c], delete a[c]);
            });
            o.css(b);
          }
          return E.call(s, a);
        },
        getBBox: function () {
          return {
            width: w.width + 2 * q,
            height: w.height + 2 * q,
            x: w.x - q,
            y: w.y - q
          };
        },
        shadow: function (a) {
          B && B.shadow(a);
          return s;
        },
        destroy: function () {
          ba(s, 'add', l);
          ba(s.element, 'mouseenter');
          ba(s.element, 'mouseleave');
          o && (o = o.destroy());
          B && (B = B.destroy());
          ra.prototype.destroy.call(s);
          s = p = j = k = m = l = null;
        }
      });
    }
  };
  Sa = Ca;
  var F;
  if (!Z && !$) {
    Highcharts.VMLElement = F = {
      init: function (a, b) {
        var c = [
            '<',
            b,
            ' filled="f" stroked="f"'
          ], d = [
            'position: ',
            'absolute',
            ';'
          ], e = b === ya;
        (b === 'shape' || e) && d.push('left:0;top:0;width:1px;height:1px;');
        d.push('visibility: ', e ? 'hidden' : 'visible');
        c.push(' style="', d.join(''), '"/>');
        if (b)
          c = e || b === 'span' || b === 'img' ? c.join('') : a.prepVML(c), this.element = U(c);
        this.renderer = a;
        this.attrSetters = {};
      },
      add: function (a) {
        var b = this.renderer, c = this.element, d = b.box, d = a ? a.element || a : d;
        a && a.inverted && b.invertChild(c, d);
        d.appendChild(c);
        this.added = !0;
        this.alignOnAdd && !this.deferUpdateTransform && this.updateTransform();
        D(this, 'add');
        return this;
      },
      updateTransform: ra.prototype.htmlUpdateTransform,
      attr: function (a, b) {
        var c, d, e, f = this.element || {}, g = f.style, h = f.nodeName, i = this.renderer, j = this.symbolName, k, m = this.shadows, l, p = this.attrSetters, s = this;
        fa(a) && r(b) && (c = a, a = {}, a[c] = b);
        if (fa(a))
          c = a, s = c === 'strokeWidth' || c === 'stroke-width' ? this.strokeweight : this[c];
        else
          for (c in a)
            if (d = a[c], l = !1, e = p[c] && p[c].call(this, d, c), e !== !1 && d !== null) {
              e !== y && (d = e);
              if (j && /^(x|y|r|start|end|width|height|innerR|anchorX|anchorY)/.test(c))
                k || (this.symbolAttr(a), k = !0), l = !0;
              else if (c === 'd') {
                d = d || [];
                this.d = d.join(' ');
                e = d.length;
                l = [];
                for (var o; e--;)
                  if (Ea(d[e]))
                    l[e] = t(d[e] * 10) - 5;
                  else if (d[e] === 'Z')
                    l[e] = 'x';
                  else if (l[e] = d[e], d.isArc && (d[e] === 'wa' || d[e] === 'at'))
                    o = d[e] === 'wa' ? 1 : -1, l[e + 5] === l[e + 7] && (l[e + 7] -= o), l[e + 6] === l[e + 8] && (l[e + 8] -= o);
                d = l.join(' ') || 'x';
                f.path = d;
                if (m)
                  for (e = m.length; e--;)
                    m[e].path = m[e].cutOff ? this.cutOffPath(d, m[e].cutOff) : d;
                l = !0;
              } else if (c === 'visibility') {
                if (m)
                  for (e = m.length; e--;)
                    m[e].style[c] = d;
                h === 'DIV' && (d = d === 'hidden' ? '-999em' : 0, cb || (g[c] = d ? 'visible' : 'hidden'), c = 'top');
                g[c] = d;
                l = !0;
              } else if (c === 'zIndex')
                d && (g[c] = d), l = !0;
              else if (la(c, [
                  'x',
                  'y',
                  'width',
                  'height'
                ]) !== -1)
                this[c] = d, c === 'x' || c === 'y' ? c = {
                  x: 'left',
                  y: 'top'
                }[c] : d = q(0, d), this.updateClipping ? (this[c] = d, this.updateClipping()) : g[c] = d, l = !0;
              else if (c === 'class' && h === 'DIV')
                f.className = d;
              else if (c === 'stroke')
                d = i.color(d, f, c), c = 'strokecolor';
              else if (c === 'stroke-width' || c === 'strokeWidth')
                f.stroked = d ? !0 : !1, c = 'strokeweight', this[c] = d, Ea(d) && (d += 'px');
              else if (c === 'dashstyle')
                (f.getElementsByTagName('stroke')[0] || U(i.prepVML(['<stroke/>']), null, null, f))[c] = d || 'solid', this.dashstyle = d, l = !0;
              else if (c === 'fill')
                if (h === 'SPAN')
                  g.color = d;
                else {
                  if (h !== 'IMG')
                    f.filled = d !== S ? !0 : !1, d = i.color(d, f, c, this), c = 'fillcolor';
                }
              else if (c === 'opacity')
                l = !0;
              else if (h === 'shape' && c === 'rotation')
                this[c] = d, f.style.left = -t(ca(d * bb) + 1) + 'px', f.style.top = t(Y(d * bb)) + 'px';
              else if (c === 'translateX' || c === 'translateY' || c === 'rotation')
                this[c] = d, this.updateTransform(), l = !0;
              else if (c === 'text')
                this.bBox = null, f.innerHTML = d, l = !0;
              l || (cb ? f[c] = d : A(f, c, d));
            }
        return s;
      },
      clip: function (a) {
        var b = this, c;
        a ? (c = a.members, ga(c, b), c.push(b), b.destroyClip = function () {
          ga(c, b);
        }, a = a.getCSS(b)) : (b.destroyClip && b.destroyClip(), a = { clip: cb ? 'inherit' : 'rect(auto)' });
        return b.css(a);
      },
      css: ra.prototype.htmlCss,
      safeRemoveChild: function (a) {
        a.parentNode && Ra(a);
      },
      destroy: function () {
        this.destroyClip && this.destroyClip();
        return ra.prototype.destroy.apply(this);
      },
      on: function (a, b) {
        this.element['on' + a] = function () {
          var a = O.event;
          a.target = a.srcElement;
          b(a);
        };
        return this;
      },
      cutOffPath: function (a, b) {
        var c, a = a.split(/[ ,]/);
        c = a.length;
        if (c === 9 || c === 11)
          a[c - 4] = a[c - 2] = u(a[c - 2]) - 10 * b;
        return a.join(' ');
      },
      shadow: function (a, b, c) {
        var d = [], e, f = this.element, g = this.renderer, h, i = f.style, j, k = f.path, m, l, p, s;
        k && typeof k.value !== 'string' && (k = 'x');
        l = k;
        if (a) {
          p = o(a.width, 3);
          s = (a.opacity || 0.15) / p;
          for (e = 1; e <= 3; e++) {
            m = p * 2 + 1 - 2 * e;
            c && (l = this.cutOffPath(k.value, m + 0.5));
            j = [
              '<shape isShadow="true" strokeweight="',
              m,
              '" filled="false" path="',
              l,
              '" coordsize="10 10" style="',
              f.style.cssText,
              '" />'
            ];
            h = U(g.prepVML(j), null, {
              left: u(i.left) + o(a.offsetX, 1),
              top: u(i.top) + o(a.offsetY, 1)
            });
            if (c)
              h.cutOff = m + 1;
            j = [
              '<stroke color="',
              a.color || 'black',
              '" opacity="',
              s * e,
              '"/>'
            ];
            U(g.prepVML(j), null, null, h);
            b ? b.element.appendChild(h) : f.parentNode.insertBefore(h, f);
            d.push(h);
          }
          this.shadows = d;
        }
        return this;
      }
    };
    F = ea(ra, F);
    var na = {
        Element: F,
        isIE8: Aa.indexOf('MSIE 8.0') > -1,
        init: function (a, b, c) {
          var d, e;
          this.alignedObjects = [];
          d = this.createElement(ya);
          e = d.element;
          e.style.position = 'relative';
          a.appendChild(d.element);
          this.isVML = !0;
          this.box = e;
          this.boxWrapper = d;
          this.setSize(b, c, !1);
          if (!z.namespaces.hcv)
            z.namespaces.add('hcv', 'urn:schemas-microsoft-com:vml'), z.createStyleSheet().cssText = 'hcv\\:fill, hcv\\:path, hcv\\:shape, hcv\\:stroke{ behavior:url(#default#VML); display: inline-block; } ';
        },
        isHidden: function () {
          return !this.box.offsetWidth;
        },
        clipRect: function (a, b, c, d) {
          var e = this.createElement(), f = V(a);
          return v(e, {
            members: [],
            left: f ? a.x : a,
            top: f ? a.y : b,
            width: f ? a.width : c,
            height: f ? a.height : d,
            getCSS: function (a) {
              var b = a.element, c = b.nodeName, a = a.inverted, d = this.top - (c === 'shape' ? b.offsetTop : 0), e = this.left, b = e + this.width, f = d + this.height, d = { clip: 'rect(' + t(a ? e : d) + 'px,' + t(a ? f : b) + 'px,' + t(a ? b : f) + 'px,' + t(a ? d : e) + 'px)' };
              !a && cb && c === 'DIV' && v(d, {
                width: b + 'px',
                height: f + 'px'
              });
              return d;
            },
            updateClipping: function () {
              n(e.members, function (a) {
                a.css(e.getCSS(a));
              });
            }
          });
        },
        color: function (a, b, c, d) {
          var e = this, f, g = /^rgba/, h, i, j = S;
          a && a.linearGradient ? i = 'gradient' : a && a.radialGradient && (i = 'pattern');
          if (i) {
            var k, m, l = a.linearGradient || a.radialGradient, p, s, o, B, w, q = '', a = a.stops, r, t = [], y = function () {
                h = [
                  '<fill colors="' + t.join(',') + '" opacity="',
                  o,
                  '" o:opacity2="',
                  s,
                  '" type="',
                  i,
                  '" ',
                  q,
                  'focus="100%" method="any" />'
                ];
                U(e.prepVML(h), null, null, b);
              };
            p = a[0];
            r = a[a.length - 1];
            p[0] > 0 && a.unshift([
              0,
              p[1]
            ]);
            r[0] < 1 && a.push([
              1,
              r[1]
            ]);
            n(a, function (a, b) {
              g.test(a[1]) ? (f = ma(a[1]), k = f.get('rgb'), m = f.get('a')) : (k = a[1], m = 1);
              t.push(a[0] * 100 + '% ' + k);
              b ? (o = m, B = k) : (s = m, w = k);
            });
            if (c === 'fill')
              if (i === 'gradient')
                c = l.x1 || l[0] || 0, a = l.y1 || l[1] || 0, p = l.x2 || l[2] || 0, l = l.y2 || l[3] || 0, q = 'angle="' + (90 - I.atan((l - a) / (p - c)) * 180 / Ka) + '"', y();
              else {
                var j = l.r, v = j * 2, P = j * 2, H = l.cx, C = l.cy, x = b.radialReference, u, j = function () {
                    x && (u = d.getBBox(), H += (x[0] - u.x) / u.width - 0.5, C += (x[1] - u.y) / u.height - 0.5, v *= x[2] / u.width, P *= x[2] / u.height);
                    q = 'src="' + N.global.VMLRadialGradientURL + '" size="' + v + ',' + P + '" origin="0.5,0.5" position="' + H + ',' + C + '" color2="' + w + '" ';
                    y();
                  };
                d.added ? j() : J(d, 'add', j);
                j = B;
              }
            else
              j = k;
          } else if (g.test(a) && b.tagName !== 'IMG')
            f = ma(a), h = [
              '<',
              c,
              ' opacity="',
              f.get('a'),
              '"/>'
            ], U(this.prepVML(h), null, null, b), j = f.get('rgb');
          else {
            j = b.getElementsByTagName(c);
            if (j.length)
              j[0].opacity = 1, j[0].type = 'solid';
            j = a;
          }
          return j;
        },
        prepVML: function (a) {
          var b = this.isIE8, a = a.join('');
          b ? (a = a.replace('/>', ' xmlns="urn:schemas-microsoft-com:vml" />'), a = a.indexOf('style="') === -1 ? a.replace('/>', ' style="display:inline-block;behavior:url(#default#VML);" />') : a.replace('style="', 'style="display:inline-block;behavior:url(#default#VML);')) : a = a.replace('<', '<hcv:');
          return a;
        },
        text: Ca.prototype.html,
        path: function (a) {
          var b = { coordsize: '10 10' };
          Da(a) ? b.d = a : V(a) && v(b, a);
          return this.createElement('shape').attr(b);
        },
        circle: function (a, b, c) {
          var d = this.symbol('circle');
          if (V(a))
            c = a.r, b = a.y, a = a.x;
          d.isCircle = !0;
          return d.attr({
            x: a,
            y: b,
            width: 2 * c,
            height: 2 * c
          });
        },
        g: function (a) {
          var b;
          a && (b = {
            className: 'highcharts-' + a,
            'class': 'highcharts-' + a
          });
          return this.createElement(ya).attr(b);
        },
        image: function (a, b, c, d, e) {
          var f = this.createElement('img').attr({ src: a });
          arguments.length > 1 && f.attr({
            x: b,
            y: c,
            width: d,
            height: e
          });
          return f;
        },
        rect: function (a, b, c, d, e, f) {
          if (V(a))
            b = a.y, c = a.width, d = a.height, f = a.strokeWidth, a = a.x;
          var g = this.symbol('rect');
          g.r = e;
          return g.attr(g.crisp(f, a, b, q(c, 0), q(d, 0)));
        },
        invertChild: function (a, b) {
          var c = b.style;
          L(a, {
            flip: 'x',
            left: u(c.width) - 1,
            top: u(c.height) - 1,
            rotation: -90
          });
        },
        symbols: {
          arc: function (a, b, c, d, e) {
            var f = e.start, g = e.end, h = e.r || c || d, c = e.innerR, d = Y(f), i = ca(f), j = Y(g), k = ca(g);
            if (g - f === 0)
              return ['x'];
            f = [
              'wa',
              a - h,
              b - h,
              a + h,
              b + h,
              a + h * d,
              b + h * i,
              a + h * j,
              b + h * k
            ];
            e.open && !c && f.push('e', 'M', a, b);
            f.push('at', a - c, b - c, a + c, b + c, a + c * j, b + c * k, a + c * d, b + c * i, 'x', 'e');
            f.isArc = !0;
            return f;
          },
          circle: function (a, b, c, d, e) {
            e && e.isCircle && (a -= c / 2, b -= d / 2);
            return [
              'wa',
              a,
              b,
              a + c,
              b + d,
              a + c,
              b + d / 2,
              a + c,
              b + d / 2,
              'e'
            ];
          },
          rect: function (a, b, c, d, e) {
            var f = a + c, g = b + d, h;
            !r(e) || !e.r ? f = Ca.prototype.symbols.square.apply(0, arguments) : (h = K(e.r, c, d), f = [
              'M',
              a + h,
              b,
              'L',
              f - h,
              b,
              'wa',
              f - 2 * h,
              b,
              f,
              b + 2 * h,
              f - h,
              b,
              f,
              b + h,
              'L',
              f,
              g - h,
              'wa',
              f - 2 * h,
              g - 2 * h,
              f,
              g,
              f,
              g - h,
              f - h,
              g,
              'L',
              a + h,
              g,
              'wa',
              a,
              g - 2 * h,
              a + 2 * h,
              g,
              a + h,
              g,
              a,
              g - h,
              'L',
              a,
              b + h,
              'wa',
              a,
              b,
              a + 2 * h,
              b + 2 * h,
              a,
              b + h,
              a + h,
              b,
              'x',
              'e'
            ]);
            return f;
          }
        }
      };
    Highcharts.VMLRenderer = F = function () {
      this.init.apply(this, arguments);
    };
    F.prototype = x(Ca.prototype, na);
    Sa = F;
  }
  var Rb;
  if ($)
    Highcharts.CanVGRenderer = F = function () {
      sa = 'http://www.w3.org/1999/xhtml';
    }, F.prototype.symbols = {}, Rb = function () {
      function a() {
        var a = b.length, d;
        for (d = 0; d < a; d++)
          b[d]();
        b = [];
      }
      var b = [];
      return {
        push: function (c, d) {
          b.length === 0 && Tb(d, a);
          b.push(c);
        }
      };
    }(), Sa = F;
  Ja.prototype = {
    addLabel: function () {
      var a = this.axis, b = a.options, c = a.chart, d = a.horiz, e = a.categories, f = a.series[0] && a.series[0].names, g = this.pos, h = b.labels, i = a.tickPositions, d = d && e && !h.step && !h.staggerLines && !h.rotation && c.plotWidth / i.length || !d && (c.optionsMarginLeft || c.plotWidth / 2), j = g === i[0], k = g === i[i.length - 1], f = e ? o(e[g], f && f[g], g) : g, e = this.label, i = i.info, m;
      a.isDatetimeAxis && i && (m = b.dateTimeLabelFormats[i.higherRanks[g] || i.unitName]);
      this.isFirst = j;
      this.isLast = k;
      b = a.labelFormatter.call({
        axis: a,
        chart: c,
        isFirst: j,
        isLast: k,
        dateTimeLabelFormat: m,
        value: a.isLog ? ia(da(f)) : f
      });
      g = d && { width: q(1, t(d - 2 * (h.padding || 10))) + 'px' };
      g = v(g, h.style);
      if (r(e))
        e && e.attr({ text: b }).css(g);
      else {
        d = { align: h.align };
        if (Ea(h.rotation))
          d.rotation = h.rotation;
        this.label = r(b) && h.enabled ? c.renderer.text(b, 0, 0, h.useHTML).attr(d).css(g).add(a.labelGroup) : null;
      }
    },
    getLabelSize: function () {
      var a = this.label, b = this.axis;
      return a ? (this.labelBBox = a.getBBox())[b.horiz ? 'height' : 'width'] : 0;
    },
    getLabelSides: function () {
      var a = this.axis.options.labels, b = this.labelBBox.width, a = b * {
          left: 0,
          center: 0.5,
          right: 1
        }[a.align] - a.x;
      return [
        -a,
        b - a
      ];
    },
    handleOverflow: function (a, b) {
      var c = !0, d = this.axis, e = d.chart, f = this.isFirst, g = this.isLast, h = b.x, i = d.reversed, j = d.tickPositions;
      if (f || g) {
        var k = this.getLabelSides(), m = k[0], k = k[1], e = e.plotLeft, l = e + d.len, j = (d = d.ticks[j[a + (f ? 1 : -1)]]) && d.label.xy && d.label.xy.x + d.getLabelSides()[f ? 0 : 1];
        f && !i || g && i ? h + m < e && (h = e - m, d && h + k > j && (c = !1)) : h + k > l && (h = l - k, d && h + m < j && (c = !1));
        b.x = h;
      }
      return c;
    },
    getPosition: function (a, b, c, d) {
      var e = this.axis, f = e.chart, g = d && f.oldChartHeight || f.chartHeight;
      return {
        x: a ? e.translate(b + c, null, null, d) + e.transB : e.left + e.offset + (e.opposite ? (d && f.oldChartWidth || f.chartWidth) - e.right - e.left : 0),
        y: a ? g - e.bottom + e.offset - (e.opposite ? e.height : 0) : g - e.translate(b + c, null, null, d) - e.transB
      };
    },
    getLabelPosition: function (a, b, c, d, e, f, g, h) {
      var i = this.axis, j = i.transA, k = i.reversed, i = i.staggerLines, a = a + e.x - (f && d ? f * j * (k ? -1 : 1) : 0), b = b + e.y - (f && !d ? f * j * (k ? 1 : -1) : 0);
      r(e.y) || (b += u(c.styles.lineHeight) * 0.9 - c.getBBox().height / 2);
      i && (b += g / (h || 1) % i * 16);
      return {
        x: a,
        y: b
      };
    },
    getMarkPath: function (a, b, c, d, e, f) {
      return f.crispLine([
        'M',
        a,
        b,
        'L',
        a + (e ? 0 : -c),
        b + (e ? c : 0)
      ], d);
    },
    render: function (a, b, c) {
      var d = this.axis, e = d.options, f = d.chart.renderer, g = d.horiz, h = this.type, i = this.label, j = this.pos, k = e.labels, m = this.gridLine, l = h ? h + 'Grid' : 'grid', p = h ? h + 'Tick' : 'tick', s = e[l + 'LineWidth'], n = e[l + 'LineColor'], B = e[l + 'LineDashStyle'], w = e[p + 'Length'], l = e[p + 'Width'] || 0, q = e[p + 'Color'], r = e[p + 'Position'], p = this.mark, t = k.step, v = !0, u = d.tickmarkOffset, P = this.getPosition(g, j, u, b), H = P.x, P = P.y, C = g && H === d.pos || !g && P === d.pos + d.len ? -1 : 1, x = d.staggerLines;
      this.isActive = !0;
      if (s) {
        j = d.getPlotLinePath(j + u, s * C, b, !0);
        if (m === y) {
          m = {
            stroke: n,
            'stroke-width': s
          };
          if (B)
            m.dashstyle = B;
          if (!h)
            m.zIndex = 1;
          if (b)
            m.opacity = 0;
          this.gridLine = m = s ? f.path(j).attr(m).add(d.gridGroup) : null;
        }
        if (!b && m && j)
          m[this.isNew ? 'attr' : 'animate']({
            d: j,
            opacity: c
          });
      }
      if (l && w)
        r === 'inside' && (w = -w), d.opposite && (w = -w), b = this.getMarkPath(H, P, w, l * C, g, f), p ? p.animate({
          d: b,
          opacity: c
        }) : this.mark = f.path(b).attr({
          stroke: q,
          'stroke-width': l,
          opacity: c
        }).add(d.axisGroup);
      if (i && !isNaN(H))
        i.xy = P = this.getLabelPosition(H, P, i, g, k, u, a, t), this.isFirst && !o(e.showFirstLabel, 1) || this.isLast && !o(e.showLastLabel, 1) ? v = !1 : !x && g && k.overflow === 'justify' && !this.handleOverflow(a, P) && (v = !1), t && a % t && (v = !1), v && !isNaN(P.y) ? (P.opacity = c, i[this.isNew ? 'attr' : 'animate'](P), this.isNew = !1) : i.attr('y', -9999);
    },
    destroy: function () {
      Ha(this, this.axis);
    }
  };
  pb.prototype = {
    render: function () {
      var a = this, b = a.axis, c = b.horiz, d = (b.pointRange || 0) / 2, e = a.options, f = e.label, g = a.label, h = e.width, i = e.to, j = e.from, k = r(j) && r(i), m = e.value, l = e.dashStyle, p = a.svgElem, s = [], n, B = e.color, w = e.zIndex, G = e.events, t = b.chart.renderer;
      b.isLog && (j = ka(j), i = ka(i), m = ka(m));
      if (h) {
        if (s = b.getPlotLinePath(m, h), d = {
            stroke: B,
            'stroke-width': h
          }, l)
          d.dashstyle = l;
      } else if (k) {
        if (j = q(j, b.min - d), i = K(i, b.max + d), s = b.getPlotBandPath(j, i, e), d = { fill: B }, e.borderWidth)
          d.stroke = e.borderColor, d['stroke-width'] = e.borderWidth;
      } else
        return;
      if (r(w))
        d.zIndex = w;
      if (p)
        s ? p.animate({ d: s }, null, p.onGetPath) : (p.hide(), p.onGetPath = function () {
          p.show();
        });
      else if (s && s.length && (a.svgElem = p = t.path(s).attr(d).add(), G))
        for (n in e = function (b) {
            p.on(b, function (c) {
              G[b].apply(a, [c]);
            });
          }, G)
          e(n);
      if (f && r(f.text) && s && s.length && b.width > 0 && b.height > 0) {
        f = x({
          align: c && k && 'center',
          x: c ? !k && 4 : 10,
          verticalAlign: !c && k && 'middle',
          y: c ? k ? 16 : 10 : k ? 6 : -4,
          rotation: c && !k && 90
        }, f);
        if (!g)
          a.label = g = t.text(f.text, 0, 0).attr({
            align: f.textAlign || f.align,
            rotation: f.rotation,
            zIndex: w
          }).css(f.style).add();
        b = [
          s[1],
          s[4],
          o(s[6], s[1])
        ];
        s = [
          s[2],
          s[5],
          o(s[7], s[2])
        ];
        c = Ga(b);
        k = Ga(s);
        g.align(f, !1, {
          x: c,
          y: k,
          width: pa(b) - c,
          height: pa(s) - k
        });
        g.show();
      } else
        g && g.hide();
      return a;
    },
    destroy: function () {
      ga(this.axis.plotLinesAndBands, this);
      Ha(this, this.axis);
    }
  };
  Kb.prototype = {
    destroy: function () {
      Ha(this, this.axis);
    },
    setTotal: function (a) {
      this.cum = this.total = a;
    },
    render: function (a) {
      var b = this.options, c = b.format, c = c ? wa(c, this) : b.formatter.call(this);
      this.label ? this.label.attr({
        text: c,
        visibility: 'hidden'
      }) : this.label = this.axis.chart.renderer.text(c, 0, 0, b.useHTML).css(b.style).attr({
        align: this.textAlign,
        rotation: b.rotation,
        visibility: 'hidden'
      }).add(a);
    },
    setOffset: function (a, b) {
      var c = this.axis, d = c.chart, e = d.inverted, f = this.isNegative, g = c.translate(this.percent ? 100 : this.total, 0, 0, 0, 1), c = c.translate(0), c = Q(g - c), h = d.xAxis[0].translate(this.x) + a, i = d.plotHeight, f = {
          x: e ? f ? g : g - c : h,
          y: e ? i - h - b : f ? i - g - c : i - g,
          width: e ? c : b,
          height: e ? b : c
        };
      if (e = this.label)
        e.align(this.alignOptions, null, f), f = e.alignAttr, e.attr({ visibility: this.options.crop === !1 || d.isInsidePlot(f.x, f.y) ? Z ? 'inherit' : 'visible' : 'hidden' });
    }
  };
  ab.prototype = {
    defaultOptions: {
      dateTimeLabelFormats: {
        millisecond: '%H:%M:%S.%L',
        second: '%H:%M:%S',
        minute: '%H:%M',
        hour: '%H:%M',
        day: '%e. %b',
        week: '%e. %b',
        month: '%b \'%y',
        year: '%Y'
      },
      endOnTick: !1,
      gridLineColor: '#C0C0C0',
      labels: M,
      lineColor: '#C0D0E0',
      lineWidth: 1,
      minPadding: 0.01,
      maxPadding: 0.01,
      minorGridLineColor: '#E0E0E0',
      minorGridLineWidth: 1,
      minorTickColor: '#A0A0A0',
      minorTickLength: 2,
      minorTickPosition: 'outside',
      startOfWeek: 1,
      startOnTick: !1,
      tickColor: '#C0D0E0',
      tickLength: 5,
      tickmarkPlacement: 'between',
      tickPixelInterval: 100,
      tickPosition: 'outside',
      tickWidth: 1,
      title: {
        align: 'middle',
        style: {
          color: '#4d759e',
          fontWeight: 'bold'
        }
      },
      type: 'linear'
    },
    defaultYAxisOptions: {
      endOnTick: !0,
      gridLineWidth: 1,
      tickPixelInterval: 72,
      showLastLabel: !0,
      labels: {
        align: 'right',
        x: -8,
        y: 3
      },
      lineWidth: 0,
      maxPadding: 0.05,
      minPadding: 0.05,
      startOnTick: !0,
      tickWidth: 0,
      title: {
        rotation: 270,
        text: 'Values'
      },
      stackLabels: {
        enabled: !1,
        formatter: function () {
          return ua(this.total, -1);
        },
        style: M.style
      }
    },
    defaultLeftAxisOptions: {
      labels: {
        align: 'right',
        x: -8,
        y: null
      },
      title: { rotation: 270 }
    },
    defaultRightAxisOptions: {
      labels: {
        align: 'left',
        x: 8,
        y: null
      },
      title: { rotation: 90 }
    },
    defaultBottomAxisOptions: {
      labels: {
        align: 'center',
        x: 0,
        y: 14
      },
      title: { rotation: 0 }
    },
    defaultTopAxisOptions: {
      labels: {
        align: 'center',
        x: 0,
        y: -5
      },
      title: { rotation: 0 }
    },
    init: function (a, b) {
      var c = b.isX;
      this.horiz = a.inverted ? !c : c;
      this.xOrY = (this.isXAxis = c) ? 'x' : 'y';
      this.opposite = b.opposite;
      this.side = this.horiz ? this.opposite ? 0 : 2 : this.opposite ? 1 : 3;
      this.setOptions(b);
      var d = this.options, e = d.type;
      this.labelFormatter = d.labels.formatter || this.defaultLabelFormatter;
      this.staggerLines = this.horiz && d.labels.staggerLines;
      this.userOptions = b;
      this.minPixelPadding = 0;
      this.chart = a;
      this.reversed = d.reversed;
      this.zoomEnabled = d.zoomEnabled !== !1;
      this.categories = d.categories || e === 'category';
      this.isLog = e === 'logarithmic';
      this.isDatetimeAxis = e === 'datetime';
      this.isLinked = r(d.linkedTo);
      this.tickmarkOffset = this.categories && d.tickmarkPlacement === 'between' ? 0.5 : 0;
      this.ticks = {};
      this.minorTicks = {};
      this.plotLinesAndBands = [];
      this.alternateBands = {};
      this.len = 0;
      this.minRange = this.userMinRange = d.minRange || d.maxZoom;
      this.range = d.range;
      this.offset = d.offset || 0;
      this.stacks = {};
      this._stacksTouched = 0;
      this.min = this.max = null;
      var f, d = this.options.events;
      la(this, a.axes) === -1 && (a.axes.push(this), a[c ? 'xAxis' : 'yAxis'].push(this));
      this.series = this.series || [];
      if (a.inverted && c && this.reversed === y)
        this.reversed = !0;
      this.removePlotLine = this.removePlotBand = this.removePlotBandOrLine;
      for (f in d)
        J(this, f, d[f]);
      if (this.isLog)
        this.val2lin = ka, this.lin2val = da;
    },
    setOptions: function (a) {
      this.options = x(this.defaultOptions, this.isXAxis ? {} : this.defaultYAxisOptions, [
        this.defaultTopAxisOptions,
        this.defaultRightAxisOptions,
        this.defaultBottomAxisOptions,
        this.defaultLeftAxisOptions
      ][this.side], x(N[this.isXAxis ? 'xAxis' : 'yAxis'], a));
    },
    update: function (a, b) {
      var c = this.chart, a = c.options[this.xOrY + 'Axis'][this.options.index] = x(this.userOptions, a);
      this.destroy();
      this._addedPlotLB = !1;
      this.init(c, a);
      c.isDirtyBox = !0;
      o(b, !0) && c.redraw();
    },
    remove: function (a) {
      var b = this.chart, c = this.xOrY + 'Axis';
      n(this.series, function (a) {
        a.remove(!1);
      });
      ga(b.axes, this);
      ga(b[c], this);
      b.options[c].splice(this.options.index, 1);
      n(b[c], function (a, b) {
        a.options.index = b;
      });
      this.destroy();
      b.isDirtyBox = !0;
      o(a, !0) && b.redraw();
    },
    defaultLabelFormatter: function () {
      var a = this.axis, b = this.value, c = a.categories, d = this.dateTimeLabelFormat, e = N.lang.numericSymbols, f = e && e.length, g, h = a.options.labels.format, a = a.isLog ? b : a.tickInterval;
      if (h)
        g = wa(h, this);
      else if (c)
        g = b;
      else if (d)
        g = Ua(d, b);
      else if (f && a >= 1000)
        for (; f-- && g === y;)
          c = Math.pow(1000, f + 1), a >= c && e[f] !== null && (g = ua(b / c, -1) + e[f]);
      g === y && (g = b >= 1000 ? ua(b, 0) : ua(b, -1));
      return g;
    },
    getSeriesExtremes: function () {
      var a = this, b = a.chart, c = a.stacks, d = [], e = [], f = a._stacksTouched += 1, g, h;
      a.hasVisibleSeries = !1;
      a.dataMin = a.dataMax = null;
      n(a.series, function (g) {
        if (g.visible || !b.options.chart.ignoreHiddenSeries) {
          var j = g.options, k, m, l, p, s, n, B, w, G, t = j.threshold, v, u = [], x = 0;
          a.hasVisibleSeries = !0;
          if (a.isLog && t <= 0)
            t = j.threshold = null;
          if (a.isXAxis) {
            if (j = g.xData, j.length)
              a.dataMin = K(o(a.dataMin, j[0]), Ga(j)), a.dataMax = q(o(a.dataMax, j[0]), pa(j));
          } else {
            var P, H, C, A = g.cropped, z = g.xAxis.getExtremes(), E = !!g.modifyValue;
            k = j.stacking;
            a.usePercentage = k === 'percent';
            if (k)
              s = j.stack, p = g.type + o(s, ''), n = '-' + p, g.stackKey = p, m = d[p] || [], d[p] = m, l = e[n] || [], e[n] = l;
            if (a.usePercentage)
              a.dataMin = 0, a.dataMax = 99;
            j = g.processedXData;
            B = g.processedYData;
            v = B.length;
            for (h = 0; h < v; h++) {
              w = j[h];
              G = B[h];
              if (k)
                H = (P = G < t) ? l : m, C = P ? n : p, r(H[w]) ? (H[w] = ia(H[w] + G), G = [
                  G,
                  H[w]
                ]) : H[w] = G, c[C] || (c[C] = {}), c[C][w] || (c[C][w] = new Kb(a, a.options.stackLabels, P, w, s, k)), c[C][w].setTotal(H[w]), c[C][w].touched = f;
              if (G !== null && G !== y && (!a.isLog || G.length || G > 0))
                if (E && (G = g.modifyValue(G)), g.getExtremesFromAll || A || (j[h + 1] || w) >= z.min && (j[h - 1] || w) <= z.max)
                  if (w = G.length)
                    for (; w--;)
                      G[w] !== null && (u[x++] = G[w]);
                  else
                    u[x++] = G;
            }
            if (!a.usePercentage && u.length)
              g.dataMin = k = Ga(u), g.dataMax = g = pa(u), a.dataMin = K(o(a.dataMin, k), k), a.dataMax = q(o(a.dataMax, g), g);
            if (r(t))
              if (a.dataMin >= t)
                a.dataMin = t, a.ignoreMinPadding = !0;
              else if (a.dataMax < t)
                a.dataMax = t, a.ignoreMaxPadding = !0;
          }
        }
      });
      for (g in c)
        for (h in c[g])
          c[g][h].touched < f && (c[g][h].destroy(), delete c[g][h]);
    },
    translate: function (a, b, c, d, e, f) {
      var g = this.len, h = 1, i = 0, j = d ? this.oldTransA : this.transA, d = d ? this.oldMin : this.min, k = this.minPixelPadding, e = (this.options.ordinal || this.isLog && e) && this.lin2val;
      if (!j)
        j = this.transA;
      c && (h *= -1, i = g);
      this.reversed && (h *= -1, i -= h * g);
      b ? (a = a * h + i, a -= k, a = a / j + d, e && (a = this.lin2val(a))) : (e && (a = this.val2lin(a)), a = h * (a - d) * j + i + h * k + (f ? j * this.pointRange / 2 : 0));
      return a;
    },
    toPixels: function (a, b) {
      return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos);
    },
    toValue: function (a, b) {
      return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0);
    },
    getPlotLinePath: function (a, b, c, d) {
      var e = this.chart, f = this.left, g = this.top, h, i, j, a = this.translate(a, null, null, c), k = c && e.oldChartHeight || e.chartHeight, m = c && e.oldChartWidth || e.chartWidth, l;
      h = this.transB;
      c = i = t(a + h);
      h = j = t(k - a - h);
      if (isNaN(a))
        l = !0;
      else if (this.horiz) {
        if (h = g, j = k - this.bottom, c < f || c > f + this.width)
          l = !0;
      } else if (c = f, i = m - this.right, h < g || h > g + this.height)
        l = !0;
      return l && !d ? null : e.renderer.crispLine([
        'M',
        c,
        h,
        'L',
        i,
        j
      ], b || 0);
    },
    getPlotBandPath: function (a, b) {
      var c = this.getPlotLinePath(b), d = this.getPlotLinePath(a);
      d && c ? d.push(c[4], c[5], c[1], c[2]) : d = null;
      return d;
    },
    getLinearTickPositions: function (a, b, c) {
      for (var d, b = ia(T(b / a) * a), c = ia(ja(c / a) * a), e = []; b <= c;) {
        e.push(b);
        b = ia(b + a);
        if (b === d)
          break;
        d = b;
      }
      return e;
    },
    getLogTickPositions: function (a, b, c, d) {
      var e = this.options, f = this.len, g = [];
      if (!d)
        this._minorAutoInterval = null;
      if (a >= 0.5)
        a = t(a), g = this.getLinearTickPositions(a, b, c);
      else if (a >= 0.08)
        for (var f = T(b), h, i, j, k, m, e = a > 0.3 ? [
              1,
              2,
              4
            ] : a > 0.15 ? [
              1,
              2,
              4,
              6,
              8
            ] : [
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9
            ]; f < c + 1 && !m; f++) {
          i = e.length;
          for (h = 0; h < i && !m; h++)
            j = ka(da(f) * e[h]), j > b && (!d || k <= c) && g.push(k), k > c && (m = !0), k = j;
        }
      else if (b = da(b), c = da(c), a = e[d ? 'minorTickInterval' : 'tickInterval'], a = o(a === 'auto' ? null : a, this._minorAutoInterval, (c - b) * (e.tickPixelInterval / (d ? 5 : 1)) / ((d ? f / this.tickPositions.length : f) || 1)), a = ib(a, null, I.pow(10, T(I.log(a) / I.LN10))), g = La(this.getLinearTickPositions(a, b, c), ka), !d)
        this._minorAutoInterval = a / 5;
      if (!d)
        this.tickInterval = a;
      return g;
    },
    getMinorTickPositions: function () {
      var a = this.options, b = this.tickPositions, c = this.minorTickInterval, d = [], e;
      if (this.isLog) {
        e = b.length;
        for (a = 1; a < e; a++)
          d = d.concat(this.getLogTickPositions(c, b[a - 1], b[a], !0));
      } else if (this.isDatetimeAxis && a.minorTickInterval === 'auto')
        d = d.concat(Cb(Ab(c), this.min, this.max, a.startOfWeek)), d[0] < this.min && d.shift();
      else
        for (b = this.min + (b[0] - this.min) % c; b <= this.max; b += c)
          d.push(b);
      return d;
    },
    adjustForMinRange: function () {
      var a = this.options, b = this.min, c = this.max, d, e = this.dataMax - this.dataMin >= this.minRange, f, g, h, i, j;
      if (this.isXAxis && this.minRange === y && !this.isLog)
        r(a.min) || r(a.max) ? this.minRange = null : (n(this.series, function (a) {
          i = a.xData;
          for (g = j = a.xIncrement ? 1 : i.length - 1; g > 0; g--)
            if (h = i[g] - i[g - 1], f === y || h < f)
              f = h;
        }), this.minRange = K(f * 5, this.dataMax - this.dataMin));
      if (c - b < this.minRange) {
        var k = this.minRange;
        d = (k - c + b) / 2;
        d = [
          b - d,
          o(a.min, b - d)
        ];
        if (e)
          d[2] = this.dataMin;
        b = pa(d);
        c = [
          b + k,
          o(a.max, b + k)
        ];
        if (e)
          c[2] = this.dataMax;
        c = Ga(c);
        c - b < k && (d[0] = c - k, d[1] = o(a.min, c - k), b = pa(d));
      }
      this.min = b;
      this.max = c;
    },
    setAxisTranslation: function (a) {
      var b = this.max - this.min, c = 0, d, e = 0, f = 0, g = this.linkedParent, h = this.transA;
      if (this.isXAxis)
        g ? (e = g.minPointOffset, f = g.pointRangePadding) : n(this.series, function (a) {
          var g = a.pointRange, h = a.options.pointPlacement, m = a.closestPointRange;
          g > b && (g = 0);
          c = q(c, g);
          e = q(e, h ? 0 : g / 2);
          f = q(f, h === 'on' ? 0 : g);
          !a.noSharedTooltip && r(m) && (d = r(d) ? K(d, m) : m);
        }), g = this.ordinalSlope && d ? this.ordinalSlope / d : 1, this.minPointOffset = e *= g, this.pointRangePadding = f *= g, this.pointRange = K(c, b), this.closestPointRange = d;
      if (a)
        this.oldTransA = h;
      this.translationSlope = this.transA = h = this.len / (b + f || 1);
      this.transB = this.horiz ? this.left : this.bottom;
      this.minPixelPadding = h * e;
    },
    setTickPositions: function (a) {
      var b = this, c = b.chart, d = b.options, e = b.isLog, f = b.isDatetimeAxis, g = b.isXAxis, h = b.isLinked, i = b.options.tickPositioner, j = d.maxPadding, k = d.minPadding, m = d.tickInterval, l = d.minTickInterval, p = d.tickPixelInterval, s = b.categories;
      h ? (b.linkedParent = c[g ? 'xAxis' : 'yAxis'][d.linkedTo], c = b.linkedParent.getExtremes(), b.min = o(c.min, c.dataMin), b.max = o(c.max, c.dataMax), d.type !== b.linkedParent.options.type && qa(11, 1)) : (b.min = o(b.userMin, d.min, b.dataMin), b.max = o(b.userMax, d.max, b.dataMax));
      if (e)
        !a && K(b.min, o(b.dataMin, b.min)) <= 0 && qa(10, 1), b.min = ia(ka(b.min)), b.max = ia(ka(b.max));
      if (b.range && (b.userMin = b.min = q(b.min, b.max - b.range), b.userMax = b.max, a))
        b.range = null;
      b.beforePadding && b.beforePadding();
      b.adjustForMinRange();
      if (!s && !b.usePercentage && !h && r(b.min) && r(b.max) && (c = b.max - b.min)) {
        if (!r(d.min) && !r(b.userMin) && k && (b.dataMin < 0 || !b.ignoreMinPadding))
          b.min -= c * k;
        if (!r(d.max) && !r(b.userMax) && j && (b.dataMax > 0 || !b.ignoreMaxPadding))
          b.max += c * j;
      }
      b.tickInterval = b.min === b.max || b.min === void 0 || b.max === void 0 ? 1 : h && !m && p === b.linkedParent.options.tickPixelInterval ? b.linkedParent.tickInterval : o(m, s ? 1 : (b.max - b.min) * p / (b.len || 1));
      g && !a && n(b.series, function (a) {
        a.processData(b.min !== b.oldMin || b.max !== b.oldMax);
      });
      b.setAxisTranslation(!0);
      b.beforeSetTickPositions && b.beforeSetTickPositions();
      if (b.postProcessTickInterval)
        b.tickInterval = b.postProcessTickInterval(b.tickInterval);
      if (!m && b.tickInterval < l)
        b.tickInterval = l;
      if (!f && !e && (a = I.pow(10, T(I.log(b.tickInterval) / I.LN10)), !m))
        b.tickInterval = ib(b.tickInterval, null, a, d);
      b.minorTickInterval = d.minorTickInterval === 'auto' && b.tickInterval ? b.tickInterval / 5 : d.minorTickInterval;
      b.tickPositions = i = d.tickPositions ? [].concat(d.tickPositions) : i && i.apply(b, [
        b.min,
        b.max
      ]);
      if (!i)
        i = f ? (b.getNonLinearTimeTicks || Cb)(Ab(b.tickInterval, d.units), b.min, b.max, d.startOfWeek, b.ordinalPositions, b.closestPointRange, !0) : e ? b.getLogTickPositions(b.tickInterval, b.min, b.max) : b.getLinearTickPositions(b.tickInterval, b.min, b.max), b.tickPositions = i;
      if (!h)
        e = i[0], f = i[i.length - 1], h = b.minPointOffset || 0, d.startOnTick ? b.min = e : b.min - h > e && i.shift(), d.endOnTick ? b.max = f : b.max + h < f && i.pop(), i.length === 1 && (b.min -= 0.001, b.max += 0.001);
    },
    setMaxTicks: function () {
      var a = this.chart, b = a.maxTicks || {}, c = this.tickPositions, d = this._maxTicksKey = [
          this.xOrY,
          this.pos,
          this.len
        ].join('-');
      if (!this.isLinked && !this.isDatetimeAxis && c && c.length > (b[d] || 0) && this.options.alignTicks !== !1)
        b[d] = c.length;
      a.maxTicks = b;
    },
    adjustTickAmount: function () {
      var a = this._maxTicksKey, b = this.tickPositions, c = this.chart.maxTicks;
      if (c && c[a] && !this.isDatetimeAxis && !this.categories && !this.isLinked && this.options.alignTicks !== !1) {
        var d = this.tickAmount, e = b.length;
        this.tickAmount = a = c[a];
        if (e < a) {
          for (; b.length < a;)
            b.push(ia(b[b.length - 1] + this.tickInterval));
          this.transA *= (e - 1) / (a - 1);
          this.max = b[b.length - 1];
        }
        if (r(d) && a !== d)
          this.isDirty = !0;
      }
    },
    setScale: function () {
      var a = this.stacks, b, c, d, e;
      this.oldMin = this.min;
      this.oldMax = this.max;
      this.oldAxisLength = this.len;
      this.setAxisSize();
      e = this.len !== this.oldAxisLength;
      n(this.series, function (a) {
        if (a.isDirtyData || a.isDirty || a.xAxis.isDirty)
          d = !0;
      });
      if (e || d || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax)
        if (this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickPositions(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, !this.isDirty)
          this.isDirty = e || this.min !== this.oldMin || this.max !== this.oldMax;
      if (!this.isXAxis)
        for (b in a)
          for (c in a[b])
            a[b][c].cum = a[b][c].total;
      this.setMaxTicks();
    },
    setExtremes: function (a, b, c, d, e) {
      var f = this, g = f.chart, c = o(c, !0), e = v(e, {
          min: a,
          max: b
        });
      D(f, 'setExtremes', e, function () {
        f.userMin = a;
        f.userMax = b;
        f.isDirtyExtremes = !0;
        c && g.redraw(d);
      });
    },
    zoom: function (a, b) {
      this.allowZoomOutside || (a <= this.dataMin && (a = y), b >= this.dataMax && (b = y));
      this.displayBtn = a !== y || b !== y;
      this.setExtremes(a, b, !1, y, { trigger: 'zoom' });
      return !0;
    },
    setAxisSize: function () {
      var a = this.chart, b = this.options, c = b.offsetLeft || 0, d = b.offsetRight || 0, e = this.horiz, f, g;
      this.left = g = o(b.left, a.plotLeft + c);
      this.top = f = o(b.top, a.plotTop);
      this.width = c = o(b.width, a.plotWidth - c + d);
      this.height = b = o(b.height, a.plotHeight);
      this.bottom = a.chartHeight - b - f;
      this.right = a.chartWidth - c - g;
      this.len = q(e ? c : b, 0);
      this.pos = e ? g : f;
    },
    getExtremes: function () {
      var a = this.isLog;
      return {
        min: a ? ia(da(this.min)) : this.min,
        max: a ? ia(da(this.max)) : this.max,
        dataMin: this.dataMin,
        dataMax: this.dataMax,
        userMin: this.userMin,
        userMax: this.userMax
      };
    },
    getThreshold: function (a) {
      var b = this.isLog, c = b ? da(this.min) : this.min, b = b ? da(this.max) : this.max;
      c > a || a === null ? a = c : b < a && (a = b);
      return this.translate(a, 0, 1, 0, 1);
    },
    addPlotBand: function (a) {
      this.addPlotBandOrLine(a, 'plotBands');
    },
    addPlotLine: function (a) {
      this.addPlotBandOrLine(a, 'plotLines');
    },
    addPlotBandOrLine: function (a, b) {
      var c = new pb(this, a).render(), d = this.userOptions;
      b && (d[b] = d[b] || [], d[b].push(a));
      this.plotLinesAndBands.push(c);
      return c;
    },
    getOffset: function () {
      var a = this, b = a.chart, c = b.renderer, d = a.options, e = a.tickPositions, f = a.ticks, g = a.horiz, h = a.side, i = b.inverted ? [
          1,
          0,
          3,
          2
        ][h] : h, j, k = 0, m, l = 0, p = d.title, s = d.labels, t = 0, B = b.axisOffset, w = b.clipOffset, G = [
          -1,
          1,
          1,
          -1
        ][h], v;
      a.hasData = b = a.hasVisibleSeries || r(a.min) && r(a.max) && !!e;
      a.showAxis = j = b || o(d.showEmpty, !0);
      if (!a.axisGroup)
        a.gridGroup = c.g('grid').attr({ zIndex: d.gridZIndex || 1 }).add(), a.axisGroup = c.g('axis').attr({ zIndex: d.zIndex || 2 }).add(), a.labelGroup = c.g('axis-labels').attr({ zIndex: s.zIndex || 7 }).add();
      if (b || a.isLinked)
        n(e, function (b) {
          f[b] ? f[b].addLabel() : f[b] = new Ja(a, b);
        }), n(e, function (a) {
          if (h === 0 || h === 2 || {
              1: 'left',
              3: 'right'
            }[h] === s.align)
            t = q(f[a].getLabelSize(), t);
        }), a.staggerLines && (t += (a.staggerLines - 1) * 16);
      else
        for (v in f)
          f[v].destroy(), delete f[v];
      if (p && p.text && p.enabled !== !1) {
        if (!a.axisTitle)
          a.axisTitle = c.text(p.text, 0, 0, p.useHTML).attr({
            zIndex: 7,
            rotation: p.rotation || 0,
            align: p.textAlign || {
              low: 'left',
              middle: 'center',
              high: 'right'
            }[p.align]
          }).css(p.style).add(a.axisGroup), a.axisTitle.isNew = !0;
        if (j)
          k = a.axisTitle.getBBox()[g ? 'height' : 'width'], l = o(p.margin, g ? 5 : 10), m = p.offset;
        a.axisTitle[j ? 'show' : 'hide']();
      }
      a.offset = G * o(d.offset, B[h]);
      a.axisTitleMargin = o(m, t + l + (h !== 2 && t && G * d.labels[g ? 'y' : 'x']));
      B[h] = q(B[h], a.axisTitleMargin + k + G * a.offset);
      w[i] = q(w[i], d.lineWidth);
    },
    getLinePath: function (a) {
      var b = this.chart, c = this.opposite, d = this.offset, e = this.horiz, f = this.left + (c ? this.width : 0) + d;
      this.lineTop = d = b.chartHeight - this.bottom - (c ? this.height : 0) + d;
      c || (a *= -1);
      return b.renderer.crispLine([
        'M',
        e ? this.left : f,
        e ? d : this.top,
        'L',
        e ? b.chartWidth - this.right : f,
        e ? d : b.chartHeight - this.bottom
      ], a);
    },
    getTitlePosition: function () {
      var a = this.horiz, b = this.left, c = this.top, d = this.len, e = this.options.title, f = a ? b : c, g = this.opposite, h = this.offset, i = u(e.style.fontSize || 12), d = {
          low: f + (a ? 0 : d),
          middle: f + d / 2,
          high: f + (a ? d : 0)
        }[e.align], b = (a ? c + this.height : b) + (a ? 1 : -1) * (g ? -1 : 1) * this.axisTitleMargin + (this.side === 2 ? i : 0);
      return {
        x: a ? d : b + (g ? this.width : 0) + h + (e.x || 0),
        y: a ? b - (g ? this.height : 0) + h : d + (e.y || 0)
      };
    },
    render: function () {
      var a = this, b = a.chart, c = b.renderer, d = a.options, e = a.isLog, f = a.isLinked, g = a.tickPositions, h = a.axisTitle, i = a.stacks, j = a.ticks, k = a.minorTicks, m = a.alternateBands, l = d.stackLabels, p = d.alternateGridColor, s = a.tickmarkOffset, o = d.lineWidth, B, w = b.hasRendered && r(a.oldMin) && !isNaN(a.oldMin);
      B = a.hasData;
      var q = a.showAxis, t, v;
      n([
        j,
        k,
        m
      ], function (a) {
        for (var b in a)
          a[b].isActive = !1;
      });
      if (B || f)
        if (a.minorTickInterval && !a.categories && n(a.getMinorTickPositions(), function (b) {
            k[b] || (k[b] = new Ja(a, b, 'minor'));
            w && k[b].isNew && k[b].render(null, !0);
            k[b].render(null, !1, 1);
          }), g.length && (n(g.slice(1).concat([g[0]]), function (b, c) {
            c = c === g.length - 1 ? 0 : c + 1;
            if (!f || b >= a.min && b <= a.max)
              j[b] || (j[b] = new Ja(a, b)), w && j[b].isNew && j[b].render(c, !0), j[b].render(c, !1, 1);
          }), s && a.min === 0 && (j[-1] || (j[-1] = new Ja(a, -1, null, !0)), j[-1].render(-1))), p && n(g, function (b, c) {
            if (c % 2 === 0 && b < a.max)
              m[b] || (m[b] = new pb(a)), t = b + s, v = g[c + 1] !== y ? g[c + 1] + s : a.max, m[b].options = {
                from: e ? da(t) : t,
                to: e ? da(v) : v,
                color: p
              }, m[b].render(), m[b].isActive = !0;
          }), !a._addedPlotLB)
          n((d.plotLines || []).concat(d.plotBands || []), function (b) {
            a.addPlotBandOrLine(b);
          }), a._addedPlotLB = !0;
      n([
        j,
        k,
        m
      ], function (a) {
        var c, d, e = [], f = za ? za.duration || 500 : 0, g = function () {
            for (d = e.length; d--;)
              a[e[d]] && !a[e[d]].isActive && (a[e[d]].destroy(), delete a[e[d]]);
          };
        for (c in a)
          if (!a[c].isActive)
            a[c].render(c, !1, 0), a[c].isActive = !1, e.push(c);
        a === m || !b.hasRendered || !f ? g() : f && setTimeout(g, f);
      });
      if (o)
        B = a.getLinePath(o), a.axisLine ? a.axisLine.animate({ d: B }) : a.axisLine = c.path(B).attr({
          stroke: d.lineColor,
          'stroke-width': o,
          zIndex: 7
        }).add(a.axisGroup), a.axisLine[q ? 'show' : 'hide']();
      if (h && q)
        h[h.isNew ? 'attr' : 'animate'](a.getTitlePosition()), h.isNew = !1;
      if (l && l.enabled) {
        var u, x, d = a.stackTotalGroup;
        if (!d)
          a.stackTotalGroup = d = c.g('stack-labels').attr({
            visibility: 'visible',
            zIndex: 6
          }).add();
        d.translate(b.plotLeft, b.plotTop);
        for (u in i)
          for (x in c = i[u], c)
            c[x].render(d);
      }
      a.isDirty = !1;
    },
    removePlotBandOrLine: function (a) {
      for (var b = this.plotLinesAndBands, c = b.length; c--;)
        b[c].id === a && b[c].destroy();
    },
    setTitle: function (a, b) {
      this.update({ title: a }, b);
    },
    redraw: function () {
      var a = this.chart.pointer;
      a.reset && a.reset(!0);
      this.render();
      n(this.plotLinesAndBands, function (a) {
        a.render();
      });
      n(this.series, function (a) {
        a.isDirty = !0;
      });
    },
    setCategories: function (a, b) {
      this.update({ categories: a }, b);
    },
    destroy: function () {
      var a = this, b = a.stacks, c;
      ba(a);
      for (c in b)
        Ha(b[c]), b[c] = null;
      n([
        a.ticks,
        a.minorTicks,
        a.alternateBands,
        a.plotLinesAndBands
      ], function (a) {
        Ha(a);
      });
      n('stackTotalGroup,axisLine,axisGroup,gridGroup,labelGroup,axisTitle'.split(','), function (b) {
        a[b] && (a[b] = a[b].destroy());
      });
    }
  };
  qb.prototype = {
    init: function (a, b) {
      var c = b.borderWidth, d = b.style, e = u(d.padding);
      this.chart = a;
      this.options = b;
      this.crosshairs = [];
      this.now = {
        x: 0,
        y: 0
      };
      this.isHidden = !0;
      this.label = a.renderer.label('', 0, 0, b.shape, null, null, b.useHTML, null, 'tooltip').attr({
        padding: e,
        fill: b.backgroundColor,
        'stroke-width': c,
        r: b.borderRadius,
        zIndex: 8
      }).css(d).css({ padding: 0 }).hide().add();
      $ || this.label.shadow(b.shadow);
      this.shared = b.shared;
    },
    destroy: function () {
      n(this.crosshairs, function (a) {
        a && a.destroy();
      });
      if (this.label)
        this.label = this.label.destroy();
      clearTimeout(this.hideTimer);
      clearTimeout(this.tooltipTimeout);
    },
    move: function (a, b, c, d) {
      var e = this, f = e.now, g = e.options.animation !== !1 && !e.isHidden;
      v(f, {
        x: g ? (2 * f.x + a) / 3 : a,
        y: g ? (f.y + b) / 2 : b,
        anchorX: g ? (2 * f.anchorX + c) / 3 : c,
        anchorY: g ? (f.anchorY + d) / 2 : d
      });
      e.label.attr(f);
      if (g && (Q(a - f.x) > 1 || Q(b - f.y) > 1))
        clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () {
          e && e.move(a, b, c, d);
        }, 32);
    },
    hide: function () {
      var a = this, b;
      clearTimeout(this.hideTimer);
      if (!this.isHidden)
        b = this.chart.hoverPoints, this.hideTimer = setTimeout(function () {
          a.label.fadeOut();
          a.isHidden = !0;
        }, o(this.options.hideDelay, 500)), b && n(b, function (a) {
          a.setState();
        }), this.chart.hoverPoints = null;
    },
    hideCrosshairs: function () {
      n(this.crosshairs, function (a) {
        a && a.hide();
      });
    },
    getAnchor: function (a, b) {
      var c, d = this.chart, e = d.inverted, f = d.plotTop, g = 0, h = 0, i, a = ha(a);
      c = a[0].tooltipPos;
      this.followPointer && b && (b.chartX === y && (b = d.pointer.normalize(b)), c = [
        b.chartX - d.plotLeft,
        b.chartY - f
      ]);
      c || (n(a, function (a) {
        i = a.series.yAxis;
        g += a.plotX;
        h += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!e && i ? i.top - f : 0);
      }), g /= a.length, h /= a.length, c = [
        e ? d.plotWidth - h : g,
        this.shared && !e && a.length > 1 && b ? b.chartY - f : e ? d.plotHeight - g : h
      ]);
      return La(c, t);
    },
    getPosition: function (a, b, c) {
      var d = this.chart, e = d.plotLeft, f = d.plotTop, g = d.plotWidth, h = d.plotHeight, i = o(this.options.distance, 12), j = c.plotX, c = c.plotY, d = j + e + (d.inverted ? i : -a - i), k = c - b + f + 15, m;
      d < 7 && (d = e + q(j, 0) + i);
      d + a > e + g && (d -= d + a - (e + g), k = c - b + f - i, m = !0);
      k < f + 5 && (k = f + 5, m && c >= k && c <= k + b && (k = c + f + i));
      k + b > f + h && (k = q(f, f + h - b - i));
      return {
        x: d,
        y: k
      };
    },
    defaultFormatter: function (a) {
      var b = this.points || ha(this), c = b[0].series, d;
      d = [c.tooltipHeaderFormatter(b[0])];
      n(b, function (a) {
        c = a.series;
        d.push(c.tooltipFormatter && c.tooltipFormatter(a) || a.point.tooltipFormatter(c.tooltipOptions.pointFormat));
      });
      d.push(a.options.footerFormat || '');
      return d.join('');
    },
    refresh: function (a, b) {
      var c = this.chart, d = this.label, e = this.options, f, g, h, i = {}, j, k = [];
      j = e.formatter || this.defaultFormatter;
      var i = c.hoverPoints, m, l = e.crosshairs;
      h = this.shared;
      clearTimeout(this.hideTimer);
      this.followPointer = ha(a)[0].series.tooltipOptions.followPointer;
      g = this.getAnchor(a, b);
      f = g[0];
      g = g[1];
      h && (!a.series || !a.series.noSharedTooltip) ? (c.hoverPoints = a, i && n(i, function (a) {
        a.setState();
      }), n(a, function (a) {
        a.setState('hover');
        k.push(a.getLabelConfig());
      }), i = {
        x: a[0].category,
        y: a[0].y
      }, i.points = k, a = a[0]) : i = a.getLabelConfig();
      j = j.call(i, this);
      i = a.series;
      h = h || !i.isCartesian || i.tooltipOutsidePlot || c.isInsidePlot(f, g);
      j === !1 || !h ? this.hide() : (this.isHidden && (Ta(d), d.attr('opacity', 1).show()), d.attr({ text: j }), m = e.borderColor || a.color || i.color || '#606060', d.attr({ stroke: m }), this.updatePosition({
        plotX: f,
        plotY: g
      }), this.isHidden = !1);
      if (l) {
        l = ha(l);
        for (d = l.length; d--;)
          if (e = a.series[d ? 'yAxis' : 'xAxis'], l[d] && e)
            if (h = d ? o(a.stackY, a.y) : a.x, e.isLog && (h = ka(h)), e = e.getPlotLinePath(h, 1), this.crosshairs[d])
              this.crosshairs[d].attr({
                d: e,
                visibility: 'visible'
              });
            else {
              h = {
                'stroke-width': l[d].width || 1,
                stroke: l[d].color || '#C0C0C0',
                zIndex: l[d].zIndex || 2
              };
              if (l[d].dashStyle)
                h.dashstyle = l[d].dashStyle;
              this.crosshairs[d] = c.renderer.path(e).attr(h).add();
            }
      }
      D(c, 'tooltipRefresh', {
        text: j,
        x: f + c.plotLeft,
        y: g + c.plotTop,
        borderColor: m
      });
    },
    updatePosition: function (a) {
      var b = this.chart, c = this.label, c = (this.options.positioner || this.getPosition).call(this, c.width, c.height, a);
      this.move(t(c.x), t(c.y), a.plotX + b.plotLeft, a.plotY + b.plotTop);
    }
  };
  rb.prototype = {
    init: function (a, b) {
      var c = $ ? '' : b.chart.zoomType, d = a.inverted, e;
      this.options = b;
      this.chart = a;
      this.zoomX = e = /x/.test(c);
      this.zoomY = c = /y/.test(c);
      this.zoomHor = e && !d || c && d;
      this.zoomVert = c && !d || e && d;
      this.pinchDown = [];
      this.lastValidTouch = {};
      if (b.tooltip.enabled)
        a.tooltip = new qb(a, b.tooltip);
      this.setDOMEvents();
    },
    normalize: function (a) {
      var b, c, d, a = a || O.event;
      if (!a.target)
        a.target = a.srcElement;
      a = Qb(a);
      d = a.touches ? a.touches.item(0) : a;
      this.chartPosition = b = Ub(this.chart.container);
      d.pageX === y ? (c = a.x, b = a.y) : (c = d.pageX - b.left, b = d.pageY - b.top);
      return v(a, {
        chartX: t(c),
        chartY: t(b)
      });
    },
    getCoordinates: function (a) {
      var b = {
          xAxis: [],
          yAxis: []
        };
      n(this.chart.axes, function (c) {
        b[c.isXAxis ? 'xAxis' : 'yAxis'].push({
          axis: c,
          value: c.toValue(a[c.horiz ? 'chartX' : 'chartY'])
        });
      });
      return b;
    },
    getIndex: function (a) {
      var b = this.chart;
      return b.inverted ? b.plotHeight + b.plotTop - a.chartY : a.chartX - b.plotLeft;
    },
    runPointActions: function (a) {
      var b = this.chart, c = b.series, d = b.tooltip, e, f = b.hoverPoint, g = b.hoverSeries, h, i, j = b.chartWidth, k = this.getIndex(a);
      if (d && this.options.tooltip.shared && (!g || !g.noSharedTooltip)) {
        e = [];
        h = c.length;
        for (i = 0; i < h; i++)
          if (c[i].visible && c[i].options.enableMouseTracking !== !1 && !c[i].noSharedTooltip && c[i].tooltipPoints.length && (b = c[i].tooltipPoints[k], b.series))
            b._dist = Q(k - b.clientX), j = K(j, b._dist), e.push(b);
        for (h = e.length; h--;)
          e[h]._dist > j && e.splice(h, 1);
        if (e.length && e[0].clientX !== this.hoverX)
          d.refresh(e, a), this.hoverX = e[0].clientX;
      }
      if (g && g.tracker) {
        if ((b = g.tooltipPoints[k]) && b !== f)
          b.onMouseOver(a);
      } else
        d && d.followPointer && !d.isHidden && (a = d.getAnchor([{}], a), d.updatePosition({
          plotX: a[0],
          plotY: a[1]
        }));
    },
    reset: function (a) {
      var b = this.chart, c = b.hoverSeries, d = b.hoverPoint, e = b.tooltip, b = e && e.shared ? b.hoverPoints : d;
      (a = a && e && b) && ha(b)[0].plotX === y && (a = !1);
      if (a)
        e.refresh(b);
      else {
        if (d)
          d.onMouseOut();
        if (c)
          c.onMouseOut();
        e && (e.hide(), e.hideCrosshairs());
        this.hoverX = null;
      }
    },
    scaleGroups: function (a, b) {
      var c = this.chart;
      n(c.series, function (d) {
        d.xAxis && d.xAxis.zoomEnabled && (d.group.attr(a), d.markerGroup && (d.markerGroup.attr(a), d.markerGroup.clip(b ? c.clipRect : null)), d.dataLabelsGroup && d.dataLabelsGroup.attr(a));
      });
      c.clipRect.attr(b || c.clipBox);
    },
    pinchTranslateDirection: function (a, b, c, d, e, f, g) {
      var h = this.chart, i = a ? 'x' : 'y', j = a ? 'X' : 'Y', k = 'chart' + j, m = a ? 'width' : 'height', l = h['plot' + (a ? 'Left' : 'Top')], p, s, o = 1, n = h.inverted, w = h.bounds[a ? 'h' : 'v'], q = b.length === 1, t = b[0][k], r = c[0][k], v = !q && b[1][k], u = !q && c[1][k], x, c = function () {
          !q && Q(t - v) > 20 && (o = Q(r - u) / Q(t - v));
          s = (l - r) / o + t;
          p = h['plot' + (a ? 'Width' : 'Height')] / o;
        };
      c();
      b = s;
      b < w.min ? (b = w.min, x = !0) : b + p > w.max && (b = w.max - p, x = !0);
      x ? (r -= 0.8 * (r - g[i][0]), q || (u -= 0.8 * (u - g[i][1])), c()) : g[i] = [
        r,
        u
      ];
      n || (f[i] = s - l, f[m] = p);
      f = n ? 1 / o : o;
      e[m] = p;
      e[i] = b;
      d[n ? a ? 'scaleY' : 'scaleX' : 'scale' + j] = o;
      d['translate' + j] = f * l + (r - f * t);
    },
    pinch: function (a) {
      var b = this, c = b.chart, d = b.pinchDown, e = c.tooltip && c.tooltip.options.followTouchMove, f = a.touches, g = f.length, h = b.lastValidTouch, i = b.zoomHor || b.pinchHor, j = b.zoomVert || b.pinchVert, k = i || j, m = b.selectionMarker, l = {}, p = {};
      a.type === 'touchstart' && (e || k) && a.preventDefault();
      La(f, function (a) {
        return b.normalize(a);
      });
      if (a.type === 'touchstart')
        n(f, function (a, b) {
          d[b] = {
            chartX: a.chartX,
            chartY: a.chartY
          };
        }), h.x = [
          d[0].chartX,
          d[1] && d[1].chartX
        ], h.y = [
          d[0].chartY,
          d[1] && d[1].chartY
        ], n(c.axes, function (a) {
          if (a.zoomEnabled) {
            var b = c.bounds[a.horiz ? 'h' : 'v'], d = a.minPixelPadding, e = a.toPixels(a.dataMin), f = a.toPixels(a.dataMax), g = K(e, f), e = q(e, f);
            b.min = K(a.pos, g - d);
            b.max = q(a.pos + a.len, e + d);
          }
        });
      else if (d.length) {
        if (!m)
          b.selectionMarker = m = v({ destroy: ta }, c.plotBox);
        i && b.pinchTranslateDirection(!0, d, f, l, m, p, h);
        j && b.pinchTranslateDirection(!1, d, f, l, m, p, h);
        b.hasPinched = k;
        b.scaleGroups(l, p);
        !k && e && g === 1 && this.runPointActions(b.normalize(a));
      }
    },
    dragStart: function (a) {
      var b = this.chart;
      b.mouseIsDown = a.type;
      b.cancelClick = !1;
      b.mouseDownX = this.mouseDownX = a.chartX;
      this.mouseDownY = a.chartY;
    },
    drag: function (a) {
      var b = this.chart, c = b.options.chart, d = a.chartX, a = a.chartY, e = this.zoomHor, f = this.zoomVert, g = b.plotLeft, h = b.plotTop, i = b.plotWidth, j = b.plotHeight, k, m = this.mouseDownX, l = this.mouseDownY;
      d < g ? d = g : d > g + i && (d = g + i);
      a < h ? a = h : a > h + j && (a = h + j);
      this.hasDragged = Math.sqrt(Math.pow(m - d, 2) + Math.pow(l - a, 2));
      if (this.hasDragged > 10) {
        k = b.isInsidePlot(m - g, l - h);
        if (b.hasCartesianSeries && (this.zoomX || this.zoomY) && k && !this.selectionMarker)
          this.selectionMarker = b.renderer.rect(g, h, e ? 1 : i, f ? 1 : j, 0).attr({
            fill: c.selectionMarkerFill || 'rgba(69,114,167,0.25)',
            zIndex: 7
          }).add();
        this.selectionMarker && e && (e = d - m, this.selectionMarker.attr({
          width: Q(e),
          x: (e > 0 ? 0 : e) + m
        }));
        this.selectionMarker && f && (e = a - l, this.selectionMarker.attr({
          height: Q(e),
          y: (e > 0 ? 0 : e) + l
        }));
        k && !this.selectionMarker && c.panning && b.pan(d);
      }
    },
    drop: function (a) {
      var b = this.chart, c = this.hasPinched;
      if (this.selectionMarker) {
        var d = {
            xAxis: [],
            yAxis: [],
            originalEvent: a.originalEvent || a
          }, e = this.selectionMarker, f = e.x, g = e.y, h;
        if (this.hasDragged || c)
          n(b.axes, function (a) {
            if (a.zoomEnabled) {
              var b = a.horiz, c = a.toValue(b ? f : g), b = a.toValue(b ? f + e.width : g + e.height);
              !isNaN(c) && !isNaN(b) && (d[a.xOrY + 'Axis'].push({
                axis: a,
                min: K(c, b),
                max: q(c, b)
              }), h = !0);
            }
          }), h && D(b, 'selection', d, function (a) {
            b.zoom(v(a, c ? { animation: !1 } : null));
          });
        this.selectionMarker = this.selectionMarker.destroy();
        c && this.scaleGroups({
          translateX: b.plotLeft,
          translateY: b.plotTop,
          scaleX: 1,
          scaleY: 1
        });
      }
      if (b)
        L(b.container, { cursor: b._cursor }), b.cancelClick = this.hasDragged > 10, b.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [];
    },
    onContainerMouseDown: function (a) {
      a = this.normalize(a);
      a.preventDefault && a.preventDefault();
      this.dragStart(a);
    },
    onDocumentMouseUp: function (a) {
      this.drop(a);
    },
    onDocumentMouseMove: function (a) {
      var b = this.chart, c = this.chartPosition, d = b.hoverSeries, a = Qb(a);
      c && d && d.isCartesian && !b.isInsidePlot(a.pageX - c.left - b.plotLeft, a.pageY - c.top - b.plotTop) && this.reset();
    },
    onContainerMouseLeave: function () {
      this.reset();
      this.chartPosition = null;
    },
    onContainerMouseMove: function (a) {
      var b = this.chart, a = this.normalize(a);
      a.returnValue = !1;
      b.mouseIsDown === 'mousedown' && this.drag(a);
      b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && !b.openMenu && this.runPointActions(a);
    },
    inClass: function (a, b) {
      for (var c; a;) {
        if (c = A(a, 'class'))
          if (c.indexOf(b) !== -1)
            return !0;
          else if (c.indexOf('highcharts-container') !== -1)
            return !1;
        a = a.parentNode;
      }
    },
    onTrackerMouseOut: function (a) {
      var b = this.chart.hoverSeries;
      if (b && !b.options.stickyTracking && !this.inClass(a.toElement || a.relatedTarget, 'highcharts-tooltip'))
        b.onMouseOut();
    },
    onContainerClick: function (a) {
      var b = this.chart, c = b.hoverPoint, d = b.plotLeft, e = b.plotTop, f = b.inverted, g, h, i, a = this.normalize(a);
      a.cancelBubble = !0;
      if (!b.cancelClick)
        c && this.inClass(a.target, 'highcharts-tracker') ? (g = this.chartPosition, h = c.plotX, i = c.plotY, v(c, {
          pageX: g.left + d + (f ? b.plotWidth - i : h),
          pageY: g.top + e + (f ? b.plotHeight - h : i)
        }), D(c.series, 'click', v(a, { point: c })), b.hoverPoint && c.firePointEvent('click', a)) : (v(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - e) && D(b, 'click', a));
    },
    onContainerTouchStart: function (a) {
      var b = this.chart;
      a.touches.length === 1 ? (a = this.normalize(a), b.isInsidePlot(a.chartX - b.plotLeft, a.chartY - b.plotTop) && (this.runPointActions(a), this.pinch(a))) : a.touches.length === 2 && this.pinch(a);
    },
    onContainerTouchMove: function (a) {
      (a.touches.length === 1 || a.touches.length === 2) && this.pinch(a);
    },
    onDocumentTouchEnd: function (a) {
      this.drop(a);
    },
    setDOMEvents: function () {
      var a = this, b = a.chart.container, c;
      this._events = c = [
        [
          b,
          'onmousedown',
          'onContainerMouseDown'
        ],
        [
          b,
          'onmousemove',
          'onContainerMouseMove'
        ],
        [
          b,
          'onclick',
          'onContainerClick'
        ],
        [
          b,
          'mouseleave',
          'onContainerMouseLeave'
        ],
        [
          z,
          'mousemove',
          'onDocumentMouseMove'
        ],
        [
          z,
          'mouseup',
          'onDocumentMouseUp'
        ]
      ];
      fb && c.push([
        b,
        'ontouchstart',
        'onContainerTouchStart'
      ], [
        b,
        'ontouchmove',
        'onContainerTouchMove'
      ], [
        z,
        'touchend',
        'onDocumentTouchEnd'
      ]);
      n(c, function (b) {
        a['_' + b[2]] = function (c) {
          a[b[2]](c);
        };
        b[1].indexOf('on') === 0 ? b[0][b[1]] = a['_' + b[2]] : J(b[0], b[1], a['_' + b[2]]);
      });
    },
    destroy: function () {
      var a = this;
      n(a._events, function (b) {
        b[1].indexOf('on') === 0 ? b[0][b[1]] = null : ba(b[0], b[1], a['_' + b[2]]);
      });
      delete a._events;
      clearInterval(a.tooltipTimeout);
    }
  };
  sb.prototype = {
    init: function (a, b) {
      var c = this, d = b.itemStyle, e = o(b.padding, 8), f = b.itemMarginTop || 0;
      this.options = b;
      if (b.enabled)
        c.baseline = u(d.fontSize) + 3 + f, c.itemStyle = d, c.itemHiddenStyle = x(d, b.itemHiddenStyle), c.itemMarginTop = f, c.padding = e, c.initialItemX = e, c.initialItemY = e - 5, c.maxItemWidth = 0, c.chart = a, c.itemHeight = 0, c.lastLineHeight = 0, c.render(), J(c.chart, 'endResize', function () {
          c.positionCheckboxes();
        });
    },
    colorizeItem: function (a, b) {
      var c = this.options, d = a.legendItem, e = a.legendLine, f = a.legendSymbol, g = this.itemHiddenStyle.color, c = b ? c.itemStyle.color : g, h = b ? a.color : g, g = a.options && a.options.marker, i = {
          stroke: h,
          fill: h
        }, j;
      d && d.css({
        fill: c,
        color: c
      });
      e && e.attr({ stroke: h });
      if (f) {
        if (g)
          for (j in g = a.convertAttribs(g), g)
            d = g[j], d !== y && (i[j] = d);
        f.attr(i);
      }
    },
    positionItem: function (a) {
      var b = this.options, c = b.symbolPadding, b = !b.rtl, d = a._legendItemPos, e = d[0], d = d[1], f = a.checkbox;
      a.legendGroup && a.legendGroup.translate(b ? e : this.legendWidth - e - 2 * c - 4, d);
      if (f)
        f.x = e, f.y = d;
    },
    destroyItem: function (a) {
      var b = a.checkbox;
      n([
        'legendItem',
        'legendLine',
        'legendSymbol',
        'legendGroup'
      ], function (b) {
        a[b] && a[b].destroy();
      });
      b && Ra(a.checkbox);
    },
    destroy: function () {
      var a = this.group, b = this.box;
      if (b)
        this.box = b.destroy();
      if (a)
        this.group = a.destroy();
    },
    positionCheckboxes: function (a) {
      var b = this.group.alignAttr, c, d = this.clipHeight || this.legendHeight;
      if (b)
        c = b.translateY, n(this.allItems, function (e) {
          var f = e.checkbox, g;
          f && (g = c + f.y + (a || 0) + 3, L(f, {
            left: b.translateX + e.legendItemWidth + f.x - 20 + 'px',
            top: g + 'px',
            display: g > c - 6 && g < c + d - 6 ? '' : S
          }));
        });
    },
    renderTitle: function () {
      var a = this.padding, b = this.options.title, c = 0;
      if (b.text) {
        if (!this.title)
          this.title = this.chart.renderer.label(b.text, a - 3, a - 4, null, null, null, null, null, 'legend-title').attr({ zIndex: 1 }).css(b.style).add(this.group);
        c = this.title.getBBox().height;
        this.contentGroup.attr({ translateY: c });
      }
      this.titleHeight = c;
    },
    renderItem: function (a) {
      var w;
      var b = this, c = b.chart, d = c.renderer, e = b.options, f = e.layout === 'horizontal', g = e.symbolWidth, h = e.symbolPadding, i = b.itemStyle, j = b.itemHiddenStyle, k = b.padding, m = !e.rtl, l = e.width, p = e.itemMarginBottom || 0, s = b.itemMarginTop, o = b.initialItemX, n = a.legendItem, t = a.series || a, r = t.options, v = r.showCheckbox, u = e.useHTML;
      if (!n && (a.legendGroup = d.g('legend-item').attr({ zIndex: 1 }).add(b.scrollGroup), t.drawLegendSymbol(b, a), a.legendItem = n = d.text(e.labelFormat ? wa(e.labelFormat, a) : e.labelFormatter.call(a), m ? g + h : -h, b.baseline, u).css(x(a.visible ? i : j)).attr({
          align: m ? 'left' : 'right',
          zIndex: 2
        }).add(a.legendGroup), (u ? n : a.legendGroup).on('mouseover', function () {
          a.setState('hover');
          n.css(b.options.itemHoverStyle);
        }).on('mouseout', function () {
          n.css(a.visible ? i : j);
          a.setState();
        }).on('click', function (b) {
          var c = function () {
              a.setVisible();
            }, b = { browserEvent: b };
          a.firePointEvent ? a.firePointEvent('legendItemClick', b, c) : D(a, 'legendItemClick', b, c);
        }), b.colorizeItem(a, a.visible), r && v))
        a.checkbox = U('input', {
          type: 'checkbox',
          checked: a.selected,
          defaultChecked: a.selected
        }, e.itemCheckboxStyle, c.container), J(a.checkbox, 'click', function (b) {
          D(a, 'checkboxClick', { checked: b.target.checked }, function () {
            a.select();
          });
        });
      d = n.getBBox();
      w = a.legendItemWidth = e.itemWidth || g + h + d.width + k + (v ? 20 : 0), e = w;
      b.itemHeight = g = d.height;
      if (f && b.itemX - o + e > (l || c.chartWidth - 2 * k - o))
        b.itemX = o, b.itemY += s + b.lastLineHeight + p, b.lastLineHeight = 0;
      b.maxItemWidth = q(b.maxItemWidth, e);
      b.lastItemY = s + b.itemY + p;
      b.lastLineHeight = q(g, b.lastLineHeight);
      a._legendItemPos = [
        b.itemX,
        b.itemY
      ];
      f ? b.itemX += e : (b.itemY += s + g + p, b.lastLineHeight = g);
      b.offsetWidth = l || q(f ? b.itemX - o : e, b.offsetWidth);
    },
    render: function () {
      var a = this, b = a.chart, c = b.renderer, d = a.group, e, f, g, h, i = a.box, j = a.options, k = a.padding, m = j.borderWidth, l = j.backgroundColor;
      a.itemX = a.initialItemX;
      a.itemY = a.initialItemY;
      a.offsetWidth = 0;
      a.lastItemY = 0;
      if (!d)
        a.group = d = c.g('legend').attr({ zIndex: 7 }).add(), a.contentGroup = c.g().attr({ zIndex: 1 }).add(d), a.scrollGroup = c.g().add(a.contentGroup);
      a.renderTitle();
      e = [];
      n(b.series, function (a) {
        var b = a.options;
        b.showInLegend && !r(b.linkedTo) && (e = e.concat(a.legendItems || (b.legendType === 'point' ? a.data : a)));
      });
      Ib(e, function (a, b) {
        return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0);
      });
      j.reversed && e.reverse();
      a.allItems = e;
      a.display = f = !!e.length;
      n(e, function (b) {
        a.renderItem(b);
      });
      g = j.width || a.offsetWidth;
      h = a.lastItemY + a.lastLineHeight + a.titleHeight;
      h = a.handleOverflow(h);
      if (m || l) {
        g += k;
        h += k;
        if (i) {
          if (g > 0 && h > 0)
            i[i.isNew ? 'attr' : 'animate'](i.crisp(null, null, null, g, h)), i.isNew = !1;
        } else
          a.box = i = c.rect(0, 0, g, h, j.borderRadius, m || 0).attr({
            stroke: j.borderColor,
            'stroke-width': m || 0,
            fill: l || S
          }).add(d).shadow(j.shadow), i.isNew = !0;
        i[f ? 'show' : 'hide']();
      }
      a.legendWidth = g;
      a.legendHeight = h;
      n(e, function (b) {
        a.positionItem(b);
      });
      f && d.align(v({
        width: g,
        height: h
      }, j), !0, 'spacingBox');
      b.isResizing || this.positionCheckboxes();
    },
    handleOverflow: function (a) {
      var b = this, c = this.chart, d = c.renderer, e = this.options, f = e.y, f = c.spacingBox.height + (e.verticalAlign === 'top' ? -f : f) - this.padding, g = e.maxHeight, h = this.clipRect, i = e.navigation, j = o(i.animation, !0), k = i.arrowSize || 12, m = this.nav;
      e.layout === 'horizontal' && (f /= 2);
      g && (f = K(f, g));
      if (a > f && !e.useHTML) {
        this.clipHeight = c = f - 20 - this.titleHeight;
        this.pageCount = ja(a / c);
        this.currentPage = o(this.currentPage, 1);
        this.fullHeight = a;
        if (!h)
          h = b.clipRect = d.clipRect(0, 0, 9999, 0), b.contentGroup.clip(h);
        h.attr({ height: c });
        if (!m)
          this.nav = m = d.g().attr({ zIndex: 1 }).add(this.group), this.up = d.symbol('triangle', 0, 0, k, k).on('click', function () {
            b.scroll(-1, j);
          }).add(m), this.pager = d.text('', 15, 10).css(i.style).add(m), this.down = d.symbol('triangle-down', 0, 0, k, k).on('click', function () {
            b.scroll(1, j);
          }).add(m);
        b.scroll(0);
        a = f;
      } else if (m)
        h.attr({ height: c.chartHeight }), m.hide(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0;
      return a;
    },
    scroll: function (a, b) {
      var c = this.pageCount, d = this.currentPage + a, e = this.clipHeight, f = this.options.navigation, g = f.activeColor, h = f.inactiveColor, f = this.pager, i = this.padding;
      d > c && (d = c);
      if (d > 0)
        b !== y && Ia(b, this.chart), this.nav.attr({
          translateX: i,
          translateY: e + 7 + this.titleHeight,
          visibility: 'visible'
        }), this.up.attr({ fill: d === 1 ? h : g }).css({ cursor: d === 1 ? 'default' : 'pointer' }), f.attr({ text: d + '/' + this.pageCount }), this.down.attr({
          x: 18 + this.pager.getBBox().width,
          fill: d === c ? h : g
        }).css({ cursor: d === c ? 'default' : 'pointer' }), e = -K(e * (d - 1), this.fullHeight - e + i) + 1, this.scrollGroup.animate({ translateY: e }), f.attr({ text: d + '/' + c }), this.currentPage = d, this.positionCheckboxes(e);
    }
  };
  tb.prototype = {
    init: function (a, b) {
      var c, d = a.series;
      a.series = null;
      c = x(N, a);
      c.series = a.series = d;
      var d = c.chart, e = d.margin, e = V(e) ? e : [
          e,
          e,
          e,
          e
        ];
      this.optionsMarginTop = o(d.marginTop, e[0]);
      this.optionsMarginRight = o(d.marginRight, e[1]);
      this.optionsMarginBottom = o(d.marginBottom, e[2]);
      this.optionsMarginLeft = o(d.marginLeft, e[3]);
      this.runChartClick = (e = d.events) && !!e.click;
      this.bounds = {
        h: {},
        v: {}
      };
      this.callback = b;
      this.isResizing = 0;
      this.options = c;
      this.axes = [];
      this.series = [];
      this.hasCartesianSeries = d.showAxes;
      var f = this, g;
      f.index = Ba.length;
      Ba.push(f);
      d.reflow !== !1 && J(f, 'load', function () {
        f.initReflow();
      });
      if (e)
        for (g in e)
          J(f, g, e[g]);
      f.xAxis = [];
      f.yAxis = [];
      f.animation = $ ? !1 : o(d.animation, !0);
      f.pointCount = 0;
      f.counters = new Hb();
      f.firstRender();
    },
    initSeries: function (a) {
      var b = this.options.chart;
      (b = aa[a.type || b.type || b.defaultSeriesType]) || qa(17, !0);
      b = new b();
      b.init(this, a);
      return b;
    },
    addSeries: function (a, b, c) {
      var d, e = this;
      a && (b = o(b, !0), D(e, 'addSeries', { options: a }, function () {
        d = e.initSeries(a);
        e.isDirtyLegend = !0;
        b && e.redraw(c);
      }));
      return d;
    },
    addAxis: function (a, b, c, d) {
      var b = b ? 'xAxis' : 'yAxis', e = this.options;
      new ab(this, x(a, { index: this[b].length }));
      e[b] = ha(e[b] || {});
      e[b].push(a);
      o(c, !0) && this.redraw(d);
    },
    isInsidePlot: function (a, b, c) {
      var d = c ? b : a, a = c ? a : b;
      return d >= 0 && d <= this.plotWidth && a >= 0 && a <= this.plotHeight;
    },
    adjustTickAmounts: function () {
      this.options.chart.alignTicks !== !1 && n(this.axes, function (a) {
        a.adjustTickAmount();
      });
      this.maxTicks = null;
    },
    redraw: function (a) {
      var b = this.axes, c = this.series, d = this.pointer, e = this.legend, f = this.isDirtyLegend, g, h = this.isDirtyBox, i = c.length, j = i, k = this.renderer, m = k.isHidden(), l = [];
      Ia(a, this);
      for (m && this.cloneRenderTo(); j--;)
        if (a = c[j], a.isDirty && a.options.stacking) {
          g = !0;
          break;
        }
      if (g)
        for (j = i; j--;)
          if (a = c[j], a.options.stacking)
            a.isDirty = !0;
      n(c, function (a) {
        a.isDirty && a.options.legendType === 'point' && (f = !0);
      });
      if (f && e.options.enabled)
        e.render(), this.isDirtyLegend = !1;
      if (this.hasCartesianSeries) {
        if (!this.isResizing)
          this.maxTicks = null, n(b, function (a) {
            a.setScale();
          });
        this.adjustTickAmounts();
        this.getMargins();
        n(b, function (a) {
          if (a.isDirtyExtremes)
            a.isDirtyExtremes = !1, l.push(function () {
              D(a, 'afterSetExtremes', a.getExtremes());
            });
          if (a.isDirty || h || g)
            a.redraw(), h = !0;
        });
      }
      h && this.drawChartBox();
      n(c, function (a) {
        a.isDirty && a.visible && (!a.isCartesian || a.xAxis) && a.redraw();
      });
      d && d.reset && d.reset(!0);
      k.draw();
      D(this, 'redraw');
      m && this.cloneRenderTo(!0);
      n(l, function (a) {
        a.call();
      });
    },
    showLoading: function (a) {
      var b = this.options, c = this.loadingDiv, d = b.loading;
      if (!c)
        this.loadingDiv = c = U(ya, { className: 'highcharts-loading' }, v(d.style, {
          zIndex: 10,
          display: S
        }), this.container), this.loadingSpan = U('span', null, d.labelStyle, c);
      this.loadingSpan.innerHTML = a || b.lang.loading;
      if (!this.loadingShown)
        L(c, {
          opacity: 0,
          display: '',
          left: this.plotLeft + 'px',
          top: this.plotTop + 'px',
          width: this.plotWidth + 'px',
          height: this.plotHeight + 'px'
        }), wb(c, { opacity: d.style.opacity }, { duration: d.showDuration || 0 }), this.loadingShown = !0;
    },
    hideLoading: function () {
      var a = this.options, b = this.loadingDiv;
      b && wb(b, { opacity: 0 }, {
        duration: a.loading.hideDuration || 100,
        complete: function () {
          L(b, { display: S });
        }
      });
      this.loadingShown = !1;
    },
    get: function (a) {
      var b = this.axes, c = this.series, d, e;
      for (d = 0; d < b.length; d++)
        if (b[d].options.id === a)
          return b[d];
      for (d = 0; d < c.length; d++)
        if (c[d].options.id === a)
          return c[d];
      for (d = 0; d < c.length; d++) {
        e = c[d].points || [];
        for (b = 0; b < e.length; b++)
          if (e[b].id === a)
            return e[b];
      }
      return null;
    },
    getAxes: function () {
      var a = this, b = this.options, c = b.xAxis = ha(b.xAxis || {}), b = b.yAxis = ha(b.yAxis || {});
      n(c, function (a, b) {
        a.index = b;
        a.isX = !0;
      });
      n(b, function (a, b) {
        a.index = b;
      });
      c = c.concat(b);
      n(c, function (b) {
        new ab(a, b);
      });
      a.adjustTickAmounts();
    },
    getSelectedPoints: function () {
      var a = [];
      n(this.series, function (b) {
        a = a.concat(ob(b.points || [], function (a) {
          return a.selected;
        }));
      });
      return a;
    },
    getSelectedSeries: function () {
      return ob(this.series, function (a) {
        return a.selected;
      });
    },
    showResetZoom: function () {
      var a = this, b = N.lang, c = a.options.chart.resetZoomButton, d = c.theme, e = d.states, f = c.relativeTo === 'chart' ? null : 'plotBox';
      this.resetZoomButton = a.renderer.button(b.resetZoom, null, null, function () {
        a.zoomOut();
      }, d, e && e.hover).attr({
        align: c.position.align,
        title: b.resetZoomTitle
      }).add().align(c.position, !1, f);
    },
    zoomOut: function () {
      var a = this;
      D(a, 'selection', { resetSelection: !0 }, function () {
        a.zoom();
      });
    },
    zoom: function (a) {
      var b, c = this.pointer, d = !1, e;
      !a || a.resetSelection ? n(this.axes, function (a) {
        b = a.zoom();
      }) : n(a.xAxis.concat(a.yAxis), function (a) {
        var e = a.axis, h = e.isXAxis;
        if (c[h ? 'zoomX' : 'zoomY'] || c[h ? 'pinchX' : 'pinchY'])
          b = e.zoom(a.min, a.max), e.displayBtn && (d = !0);
      });
      e = this.resetZoomButton;
      if (d && !e)
        this.showResetZoom();
      else if (!d && V(e))
        this.resetZoomButton = e.destroy();
      b && this.redraw(o(this.options.chart.animation, a && a.animation, this.pointCount < 100));
    },
    pan: function (a) {
      var b = this.xAxis[0], c = this.mouseDownX, d = b.pointRange / 2, e = b.getExtremes(), f = b.translate(c - a, !0) + d, c = b.translate(c + this.plotWidth - a, !0) - d;
      (d = this.hoverPoints) && n(d, function (a) {
        a.setState();
      });
      b.series.length && f > K(e.dataMin, e.min) && c < q(e.dataMax, e.max) && b.setExtremes(f, c, !0, !1, { trigger: 'pan' });
      this.mouseDownX = a;
      L(this.container, { cursor: 'move' });
    },
    setTitle: function (a, b) {
      var f;
      var c = this, d = c.options, e;
      e = d.title = x(d.title, a);
      f = d.subtitle = x(d.subtitle, b), d = f;
      n([
        [
          'title',
          a,
          e
        ],
        [
          'subtitle',
          b,
          d
        ]
      ], function (a) {
        var b = a[0], d = c[b], e = a[1], a = a[2];
        d && e && (c[b] = d = d.destroy());
        a && a.text && !d && (c[b] = c.renderer.text(a.text, 0, 0, a.useHTML).attr({
          align: a.align,
          'class': 'highcharts-' + b,
          zIndex: a.zIndex || 4
        }).css(a.style).add().align(a, !1, 'spacingBox'));
      });
    },
    getChartSize: function () {
      var a = this.options.chart, b = this.renderToClone || this.renderTo;
      this.containerWidth = gb(b, 'width');
      this.containerHeight = gb(b, 'height');
      this.chartWidth = q(0, a.width || this.containerWidth || 600);
      this.chartHeight = q(0, o(a.height, this.containerHeight > 19 ? this.containerHeight : 400));
    },
    cloneRenderTo: function (a) {
      var b = this.renderToClone, c = this.container;
      a ? b && (this.renderTo.appendChild(c), Ra(b), delete this.renderToClone) : (c && this.renderTo.removeChild(c), this.renderToClone = b = this.renderTo.cloneNode(0), L(b, {
        position: 'absolute',
        top: '-9999px',
        display: 'block'
      }), z.body.appendChild(b), c && b.appendChild(c));
    },
    getContainer: function () {
      var a, b = this.options.chart, c, d, e;
      this.renderTo = a = b.renderTo;
      e = 'highcharts-' + ub++;
      if (fa(a))
        this.renderTo = a = z.getElementById(a);
      a || qa(13, !0);
      c = u(A(a, 'data-highcharts-chart'));
      !isNaN(c) && Ba[c] && Ba[c].destroy();
      A(a, 'data-highcharts-chart', this.index);
      a.innerHTML = '';
      a.offsetWidth || this.cloneRenderTo();
      this.getChartSize();
      c = this.chartWidth;
      d = this.chartHeight;
      this.container = a = U(ya, {
        className: 'highcharts-container' + (b.className ? ' ' + b.className : ''),
        id: e
      }, v({
        position: 'relative',
        overflow: 'hidden',
        width: c + 'px',
        height: d + 'px',
        textAlign: 'left',
        lineHeight: 'normal',
        zIndex: 0,
        '-webkit-tap-highlight-color': 'rgba(0,0,0,0)'
      }, b.style), this.renderToClone || a);
      this._cursor = a.style.cursor;
      this.renderer = b.forExport ? new Ca(a, c, d, !0) : new Sa(a, c, d);
      $ && this.renderer.create(this, a, c, d);
    },
    getMargins: function () {
      var a = this.options.chart, b = a.spacingTop, c = a.spacingRight, d = a.spacingBottom, a = a.spacingLeft, e, f = this.legend, g = this.optionsMarginTop, h = this.optionsMarginLeft, i = this.optionsMarginRight, j = this.optionsMarginBottom, k = this.options.title, m = this.options.subtitle, l = this.options.legend, p = o(l.margin, 10), s = l.x, t = l.y, B = l.align, w = l.verticalAlign;
      this.resetMargins();
      e = this.axisOffset;
      if ((this.title || this.subtitle) && !r(this.optionsMarginTop))
        if (m = q(this.title && !k.floating && !k.verticalAlign && k.y || 0, this.subtitle && !m.floating && !m.verticalAlign && m.y || 0))
          this.plotTop = q(this.plotTop, m + o(k.margin, 15) + b);
      if (f.display && !l.floating)
        if (B === 'right') {
          if (!r(i))
            this.marginRight = q(this.marginRight, f.legendWidth - s + p + c);
        } else if (B === 'left') {
          if (!r(h))
            this.plotLeft = q(this.plotLeft, f.legendWidth + s + p + a);
        } else if (w === 'top') {
          if (!r(g))
            this.plotTop = q(this.plotTop, f.legendHeight + t + p + b);
        } else if (w === 'bottom' && !r(j))
          this.marginBottom = q(this.marginBottom, f.legendHeight - t + p + d);
      this.extraBottomMargin && (this.marginBottom += this.extraBottomMargin);
      this.extraTopMargin && (this.plotTop += this.extraTopMargin);
      this.hasCartesianSeries && n(this.axes, function (a) {
        a.getOffset();
      });
      r(h) || (this.plotLeft += e[3]);
      r(g) || (this.plotTop += e[0]);
      r(j) || (this.marginBottom += e[2]);
      r(i) || (this.marginRight += e[1]);
      this.setChartSize();
    },
    initReflow: function () {
      function a(a) {
        var g = c.width || gb(d, 'width'), h = c.height || gb(d, 'height'), a = a ? a.target : O;
        if (!b.hasUserSize && g && h && (a === O || a === z)) {
          if (g !== b.containerWidth || h !== b.containerHeight)
            clearTimeout(e), b.reflowTimeout = e = setTimeout(function () {
              if (b.container)
                b.setSize(g, h, !1), b.hasUserSize = null;
            }, 100);
          b.containerWidth = g;
          b.containerHeight = h;
        }
      }
      var b = this, c = b.options.chart, d = b.renderTo, e;
      J(O, 'resize', a);
      J(b, 'destroy', function () {
        ba(O, 'resize', a);
      });
    },
    setSize: function (a, b, c) {
      var d = this, e, f, g;
      d.isResizing += 1;
      g = function () {
        d && D(d, 'endResize', null, function () {
          d.isResizing -= 1;
        });
      };
      Ia(c, d);
      d.oldChartHeight = d.chartHeight;
      d.oldChartWidth = d.chartWidth;
      if (r(a))
        d.chartWidth = e = q(0, t(a)), d.hasUserSize = !!e;
      if (r(b))
        d.chartHeight = f = q(0, t(b));
      L(d.container, {
        width: e + 'px',
        height: f + 'px'
      });
      d.setChartSize(!0);
      d.renderer.setSize(e, f, c);
      d.maxTicks = null;
      n(d.axes, function (a) {
        a.isDirty = !0;
        a.setScale();
      });
      n(d.series, function (a) {
        a.isDirty = !0;
      });
      d.isDirtyLegend = !0;
      d.isDirtyBox = !0;
      d.getMargins();
      d.redraw(c);
      d.oldChartHeight = null;
      D(d, 'resize');
      za === !1 ? g() : setTimeout(g, za && za.duration || 500);
    },
    setChartSize: function (a) {
      var b = this.inverted, c = this.renderer, d = this.chartWidth, e = this.chartHeight, f = this.options.chart, g = f.spacingTop, h = f.spacingRight, i = f.spacingBottom, j = f.spacingLeft, k = this.clipOffset, m, l, p, o;
      this.plotLeft = m = t(this.plotLeft);
      this.plotTop = l = t(this.plotTop);
      this.plotWidth = p = q(0, t(d - m - this.marginRight));
      this.plotHeight = o = q(0, t(e - l - this.marginBottom));
      this.plotSizeX = b ? o : p;
      this.plotSizeY = b ? p : o;
      this.plotBorderWidth = b = f.plotBorderWidth || 0;
      this.spacingBox = c.spacingBox = {
        x: j,
        y: g,
        width: d - j - h,
        height: e - g - i
      };
      this.plotBox = c.plotBox = {
        x: m,
        y: l,
        width: p,
        height: o
      };
      c = ja(q(b, k[3]) / 2);
      d = ja(q(b, k[0]) / 2);
      this.clipBox = {
        x: c,
        y: d,
        width: T(this.plotSizeX - q(b, k[1]) / 2 - c),
        height: T(this.plotSizeY - q(b, k[2]) / 2 - d)
      };
      a || n(this.axes, function (a) {
        a.setAxisSize();
        a.setAxisTranslation();
      });
    },
    resetMargins: function () {
      var a = this.options.chart, b = a.spacingRight, c = a.spacingBottom, d = a.spacingLeft;
      this.plotTop = o(this.optionsMarginTop, a.spacingTop);
      this.marginRight = o(this.optionsMarginRight, b);
      this.marginBottom = o(this.optionsMarginBottom, c);
      this.plotLeft = o(this.optionsMarginLeft, d);
      this.axisOffset = [
        0,
        0,
        0,
        0
      ];
      this.clipOffset = [
        0,
        0,
        0,
        0
      ];
    },
    drawChartBox: function () {
      var a = this.options.chart, b = this.renderer, c = this.chartWidth, d = this.chartHeight, e = this.chartBackground, f = this.plotBackground, g = this.plotBorder, h = this.plotBGImage, i = a.borderWidth || 0, j = a.backgroundColor, k = a.plotBackgroundColor, m = a.plotBackgroundImage, l = a.plotBorderWidth || 0, p, o = this.plotLeft, n = this.plotTop, t = this.plotWidth, q = this.plotHeight, r = this.plotBox, v = this.clipRect, u = this.clipBox;
      p = i + (a.shadow ? 8 : 0);
      if (i || j)
        if (e)
          e.animate(e.crisp(null, null, null, c - p, d - p));
        else {
          e = { fill: j || S };
          if (i)
            e.stroke = a.borderColor, e['stroke-width'] = i;
          this.chartBackground = b.rect(p / 2, p / 2, c - p, d - p, a.borderRadius, i).attr(e).add().shadow(a.shadow);
        }
      if (k)
        f ? f.animate(r) : this.plotBackground = b.rect(o, n, t, q, 0).attr({ fill: k }).add().shadow(a.plotShadow);
      if (m)
        h ? h.animate(r) : this.plotBGImage = b.image(m, o, n, t, q).add();
      v ? v.animate({
        width: u.width,
        height: u.height
      }) : this.clipRect = b.clipRect(u);
      if (l)
        g ? g.animate(g.crisp(null, o, n, t, q)) : this.plotBorder = b.rect(o, n, t, q, 0, l).attr({
          stroke: a.plotBorderColor,
          'stroke-width': l,
          zIndex: 1
        }).add();
      this.isDirtyBox = !1;
    },
    propFromSeries: function () {
      var a = this, b = a.options.chart, c, d = a.options.series, e, f;
      n([
        'inverted',
        'angular',
        'polar'
      ], function (g) {
        c = aa[b.type || b.defaultSeriesType];
        f = a[g] || b[g] || c && c.prototype[g];
        for (e = d && d.length; !f && e--;)
          (c = aa[d[e].type]) && c.prototype[g] && (f = !0);
        a[g] = f;
      });
    },
    render: function () {
      var a = this, b = a.axes, c = a.renderer, d = a.options, e = d.labels, f = d.credits, g;
      a.setTitle();
      a.legend = new sb(a, d.legend);
      n(b, function (a) {
        a.setScale();
      });
      a.getMargins();
      a.maxTicks = null;
      n(b, function (a) {
        a.setTickPositions(!0);
        a.setMaxTicks();
      });
      a.adjustTickAmounts();
      a.getMargins();
      a.drawChartBox();
      a.hasCartesianSeries && n(b, function (a) {
        a.render();
      });
      if (!a.seriesGroup)
        a.seriesGroup = c.g('series-group').attr({ zIndex: 3 }).add();
      n(a.series, function (a) {
        a.translate();
        a.setTooltipPoints();
        a.render();
      });
      e.items && n(e.items, function (b) {
        var d = v(e.style, b.style), f = u(d.left) + a.plotLeft, g = u(d.top) + a.plotTop + 12;
        delete d.left;
        delete d.top;
        c.text(b.html, f, g).attr({ zIndex: 2 }).css(d).add();
      });
      if (f.enabled && !a.credits)
        g = f.href, a.credits = c.text(f.text, 0, 0).on('click', function () {
          if (g)
            location.href = g;
        }).attr({
          align: f.position.align,
          zIndex: 8
        }).css(f.style).add().align(f.position);
      a.hasRendered = !0;
    },
    destroy: function () {
      var a = this, b = a.axes, c = a.series, d = a.container, e, f = d && d.parentNode;
      D(a, 'destroy');
      Ba[a.index] = y;
      a.renderTo.removeAttribute('data-highcharts-chart');
      ba(a);
      for (e = b.length; e--;)
        b[e] = b[e].destroy();
      for (e = c.length; e--;)
        c[e] = c[e].destroy();
      n('title,subtitle,chartBackground,plotBackground,plotBGImage,plotBorder,seriesGroup,clipRect,credits,pointer,scroller,rangeSelector,legend,resetZoomButton,tooltip,renderer'.split(','), function (b) {
        var c = a[b];
        c && c.destroy && (a[b] = c.destroy());
      });
      if (d)
        d.innerHTML = '', ba(d), f && Ra(d);
      for (e in a)
        delete a[e];
    },
    isReadyToRender: function () {
      var a = this;
      return !Z && O == O.top && z.readyState !== 'complete' || $ && !O.canvg ? ($ ? Rb.push(function () {
        a.firstRender();
      }, a.options.global.canvasToolsURL) : z.attachEvent('onreadystatechange', function () {
        z.detachEvent('onreadystatechange', a.firstRender);
        z.readyState === 'complete' && a.firstRender();
      }), !1) : !0;
    },
    firstRender: function () {
      var a = this, b = a.options, c = a.callback;
      if (a.isReadyToRender())
        a.getContainer(), D(a, 'init'), a.resetMargins(), a.setChartSize(), a.propFromSeries(), a.getAxes(), n(b.series || [], function (b) {
          a.initSeries(b);
        }), D(a, 'beforeRender'), a.pointer = new rb(a, b), a.render(), a.renderer.draw(), c && c.apply(a, [a]), n(a.callbacks, function (b) {
          b.apply(a, [a]);
        }), a.cloneRenderTo(!0), D(a, 'load');
    }
  };
  tb.prototype.callbacks = [];
  var Na = function () {
  };
  Na.prototype = {
    init: function (a, b, c) {
      this.series = a;
      this.applyOptions(b, c);
      this.pointAttr = {};
      if (a.options.colorByPoint && (b = a.options.colors || a.chart.options.colors, this.color = this.color || b[a.colorCounter++], a.colorCounter === b.length))
        a.colorCounter = 0;
      a.chart.pointCount++;
      return this;
    },
    applyOptions: function (a, b) {
      var c = this.series, d = c.pointValKey, a = Na.prototype.optionsToObject.call(this, a);
      v(this, a);
      this.options = this.options ? v(this.options, a) : a;
      if (d)
        this.y = this[d];
      if (this.x === y && c)
        this.x = b === y ? c.autoIncrement() : b;
      return this;
    },
    optionsToObject: function (a) {
      var b, c = this.series, d = c.pointArrayMap || ['y'], e = d.length, f = 0, g = 0;
      if (typeof a === 'number' || a === null)
        b = { y: a };
      else if (Da(a)) {
        b = {};
        if (a.length > e) {
          c = typeof a[0];
          if (c === 'string')
            b.name = a[0];
          else if (c === 'number')
            b.x = a[0];
          f++;
        }
        for (; g < e;)
          b[d[g++]] = a[f++];
      } else if (typeof a === 'object') {
        b = a;
        if (a.dataLabels)
          c._hasPointLabels = !0;
        if (a.marker)
          c._hasPointMarkers = !0;
      }
      return b;
    },
    destroy: function () {
      var a = this.series.chart, b = a.hoverPoints, c;
      a.pointCount--;
      if (b && (this.setState(), ga(b, this), !b.length))
        a.hoverPoints = null;
      if (this === a.hoverPoint)
        this.onMouseOut();
      if (this.graphic || this.dataLabel)
        ba(this), this.destroyElements();
      this.legendItem && a.legend.destroyItem(this);
      for (c in this)
        this[c] = null;
    },
    destroyElements: function () {
      for (var a = 'graphic,dataLabel,dataLabelUpper,group,connector,shadowGroup'.split(','), b, c = 6; c--;)
        b = a[c], this[b] && (this[b] = this[b].destroy());
    },
    getLabelConfig: function () {
      return {
        x: this.category,
        y: this.y,
        key: this.name || this.category,
        series: this.series,
        point: this,
        percentage: this.percentage,
        total: this.total || this.stackTotal
      };
    },
    select: function (a, b) {
      var c = this, d = c.series, e = d.chart, a = o(a, !c.selected);
      c.firePointEvent(a ? 'select' : 'unselect', { accumulate: b }, function () {
        c.selected = c.options.selected = a;
        d.options.data[la(c, d.data)] = c.options;
        c.setState(a && 'select');
        b || n(e.getSelectedPoints(), function (a) {
          if (a.selected && a !== c)
            a.selected = a.options.selected = !1, d.options.data[la(a, d.data)] = a.options, a.setState(''), a.firePointEvent('unselect');
        });
      });
    },
    onMouseOver: function (a) {
      var b = this.series, c = b.chart, d = c.tooltip, e = c.hoverPoint;
      if (e && e !== this)
        e.onMouseOut();
      this.firePointEvent('mouseOver');
      d && (!d.shared || b.noSharedTooltip) && d.refresh(this, a);
      this.setState('hover');
      c.hoverPoint = this;
    },
    onMouseOut: function () {
      var a = this.series.chart, b = a.hoverPoints;
      if (!b || la(this, b) === -1)
        this.firePointEvent('mouseOut'), this.setState(), a.hoverPoint = null;
    },
    tooltipFormatter: function (a) {
      var b = this.series, c = b.tooltipOptions, d = o(c.valueDecimals, ''), e = c.valuePrefix || '', f = c.valueSuffix || '';
      n(b.pointArrayMap || ['y'], function (b) {
        b = '{point.' + b;
        if (e || f)
          a = a.replace(b + '}', e + b + '}' + f);
        a = a.replace(b + '}', b + ':,.' + d + 'f}');
      });
      return wa(a, {
        point: this,
        series: this.series
      });
    },
    update: function (a, b, c) {
      var d = this, e = d.series, f = d.graphic, g, h = e.data, i = e.chart, b = o(b, !0);
      d.firePointEvent('update', { options: a }, function () {
        d.applyOptions(a);
        V(a) && (e.getAttribs(), f && f.attr(d.pointAttr[e.state]));
        g = la(d, h);
        e.xData[g] = d.x;
        e.yData[g] = e.toYData ? e.toYData(d) : d.y;
        e.zData[g] = d.z;
        e.options.data[g] = d.options;
        e.isDirty = !0;
        e.isDirtyData = !0;
        b && i.redraw(c);
      });
    },
    remove: function (a, b) {
      var c = this, d = c.series, e = d.chart, f, g = d.data;
      Ia(b, e);
      a = o(a, !0);
      c.firePointEvent('remove', null, function () {
        f = la(c, g);
        g.splice(f, 1);
        d.options.data.splice(f, 1);
        d.xData.splice(f, 1);
        d.yData.splice(f, 1);
        d.zData.splice(f, 1);
        c.destroy();
        d.isDirty = !0;
        d.isDirtyData = !0;
        a && e.redraw();
      });
    },
    firePointEvent: function (a, b, c) {
      var d = this, e = this.series.options;
      (e.point.events[a] || d.options && d.options.events && d.options.events[a]) && this.importEvents();
      a === 'click' && e.allowPointSelect && (c = function (a) {
        d.select(null, a.ctrlKey || a.metaKey || a.shiftKey);
      });
      D(this, a, b, c);
    },
    importEvents: function () {
      if (!this.hasImportedEvents) {
        var a = x(this.series.options.point, this.options).events, b;
        this.events = a;
        for (b in a)
          J(this, b, a[b]);
        this.hasImportedEvents = !0;
      }
    },
    setState: function (a) {
      var b = this.plotX, c = this.plotY, d = this.series, e = d.options.states, f = X[d.type].marker && d.options.marker, g = f && !f.enabled, h = f && f.states[a], i = h && h.enabled === !1, j = d.stateMarkerGraphic, k = this.marker || {}, m = d.chart, l = this.pointAttr, a = a || '';
      if (!(a === this.state || this.selected && a !== 'select' || e[a] && e[a].enabled === !1 || a && (i || g && !h.enabled))) {
        if (this.graphic)
          e = f && this.graphic.symbolName && l[a].r, this.graphic.attr(x(l[a], e ? {
            x: b - e,
            y: c - e,
            width: 2 * e,
            height: 2 * e
          } : {}));
        else {
          if (a && h)
            e = h.radius, k = k.symbol || d.symbol, j && j.currentSymbol !== k && (j = j.destroy()), j ? j.attr({
              x: b - e,
              y: c - e
            }) : (d.stateMarkerGraphic = j = m.renderer.symbol(k, b - e, c - e, 2 * e, 2 * e).attr(l[a]).add(d.markerGroup), j.currentSymbol = k);
          if (j)
            j[a && m.isInsidePlot(b, c) ? 'show' : 'hide']();
        }
        this.state = a;
      }
    }
  };
  var R = function () {
  };
  R.prototype = {
    isCartesian: !0,
    type: 'line',
    pointClass: Na,
    sorted: !0,
    requireSorting: !0,
    pointAttrToOptions: {
      stroke: 'lineColor',
      'stroke-width': 'lineWidth',
      fill: 'fillColor',
      r: 'radius'
    },
    colorCounter: 0,
    init: function (a, b) {
      var c, d, e = a.series;
      this.chart = a;
      this.options = b = this.setOptions(b);
      this.bindAxes();
      v(this, {
        name: b.name,
        state: '',
        pointAttr: {},
        visible: b.visible !== !1,
        selected: b.selected === !0
      });
      if ($)
        b.animation = !1;
      d = b.events;
      for (c in d)
        J(this, c, d[c]);
      if (d && d.click || b.point && b.point.events && b.point.events.click || b.allowPointSelect)
        a.runTrackerClick = !0;
      this.getColor();
      this.getSymbol();
      this.setData(b.data, !1);
      if (this.isCartesian)
        a.hasCartesianSeries = !0;
      e.push(this);
      this._i = e.length - 1;
      Ib(e, function (a, b) {
        return o(a.options.index, a._i) - o(b.options.index, a._i);
      });
      n(e, function (a, b) {
        a.index = b;
        a.name = a.name || 'Series ' + (b + 1);
      });
      c = b.linkedTo;
      this.linkedSeries = [];
      if (fa(c) && (c = c === ':previous' ? e[this.index - 1] : a.get(c)))
        c.linkedSeries.push(this), this.linkedParent = c;
    },
    bindAxes: function () {
      var a = this, b = a.options, c = a.chart, d;
      a.isCartesian && n([
        'xAxis',
        'yAxis'
      ], function (e) {
        n(c[e], function (c) {
          d = c.options;
          if (b[e] === d.index || b[e] !== y && b[e] === d.id || b[e] === y && d.index === 0)
            c.series.push(a), a[e] = c, c.isDirty = !0;
        });
        a[e] || qa(18, !0);
      });
    },
    autoIncrement: function () {
      var a = this.options, b = this.xIncrement, b = o(b, a.pointStart, 0);
      this.pointInterval = o(this.pointInterval, a.pointInterval, 1);
      this.xIncrement = b + this.pointInterval;
      return b;
    },
    getSegments: function () {
      var a = -1, b = [], c, d = this.points, e = d.length;
      if (e)
        if (this.options.connectNulls) {
          for (c = e; c--;)
            d[c].y === null && d.splice(c, 1);
          d.length && (b = [d]);
        } else
          n(d, function (c, g) {
            c.y === null ? (g > a + 1 && b.push(d.slice(a + 1, g)), a = g) : g === e - 1 && b.push(d.slice(a + 1, g + 1));
          });
      this.segments = b;
    },
    setOptions: function (a) {
      var b = this.chart.options, c = b.plotOptions, d = c[this.type];
      this.userOptions = a;
      a = x(d, c.series, a);
      this.tooltipOptions = x(b.tooltip, a.tooltip);
      d.marker === null && delete a.marker;
      return a;
    },
    getColor: function () {
      var a = this.options, b = this.userOptions, c = this.chart.options.colors, d = this.chart.counters, e;
      e = a.color || X[this.type].color;
      if (!e && !a.colorByPoint)
        r(b._colorIndex) ? a = b._colorIndex : (b._colorIndex = d.color, a = d.color++), e = c[a];
      this.color = e;
      d.wrapColor(c.length);
    },
    getSymbol: function () {
      var a = this.userOptions, b = this.options.marker, c = this.chart, d = c.options.symbols, c = c.counters;
      this.symbol = b.symbol;
      if (!this.symbol)
        r(a._symbolIndex) ? a = a._symbolIndex : (a._symbolIndex = c.symbol, a = c.symbol++), this.symbol = d[a];
      if (/^url/.test(this.symbol))
        b.radius = 0;
      c.wrapSymbol(d.length);
    },
    drawLegendSymbol: function (a) {
      var b = this.options, c = b.marker, d = a.options.symbolWidth, e = this.chart.renderer, f = this.legendGroup, a = a.baseline, g;
      if (b.lineWidth) {
        g = { 'stroke-width': b.lineWidth };
        if (b.dashStyle)
          g.dashstyle = b.dashStyle;
        this.legendLine = e.path([
          'M',
          0,
          a - 4,
          'L',
          d,
          a - 4
        ]).attr(g).add(f);
      }
      if (c && c.enabled)
        b = c.radius, this.legendSymbol = e.symbol(this.symbol, d / 2 - b, a - 4 - b, 2 * b, 2 * b).add(f);
    },
    addPoint: function (a, b, c, d) {
      var e = this.options, f = this.data, g = this.graph, h = this.area, i = this.chart, j = this.xData, k = this.yData, m = this.zData, l = this.names, p = g && g.shift || 0, n = e.data;
      Ia(d, i);
      if (g && c)
        g.shift = p + 1;
      if (h) {
        if (c)
          h.shift = p + 1;
        h.isArea = !0;
      }
      b = o(b, !0);
      d = { series: this };
      this.pointClass.prototype.applyOptions.apply(d, [a]);
      j.push(d.x);
      k.push(this.toYData ? this.toYData(d) : d.y);
      m.push(d.z);
      if (l)
        l[d.x] = d.name;
      n.push(a);
      e.legendType === 'point' && this.generatePoints();
      c && (f[0] && f[0].remove ? f[0].remove(!1) : (f.shift(), j.shift(), k.shift(), m.shift(), n.shift()));
      this.getAttribs();
      this.isDirtyData = this.isDirty = !0;
      b && i.redraw();
    },
    setData: function (a, b) {
      var c = this.points, d = this.options, e = this.chart, f = null, g = this.xAxis, h = g && g.categories && !g.categories.length ? [] : null, i;
      this.xIncrement = null;
      this.pointRange = g && g.categories ? 1 : d.pointRange;
      this.colorCounter = 0;
      var j = [], k = [], m = [], l = a ? a.length : [], p = (i = this.pointArrayMap) && i.length, n = !!this.toYData;
      if (l > (d.turboThreshold || 1000)) {
        for (i = 0; f === null && i < l;)
          f = a[i], i++;
        if (Ea(f)) {
          f = o(d.pointStart, 0);
          d = o(d.pointInterval, 1);
          for (i = 0; i < l; i++)
            j[i] = f, k[i] = a[i], f += d;
          this.xIncrement = f;
        } else if (Da(f))
          if (p)
            for (i = 0; i < l; i++)
              d = a[i], j[i] = d[0], k[i] = d.slice(1, p + 1);
          else
            for (i = 0; i < l; i++)
              d = a[i], j[i] = d[0], k[i] = d[1];
      } else
        for (i = 0; i < l; i++)
          if (a[i] !== y && (d = { series: this }, this.pointClass.prototype.applyOptions.apply(d, [a[i]]), j[i] = d.x, k[i] = n ? this.toYData(d) : d.y, m[i] = d.z, h && d.name))
            h[i] = d.name;
      this.requireSorting && j.length > 1 && j[1] < j[0] && qa(15);
      fa(k[0]) && qa(14, !0);
      this.data = [];
      this.options.data = a;
      this.xData = j;
      this.yData = k;
      this.zData = m;
      this.names = h;
      for (i = c && c.length || 0; i--;)
        c[i] && c[i].destroy && c[i].destroy();
      if (g)
        g.minRange = g.userMinRange;
      this.isDirty = this.isDirtyData = e.isDirtyBox = !0;
      o(b, !0) && e.redraw(!1);
    },
    remove: function (a, b) {
      var c = this, d = c.chart, a = o(a, !0);
      if (!c.isRemoving)
        c.isRemoving = !0, D(c, 'remove', null, function () {
          c.destroy();
          d.isDirtyLegend = d.isDirtyBox = !0;
          a && d.redraw(b);
        });
      c.isRemoving = !1;
    },
    processData: function (a) {
      var b = this.xData, c = this.yData, d = b.length, e = 0, f = d, g, h, i = this.xAxis, j = this.options, k = j.cropThreshold, m = this.isCartesian;
      if (m && !this.isDirty && !i.isDirty && !this.yAxis.isDirty && !a)
        return !1;
      if (m && this.sorted && (!k || d > k || this.forceCrop))
        if (a = i.getExtremes(), i = a.min, k = a.max, b[d - 1] < i || b[0] > k)
          b = [], c = [];
        else if (b[0] < i || b[d - 1] > k) {
          for (a = 0; a < d; a++)
            if (b[a] >= i) {
              e = q(0, a - 1);
              break;
            }
          for (; a < d; a++)
            if (b[a] > k) {
              f = a + 1;
              break;
            }
          b = b.slice(e, f);
          c = c.slice(e, f);
          g = !0;
        }
      for (a = b.length - 1; a > 0; a--)
        if (d = b[a] - b[a - 1], d > 0 && (h === y || d < h))
          h = d;
      this.cropped = g;
      this.cropStart = e;
      this.processedXData = b;
      this.processedYData = c;
      if (j.pointRange === null)
        this.pointRange = h || 1;
      this.closestPointRange = h;
    },
    generatePoints: function () {
      var a = this.options.data, b = this.data, c, d = this.processedXData, e = this.processedYData, f = this.pointClass, g = d.length, h = this.cropStart || 0, i, j = this.hasGroupedData, k, m = [], l;
      if (!b && !j)
        b = [], b.length = a.length, b = this.data = b;
      for (l = 0; l < g; l++)
        i = h + l, j ? m[l] = new f().init(this, [d[l]].concat(ha(e[l]))) : (b[i] ? k = b[i] : a[i] !== y && (b[i] = k = new f().init(this, a[i], d[l])), m[l] = k);
      if (b && (g !== (c = b.length) || j))
        for (l = 0; l < c; l++)
          if (l === h && !j && (l += g), b[l])
            b[l].destroyElements(), b[l].plotX = y;
      this.data = b;
      this.points = m;
    },
    translate: function () {
      this.processedXData || this.processData();
      this.generatePoints();
      var a = this.options, b = a.stacking, c = this.xAxis, d = c.categories, e = this.yAxis, f = this.points, g = f.length, h = !!this.modifyValue, i, j, k = a.pointPlacement === 'between', m = a.threshold;
      j = e.series.sort(function (a, b) {
        return a.index - b.index;
      });
      for (a = j.length; a--;)
        if (j[a].visible) {
          j[a] === this && (i = !0);
          break;
        }
      for (a = 0; a < g; a++) {
        j = f[a];
        var l = j.x, p = j.y, n = j.low, q = e.stacks[(p < m ? '-' : '') + this.stackKey];
        if (e.isLog && p <= 0)
          j.y = p = null;
        j.plotX = c.translate(l, 0, 0, 0, 1, k);
        if (b && this.visible && q && q[l])
          n = q[l], q = n.total, n.cum = n = n.cum - p, p = n + p, i && (n = o(m, e.min)), e.isLog && n <= 0 && (n = null), b === 'percent' && (n = q ? n * 100 / q : 0, p = q ? p * 100 / q : 0), j.percentage = q ? j.y * 100 / q : 0, j.total = j.stackTotal = q, j.stackY = p;
        j.yBottom = r(n) ? e.translate(n, 0, 1, 0, 1) : null;
        h && (p = this.modifyValue(p, j));
        j.plotY = typeof p === 'number' && p !== Infinity ? t(e.translate(p, 0, 1, 0, 1) * 10) / 10 : y;
        j.clientX = k ? c.translate(l, 0, 0, 0, 1) : j.plotX;
        j.negative = j.y < (m || 0);
        j.category = d && d[j.x] !== y ? d[j.x] : j.x;
      }
      this.getSegments();
    },
    setTooltipPoints: function (a) {
      var b = [], c, d, e = (c = this.xAxis) ? c.tooltipLen || c.len : this.chart.plotSizeX, f, g, h = [];
      if (this.options.enableMouseTracking !== !1) {
        if (a)
          this.tooltipPoints = null;
        n(this.segments || this.points, function (a) {
          b = b.concat(a);
        });
        c && c.reversed && (b = b.reverse());
        a = b.length;
        for (g = 0; g < a; g++) {
          f = b[g];
          c = b[g - 1] ? d + 1 : 0;
          for (d = b[g + 1] ? q(0, T((f.clientX + (b[g + 1] ? b[g + 1].clientX : e)) / 2)) : e; c >= 0 && c <= d;)
            h[c++] = f;
        }
        this.tooltipPoints = h;
      }
    },
    tooltipHeaderFormatter: function (a) {
      var b = this.tooltipOptions, c = b.xDateFormat, d = b.dateTimeLabelFormats, e = this.xAxis, f = e && e.options.type === 'datetime', b = b.headerFormat, e = e && e.closestPointRange, g;
      if (f && !c)
        if (e)
          for (g in E) {
            if (E[g] >= e) {
              c = d[g];
              break;
            }
          }
        else
          c = d.day;
      f && c && Ea(a.key) && (b = b.replace('{point.key}', '{point.key:' + c + '}'));
      return wa(b, {
        point: a,
        series: this
      });
    },
    onMouseOver: function () {
      var a = this.chart, b = a.hoverSeries;
      if (b && b !== this)
        b.onMouseOut();
      this.options.events.mouseOver && D(this, 'mouseOver');
      this.setState('hover');
      a.hoverSeries = this;
    },
    onMouseOut: function () {
      var a = this.options, b = this.chart, c = b.tooltip, d = b.hoverPoint;
      if (d)
        d.onMouseOut();
      this && a.events.mouseOut && D(this, 'mouseOut');
      c && !a.stickyTracking && (!c.shared || this.noSharedTooltip) && c.hide();
      this.setState();
      b.hoverSeries = null;
    },
    animate: function (a) {
      var b = this, c = b.chart, d = c.renderer, e;
      e = b.options.animation;
      var f = c.clipBox, g = c.inverted, h;
      if (e && !V(e))
        e = X[b.type].animation;
      h = '_sharedClip' + e.duration + e.easing;
      if (a)
        a = c[h], e = c[h + 'm'], a || (c[h] = a = d.clipRect(v(f, { width: 0 })), c[h + 'm'] = e = d.clipRect(-99, g ? -c.plotLeft : -c.plotTop, 99, g ? c.chartWidth : c.chartHeight)), b.group.clip(a), b.markerGroup.clip(e), b.sharedClipKey = h;
      else {
        if (a = c[h])
          a.animate({ width: c.plotSizeX }, e), c[h + 'm'].animate({ width: c.plotSizeX + 99 }, e);
        b.animate = null;
        b.animationTimeout = setTimeout(function () {
          b.afterAnimate();
        }, e.duration);
      }
    },
    afterAnimate: function () {
      var a = this.chart, b = this.sharedClipKey, c = this.group;
      c && this.options.clip !== !1 && (c.clip(a.clipRect), this.markerGroup.clip());
      setTimeout(function () {
        b && a[b] && (a[b] = a[b].destroy(), a[b + 'm'] = a[b + 'm'].destroy());
      }, 100);
    },
    drawPoints: function () {
      var a, b = this.points, c = this.chart, d, e, f, g, h, i, j, k, m = this.options.marker, l, n = this.markerGroup;
      if (m.enabled || this._hasPointMarkers)
        for (f = b.length; f--;)
          if (g = b[f], d = g.plotX, e = g.plotY, k = g.graphic, i = g.marker || {}, a = m.enabled && i.enabled === y || i.enabled, l = c.isInsidePlot(t(d), e, c.inverted), a && e !== y && !isNaN(e) && g.y !== null)
            if (a = g.pointAttr[g.selected ? 'select' : ''], h = a.r, i = o(i.symbol, this.symbol), j = i.indexOf('url') === 0, k)
              k.attr({ visibility: l ? Z ? 'inherit' : 'visible' : 'hidden' }).animate(v({
                x: d - h,
                y: e - h
              }, k.symbolName ? {
                width: 2 * h,
                height: 2 * h
              } : {}));
            else {
              if (l && (h > 0 || j))
                g.graphic = c.renderer.symbol(i, d - h, e - h, 2 * h, 2 * h).attr(a).add(n);
            }
          else if (k)
            g.graphic = k.destroy();
    },
    convertAttribs: function (a, b, c, d) {
      var e = this.pointAttrToOptions, f, g, h = {}, a = a || {}, b = b || {}, c = c || {}, d = d || {};
      for (f in e)
        g = e[f], h[f] = o(a[g], b[f], c[f], d[f]);
      return h;
    },
    getAttribs: function () {
      var a = this, b = a.options, c = X[a.type].marker ? b.marker : b, d = c.states, e = d.hover, f, g = a.color, h = {
          stroke: g,
          fill: g
        }, i = a.points || [], j = [], k, m = a.pointAttrToOptions, l = b.negativeColor, p;
      b.marker ? (e.radius = e.radius || c.radius + 2, e.lineWidth = e.lineWidth || c.lineWidth + 1) : e.color = e.color || ma(e.color || g).brighten(e.brightness).get();
      j[''] = a.convertAttribs(c, h);
      n([
        'hover',
        'select'
      ], function (b) {
        j[b] = a.convertAttribs(d[b], j['']);
      });
      a.pointAttr = j;
      for (g = i.length; g--;) {
        h = i[g];
        if ((c = h.options && h.options.marker || h.options) && c.enabled === !1)
          c.radius = 0;
        if (h.negative && l)
          h.color = h.fillColor = l;
        f = b.colorByPoint || h.color;
        if (h.options)
          for (p in m)
            r(c[m[p]]) && (f = !0);
        if (f) {
          c = c || {};
          k = [];
          d = c.states || {};
          f = d.hover = d.hover || {};
          if (!b.marker)
            f.color = ma(f.color || h.color).brighten(f.brightness || e.brightness).get();
          k[''] = a.convertAttribs(v({ color: h.color }, c), j['']);
          k.hover = a.convertAttribs(d.hover, j.hover, k['']);
          k.select = a.convertAttribs(d.select, j.select, k['']);
          if (h.negative && b.marker && l)
            k[''].fill = k.hover.fill = k.select.fill = a.convertAttribs({ fillColor: l }).fill;
        } else
          k = j;
        h.pointAttr = k;
      }
    },
    update: function (a, b) {
      var c = this.chart, d = this.type, a = x(this.userOptions, {
          animation: !1,
          index: this.index,
          pointStart: this.xData[0]
        }, a);
      this.remove(!1);
      v(this, aa[a.type || d].prototype);
      this.init(c, a);
      o(b, !0) && c.redraw(!1);
    },
    destroy: function () {
      var a = this, b = a.chart, c = /AppleWebKit\/533/.test(Aa), d, e, f = a.data || [], g, h, i;
      D(a, 'destroy');
      ba(a);
      n([
        'xAxis',
        'yAxis'
      ], function (b) {
        if (i = a[b])
          ga(i.series, a), i.isDirty = i.forceRedraw = !0;
      });
      a.legendItem && a.chart.legend.destroyItem(a);
      for (e = f.length; e--;)
        (g = f[e]) && g.destroy && g.destroy();
      a.points = null;
      clearTimeout(a.animationTimeout);
      n('area,graph,dataLabelsGroup,group,markerGroup,tracker,graphNeg,areaNeg,posClip,negClip'.split(','), function (b) {
        a[b] && (d = c && b === 'group' ? 'hide' : 'destroy', a[b][d]());
      });
      if (b.hoverSeries === a)
        b.hoverSeries = null;
      ga(b.series, a);
      for (h in a)
        delete a[h];
    },
    drawDataLabels: function () {
      var a = this, b = a.options.dataLabels, c = a.points, d, e, f, g;
      if (b.enabled || a._hasPointLabels)
        a.dlProcessOptions && a.dlProcessOptions(b), g = a.plotGroup('dataLabelsGroup', 'data-labels', a.visible ? 'visible' : 'hidden', b.zIndex || 6), e = b, n(c, function (c) {
          var i, j = c.dataLabel, k, m, l = c.connector, n = !0;
          d = c.options && c.options.dataLabels;
          i = e.enabled || d && d.enabled;
          if (j && !i)
            c.dataLabel = j.destroy();
          else if (i) {
            i = b.rotation;
            b = x(e, d);
            k = c.getLabelConfig();
            f = b.format ? wa(b.format, k) : b.formatter.call(k, b);
            b.style.color = o(b.color, b.style.color, a.color, 'black');
            if (j)
              if (r(f))
                j.attr({ text: f }), n = !1;
              else {
                if (c.dataLabel = j = j.destroy(), l)
                  c.connector = l.destroy();
              }
            else if (r(f)) {
              j = {
                fill: b.backgroundColor,
                stroke: b.borderColor,
                'stroke-width': b.borderWidth,
                r: b.borderRadius || 0,
                rotation: i,
                padding: b.padding,
                zIndex: 1
              };
              for (m in j)
                j[m] === y && delete j[m];
              j = c.dataLabel = a.chart.renderer[i ? 'text' : 'label'](f, 0, -999, null, null, null, b.useHTML).attr(j).css(b.style).add(g).shadow(b.shadow);
            }
            j && a.alignDataLabel(c, j, b, null, n);
          }
        });
    },
    alignDataLabel: function (a, b, c, d, e) {
      var f = this.chart, g = f.inverted, h = o(a.plotX, -999), a = o(a.plotY, -999), i = b.getBBox(), d = v({
          x: g ? f.plotWidth - a : h,
          y: t(g ? f.plotHeight - h : a),
          width: 0,
          height: 0
        }, d);
      v(c, {
        width: i.width,
        height: i.height
      });
      c.rotation ? (d = {
        align: c.align,
        x: d.x + c.x + d.width / 2,
        y: d.y + c.y + d.height / 2
      }, b[e ? 'attr' : 'animate'](d)) : b.align(c, null, d);
      b.attr({ visibility: c.crop === !1 || f.isInsidePlot(h, a, g) ? f.renderer.isSVG ? 'inherit' : 'visible' : 'hidden' });
    },
    getSegmentPath: function (a) {
      var b = this, c = [], d = b.options.step;
      n(a, function (e, f) {
        var g = e.plotX, h = e.plotY, i;
        b.getPointSpline ? c.push.apply(c, b.getPointSpline(a, e, f)) : (c.push(f ? 'L' : 'M'), d && f && (i = a[f - 1], d === 'right' ? c.push(i.plotX, h) : d === 'center' ? c.push((i.plotX + g) / 2, i.plotY, (i.plotX + g) / 2, h) : c.push(g, i.plotY)), c.push(e.plotX, e.plotY));
      });
      return c;
    },
    getGraphPath: function () {
      var a = this, b = [], c, d = [];
      n(a.segments, function (e) {
        c = a.getSegmentPath(e);
        e.length > 1 ? b = b.concat(c) : d.push(e[0]);
      });
      a.singlePoints = d;
      return a.graphPath = b;
    },
    drawGraph: function () {
      var a = this, b = this.options, c = [[
            'graph',
            b.lineColor || this.color
          ]], d = b.lineWidth, e = b.dashStyle, f = this.getGraphPath(), g = b.negativeColor;
      g && c.push([
        'graphNeg',
        g
      ]);
      n(c, function (c, g) {
        var j = c[0], k = a[j];
        if (k)
          Ta(k), k.animate({ d: f });
        else if (d && f.length) {
          k = {
            stroke: c[1],
            'stroke-width': d,
            zIndex: 1
          };
          if (e)
            k.dashstyle = e;
          a[j] = a.chart.renderer.path(f).attr(k).add(a.group).shadow(!g && b.shadow);
        }
      });
    },
    clipNeg: function () {
      var a = this.options, b = this.chart, c = b.renderer, d = a.negativeColor, e, f = this.graph, g = this.area, h = this.posClip, i = this.negClip;
      e = b.chartWidth;
      var j = b.chartHeight, k = q(e, j);
      if (d && (f || g))
        d = ja(this.yAxis.len - this.yAxis.translate(a.threshold || 0)), a = {
          x: 0,
          y: 0,
          width: k,
          height: d
        }, k = {
          x: 0,
          y: d,
          width: k,
          height: k - d
        }, b.inverted && c.isVML && (a = {
          x: b.plotWidth - d - b.plotLeft,
          y: 0,
          width: e,
          height: j
        }, k = {
          x: d + b.plotLeft - e,
          y: 0,
          width: b.plotLeft + d,
          height: e
        }), this.yAxis.reversed ? (b = k, e = a) : (b = a, e = k), h ? (h.animate(b), i.animate(e)) : (this.posClip = h = c.clipRect(b), this.negClip = i = c.clipRect(e), f && (f.clip(h), this.graphNeg.clip(i)), g && (g.clip(h), this.areaNeg.clip(i)));
    },
    invertGroups: function () {
      function a() {
        var a = {
            width: b.yAxis.len,
            height: b.xAxis.len
          };
        n([
          'group',
          'markerGroup'
        ], function (c) {
          b[c] && b[c].attr(a).invert();
        });
      }
      var b = this, c = b.chart;
      if (b.xAxis)
        J(c, 'resize', a), J(b, 'destroy', function () {
          ba(c, 'resize', a);
        }), a(), b.invertGroups = a;
    },
    plotGroup: function (a, b, c, d, e) {
      var f = this[a], g = !f, h = this.chart, i = this.xAxis, j = this.yAxis;
      g && (this[a] = f = h.renderer.g(b).attr({
        visibility: c,
        zIndex: d || 0.1
      }).add(e));
      f[g ? 'attr' : 'animate']({
        translateX: i ? i.left : h.plotLeft,
        translateY: j ? j.top : h.plotTop,
        scaleX: 1,
        scaleY: 1
      });
      return f;
    },
    render: function () {
      var a = this.chart, b, c = this.options, d = c.animation && !!this.animate && a.renderer.isSVG, e = this.visible ? 'visible' : 'hidden', f = c.zIndex, g = this.hasRendered, h = a.seriesGroup;
      b = this.plotGroup('group', 'series', e, f, h);
      this.markerGroup = this.plotGroup('markerGroup', 'markers', e, f, h);
      d && this.animate(!0);
      this.getAttribs();
      b.inverted = this.isCartesian ? a.inverted : !1;
      this.drawGraph && (this.drawGraph(), this.clipNeg());
      this.drawDataLabels();
      this.drawPoints();
      this.options.enableMouseTracking !== !1 && this.drawTracker();
      a.inverted && this.invertGroups();
      c.clip !== !1 && !this.sharedClipKey && !g && b.clip(a.clipRect);
      d ? this.animate() : g || this.afterAnimate();
      this.isDirty = this.isDirtyData = !1;
      this.hasRendered = !0;
    },
    redraw: function () {
      var a = this.chart, b = this.isDirtyData, c = this.group, d = this.xAxis, e = this.yAxis;
      c && (a.inverted && c.attr({
        width: a.plotWidth,
        height: a.plotHeight
      }), c.animate({
        translateX: o(d && d.left, a.plotLeft),
        translateY: o(e && e.top, a.plotTop)
      }));
      this.translate();
      this.setTooltipPoints(!0);
      this.render();
      b && D(this, 'updatedData');
    },
    setState: function (a) {
      var b = this.options, c = this.graph, d = this.graphNeg, e = b.states, b = b.lineWidth, a = a || '';
      if (this.state !== a)
        this.state = a, e[a] && e[a].enabled === !1 || (a && (b = e[a].lineWidth || b + 1), c && !c.dashstyle && (a = { 'stroke-width': b }, c.attr(a), d && d.attr(a)));
    },
    setVisible: function (a, b) {
      var c = this, d = c.chart, e = c.legendItem, f, g = d.options.chart.ignoreHiddenSeries, h = c.visible;
      f = (c.visible = a = c.userOptions.visible = a === y ? !h : a) ? 'show' : 'hide';
      n([
        'group',
        'dataLabelsGroup',
        'markerGroup',
        'tracker'
      ], function (a) {
        if (c[a])
          c[a][f]();
      });
      if (d.hoverSeries === c)
        c.onMouseOut();
      e && d.legend.colorizeItem(c, a);
      c.isDirty = !0;
      c.options.stacking && n(d.series, function (a) {
        if (a.options.stacking && a.visible)
          a.isDirty = !0;
      });
      n(c.linkedSeries, function (b) {
        b.setVisible(a, !1);
      });
      if (g)
        d.isDirtyBox = !0;
      b !== !1 && d.redraw();
      D(c, f);
    },
    show: function () {
      this.setVisible(!0);
    },
    hide: function () {
      this.setVisible(!1);
    },
    select: function (a) {
      this.selected = a = a === y ? !this.selected : a;
      if (this.checkbox)
        this.checkbox.checked = a;
      D(this, a ? 'select' : 'unselect');
    },
    drawTracker: function () {
      var a = this, b = a.options, c = b.trackByArea, d = [].concat(c ? a.areaPath : a.graphPath), e = d.length, f = a.chart, g = f.pointer, h = f.renderer, i = f.options.tooltip.snap, j = a.tracker, k = b.cursor, k = k && { cursor: k }, m = a.singlePoints, l, n = function () {
          if (f.hoverSeries !== a)
            a.onMouseOver();
        };
      if (e && !c)
        for (l = e + 1; l--;)
          d[l] === 'M' && d.splice(l + 1, 0, d[l + 1] - i, d[l + 2], 'L'), (l && d[l] === 'M' || l === e) && d.splice(l, 0, 'L', d[l - 2] + i, d[l - 1]);
      for (l = 0; l < m.length; l++)
        e = m[l], d.push('M', e.plotX - i, e.plotY, 'L', e.plotX + i, e.plotY);
      if (j)
        j.attr({ d: d });
      else if (a.tracker = j = h.path(d).attr({
          'class': 'highcharts-tracker',
          'stroke-linejoin': 'round',
          visibility: a.visible ? 'visible' : 'hidden',
          stroke: Ob,
          fill: c ? Ob : S,
          'stroke-width': b.lineWidth + (c ? 0 : 2 * i),
          zIndex: 2
        }).addClass('highcharts-tracker').on('mouseover', n).on('mouseout', function (a) {
          g.onTrackerMouseOut(a);
        }).css(k).add(a.markerGroup), fb)
        j.on('touchstart', n);
    }
  };
  M = ea(R);
  aa.line = M;
  X.area = x(W, { threshold: 0 });
  M = ea(R, {
    type: 'area',
    getSegments: function () {
      var a = [], b = [], c = [], d = this.xAxis, e = this.yAxis, f = e.stacks[this.stackKey], g = {}, h, i, j = this.points, k, m;
      if (this.options.stacking && !this.cropped) {
        for (k = 0; k < j.length; k++)
          g[j[k].x] = j[k];
        for (m in f)
          c.push(+m);
        c.sort(function (a, b) {
          return a - b;
        });
        n(c, function (a) {
          g[a] ? b.push(g[a]) : (h = d.translate(a), i = e.toPixels(f[a].cum, !0), b.push({
            y: null,
            plotX: h,
            clientX: h,
            plotY: i,
            yBottom: i,
            onMouseOver: ta
          }));
        });
        b.length && a.push(b);
      } else
        R.prototype.getSegments.call(this), a = this.segments;
      this.segments = a;
    },
    getSegmentPath: function (a) {
      var b = R.prototype.getSegmentPath.call(this, a), c = [].concat(b), d, e = this.options;
      b.length === 3 && c.push('L', b[1], b[2]);
      if (e.stacking && !this.closedStacks)
        for (d = a.length - 1; d >= 0; d--)
          d < a.length - 1 && e.step && c.push(a[d + 1].plotX, a[d].yBottom), c.push(a[d].plotX, a[d].yBottom);
      else
        this.closeSegment(c, a);
      this.areaPath = this.areaPath.concat(c);
      return b;
    },
    closeSegment: function (a, b) {
      var c = this.yAxis.getThreshold(this.options.threshold);
      a.push('L', b[b.length - 1].plotX, c, 'L', b[0].plotX, c);
    },
    drawGraph: function () {
      this.areaPath = [];
      R.prototype.drawGraph.apply(this);
      var a = this, b = this.areaPath, c = this.options, d = [[
            'area',
            this.color,
            c.fillColor
          ]];
      c.negativeColor && d.push([
        'areaNeg',
        c.negativeColor,
        c.negativeFillColor
      ]);
      n(d, function (d) {
        var f = d[0], g = a[f];
        g ? g.animate({ d: b }) : a[f] = a.chart.renderer.path(b).attr({
          fill: o(d[2], ma(d[1]).setOpacity(c.fillOpacity || 0.75).get()),
          zIndex: 0
        }).add(a.group);
      });
    },
    drawLegendSymbol: function (a, b) {
      b.legendSymbol = this.chart.renderer.rect(0, a.baseline - 11, a.options.symbolWidth, 12, 2).attr({ zIndex: 3 }).add(b.legendGroup);
    }
  });
  aa.area = M;
  X.spline = x(W);
  F = ea(R, {
    type: 'spline',
    getPointSpline: function (a, b, c) {
      var d = b.plotX, e = b.plotY, f = a[c - 1], g = a[c + 1], h, i, j, k;
      if (f && g) {
        a = f.plotY;
        j = g.plotX;
        var g = g.plotY, m;
        h = (1.5 * d + f.plotX) / 2.5;
        i = (1.5 * e + a) / 2.5;
        j = (1.5 * d + j) / 2.5;
        k = (1.5 * e + g) / 2.5;
        m = (k - i) * (j - d) / (j - h) + e - k;
        i += m;
        k += m;
        i > a && i > e ? (i = q(a, e), k = 2 * e - i) : i < a && i < e && (i = K(a, e), k = 2 * e - i);
        k > g && k > e ? (k = q(g, e), i = 2 * e - k) : k < g && k < e && (k = K(g, e), i = 2 * e - k);
        b.rightContX = j;
        b.rightContY = k;
      }
      c ? (b = [
        'C',
        f.rightContX || f.plotX,
        f.rightContY || f.plotY,
        h || d,
        i || e,
        d,
        e
      ], f.rightContX = f.rightContY = null) : b = [
        'M',
        d,
        e
      ];
      return b;
    }
  });
  aa.spline = F;
  X.areaspline = x(X.area);
  na = M.prototype;
  F = ea(F, {
    type: 'areaspline',
    closedStacks: !0,
    getSegmentPath: na.getSegmentPath,
    closeSegment: na.closeSegment,
    drawGraph: na.drawGraph
  });
  aa.areaspline = F;
  X.column = x(W, {
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 0,
    groupPadding: 0.2,
    marker: null,
    pointPadding: 0.1,
    minPointLength: 0,
    cropThreshold: 50,
    pointRange: null,
    states: {
      hover: {
        brightness: 0.1,
        shadow: !1
      },
      select: {
        color: '#C0C0C0',
        borderColor: '#000000',
        shadow: !1
      }
    },
    dataLabels: {
      align: null,
      verticalAlign: null,
      y: null
    },
    stickyTracking: !1,
    threshold: 0
  });
  F = ea(R, {
    type: 'column',
    tooltipOutsidePlot: !0,
    requireSorting: !1,
    pointAttrToOptions: {
      stroke: 'borderColor',
      'stroke-width': 'borderWidth',
      fill: 'color',
      r: 'borderRadius'
    },
    trackerGroups: [
      'group',
      'dataLabelsGroup'
    ],
    init: function () {
      R.prototype.init.apply(this, arguments);
      var a = this, b = a.chart;
      b.hasRendered && n(b.series, function (b) {
        if (b.type === a.type)
          b.isDirty = !0;
      });
    },
    getColumnMetrics: function () {
      var a = this, b = a.chart, c = a.options, d = this.xAxis, e = d.reversed, f, g = {}, h, i = 0;
      c.grouping === !1 ? i = 1 : n(b.series, function (b) {
        var c = b.options;
        if (b.type === a.type && b.visible && a.options.group === c.group)
          c.stacking ? (f = b.stackKey, g[f] === y && (g[f] = i++), h = g[f]) : c.grouping !== !1 && (h = i++), b.columnIndex = h;
      });
      var b = K(Q(d.transA) * (d.ordinalSlope || c.pointRange || d.closestPointRange || 1), d.len), d = b * c.groupPadding, j = (b - 2 * d) / i, k = c.pointWidth, c = r(k) ? (j - k) / 2 : j * c.pointPadding, k = o(k, j - 2 * c);
      return a.columnMetrics = {
        width: k,
        offset: c + (d + ((e ? i - (a.columnIndex || 0) : a.columnIndex) || 0) * j - b / 2) * (e ? -1 : 1)
      };
    },
    translate: function () {
      var a = this, b = a.chart, c = a.options, d = c.stacking, e = c.borderWidth, f = a.yAxis, g = a.translatedThreshold = f.getThreshold(c.threshold), h = o(c.minPointLength, 5), c = a.getColumnMetrics(), i = c.width, j = ja(q(i, 1 + 2 * e)), k = c.offset;
      R.prototype.translate.apply(a);
      n(a.points, function (c) {
        var l = K(q(-999, c.plotY), f.len + 999), n = o(c.yBottom, g), s = c.plotX + k, t = ja(K(l, n)), l = ja(q(l, n) - t), r = f.stacks[(c.y < 0 ? '-' : '') + a.stackKey];
        d && a.visible && r && r[c.x] && r[c.x].setOffset(k, j);
        Q(l) < h && h && (l = h, t = Q(t - g) > h ? n - h : g - (f.translate(c.y, 0, 1, 0, 1) <= g ? h : 0));
        c.barX = s;
        c.pointWidth = i;
        c.shapeType = 'rect';
        c.shapeArgs = c = b.renderer.Element.prototype.crisp.call(0, e, s, t, j, l);
        e % 2 && (c.y -= 1, c.height += 1);
      });
    },
    getSymbol: ta,
    drawLegendSymbol: M.prototype.drawLegendSymbol,
    drawGraph: ta,
    drawPoints: function () {
      var a = this, b = a.options, c = a.chart.renderer, d;
      n(a.points, function (e) {
        var f = e.plotY, g = e.graphic;
        if (f !== y && !isNaN(f) && e.y !== null)
          d = e.shapeArgs, g ? (Ta(g), g.animate(x(d))) : e.graphic = c[e.shapeType](d).attr(e.pointAttr[e.selected ? 'select' : '']).add(a.group).shadow(b.shadow, null, b.stacking && !b.borderRadius);
        else if (g)
          e.graphic = g.destroy();
      });
    },
    drawTracker: function () {
      var a = this, b = a.chart.pointer, c = a.options.cursor, d = c && { cursor: c }, e = function (b) {
          var c = b.target, d;
          for (a.onMouseOver(); c && !d;)
            d = c.point, c = c.parentNode;
          if (d !== y)
            d.onMouseOver(b);
        };
      n(a.points, function (a) {
        if (a.graphic)
          a.graphic.element.point = a;
        if (a.dataLabel)
          a.dataLabel.element.point = a;
      });
      a._hasTracking ? a._hasTracking = !0 : n(a.trackerGroups, function (c) {
        if (a[c] && (a[c].addClass('highcharts-tracker').on('mouseover', e).on('mouseout', function (a) {
            b.onTrackerMouseOut(a);
          }).css(d), fb))
          a[c].on('touchstart', e);
      });
    },
    alignDataLabel: function (a, b, c, d, e) {
      var f = this.chart, g = f.inverted, h = a.dlBox || a.shapeArgs, i = a.below || a.plotY > o(this.translatedThreshold, f.plotSizeY), j = o(c.inside, !!this.options.stacking);
      if (h && (d = x(h), g && (d = {
          x: f.plotWidth - d.y - d.height,
          y: f.plotHeight - d.x - d.width,
          width: d.height,
          height: d.width
        }), !j))
        g ? (d.x += i ? 0 : d.width, d.width = 0) : (d.y += i ? d.height : 0, d.height = 0);
      c.align = o(c.align, !g || j ? 'center' : i ? 'right' : 'left');
      c.verticalAlign = o(c.verticalAlign, g || j ? 'middle' : i ? 'top' : 'bottom');
      R.prototype.alignDataLabel.call(this, a, b, c, d, e);
    },
    animate: function (a) {
      var b = this.yAxis, c = this.options, d = this.chart.inverted, e = {};
      if (Z)
        a ? (e.scaleY = 0.001, a = K(b.pos + b.len, q(b.pos, b.toPixels(c.threshold))), d ? e.translateX = a - b.len : e.translateY = a, this.group.attr(e)) : (e.scaleY = 1, e[d ? 'translateX' : 'translateY'] = b.pos, this.group.animate(e, this.options.animation), this.animate = null);
    },
    remove: function () {
      var a = this, b = a.chart;
      b.hasRendered && n(b.series, function (b) {
        if (b.type === a.type)
          b.isDirty = !0;
      });
      R.prototype.remove.apply(a, arguments);
    }
  });
  aa.column = F;
  X.bar = x(X.column);
  na = ea(F, {
    type: 'bar',
    inverted: !0
  });
  aa.bar = na;
  X.scatter = x(W, {
    lineWidth: 0,
    tooltip: {
      headerFormat: '<span style="font-size: 10px; color:{series.color}">{series.name}</span><br/>',
      pointFormat: 'x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>',
      followPointer: !0
    },
    stickyTracking: !1
  });
  na = ea(R, {
    type: 'scatter',
    sorted: !1,
    requireSorting: !1,
    noSharedTooltip: !0,
    trackerGroups: ['markerGroup'],
    drawTracker: F.prototype.drawTracker,
    setTooltipPoints: ta
  });
  aa.scatter = na;
  X.pie = x(W, {
    borderColor: '#FFFFFF',
    borderWidth: 1,
    center: [
      null,
      null
    ],
    clip: !1,
    colorByPoint: !0,
    dataLabels: {
      distance: 30,
      enabled: !0,
      formatter: function () {
        return this.point.name;
      }
    },
    ignoreHiddenPoint: !0,
    legendType: 'point',
    marker: null,
    size: null,
    showInLegend: !1,
    slicedOffset: 10,
    states: {
      hover: {
        brightness: 0.1,
        shadow: !1
      }
    },
    stickyTracking: !1,
    tooltip: { followPointer: !0 }
  });
  W = {
    type: 'pie',
    isCartesian: !1,
    pointClass: ea(Na, {
      init: function () {
        Na.prototype.init.apply(this, arguments);
        var a = this, b;
        if (a.y < 0)
          a.y = null;
        v(a, {
          visible: a.visible !== !1,
          name: o(a.name, 'Slice')
        });
        b = function () {
          a.slice();
        };
        J(a, 'select', b);
        J(a, 'unselect', b);
        return a;
      },
      setVisible: function (a) {
        var b = this, c = b.series, d = c.chart, e;
        b.visible = b.options.visible = a = a === y ? !b.visible : a;
        c.options.data[la(b, c.data)] = b.options;
        e = a ? 'show' : 'hide';
        n([
          'graphic',
          'dataLabel',
          'connector',
          'shadowGroup'
        ], function (a) {
          if (b[a])
            b[a][e]();
        });
        b.legendItem && d.legend.colorizeItem(b, a);
        if (!c.isDirty && c.options.ignoreHiddenPoint)
          c.isDirty = !0, d.redraw();
      },
      slice: function (a, b, c) {
        var d = this.series;
        Ia(c, d.chart);
        o(b, !0);
        this.sliced = this.options.sliced = a = r(a) ? a : !this.sliced;
        d.options.data[la(this, d.data)] = this.options;
        a = a ? this.slicedTranslation : {
          translateX: 0,
          translateY: 0
        };
        this.graphic.animate(a);
        this.shadowGroup && this.shadowGroup.animate(a);
      }
    }),
    requireSorting: !1,
    noSharedTooltip: !0,
    trackerGroups: [
      'group',
      'dataLabelsGroup'
    ],
    pointAttrToOptions: {
      stroke: 'borderColor',
      'stroke-width': 'borderWidth',
      fill: 'color'
    },
    getColor: ta,
    animate: function (a) {
      var b = this, c = b.points, d = b.startAngleRad;
      if (!a)
        n(c, function (a) {
          var c = a.graphic, a = a.shapeArgs;
          c && (c.attr({
            r: b.center[3] / 2,
            start: d,
            end: d
          }), c.animate({
            r: a.r,
            start: a.start,
            end: a.end
          }, b.options.animation));
        }), b.animate = null;
    },
    setData: function (a, b) {
      R.prototype.setData.call(this, a, !1);
      this.processData();
      this.generatePoints();
      o(b, !0) && this.chart.redraw();
    },
    getCenter: function () {
      var a = this.options, b = this.chart, c = 2 * (a.slicedOffset || 0), d, e = b.plotWidth - 2 * c, f = b.plotHeight - 2 * c, b = a.center, a = [
          o(b[0], '50%'),
          o(b[1], '50%'),
          a.size || '100%',
          a.innerSize || 0
        ], g = K(e, f), h;
      return La(a, function (a, b) {
        h = /%$/.test(a);
        d = b < 2 || b === 2 && h;
        return (h ? [
          e,
          f,
          g,
          g
        ][b] * u(a) / 100 : a) + (d ? c : 0);
      });
    },
    translate: function (a) {
      this.generatePoints();
      var b = 0, c = 0, d = this.options, e = d.slicedOffset, f = e + d.borderWidth, g, h, i, j = this.startAngleRad = Ka / 180 * ((d.startAngle || 0) % 360 - 90), k = this.points, m = 2 * Ka, l = d.dataLabels.distance, n = d.ignoreHiddenPoint, o, q = k.length, r;
      if (!a)
        this.center = a = this.getCenter();
      this.getX = function (b, c) {
        i = I.asin((b - a[1]) / (a[2] / 2 + l));
        return a[0] + (c ? -1 : 1) * Y(i) * (a[2] / 2 + l);
      };
      for (o = 0; o < q; o++)
        r = k[o], b += n && !r.visible ? 0 : r.y;
      for (o = 0; o < q; o++) {
        r = k[o];
        d = b ? r.y / b : 0;
        g = t((j + c * m) * 1000) / 1000;
        if (!n || r.visible)
          c += d;
        h = t((j + c * m) * 1000) / 1000;
        r.shapeType = 'arc';
        r.shapeArgs = {
          x: a[0],
          y: a[1],
          r: a[2] / 2,
          innerR: a[3] / 2,
          start: g,
          end: h
        };
        i = (h + g) / 2;
        i > 0.75 * m && (i -= 2 * Ka);
        r.slicedTranslation = {
          translateX: t(Y(i) * e),
          translateY: t(ca(i) * e)
        };
        g = Y(i) * a[2] / 2;
        h = ca(i) * a[2] / 2;
        r.tooltipPos = [
          a[0] + g * 0.7,
          a[1] + h * 0.7
        ];
        r.half = i < m / 4 ? 0 : 1;
        r.angle = i;
        f = K(f, l / 2);
        r.labelPos = [
          a[0] + g + Y(i) * l,
          a[1] + h + ca(i) * l,
          a[0] + g + Y(i) * f,
          a[1] + h + ca(i) * f,
          a[0] + g,
          a[1] + h,
          l < 0 ? 'center' : r.half ? 'right' : 'left',
          i
        ];
        r.percentage = d * 100;
        r.total = b;
      }
      this.setTooltipPoints();
    },
    drawGraph: null,
    drawPoints: function () {
      var a = this, b = a.chart.renderer, c, d, e = a.options.shadow, f, g;
      if (e && !a.shadowGroup)
        a.shadowGroup = b.g('shadow').add(a.group);
      n(a.points, function (h) {
        d = h.graphic;
        g = h.shapeArgs;
        f = h.shadowGroup;
        if (e && !f)
          f = h.shadowGroup = b.g('shadow').add(a.shadowGroup);
        c = h.sliced ? h.slicedTranslation : {
          translateX: 0,
          translateY: 0
        };
        f && f.attr(c);
        d ? d.animate(v(g, c)) : h.graphic = d = b.arc(g).setRadialReference(a.center).attr(h.pointAttr[h.selected ? 'select' : '']).attr({ 'stroke-linejoin': 'round' }).attr(c).add(a.group).shadow(e, f);
        h.visible === !1 && h.setVisible(!1);
      });
    },
    drawDataLabels: function () {
      var a = this, b = a.data, c, d = a.chart, e = a.options.dataLabels, f = o(e.connectorPadding, 10), g = o(e.connectorWidth, 1), h = d.plotWidth, d = d.plotHeight, i, j, k = o(e.softConnector, !0), m = e.distance, l = a.center, p = l[2] / 2, s = l[1], r = m > 0, v, w, u, x, y = [
          [],
          []
        ], A, z, E, H, C, D = [
          0,
          0,
          0,
          0
        ], K = function (a, b) {
          return b.y - a.y;
        }, M = function (a, b) {
          a.sort(function (a, c) {
            return a.angle !== void 0 && (c.angle - a.angle) * b;
          });
        };
      if (e.enabled || a._hasPointLabels) {
        R.prototype.drawDataLabels.apply(a);
        n(b, function (a) {
          a.dataLabel && y[a.half].push(a);
        });
        for (H = 0; !x && b[H];)
          x = b[H] && b[H].dataLabel && (b[H].dataLabel.getBBox().height || 21), H++;
        for (H = 2; H--;) {
          var b = [], L = [], I = y[H], J = I.length, F;
          M(I, H - 0.5);
          if (m > 0) {
            for (C = s - p - m; C <= s + p + m; C += x)
              b.push(C);
            w = b.length;
            if (J > w) {
              c = [].concat(I);
              c.sort(K);
              for (C = J; C--;)
                c[C].rank = C;
              for (C = J; C--;)
                I[C].rank >= w && I.splice(C, 1);
              J = I.length;
            }
            for (C = 0; C < J; C++) {
              c = I[C];
              u = c.labelPos;
              c = 9999;
              var O, N;
              for (N = 0; N < w; N++)
                O = Q(b[N] - u[1]), O < c && (c = O, F = N);
              if (F < C && b[C] !== null)
                F = C;
              else
                for (w < J - C + F && b[C] !== null && (F = w - J + C); b[F] === null;)
                  F++;
              L.push({
                i: F,
                y: b[F]
              });
              b[F] = null;
            }
            L.sort(K);
          }
          for (C = 0; C < J; C++) {
            c = I[C];
            u = c.labelPos;
            v = c.dataLabel;
            E = c.visible === !1 ? 'hidden' : 'visible';
            c = u[1];
            if (m > 0) {
              if (w = L.pop(), F = w.i, z = w.y, c > z && b[F + 1] !== null || c < z && b[F - 1] !== null)
                z = c;
            } else
              z = c;
            A = e.justify ? l[0] + (H ? -1 : 1) * (p + m) : a.getX(F === 0 || F === b.length - 1 ? c : z, H);
            v._attr = {
              visibility: E,
              align: u[6]
            };
            v._pos = {
              x: A + e.x + ({
                left: f,
                right: -f
              }[u[6]] || 0),
              y: z + e.y - 10
            };
            v.connX = A;
            v.connY = z;
            if (this.options.size === null)
              w = v.width, A - w < f ? D[3] = q(t(w - A + f), D[3]) : A + w > h - f && (D[1] = q(t(A + w - h + f), D[1])), z - x / 2 < 0 ? D[0] = q(t(-z + x / 2), D[0]) : z + x / 2 > d && (D[2] = q(t(z + x / 2 - d), D[2]));
          }
        }
        if (pa(D) === 0 || this.verifyDataLabelOverflow(D))
          this.placeDataLabels(), r && g && n(this.points, function (b) {
            i = b.connector;
            u = b.labelPos;
            if ((v = b.dataLabel) && v._pos)
              E = v._attr.visibility, A = v.connX, z = v.connY, j = k ? [
                'M',
                A + (u[6] === 'left' ? 5 : -5),
                z,
                'C',
                A,
                z,
                2 * u[2] - u[4],
                2 * u[3] - u[5],
                u[2],
                u[3],
                'L',
                u[4],
                u[5]
              ] : [
                'M',
                A + (u[6] === 'left' ? 5 : -5),
                z,
                'L',
                u[2],
                u[3],
                'L',
                u[4],
                u[5]
              ], i ? (i.animate({ d: j }), i.attr('visibility', E)) : b.connector = i = a.chart.renderer.path(j).attr({
                'stroke-width': g,
                stroke: e.connectorColor || b.color || '#606060',
                visibility: E
              }).add(a.group);
            else if (i)
              b.connector = i.destroy();
          });
      }
    },
    verifyDataLabelOverflow: function (a) {
      var b = this.center, c = this.options, d = c.center, e = c = c.minSize || 80, f;
      d[0] !== null ? e = q(b[2] - q(a[1], a[3]), c) : (e = q(b[2] - a[1] - a[3], c), b[0] += (a[3] - a[1]) / 2);
      d[1] !== null ? e = q(K(e, b[2] - q(a[0], a[2])), c) : (e = q(K(e, b[2] - a[0] - a[2]), c), b[1] += (a[0] - a[2]) / 2);
      e < b[2] ? (b[2] = e, this.translate(b), n(this.points, function (a) {
        if (a.dataLabel)
          a.dataLabel._pos = null;
      }), this.drawDataLabels()) : f = !0;
      return f;
    },
    placeDataLabels: function () {
      n(this.points, function (a) {
        var a = a.dataLabel, b;
        if (a)
          (b = a._pos) ? (a.attr(a._attr), a[a.moved ? 'animate' : 'attr'](b), a.moved = !0) : a && a.attr({ y: -999 });
      });
    },
    alignDataLabel: ta,
    drawTracker: F.prototype.drawTracker,
    drawLegendSymbol: M.prototype.drawLegendSymbol,
    getSymbol: ta
  };
  W = ea(R, W);
  aa.pie = W;
  v(Highcharts, {
    Axis: ab,
    Chart: tb,
    Color: ma,
    Legend: sb,
    Pointer: rb,
    Point: Na,
    Tick: Ja,
    Tooltip: qb,
    Renderer: Sa,
    Series: R,
    SVGElement: ra,
    SVGRenderer: Ca,
    arrayMin: Ga,
    arrayMax: pa,
    charts: Ba,
    dateFormat: Ua,
    format: wa,
    pathAnim: vb,
    getOptions: function () {
      return N;
    },
    hasBidiBug: Sb,
    isTouchDevice: Mb,
    numberFormat: ua,
    seriesTypes: aa,
    setOptions: function (a) {
      N = x(N, a);
      Jb();
      return N;
    },
    addEvent: J,
    removeEvent: ba,
    createElement: U,
    discardElement: Ra,
    css: L,
    each: n,
    extend: v,
    map: La,
    merge: x,
    pick: o,
    splat: ha,
    extendClass: ea,
    pInt: u,
    wrap: zb,
    svg: Z,
    canvas: $,
    vml: !Z && !$,
    product: 'Highcharts',
    version: '3.0.2'
  });
}());
;
!function (n) {
  function t(n, t, e) {
    e = (e || 0) - 1;
    for (var r = n.length; ++e < r;)
      if (n[e] === t)
        return e;
    return -1;
  }
  function e(n, e) {
    var r = typeof e;
    if (n = n.k, 'boolean' == r || e == h)
      return n[e];
    'number' != r && 'string' != r && (r = 'object');
    var u = 'number' == r ? e : j + e;
    return n = n[r] || (n[r] = {}), 'object' == r ? n[u] && -1 < t(n[u], e) ? 0 : -1 : n[u] ? 0 : -1;
  }
  function r(n) {
    var t = this.k, e = typeof n;
    if ('boolean' == e || n == h)
      t[n] = y;
    else {
      'number' != e && 'string' != e && (e = 'object');
      var r = 'number' == e ? n : j + n, u = t[e] || (t[e] = {});
      'object' == e ? (u[r] || (u[r] = [])).push(n) == this.b.length && (t[e] = b) : u[r] = y;
    }
  }
  function u(n) {
    return n.charCodeAt(0);
  }
  function a(n, t) {
    var e = n.m, r = t.m;
    if (n = n.l, t = t.l, n !== t) {
      if (n > t || typeof n == 'undefined')
        return 1;
      if (n < t || typeof t == 'undefined')
        return -1;
    }
    return e < r ? -1 : 1;
  }
  function o(n) {
    var t = -1, e = n.length, u = l();
    u['false'] = u['null'] = u['true'] = u.undefined = b;
    var a = l();
    for (a.b = n, a.k = u, a.push = r; ++t < e;)
      a.push(n[t]);
    return u.object === false ? (p(a), h) : a;
  }
  function i(n) {
    return '\\' + Q[n];
  }
  function f() {
    return m.pop() || [];
  }
  function l() {
    return d.pop() || {
      b: h,
      k: h,
      l: h,
      'false': b,
      m: 0,
      leading: b,
      maxWait: 0,
      'null': b,
      number: h,
      object: h,
      push: h,
      string: h,
      trailing: b,
      'true': b,
      undefined: b,
      n: h
    };
  }
  function c(n) {
    n.length = 0, m.length < C && m.push(n);
  }
  function p(n) {
    var t = n.k;
    t && p(t), n.b = n.k = n.l = n.object = n.number = n.string = n.n = h, d.length < C && d.push(n);
  }
  function s(n, t, e) {
    t || (t = 0), typeof e == 'undefined' && (e = n ? n.length : 0);
    var r = -1;
    e = e - t || 0;
    for (var u = Array(0 > e ? 0 : e); ++r < e;)
      u[r] = n[t + r];
    return u;
  }
  function v(r) {
    function m(n) {
      if (!n || ve.call(n) != V)
        return b;
      var t = n.valueOf, e = typeof t == 'function' && (e = fe(t)) && fe(e);
      return e ? n == e || fe(n) == e : it(n);
    }
    function d(n, t, e) {
      if (!n || !L[typeof n])
        return n;
      t = t && typeof e == 'undefined' ? t : tt.createCallback(t, e);
      for (var r = -1, u = L[typeof n] && Se(n), a = u ? u.length : 0; ++r < a && (e = u[r], !(t(n[e], e, n) === false)););
      return n;
    }
    function C(n, t, e) {
      var r;
      if (!n || !L[typeof n])
        return n;
      t = t && typeof e == 'undefined' ? t : tt.createCallback(t, e);
      for (r in n)
        if (t(n[r], r, n) === false)
          break;
      return n;
    }
    function Q(n, t, e) {
      var r, u = n, a = u;
      if (!u)
        return a;
      for (var o = arguments, i = 0, f = typeof e == 'number' ? 2 : o.length; ++i < f;)
        if ((u = o[i]) && L[typeof u])
          for (var l = -1, c = L[typeof u] && Se(u), p = c ? c.length : 0; ++l < p;)
            r = c[l], 'undefined' == typeof a[r] && (a[r] = u[r]);
      return a;
    }
    function X(n, t, e) {
      var r, u = n, a = u;
      if (!u)
        return a;
      var o = arguments, i = 0, f = typeof e == 'number' ? 2 : o.length;
      if (3 < f && 'function' == typeof o[f - 2])
        var l = tt.createCallback(o[--f - 1], o[f--], 2);
      else
        2 < f && 'function' == typeof o[f - 1] && (l = o[--f]);
      for (; ++i < f;)
        if ((u = o[i]) && L[typeof u])
          for (var c = -1, p = L[typeof u] && Se(u), s = p ? p.length : 0; ++c < s;)
            r = p[c], a[r] = l ? l(a[r], u[r]) : u[r];
      return a;
    }
    function Z(n) {
      var t, e = [];
      if (!n || !L[typeof n])
        return e;
      for (t in n)
        le.call(n, t) && e.push(t);
      return e;
    }
    function tt(n) {
      return n && typeof n == 'object' && !Ee(n) && le.call(n, '__wrapped__') ? n : new et(n);
    }
    function et(n) {
      this.__wrapped__ = n;
    }
    function rt(n, t, e, r) {
      function u() {
        var r = arguments, l = o ? this : t;
        return a || (n = t[i]), e.length && (r = r.length ? (r = Ce.call(r), f ? r.concat(e) : e.concat(r)) : e), this instanceof u ? (l = gt(n.prototype) ? ye(n.prototype) : {}, r = n.apply(l, r), gt(r) ? r : l) : n.apply(l, r);
      }
      var a = vt(n), o = !e, i = t;
      if (o) {
        var f = r;
        e = t;
      } else if (!a) {
        if (!r)
          throw new Yt();
        t = n;
      }
      return u;
    }
    function ut(n) {
      return Ie[n];
    }
    function at() {
      var n = (n = tt.indexOf) === $t ? t : n;
      return n;
    }
    function ot(n) {
      return function (t, e, r, u) {
        return typeof e != 'boolean' && e != h && (u = r, r = u && u[e] === t ? g : e, e = b), r != h && (r = tt.createCallback(r, u)), n(t, e, r, u);
      };
    }
    function it(n) {
      var t, e;
      return n && ve.call(n) == V && (t = n.constructor, !vt(t) || t instanceof t) ? (C(n, function (n, t) {
        e = t;
      }), e === g || le.call(n, e)) : b;
    }
    function ft(n) {
      return Ae[n];
    }
    function lt(n, t, e, r, u, a) {
      var o = n;
      if (typeof t != 'boolean' && t != h && (r = e, e = t, t = b), typeof e == 'function') {
        if (e = typeof r == 'undefined' ? e : tt.createCallback(e, r, 1), o = e(o), typeof o != 'undefined')
          return o;
        o = n;
      }
      if (r = gt(o)) {
        var i = ve.call(o);
        if (!J[i])
          return o;
        var l = Ee(o);
      }
      if (!r || !t)
        return r ? l ? s(o) : X({}, o) : o;
      switch (r = xe[i], i) {
      case P:
      case K:
        return new r(+o);
      case U:
      case H:
        return new r(o);
      case G:
        return r(o.source, A.exec(o));
      }
      i = !u, u || (u = f()), a || (a = f());
      for (var p = u.length; p--;)
        if (u[p] == n)
          return a[p];
      return o = l ? r(o.length) : {}, l && (le.call(n, 'index') && (o.index = n.index), le.call(n, 'input') && (o.input = n.input)), u.push(n), a.push(o), (l ? wt : d)(n, function (n, r) {
        o[r] = lt(n, t, e, g, u, a);
      }), i && (c(u), c(a)), o;
    }
    function ct(n) {
      var t = [];
      return C(n, function (n, e) {
        vt(n) && t.push(e);
      }), t.sort();
    }
    function pt(n) {
      for (var t = -1, e = Se(n), r = e.length, u = {}; ++t < r;) {
        var a = e[t];
        u[n[a]] = a;
      }
      return u;
    }
    function st(n, t, e, r, u, a) {
      var o = e === k;
      if (typeof e == 'function' && !o) {
        e = tt.createCallback(e, r, 2);
        var i = e(n, t);
        if (typeof i != 'undefined')
          return !!i;
      }
      if (n === t)
        return 0 !== n || 1 / n == 1 / t;
      var l = typeof n, p = typeof t;
      if (n === n && (!n || 'function' != l && 'object' != l) && (!t || 'function' != p && 'object' != p))
        return b;
      if (n == h || t == h)
        return n === t;
      if (p = ve.call(n), l = ve.call(t), p == z && (p = V), l == z && (l = V), p != l)
        return b;
      switch (p) {
      case P:
      case K:
        return +n == +t;
      case U:
        return n != +n ? t != +t : 0 == n ? 1 / n == 1 / t : n == +t;
      case G:
      case H:
        return n == Xt(t);
      }
      if (l = p == W, !l) {
        if (le.call(n, '__wrapped__') || le.call(t, '__wrapped__'))
          return st(n.__wrapped__ || n, t.__wrapped__ || t, e, r, u, a);
        if (p != V)
          return b;
        var p = n.constructor, s = t.constructor;
        if (p != s && (!vt(p) || !(p instanceof p && vt(s) && s instanceof s)))
          return b;
      }
      for (s = !u, u || (u = f()), a || (a = f()), p = u.length; p--;)
        if (u[p] == n)
          return a[p] == t;
      var v = 0, i = y;
      if (u.push(n), a.push(t), l) {
        if (p = n.length, v = t.length, i = v == n.length, !i && !o)
          return i;
        for (; v--;)
          if (l = p, s = t[v], o)
            for (; l-- && !(i = st(n[l], s, e, r, u, a)););
          else if (!(i = st(n[v], s, e, r, u, a)))
            break;
        return i;
      }
      return C(t, function (t, o, f) {
        return le.call(f, o) ? (v++, i = le.call(n, o) && st(n[o], t, e, r, u, a)) : void 0;
      }), i && !o && C(n, function (n, t, e) {
        return le.call(e, t) ? i = -1 < --v : void 0;
      }), s && (c(u), c(a)), i;
    }
    function vt(n) {
      return typeof n == 'function';
    }
    function gt(n) {
      return !(!n || !L[typeof n]);
    }
    function yt(n) {
      return typeof n == 'number' || ve.call(n) == U;
    }
    function ht(n) {
      return typeof n == 'string' || ve.call(n) == H;
    }
    function bt(n, t, e) {
      var r = arguments, u = 0, a = 2;
      if (!gt(n))
        return n;
      if (e === k)
        var o = r[3], i = r[4], l = r[5];
      else {
        var p = y, i = f(), l = f();
        typeof e != 'number' && (a = r.length), 3 < a && 'function' == typeof r[a - 2] ? o = tt.createCallback(r[--a - 1], r[a--], 2) : 2 < a && 'function' == typeof r[a - 1] && (o = r[--a]);
      }
      for (; ++u < a;)
        (Ee(r[u]) ? wt : d)(r[u], function (t, e) {
          var r, u, a = t, f = n[e];
          if (t && ((u = Ee(t)) || m(t))) {
            for (a = i.length; a--;)
              if (r = i[a] == t) {
                f = l[a];
                break;
              }
            if (!r) {
              var c;
              o && (a = o(f, t), c = typeof a != 'undefined') && (f = a), c || (f = u ? Ee(f) ? f : [] : m(f) ? f : {}), i.push(t), l.push(f), c || (f = bt(f, t, k, o, i, l));
            }
          } else
            o && (a = o(f, t), typeof a == 'undefined' && (a = t)), typeof a != 'undefined' && (f = a);
          n[e] = f;
        });
      return p && (c(i), c(l)), n;
    }
    function mt(n) {
      for (var t = -1, e = Se(n), r = e.length, u = Mt(r); ++t < r;)
        u[t] = n[e[t]];
      return u;
    }
    function dt(n, t, e) {
      var r = -1, u = at(), a = n ? n.length : 0, o = b;
      return e = (0 > e ? _e(0, a + e) : e) || 0, a && typeof a == 'number' ? o = -1 < (ht(n) ? n.indexOf(t, e) : u(n, t, e)) : d(n, function (n) {
        return ++r < e ? void 0 : !(o = n === t);
      }), o;
    }
    function _t(n, t, e) {
      var r = y;
      t = tt.createCallback(t, e), e = -1;
      var u = n ? n.length : 0;
      if (typeof u == 'number')
        for (; ++e < u && (r = !!t(n[e], e, n)););
      else
        d(n, function (n, e, u) {
          return r = !!t(n, e, u);
        });
      return r;
    }
    function kt(n, t, e) {
      var r = [];
      t = tt.createCallback(t, e), e = -1;
      var u = n ? n.length : 0;
      if (typeof u == 'number')
        for (; ++e < u;) {
          var a = n[e];
          t(a, e, n) && r.push(a);
        }
      else
        d(n, function (n, e, u) {
          t(n, e, u) && r.push(n);
        });
      return r;
    }
    function jt(n, t, e) {
      t = tt.createCallback(t, e), e = -1;
      var r = n ? n.length : 0;
      if (typeof r != 'number') {
        var u;
        return d(n, function (n, e, r) {
          return t(n, e, r) ? (u = n, b) : void 0;
        }), u;
      }
      for (; ++e < r;) {
        var a = n[e];
        if (t(a, e, n))
          return a;
      }
    }
    function wt(n, t, e) {
      var r = -1, u = n ? n.length : 0;
      if (t = t && typeof e == 'undefined' ? t : tt.createCallback(t, e), typeof u == 'number')
        for (; ++r < u && t(n[r], r, n) !== false;);
      else
        d(n, t);
      return n;
    }
    function Ct(n, t, e) {
      var r = -1, u = n ? n.length : 0;
      if (t = tt.createCallback(t, e), typeof u == 'number')
        for (var a = Mt(u); ++r < u;)
          a[r] = t(n[r], r, n);
      else
        a = [], d(n, function (n, e, u) {
          a[++r] = t(n, e, u);
        });
      return a;
    }
    function xt(n, t, e) {
      var r = -1 / 0, a = r;
      if (!t && Ee(n)) {
        e = -1;
        for (var o = n.length; ++e < o;) {
          var i = n[e];
          i > a && (a = i);
        }
      } else
        t = !t && ht(n) ? u : tt.createCallback(t, e), wt(n, function (n, e, u) {
          e = t(n, e, u), e > r && (r = e, a = n);
        });
      return a;
    }
    function Ot(n, t) {
      var e = -1, r = n ? n.length : 0;
      if (typeof r == 'number')
        for (var u = Mt(r); ++e < r;)
          u[e] = n[e][t];
      return u || Ct(n, t);
    }
    function Et(n, t, e, r) {
      if (!n)
        return e;
      var u = 3 > arguments.length;
      t = tt.createCallback(t, r, 4);
      var a = -1, o = n.length;
      if (typeof o == 'number')
        for (u && (e = n[++a]); ++a < o;)
          e = t(e, n[a], a, n);
      else
        d(n, function (n, r, a) {
          e = u ? (u = b, n) : t(e, n, r, a);
        });
      return e;
    }
    function St(n, t, e, r) {
      var u = n ? n.length : 0, a = 3 > arguments.length;
      if (typeof u != 'number')
        var o = Se(n), u = o.length;
      return t = tt.createCallback(t, r, 4), wt(n, function (r, i, f) {
        i = o ? o[--u] : --u, e = a ? (a = b, n[i]) : t(e, n[i], i, f);
      }), e;
    }
    function It(n, t, e) {
      var r;
      t = tt.createCallback(t, e), e = -1;
      var u = n ? n.length : 0;
      if (typeof u == 'number')
        for (; ++e < u && !(r = t(n[e], e, n)););
      else
        d(n, function (n, e, u) {
          return !(r = t(n, e, u));
        });
      return !!r;
    }
    function At(n) {
      var r = -1, u = at(), a = n ? n.length : 0, i = ae.apply(Zt, Ce.call(arguments, 1)), f = [], l = a >= w && u === t;
      if (l) {
        var c = o(i);
        c ? (u = e, i = c) : l = b;
      }
      for (; ++r < a;)
        c = n[r], 0 > u(i, c) && f.push(c);
      return l && p(i), f;
    }
    function Nt(n, t, e) {
      if (n) {
        var r = 0, u = n.length;
        if (typeof t != 'number' && t != h) {
          var a = -1;
          for (t = tt.createCallback(t, e); ++a < u && t(n[a], a, n);)
            r++;
        } else if (r = t, r == h || e)
          return n[0];
        return s(n, 0, ke(_e(0, r), u));
      }
    }
    function $t(n, e, r) {
      if (typeof r == 'number') {
        var u = n ? n.length : 0;
        r = 0 > r ? _e(0, u + r) : r || 0;
      } else if (r)
        return r = Ft(n, e), n[r] === e ? r : -1;
      return n ? t(n, e, r) : -1;
    }
    function Bt(n, t, e) {
      if (typeof t != 'number' && t != h) {
        var r = 0, u = -1, a = n ? n.length : 0;
        for (t = tt.createCallback(t, e); ++u < a && t(n[u], u, n);)
          r++;
      } else
        r = t == h || e ? 1 : _e(0, t);
      return s(n, r);
    }
    function Ft(n, t, e, r) {
      var u = 0, a = n ? n.length : u;
      for (e = e ? tt.createCallback(e, r, 1) : Wt, t = e(t); u < a;)
        r = u + a >>> 1, e(n[r]) < t ? u = r + 1 : a = r;
      return u;
    }
    function Rt(n) {
      for (var t = -1, e = n ? xt(Ot(n, 'length')) : 0, r = Mt(0 > e ? 0 : e); ++t < e;)
        r[t] = Ot(n, t);
      return r;
    }
    function Tt(n, t) {
      for (var e = -1, r = n ? n.length : 0, u = {}; ++e < r;) {
        var a = n[e];
        t ? u[a] = t[e] : u[a[0]] = a[1];
      }
      return u;
    }
    function qt(n, t) {
      return Oe.fastBind || ge && 2 < arguments.length ? ge.call.apply(ge, arguments) : rt(n, t, Ce.call(arguments, 2));
    }
    function Dt(n, t, e) {
      function r() {
        ue(s), ue(v), l = 0, s = v = h;
      }
      function u() {
        var t = g && (!m || 1 < l);
        r(), t && (p !== false && (c = new Vt()), i = n.apply(f, o));
      }
      function a() {
        r(), (g || p !== t) && (c = new Vt(), i = n.apply(f, o));
      }
      var o, i, f, l = 0, c = 0, p = b, s = h, v = h, g = y;
      if (t = _e(0, t || 0), e === y)
        var m = y, g = b;
      else
        gt(e) && (m = e.leading, p = 'maxWait' in e && _e(t, e.maxWait || 0), g = 'trailing' in e ? e.trailing : g);
      return function () {
        if (o = arguments, f = this, l++, ue(v), p === false)
          m && 2 > l && (i = n.apply(f, o));
        else {
          var e = new Vt();
          !s && !m && (c = e);
          var r = p - (e - c);
          0 < r ? s || (s = se(a, r)) : (ue(s), s = h, c = e, i = n.apply(f, o));
        }
        return t !== p && (v = se(u, t)), i;
      };
    }
    function zt(n) {
      var t = Ce.call(arguments, 1);
      return se(function () {
        n.apply(g, t);
      }, 1);
    }
    function Wt(n) {
      return n;
    }
    function Pt(n) {
      wt(ct(n), function (t) {
        var e = tt[t] = n[t];
        tt.prototype[t] = function () {
          var n = this.__wrapped__, t = [n];
          return ce.apply(t, arguments), t = e.apply(tt, t), n && typeof n == 'object' && n === t ? this : new et(t);
        };
      });
    }
    function Kt() {
      return this.__wrapped__;
    }
    r = r ? nt.defaults(n.Object(), r, nt.pick(n, D)) : n;
    var Mt = r.Array, Ut = r.Boolean, Vt = r.Date, Gt = r.Function, Ht = r.Math, Jt = r.Number, Lt = r.Object, Qt = r.RegExp, Xt = r.String, Yt = r.TypeError, Zt = [], ne = Lt.prototype, te = r._, ee = Qt('^' + Xt(ne.valueOf).replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/valueOf|for [^\]]+/g, '.+?') + '$'), re = Ht.ceil, ue = r.clearTimeout, ae = Zt.concat, oe = Ht.floor, ie = Gt.prototype.toString, fe = ee.test(fe = Lt.getPrototypeOf) && fe, le = ne.hasOwnProperty, ce = Zt.push, pe = r.setImmediate, se = r.setTimeout, ve = ne.toString, ge = ee.test(ge = ve.bind) && ge, ye = ee.test(ye = Lt.create) && ye, he = ee.test(he = Mt.isArray) && he, be = r.isFinite, me = r.isNaN, de = ee.test(de = Lt.keys) && de, _e = Ht.max, ke = Ht.min, je = r.parseInt, we = Ht.random, Ce = Zt.slice, Ht = ee.test(r.attachEvent), Ht = ge && !/\n|true/.test(ge + Ht), xe = {};
    xe[W] = Mt, xe[P] = Ut, xe[K] = Vt, xe[M] = Gt, xe[V] = Lt, xe[U] = Jt, xe[G] = Qt, xe[H] = Xt, et.prototype = tt.prototype;
    var Oe = tt.support = {};
    Oe.fastBind = ge && !Ht, tt.templateSettings = {
      escape: /<%-([\s\S]+?)%>/g,
      evaluate: /<%([\s\S]+?)%>/g,
      interpolate: N,
      variable: '',
      imports: { _: tt }
    };
    var Ee = he, Se = de ? function (n) {
        return gt(n) ? de(n) : [];
      } : Z, Ie = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        '\'': '&#39;'
      }, Ae = pt(Ie), Ut = ot(function $e(n, t, e) {
        for (var r = -1, u = n ? n.length : 0, a = []; ++r < u;) {
          var o = n[r];
          e && (o = e(o, r, n)), Ee(o) ? ce.apply(a, t ? o : $e(o)) : a.push(o);
        }
        return a;
      }), Ne = ot(function (n, r, u) {
        var a = -1, i = at(), l = n ? n.length : 0, s = [], v = !r && l >= w && i === t, g = u || v ? f() : s;
        if (v) {
          var y = o(g);
          y ? (i = e, g = y) : (v = b, g = u ? g : (c(g), s));
        }
        for (; ++a < l;) {
          var y = n[a], h = u ? u(y, a, n) : y;
          (r ? !a || g[g.length - 1] !== h : 0 > i(g, h)) && ((u || v) && g.push(h), s.push(y));
        }
        return v ? (c(g.b), p(g)) : u && c(g), s;
      });
    return Ht && Y && typeof pe == 'function' && (zt = qt(pe, r)), pe = 8 == je(B + '08') ? je : function (n, t) {
      return je(ht(n) ? n.replace(F, '') : n, t || 0);
    }, tt.after = function (n, t) {
      return 1 > n ? t() : function () {
        return 1 > --n ? t.apply(this, arguments) : void 0;
      };
    }, tt.assign = X, tt.at = function (n) {
      for (var t = -1, e = ae.apply(Zt, Ce.call(arguments, 1)), r = e.length, u = Mt(r); ++t < r;)
        u[t] = n[e[t]];
      return u;
    }, tt.bind = qt, tt.bindAll = function (n) {
      for (var t = 1 < arguments.length ? ae.apply(Zt, Ce.call(arguments, 1)) : ct(n), e = -1, r = t.length; ++e < r;) {
        var u = t[e];
        n[u] = qt(n[u], n);
      }
      return n;
    }, tt.bindKey = function (n, t) {
      return rt(n, t, Ce.call(arguments, 2), k);
    }, tt.compact = function (n) {
      for (var t = -1, e = n ? n.length : 0, r = []; ++t < e;) {
        var u = n[t];
        u && r.push(u);
      }
      return r;
    }, tt.compose = function () {
      var n = arguments;
      return function () {
        for (var t = arguments, e = n.length; e--;)
          t = [n[e].apply(this, t)];
        return t[0];
      };
    }, tt.countBy = function (n, t, e) {
      var r = {};
      return t = tt.createCallback(t, e), wt(n, function (n, e, u) {
        e = Xt(t(n, e, u)), le.call(r, e) ? r[e]++ : r[e] = 1;
      }), r;
    }, tt.createCallback = function (n, t, e) {
      if (n == h)
        return Wt;
      var r = typeof n;
      if ('function' != r) {
        if ('object' != r)
          return function (t) {
            return t[n];
          };
        var u = Se(n);
        return function (t) {
          for (var e = u.length, r = b; e-- && (r = st(t[u[e]], n[u[e]], k)););
          return r;
        };
      }
      return typeof t == 'undefined' || $ && !$.test(ie.call(n)) ? n : 1 === e ? function (e) {
        return n.call(t, e);
      } : 2 === e ? function (e, r) {
        return n.call(t, e, r);
      } : 4 === e ? function (e, r, u, a) {
        return n.call(t, e, r, u, a);
      } : function (e, r, u) {
        return n.call(t, e, r, u);
      };
    }, tt.debounce = Dt, tt.defaults = Q, tt.defer = zt, tt.delay = function (n, t) {
      var e = Ce.call(arguments, 2);
      return se(function () {
        n.apply(g, e);
      }, t);
    }, tt.difference = At, tt.filter = kt, tt.flatten = Ut, tt.forEach = wt, tt.forIn = C, tt.forOwn = d, tt.functions = ct, tt.groupBy = function (n, t, e) {
      var r = {};
      return t = tt.createCallback(t, e), wt(n, function (n, e, u) {
        e = Xt(t(n, e, u)), (le.call(r, e) ? r[e] : r[e] = []).push(n);
      }), r;
    }, tt.initial = function (n, t, e) {
      if (!n)
        return [];
      var r = 0, u = n.length;
      if (typeof t != 'number' && t != h) {
        var a = u;
        for (t = tt.createCallback(t, e); a-- && t(n[a], a, n);)
          r++;
      } else
        r = t == h || e ? 1 : t || r;
      return s(n, 0, ke(_e(0, u - r), u));
    }, tt.intersection = function (n) {
      for (var r = arguments, u = r.length, a = -1, i = f(), l = -1, s = at(), v = n ? n.length : 0, g = [], y = f(); ++a < u;) {
        var h = r[a];
        i[a] = s === t && (h ? h.length : 0) >= w && o(a ? r[a] : y);
      }
      n:
        for (; ++l < v;) {
          var b = i[0], h = n[l];
          if (0 > (b ? e(b, h) : s(y, h))) {
            for (a = u, (b || y).push(h); --a;)
              if (b = i[a], 0 > (b ? e(b, h) : s(r[a], h)))
                continue n;
            g.push(h);
          }
        }
      for (; u--;)
        (b = i[u]) && p(b);
      return c(i), c(y), g;
    }, tt.invert = pt, tt.invoke = function (n, t) {
      var e = Ce.call(arguments, 2), r = -1, u = typeof t == 'function', a = n ? n.length : 0, o = Mt(typeof a == 'number' ? a : 0);
      return wt(n, function (n) {
        o[++r] = (u ? t : n[t]).apply(n, e);
      }), o;
    }, tt.keys = Se, tt.map = Ct, tt.max = xt, tt.memoize = function (n, t) {
      function e() {
        var r = e.cache, u = j + (t ? t.apply(this, arguments) : arguments[0]);
        return le.call(r, u) ? r[u] : r[u] = n.apply(this, arguments);
      }
      return e.cache = {}, e;
    }, tt.merge = bt, tt.min = function (n, t, e) {
      var r = 1 / 0, a = r;
      if (!t && Ee(n)) {
        e = -1;
        for (var o = n.length; ++e < o;) {
          var i = n[e];
          i < a && (a = i);
        }
      } else
        t = !t && ht(n) ? u : tt.createCallback(t, e), wt(n, function (n, e, u) {
          e = t(n, e, u), e < r && (r = e, a = n);
        });
      return a;
    }, tt.omit = function (n, t, e) {
      var r = at(), u = typeof t == 'function', a = {};
      if (u)
        t = tt.createCallback(t, e);
      else
        var o = ae.apply(Zt, Ce.call(arguments, 1));
      return C(n, function (n, e, i) {
        (u ? !t(n, e, i) : 0 > r(o, e)) && (a[e] = n);
      }), a;
    }, tt.once = function (n) {
      var t, e;
      return function () {
        return t ? e : (t = y, e = n.apply(this, arguments), n = h, e);
      };
    }, tt.pairs = function (n) {
      for (var t = -1, e = Se(n), r = e.length, u = Mt(r); ++t < r;) {
        var a = e[t];
        u[t] = [
          a,
          n[a]
        ];
      }
      return u;
    }, tt.partial = function (n) {
      return rt(n, Ce.call(arguments, 1));
    }, tt.partialRight = function (n) {
      return rt(n, Ce.call(arguments, 1), h, k);
    }, tt.pick = function (n, t, e) {
      var r = {};
      if (typeof t != 'function')
        for (var u = -1, a = ae.apply(Zt, Ce.call(arguments, 1)), o = gt(n) ? a.length : 0; ++u < o;) {
          var i = a[u];
          i in n && (r[i] = n[i]);
        }
      else
        t = tt.createCallback(t, e), C(n, function (n, e, u) {
          t(n, e, u) && (r[e] = n);
        });
      return r;
    }, tt.pluck = Ot, tt.range = function (n, t, e) {
      n = +n || 0, e = +e || 1, t == h && (t = n, n = 0);
      var r = -1;
      t = _e(0, re((t - n) / e));
      for (var u = Mt(t); ++r < t;)
        u[r] = n, n += e;
      return u;
    }, tt.reject = function (n, t, e) {
      return t = tt.createCallback(t, e), kt(n, function (n, e, r) {
        return !t(n, e, r);
      });
    }, tt.rest = Bt, tt.shuffle = function (n) {
      var t = -1, e = n ? n.length : 0, r = Mt(typeof e == 'number' ? e : 0);
      return wt(n, function (n) {
        var e = oe(we() * (++t + 1));
        r[t] = r[e], r[e] = n;
      }), r;
    }, tt.sortBy = function (n, t, e) {
      var r = -1, u = n ? n.length : 0, o = Mt(typeof u == 'number' ? u : 0);
      for (t = tt.createCallback(t, e), wt(n, function (n, e, u) {
          var a = o[++r] = l();
          a.l = t(n, e, u), a.m = r, a.n = n;
        }), u = o.length, o.sort(a); u--;)
        n = o[u], o[u] = n.n, p(n);
      return o;
    }, tt.tap = function (n, t) {
      return t(n), n;
    }, tt.throttle = function (n, t, e) {
      var r = y, u = y;
      return e === false ? r = b : gt(e) && (r = 'leading' in e ? e.leading : r, u = 'trailing' in e ? e.trailing : u), e = l(), e.leading = r, e.maxWait = t, e.trailing = u, n = Dt(n, t, e), p(e), n;
    }, tt.times = function (n, t, e) {
      n = -1 < (n = +n) ? n : 0;
      var r = -1, u = Mt(n);
      for (t = tt.createCallback(t, e, 1); ++r < n;)
        u[r] = t(r);
      return u;
    }, tt.toArray = function (n) {
      return n && typeof n.length == 'number' ? s(n) : mt(n);
    }, tt.transform = function (n, t, e, r) {
      var u = Ee(n);
      return t = tt.createCallback(t, r, 4), e == h && (u ? e = [] : (r = n && n.constructor, e = gt(r && r.prototype) ? ye(r && r.prototype) : {})), (u ? wt : d)(n, function (n, r, u) {
        return t(e, n, r, u);
      }), e;
    }, tt.union = function (n) {
      return Ee(n) || (arguments[0] = n ? Ce.call(n) : Zt), Ne(ae.apply(Zt, arguments));
    }, tt.uniq = Ne, tt.unzip = Rt, tt.values = mt, tt.where = kt, tt.without = function (n) {
      return At(n, Ce.call(arguments, 1));
    }, tt.wrap = function (n, t) {
      return function () {
        var e = [n];
        return ce.apply(e, arguments), t.apply(this, e);
      };
    }, tt.zip = function (n) {
      return n ? Rt(arguments) : [];
    }, tt.zipObject = Tt, tt.collect = Ct, tt.drop = Bt, tt.each = wt, tt.extend = X, tt.methods = ct, tt.object = Tt, tt.select = kt, tt.tail = Bt, tt.unique = Ne, Pt(tt), tt.chain = tt, tt.prototype.chain = function () {
      return this;
    }, tt.clone = lt, tt.cloneDeep = function (n, t, e) {
      return lt(n, y, t, e);
    }, tt.contains = dt, tt.escape = function (n) {
      return n == h ? '' : Xt(n).replace(T, ut);
    }, tt.every = _t, tt.find = jt, tt.findIndex = function (n, t, e) {
      var r = -1, u = n ? n.length : 0;
      for (t = tt.createCallback(t, e); ++r < u;)
        if (t(n[r], r, n))
          return r;
      return -1;
    }, tt.findKey = function (n, t, e) {
      var r;
      return t = tt.createCallback(t, e), d(n, function (n, e, u) {
        return t(n, e, u) ? (r = e, b) : void 0;
      }), r;
    }, tt.has = function (n, t) {
      return n ? le.call(n, t) : b;
    }, tt.identity = Wt, tt.indexOf = $t, tt.isArguments = function (n) {
      return ve.call(n) == z;
    }, tt.isArray = Ee, tt.isBoolean = function (n) {
      return n === y || n === false || ve.call(n) == P;
    }, tt.isDate = function (n) {
      return n ? typeof n == 'object' && ve.call(n) == K : b;
    }, tt.isElement = function (n) {
      return n ? 1 === n.nodeType : b;
    }, tt.isEmpty = function (n) {
      var t = y;
      if (!n)
        return t;
      var e = ve.call(n), r = n.length;
      return e == W || e == H || e == z || e == V && typeof r == 'number' && vt(n.splice) ? !r : (d(n, function () {
        return t = b;
      }), t);
    }, tt.isEqual = st, tt.isFinite = function (n) {
      return be(n) && !me(parseFloat(n));
    }, tt.isFunction = vt, tt.isNaN = function (n) {
      return yt(n) && n != +n;
    }, tt.isNull = function (n) {
      return n === h;
    }, tt.isNumber = yt, tt.isObject = gt, tt.isPlainObject = m, tt.isRegExp = function (n) {
      return n ? typeof n == 'object' && ve.call(n) == G : b;
    }, tt.isString = ht, tt.isUndefined = function (n) {
      return typeof n == 'undefined';
    }, tt.lastIndexOf = function (n, t, e) {
      var r = n ? n.length : 0;
      for (typeof e == 'number' && (r = (0 > e ? _e(0, r + e) : ke(e, r - 1)) + 1); r--;)
        if (n[r] === t)
          return r;
      return -1;
    }, tt.mixin = Pt, tt.noConflict = function () {
      return r._ = te, this;
    }, tt.parseInt = pe, tt.random = function (n, t) {
      n == h && t == h && (t = 1), n = +n || 0, t == h ? (t = n, n = 0) : t = +t || 0;
      var e = we();
      return n % 1 || t % 1 ? n + ke(e * (t - n + parseFloat('1e-' + ((e + '').length - 1))), t) : n + oe(e * (t - n + 1));
    }, tt.reduce = Et, tt.reduceRight = St, tt.result = function (n, t) {
      var e = n ? n[t] : g;
      return vt(e) ? n[t]() : e;
    }, tt.runInContext = v, tt.size = function (n) {
      var t = n ? n.length : 0;
      return typeof t == 'number' ? t : Se(n).length;
    }, tt.some = It, tt.sortedIndex = Ft, tt.template = function (n, t, e) {
      var r = tt.templateSettings;
      n || (n = ''), e = Q({}, e, r);
      var u, a = Q({}, e.imports, r.imports), r = Se(a), a = mt(a), o = 0, f = e.interpolate || R, l = '__p+=\'', f = Qt((e.escape || R).source + '|' + f.source + '|' + (f === N ? I : R).source + '|' + (e.evaluate || R).source + '|$', 'g');
      n.replace(f, function (t, e, r, a, f, c) {
        return r || (r = a), l += n.slice(o, c).replace(q, i), e && (l += '\'+__e(' + e + ')+\''), f && (u = y, l += '\';' + f + ';__p+=\''), r && (l += '\'+((__t=(' + r + '))==null?\'\':__t)+\''), o = c + t.length, t;
      }), l += '\';\n', f = e = e.variable, f || (e = 'obj', l = 'with(' + e + '){' + l + '}'), l = (u ? l.replace(x, '') : l).replace(O, '$1').replace(E, '$1;'), l = 'function(' + e + '){' + (f ? '' : e + '||(' + e + '={});') + 'var __t,__p=\'\',__e=_.escape' + (u ? ',__j=Array.prototype.join;function print(){__p+=__j.call(arguments,\'\')}' : ';') + l + 'return __p}';
      try {
        var c = Gt(r, 'return ' + l).apply(g, a);
      } catch (p) {
        throw p.source = l, p;
      }
      return t ? c(t) : (c.source = l, c);
    }, tt.unescape = function (n) {
      return n == h ? '' : Xt(n).replace(S, ft);
    }, tt.uniqueId = function (n) {
      var t = ++_;
      return Xt(n == h ? '' : n) + t;
    }, tt.all = _t, tt.any = It, tt.detect = jt, tt.findWhere = jt, tt.foldl = Et, tt.foldr = St, tt.include = dt, tt.inject = Et, d(tt, function (n, t) {
      tt.prototype[t] || (tt.prototype[t] = function () {
        var t = [this.__wrapped__];
        return ce.apply(t, arguments), n.apply(tt, t);
      });
    }), tt.first = Nt, tt.last = function (n, t, e) {
      if (n) {
        var r = 0, u = n.length;
        if (typeof t != 'number' && t != h) {
          var a = u;
          for (t = tt.createCallback(t, e); a-- && t(n[a], a, n);)
            r++;
        } else if (r = t, r == h || e)
          return n[u - 1];
        return s(n, _e(0, u - r));
      }
    }, tt.take = Nt, tt.head = Nt, d(tt, function (n, t) {
      tt.prototype[t] || (tt.prototype[t] = function (t, e) {
        var r = n(this.__wrapped__, t, e);
        return t == h || e && typeof t != 'function' ? r : new et(r);
      });
    }), tt.VERSION = '1.3.1', tt.prototype.toString = function () {
      return Xt(this.__wrapped__);
    }, tt.prototype.value = Kt, tt.prototype.valueOf = Kt, wt([
      'join',
      'pop',
      'shift'
    ], function (n) {
      var t = Zt[n];
      tt.prototype[n] = function () {
        return t.apply(this.__wrapped__, arguments);
      };
    }), wt([
      'push',
      'reverse',
      'sort',
      'unshift'
    ], function (n) {
      var t = Zt[n];
      tt.prototype[n] = function () {
        return t.apply(this.__wrapped__, arguments), this;
      };
    }), wt([
      'concat',
      'slice',
      'splice'
    ], function (n) {
      var t = Zt[n];
      tt.prototype[n] = function () {
        return new et(t.apply(this.__wrapped__, arguments));
      };
    }), tt;
  }
  var g, y = !0, h = null, b = !1, m = [], d = [], _ = 0, k = {}, j = +new Date() + '', w = 75, C = 40, x = /\b__p\+='';/g, O = /\b(__p\+=)''\+/g, E = /(__e\(.*?\)|\b__t\))\+'';/g, S = /&(?:amp|lt|gt|quot|#39);/g, I = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, A = /\w*$/, N = /<%=([\s\S]+?)%>/g, $ = ($ = /\bthis\b/) && $.test(v) && $, B = ' \t\x0B\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000', F = RegExp('^[' + B + ']*0+(?=.$)'), R = /($^)/, T = /[&<>"']/g, q = /['\n\r\t\u2028\u2029\\]/g, D = 'Array Boolean Date Function Math Number Object RegExp String _ attachEvent clearTimeout isFinite isNaN parseInt setImmediate setTimeout'.split(' '), z = '[object Arguments]', W = '[object Array]', P = '[object Boolean]', K = '[object Date]', M = '[object Function]', U = '[object Number]', V = '[object Object]', G = '[object RegExp]', H = '[object String]', J = {};
  J[M] = b, J[z] = J[W] = J[P] = J[K] = J[U] = J[V] = J[G] = J[H] = y;
  var L = {
      'boolean': b,
      'function': y,
      object: y,
      number: b,
      string: b,
      undefined: b
    }, Q = {
      '\\': '\\',
      '\'': '\'',
      '\n': 'n',
      '\r': 'r',
      '\t': 't',
      '\u2028': 'u2028',
      '\u2029': 'u2029'
    }, X = L[typeof exports] && exports, Y = L[typeof module] && module && module.exports == X && module, Z = L[typeof global] && global;
  !Z || Z.global !== Z && Z.window !== Z || (n = Z);
  var nt = v();
  typeof define == 'function' && typeof define.amd == 'object' && define.amd ? (n._ = nt, define(function () {
    return nt;
  })) : X && !X.nodeType ? Y ? (Y.exports = nt)._ = nt : X._ = nt : n._ = nt;
}(this);
(function () {
  'use strict';
  angular.module('NeuroSandCubeConsoleApp', ['$strap.directives']).config([
    '$routeProvider',
    function ($routeProvider) {
      return $routeProvider.when('/', { redirectTo: '/console' }).when('/trial', {
        templateUrl: 'views/starttrial.html',
        controller: 'StarttrialCtrl'
      }).when('/console', {
        templateUrl: 'views/console.html',
        controller: 'ConsoleCtrl'
      }).when('/logs', {
        templateUrl: 'views/logs.html',
        controller: 'LogsCtrl'
      }).otherwise({ redirectTo: '/' });
    }
  ]);
}.call(this));
(function () {
  'use strict';
  angular.module('NeuroSandCubeConsoleApp', ['$strap.directives']).config([
    '$routeProvider',
    function ($routeProvider) {
      return $routeProvider.when('/', { redirectTo: '/console' }).when('/trial', {
        templateUrl: 'views/starttrial.html',
        controller: 'StarttrialCtrl'
      }).when('/console', {
        templateUrl: 'views/console.html',
        controller: 'ConsoleCtrl'
      }).when('/logs', {
        templateUrl: 'views/logs.html',
        controller: 'LogsCtrl'
      }).otherwise({ redirectTo: '/' });
    }
  ]);
}.call(this));
(function () {
  'use strict';
  var calculateTime, trialTimeInterval;
  trialTimeInterval = 1000;
  calculateTime = function (scope) {
    var seconds;
    scope.trial.minutes = Math.floor(scope.trial.timeRemaining / (60 * 1000));
    seconds = Math.floor(scope.trial.timeRemaining % (60 * 1000) / 1000);
    if (seconds.toString().length === 1) {
      return scope.trial.seconds = '0' + seconds;
    } else {
      return scope.trial.seconds = seconds;
    }
  };
  angular.module('NeuroSandCubeConsoleApp').controller('MainCtrl', [
    '$scope',
    '$timeout',
    'socket',
    'serverCommunicator',
    function ($scope, $timeout, socket, serverCommunicator) {
      var onEndTrial, timerCallback, timerPromise;
      console.log('Main ctrl');
      if ($scope.states == null) {
        $scope.states = {};
      }
      if ($scope.charts == null) {
        $scope.charts = {};
      }
      if ($scope.trial == null) {
        $scope.trial = {};
      }
      if ($scope.alerts == null) {
        $scope.alerts = [];
      }
      $scope.trial.hasData = false;
      $scope.connected = serverCommunicator.connected;
      $scope._trial = serverCommunicator.trial;
      onEndTrial = function (name) {
        return $scope.alerts.push({
          'type': 'info',
          'title': name,
          'content': 'finished at ' + new Date() + '.'
        });
      };
      timerPromise = null;
      timerCallback = function () {
        $scope.trial.timeRemaining -= trialTimeInterval;
        if ($scope.trial.timeRemaining < 0) {
          $scope.trial.timeRemaining = 0;
        }
        calculateTime($scope);
        if (!$scope.trial.active) {
          $timeout.cancel(timerPromise);
          return timerPromise = null;
        } else {
          return timerPromise = $timeout(timerCallback, trialTimeInterval);
        }
      };
      $scope.$watch($scope._trial, function (trial, oldTrial) {
        $scope.trial.active = trial.active;
        $scope.trial.timeRemaining = trial.timeRemaining;
        $scope.trial.name = trial.name;
        calculateTime($scope);
        if (trial.active && timerPromise === null) {
          timerPromise = $timeout(timerCallback, trialTimeInterval);
        } else if (!trial.active) {
          $timeout.cancel(timerPromise);
          timerPromise = null;
        }
        if (!trial.active && oldTrial.active) {
          return onEndTrial(trial.name);
        }
      }, true);
      return $scope.trial.endTrial = function () {
        return serverCommunicator.endTrial();
      };
    }
  ]);
}.call(this));
(function () {
  'use strict';
  var calculateTime, trialTimeInterval;
  trialTimeInterval = 1000;
  calculateTime = function (scope) {
    var seconds;
    scope.trial.minutes = Math.floor(scope.trial.timeRemaining / (60 * 1000));
    seconds = Math.floor(scope.trial.timeRemaining % (60 * 1000) / 1000);
    if (seconds.toString().length === 1) {
      return scope.trial.seconds = '0' + seconds;
    } else {
      return scope.trial.seconds = seconds;
    }
  };
  angular.module('NeuroSandCubeConsoleApp').controller('MainCtrl', [
    '$scope',
    '$timeout',
    'socket',
    'serverCommunicator',
    function ($scope, $timeout, socket, serverCommunicator) {
      var onEndTrial, timerCallback, timerPromise, _ref, _ref1, _ref2, _ref3;
      console.log('Main ctrl');
      if ((_ref = $scope.states) == null) {
        $scope.states = {};
      }
      if ((_ref1 = $scope.charts) == null) {
        $scope.charts = {};
      }
      if ((_ref2 = $scope.trial) == null) {
        $scope.trial = {};
      }
      if ((_ref3 = $scope.alerts) == null) {
        $scope.alerts = [];
      }
      $scope.trial.hasData = false;
      $scope.connected = serverCommunicator.connected;
      $scope._trial = serverCommunicator.trial;
      onEndTrial = function (name) {
        return $scope.alerts.push({
          'type': 'info',
          'title': name,
          'content': 'finished at ' + new Date() + '.'
        });
      };
      timerPromise = null;
      timerCallback = function () {
        $scope.trial.timeRemaining -= trialTimeInterval;
        if ($scope.trial.timeRemaining < 0) {
          $scope.trial.timeRemaining = 0;
        }
        calculateTime($scope);
        if (!$scope.trial.active) {
          $timeout.cancel(timerPromise);
          return timerPromise = null;
        } else {
          return timerPromise = $timeout(timerCallback, trialTimeInterval);
        }
      };
      $scope.$watch($scope._trial, function (trial, oldTrial) {
        $scope.trial.active = trial.active;
        $scope.trial.timeRemaining = trial.timeRemaining;
        $scope.trial.name = trial.name;
        calculateTime($scope);
        if (trial.active && timerPromise === null) {
          timerPromise = $timeout(timerCallback, trialTimeInterval);
        } else if (!trial.active) {
          $timeout.cancel(timerPromise);
          timerPromise = null;
        }
        if (!trial.active && oldTrial.active) {
          return onEndTrial(trial.name);
        }
      }, true);
      return $scope.trial.endTrial = function () {
        return serverCommunicator.endTrial();
      };
    }
  ]);
}.call(this));
(function () {
  'use strict';
  var enforceLength2;
  enforceLength2 = function (val) {
    if (val.toString().length === 1) {
      return '0' + val;
    } else {
      return val;
    }
  };
  angular.module('NeuroSandCubeConsoleApp').controller('StarttrialCtrl', [
    '$location',
    '$scope',
    'socket',
    function ($location, $scope, socket) {
      if ($scope.trial == null) {
        $scope.trial = {};
      }
      $scope.defaults = function () {
        var date, day, hour, minute, month, year;
        $scope.trial.name = '';
        $scope.trial.animal = '';
        $scope.trial.length = 30;
        date = new Date();
        day = enforceLength2(date.getDate());
        year = date.getFullYear();
        month = enforceLength2(date.getMonth() + 1);
        hour = enforceLength2(date.getHours());
        minute = enforceLength2(date.getMinutes());
        $scope.trial.date = year + '-' + month + '-' + day;
        return $scope.trial.time = hour + ':' + minute;
      };
      $scope.startTrial = function () {
        $location.path('/console');
        return socket.emit('trial', $scope.trial, function () {
        });
      };
      return $scope.defaults();
    }
  ]);
}.call(this));
(function () {
  'use strict';
  var enforceLength2;
  enforceLength2 = function (val) {
    if (val.toString().length === 1) {
      return '0' + val;
    } else {
      return val;
    }
  };
  angular.module('NeuroSandCubeConsoleApp').controller('StarttrialCtrl', [
    '$location',
    '$scope',
    'socket',
    function ($location, $scope, socket) {
      var _ref;
      if ((_ref = $scope.trial) == null) {
        $scope.trial = {};
      }
      $scope.defaults = function () {
        var date, day, hour, minute, month, year;
        $scope.trial.name = '';
        $scope.trial.animal = '';
        $scope.trial.length = 30;
        date = new Date();
        day = enforceLength2(date.getDay());
        year = date.getFullYear();
        month = enforceLength2(date.getMonth());
        hour = enforceLength2(date.getHours());
        minute = enforceLength2(date.getMinutes());
        $scope.trial.date = year + '-' + month + '-' + day;
        return $scope.trial.time = hour + ':' + minute;
      };
      $scope.startTrial = function () {
        $location.path('/console');
        return socket.emit('trial', $scope.trial, function () {
        });
      };
      return $scope.defaults();
    }
  ]);
}.call(this));
(function () {
  'use strict';
  angular.module('NeuroSandCubeConsoleApp').controller('ConsoleCtrl', [
    '$scope',
    'socket',
    function ($scope, socket) {
      console.log('Console ctrl');
      if ($scope.commandIDs == null) {
        $scope.commandIDs = [
          'restart_map',
          'reset_counter',
          'flush_water_reward',
          'issue_reward'
        ];
      }
      if ($scope.commandTargets == null) {
        $scope.commandTargets = [
          'level_restart',
          'player_x',
          'player_y',
          'player_left_click',
          'player_right_click',
          'teleport',
          'player_angle',
          'distance_traveled',
          'trial_start',
          'correct_trial',
          'incorrect_trial',
          'reward_issued'
        ];
      }
      return $scope.sendCommand = function () {
        var command;
        command = {};
        command.id = $scope.commandId;
        command.target = $scope.commandTarget;
        return socket.emit('command', command, function () {
        });
      };
    }
  ]);
}.call(this));
(function () {
  'use strict';
  angular.module('NeuroSandCubeConsoleApp').controller('ConsoleCtrl', [
    '$scope',
    'socket',
    function ($scope, socket) {
      var _ref, _ref1;
      console.log('Console ctrl');
      if ((_ref = $scope.commandIDs) == null) {
        $scope.commandIDs = [
          'restart_map',
          'reset_counter',
          'flush_water_reward',
          'issue_reward'
        ];
      }
      if ((_ref1 = $scope.commandTargets) == null) {
        $scope.commandTargets = [
          'level_restart',
          'player_x',
          'player_y',
          'player_left_click',
          'player_right_click',
          'teleport',
          'player_angle',
          'distance_traveled',
          'trial_start',
          'correct_trial',
          'incorrect_trial',
          'reward_issued'
        ];
      }
      return $scope.sendCommand = function () {
        var command;
        command = {};
        command.id = $scope.commandId;
        command.target = $scope.commandTarget;
        return socket.emit('command', command, function () {
        });
      };
    }
  ]);
}.call(this));
(function () {
  'use strict';
  var getBaseURL;
  getBaseURL = function () {
    return location.protocol + '//' + location.hostname + (location.port && ':' + location.port) + '/';
  };
  angular.module('NeuroSandCubeConsoleApp').controller('LogsCtrl', [
    '$scope',
    'socket',
    function ($scope, socket) {
      $scope.getLogs = function () {
        $scope.logs = [];
        return socket.emit('logs_request', {}, function () {
        });
      };
      socket.on('logs', function (logs) {
        var i, log, _results;
        i = 0;
        _results = [];
        while (i < logs.length) {
          log = {};
          log.url = getBaseURL() + 'log/' + i.toString();
          log.name = logs[i];
          $scope.logs.push(log);
          _results.push(++i);
        }
        return _results;
      });
      if (!($scope.logs != null)) {
        return $scope.getLogs();
      }
    }
  ]);
}.call(this));
(function () {
  'use strict';
  var getBaseURL;
  getBaseURL = function () {
    return location.protocol + '//' + location.hostname + (location.port && ':' + location.port) + '/';
  };
  angular.module('NeuroSandCubeConsoleApp').controller('LogsCtrl', [
    '$scope',
    'socket',
    function ($scope, socket) {
      $scope.getLogs = function () {
        $scope.logs = [];
        return socket.emit('logs_request', {}, function () {
        });
      };
      socket.on('logs', function (logs) {
        var i, log, _results;
        i = 0;
        _results = [];
        while (i < logs.length) {
          log = {};
          log.url = getBaseURL() + 'log/' + i.toString();
          log.name = logs[i];
          $scope.logs.push(log);
          _results.push(++i);
        }
        return _results;
      });
      if (!($scope.logs != null)) {
        return $scope.getLogs();
      }
    }
  ]);
}.call(this));
(function () {
  'use strict';
  var DataID, getBaseURL, throttle;
  DataID = 'nsc';
  getBaseURL = function () {
    return location.protocol + '//' + location.hostname + (location.port && ':' + location.port) + '/';
  };
  throttle = function (f, wait) {
    var args, context, later, previous, timeout;
    previous = 0;
    context = null;
    args = null;
    timeout = null;
    later = function () {
      var result;
      previous = new Date();
      timeout = null;
      return result = f.apply(context, args);
    };
    return function () {
      var now, remaining, result;
      now = new Date();
      remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };
  angular.module('NeuroSandCubeConsoleApp').factory('socket', [
    '$rootScope',
    function ($rootScope) {
      var socket, url;
      url = getBaseURL();
      socket = io.connect(url);
      return {
        on: function (eventName, callback) {
          return socket.on(eventName, _.throttle(function () {
            var args;
            args = arguments;
            return $rootScope.$apply(function () {
              return callback.apply(socket, args);
            });
          }, 100));
        },
        emit: function (eventName, data, callback) {
          return socket.emit(eventName, data, function () {
            var args;
            args = arguments;
            return $rootScope.$apply(function () {
              if (callback) {
                return callback.apply(socket, args);
              }
            });
          });
        }
      };
    }
  ]);
}.call(this));
(function () {
  'use strict';
  var DataID, getBaseURL, throttle;
  DataID = 'nsc';
  getBaseURL = function () {
    return location.protocol + '//' + location.hostname + (location.port && ':' + location.port) + '/';
  };
  throttle = function (f, wait) {
    var args, context, later, previous, timeout;
    previous = 0;
    context = null;
    args = null;
    timeout = null;
    later = function () {
      var result;
      previous = new Date();
      timeout = null;
      return result = f.apply(context, args);
    };
    return function () {
      var now, remaining, result;
      now = new Date();
      remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };
  angular.module('NeuroSandCubeConsoleApp').factory('socket', [
    '$rootScope',
    function ($rootScope) {
      var socket, url;
      url = getBaseURL();
      socket = io.connect(url);
      return {
        on: function (eventName, callback) {
          return socket.on(eventName, _.throttle(function () {
            var args;
            args = arguments;
            return $rootScope.$apply(function () {
              return callback.apply(socket, args);
            });
          }, 100));
        },
        emit: function (eventName, data, callback) {
          return socket.emit(eventName, data, function () {
            var args;
            args = arguments;
            return $rootScope.$apply(function () {
              if (callback) {
                return callback.apply(socket, args);
              }
            });
          });
        }
      };
    }
  ]);
}.call(this));
(function () {
  'use strict';
  angular.module('NeuroSandCubeConsoleApp').directive('dynamichighchart', function () {
    var getMergedOptions;
    getMergedOptions = function (element, options) {
      var defaultOptions, mergedOptions;
      defaultOptions = {
        chart: {
          renderTo: element[0],
          animation: false,
          width: 300,
          height: 200,
          shadow: false
        },
        credits: { enabled: false },
        legend: { enabled: false },
        tooltip: { enabled: false },
        title: {},
        series: [{
            data: [],
            enableMouseTracking: false
          }]
      };
      mergedOptions = {};
      if (options != null) {
        mergedOptions = $.extend(true, {}, defaultOptions, options);
      } else {
        mergedOptions = defaultOptions;
      }
      return mergedOptions;
    };
    return {
      restrict: 'E',
      replace: false,
      scope: {
        series: '=',
        options: '=',
        title: '='
      },
      link: function (scope, element, attrs) {
        var chart, mergedOptions;
        mergedOptions = getMergedOptions(element, scope.options);
        chart = new Highcharts.Chart(mergedOptions);
        chart.setTitle(scope.title, true);
        return scope.$watch('series', function (newSeries, oldSeries) {
          var chartSeries, numPoints, point, shift, _i, _len, _ref, _results;
          chartSeries = chart.series[0];
          numPoints = chartSeries.data.length;
          shift = false;
          if (numPoints >= 30) {
            shift = true;
          }
          _ref = newSeries[0].data;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            point = _ref[_i];
            _results.push(chartSeries.addPoint([
              point.x,
              point.y
            ], true, shift, false));
          }
          return _results;
        }, false);
      }
    };
  });
}.call(this));
(function () {
  'use strict';
  angular.module('NeuroSandCubeConsoleApp').directive('dynamichighchart', function () {
    var getMergedOptions;
    getMergedOptions = function (element, options) {
      var defaultOptions, mergedOptions;
      defaultOptions = {
        chart: {
          renderTo: element[0],
          animation: false,
          width: 300,
          height: 200,
          shadow: false
        },
        credits: { enabled: false },
        legend: { enabled: false },
        tooltip: { enabled: false },
        title: {},
        series: [{
            data: [],
            enableMouseTracking: false
          }]
      };
      mergedOptions = {};
      if (options != null) {
        mergedOptions = $.extend(true, {}, defaultOptions, options);
      } else {
        mergedOptions = defaultOptions;
      }
      return mergedOptions;
    };
    return {
      restrict: 'E',
      replace: false,
      scope: {
        series: '=',
        options: '=',
        title: '='
      },
      link: function (scope, element, attrs) {
        var chart, mergedOptions;
        mergedOptions = getMergedOptions(element, scope.options);
        chart = new Highcharts.Chart(mergedOptions);
        chart.setTitle(scope.title, true);
        return scope.$watch('series', function (newSeries, oldSeries) {
          var chartSeries, numPoints, point, shift, _i, _len, _ref, _results;
          chartSeries = chart.series[0];
          numPoints = chartSeries.data.length;
          shift = false;
          if (numPoints >= 30) {
            shift = true;
          }
          _ref = newSeries[0].data;
          _results = [];
          for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            point = _ref[_i];
            _results.push(chartSeries.addPoint([
              point.x,
              point.y
            ], true, shift, false));
          }
          return _results;
        }, false);
      }
    };
  });
}.call(this));
(function () {
  'use strict';
  angular.module('NeuroSandCubeConsoleApp').factory('serverCommunicator', [
    '$rootScope',
    'socket',
    function ($rootScope, socket) {
      var connected, endTrial, newStates, _trial;
      _trial = {};
      newStates = {};
      connected = false;
      socket.on('connection', function (connection) {
        return connected = connection.connected;
      });
      endTrial = function () {
        return socket.emit('stop_trial', {}, function () {
        });
      };
      socket.on('trial_progress', function (trial) {
        _trial.active = trial.active;
        _trial.timeRemaining = trial.time;
        return _trial.name = trial.name;
      });
      socket.on('nsc', function (data) {
        var date, frame, states, timestamp;
        states = JSON.parse(data);
        if (!_.any(states, function (obj) {
            return obj.id === 'timestamp';
          })) {
          return;
        }
        timestamp = _.findWhere(states, { id: 'timestamp' }).value;
        newStates = {};
        date = new Date();
        date.setTime(timestamp);
        frame = _.findWhere(states, { id: 'frame' }).value;
        return _.forEach(states, function (state) {
          var _ref;
          if (!((_ref = state.id) === 'timestamp' || _ref === 'frame')) {
            return newStates[state.id] = {
              value: state.value,
              count: state.change_count,
              time: date.getTime(),
              frame: frame
            };
          }
        });
      });
      return {
        connected: function () {
          return connected;
        },
        trial: function () {
          return _trial;
        },
        newStates: function () {
          return newStates;
        },
        endTrial: endTrial
      };
    }
  ]);
}.call(this));
(function () {
  'use strict';
  angular.module('NeuroSandCubeConsoleApp').factory('serverCommunicator', [
    '$rootScope',
    'socket',
    function ($rootScope, socket) {
      var connected, endTrial, newStates, _trial;
      _trial = {};
      newStates = {};
      connected = false;
      socket.on('connection', function (connection) {
        return connected = connection.connected;
      });
      endTrial = function () {
        return socket.emit('stop_trial', {}, function () {
        });
      };
      socket.on('trial_progress', function (trial) {
        _trial.active = trial.active;
        _trial.timeRemaining = trial.time;
        return _trial.name = trial.name;
      });
      socket.on('nsc', function (data) {
        var date, frame, states, timestamp;
        states = JSON.parse(data);
        if (!_.any(states, function (obj) {
            return obj.id === 'timestamp';
          })) {
          return;
        }
        timestamp = _.findWhere(states, { id: 'timestamp' }).value;
        newStates = {};
        date = new Date();
        date.setTime(timestamp);
        frame = _.findWhere(states, { id: 'frame' }).value;
        return _.forEach(states, function (state) {
          var _ref;
          if (!((_ref = state.id) === 'timestamp' || _ref === 'frame')) {
            return newStates[state.id] = {
              value: state.value,
              count: state.change_count,
              time: date.getTime(),
              frame: frame
            };
          }
        });
      });
      return {
        connected: function () {
          return connected;
        },
        trial: function () {
          return _trial;
        },
        newStates: function () {
          return newStates;
        },
        endTrial: endTrial
      };
    }
  ]);
}.call(this));
(function () {
  'use strict';
  angular.module('NeuroSandCubeConsoleApp').controller('TableStateCtrl', [
    '$scope',
    'socket',
    'serverCommunicator',
    function ($scope, socket, serverCommunicator) {
      $scope.newStates = serverCommunicator.newStates;
      return $scope.$watch($scope.newStates, function (newStates, oldStates) {
        var state;
        for (state in newStates) {
          $scope.states[state] = newStates[state];
        }
        if (newStates !== oldStates) {
          return $scope.trial.hasData = true;
        }
      }, true);
    }
  ]);
}.call(this));
(function () {
  'use strict';
  angular.module('NeuroSandCubeConsoleApp').controller('TableStateCtrl', [
    '$scope',
    'socket',
    'serverCommunicator',
    function ($scope, socket, serverCommunicator) {
      $scope.newStates = serverCommunicator.newStates;
      return $scope.$watch($scope.newStates, function (newStates, oldStates) {
        var state;
        for (state in newStates) {
          $scope.states[state] = newStates[state];
        }
        if (newStates !== oldStates) {
          return $scope.trial.hasData = true;
        }
      }, true);
    }
  ]);
}.call(this));
(function () {
  'use strict';
  var createChart;
  createChart = function (id, state) {
    return {
      options: {
        chart: { type: 'line' },
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150
        },
        series: [{
            data: [{
                x: state.time,
                y: state.value
              }]
          }]
      },
      series: [{
          data: [{
              x: state.time,
              y: state.value
            }]
        }],
      title: { text: id }
    };
  };
  angular.module('NeuroSandCubeConsoleApp').controller('GraphStateCtrl', [
    '$scope',
    'serverCommunicator',
    function ($scope, serverCommunicator) {
      $scope.newStates = serverCommunicator.newStates;
      return $scope.$watch($scope.newStates, function (newStates, oldStates) {
        var id, state, _results;
        _results = [];
        for (id in newStates) {
          state = newStates[id];
          if (!(id === 'trial_start')) {
            if (!(id in $scope.charts)) {
              $scope.charts[id] = createChart(id, state);
            }
            $scope.charts[id].series = [{ data: [] }];
            _results.push($scope.charts[id].series[0].data.push({
              x: state.time,
              y: state.value
            }));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      }, true);
    }
  ]);
}.call(this));
(function () {
  'use strict';
  var createChart;
  createChart = function (id, state) {
    return {
      options: {
        chart: { type: 'line' },
        xAxis: {
          type: 'datetime',
          tickPixelInterval: 150
        },
        series: [{
            data: [{
                x: state.time,
                y: state.value
              }]
          }]
      },
      series: [{
          data: [{
              x: state.time,
              y: state.value
            }]
        }],
      title: { text: id }
    };
  };
  angular.module('NeuroSandCubeConsoleApp').controller('GraphStateCtrl', [
    '$scope',
    'serverCommunicator',
    function ($scope, serverCommunicator) {
      $scope.newStates = serverCommunicator.newStates;
      return $scope.$watch($scope.newStates, function (newStates, oldStates) {
        var id, state, _results;
        _results = [];
        for (id in newStates) {
          state = newStates[id];
          if (!(id in $scope.charts || id === 'trial_start')) {
            $scope.charts[id] = createChart(id, state);
          }
          $scope.charts[id].series = [{ data: [] }];
          _results.push($scope.charts[id].series[0].data.push({
            x: state.time,
            y: state.value
          }));
        }
        return _results;
      }, true);
    }
  ]);
}.call(this));
(function () {
  'use strict';
  angular.module('NeuroSandCubeConsoleApp').controller('MapCtrl', [
    '$scope',
    'serverCommunicator',
    function ($scope, serverCommunicator) {
      if ($scope.x == null) {
        $scope.x = 0;
      }
      if ($scope.y == null) {
        $scope.y = 0;
      }
      if ($scope.angle == null) {
        $scope.angle = 0;
      }
      $scope.newStates = serverCommunicator.newStates;
      return $scope.$watch($scope.newStates, function (newStates, oldStates) {
        var angleState, xState, yState;
        xState = newStates['player_x'];
        yState = newStates['player_y'];
        angleState = newStates['player_angle'];
        if (xState != null) {
          $scope.y = (xState.value - 450) / 2;
        }
        if (yState != null) {
          $scope.x = 300 - (yState.value - 280) / 2 - 35;
        }
        if (angleState != null) {
          return $scope.angle = angleState.value;
        }
      }, true);
    }
  ]);
}.call(this));
(function () {
  'use strict';
  angular.module('NeuroSandCubeConsoleApp').controller('MapCtrl', [
    '$scope',
    'serverCommunicator',
    function ($scope, serverCommunicator) {
      var _ref, _ref1, _ref2;
      if ((_ref = $scope.x) == null) {
        $scope.x = 0;
      }
      if ((_ref1 = $scope.y) == null) {
        $scope.y = 0;
      }
      if ((_ref2 = $scope.angle) == null) {
        $scope.angle = 0;
      }
      $scope.newStates = serverCommunicator.newStates;
      return $scope.$watch($scope.newStates, function (newStates, oldStates) {
        var angleState, xState, yState;
        xState = newStates['player_x'];
        yState = newStates['player_y'];
        angleState = newStates['player_angle'];
        if (xState != null) {
          $scope.y = (xState.value - 450) / 2;
        }
        if (yState != null) {
          $scope.x = 300 - (yState.value - 280) / 2 - 35;
        }
        if (angleState != null) {
          return $scope.angle = angleState.value;
        }
      }, true);
    }
  ]);
}.call(this));
(function () {
  'use strict';
  angular.module('NeuroSandCubeConsoleApp').filter('localDate', function () {
    return function (input) {
      var date, enforceLength2;
      enforceLength2 = function (val) {
        if (val.toString().length === 1) {
          return '0' + val;
        } else {
          return val;
        }
      };
      date = new Date(input);
      return enforceLength2(date.getUTCHours()) + ':' + enforceLength2(date.getUTCMinutes()) + ':' + enforceLength2(date.getUTCSeconds());
    };
  });
}.call(this));
(function () {
  'use strict';
  angular.module('NeuroSandCubeConsoleApp').filter('localDate', function () {
    return function (input) {
      var date, enforceLength2;
      enforceLength2 = function (val) {
        if (val.toString().length === 1) {
          return '0' + val;
        } else {
          return val;
        }
      };
      date = new Date(input);
      return enforceLength2(date.getUTCHours()) + ':' + enforceLength2(date.getUTCMinutes()) + ':' + enforceLength2(date.getUTCSeconds());
    };
  });
}.call(this));