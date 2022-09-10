(function () {
    var t,
        e,
        n,
        r,
        a,
        o,
        i,
        u,
        l,
        c,
        s,
        h,
        p,
        g,
        f,
        d,
        v,
        m,
        y,
        C,
        T,
        w,
        $,
        D,
        S = [].slice,
        k =
            [].indexOf ||
            function (t) {
                for (var e = 0, n = this.length; n > e; e++) if (e in this && this[e] === t) return e;
                return -1;
            };
    (t = window.jQuery || window.Zepto || window.$),
        (t.payment = {}),
        (t.payment.fn = {}),
        (t.fn.payment = function () {
            var e, n;
            return (n = arguments[0]), (e = 2 <= arguments.length ? S.call(arguments, 1) : []), t.payment.fn[n].apply(this, e);
        }),
        (a = /(\d{1,4})/g),
        (t.payment.cards = r = [
            { type: "visaelectron", pattern: /^4(026|17500|405|508|844|91[37])/, format: a, length: [16], cvcLength: [3], luhn: !0 },
            { type: "maestro", pattern: /^(5(018|0[23]|[68])|6(39|7))/, format: a, length: [12, 13, 14, 15, 16, 17, 18, 19], cvcLength: [3], luhn: !0 },
            { type: "forbrugsforeningen", pattern: /^600/, format: a, length: [16], cvcLength: [3], luhn: !0 },
            { type: "dankort", pattern: /^5019/, format: a, length: [16], cvcLength: [3], luhn: !0 },
            { type: "visa", pattern: /^4/, format: a, length: [13, 16], cvcLength: [3], luhn: !0 },
            { type: "mastercard", pattern: /^(5[1-5]|2[2-7])/, format: a, length: [16], cvcLength: [3], luhn: !0 },
            { type: "amex", pattern: /^3[47]/, format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/, length: [15], cvcLength: [3, 4], luhn: !0 },
            { type: "dinersclub", pattern: /^3[0689]/, format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/, length: [14], cvcLength: [3], luhn: !0 },
            { type: "discover", pattern: /^6([045]|22)/, format: a, length: [16], cvcLength: [3], luhn: !0 },
            { type: "unionpay", pattern: /^(62|88)/, format: a, length: [16, 17, 18, 19], cvcLength: [3], luhn: !1 },
            { type: "jcb", pattern: /^35/, format: a, length: [16], cvcLength: [3], luhn: !0 },
        ]),
        (e = function (t) {
            var e, n, a;
            for (t = (t + "").replace(/\D/g, ""), n = 0, a = r.length; a > n; n++) if (((e = r[n]), e.pattern.test(t))) return e;
        }),
        (n = function (t) {
            var e, n, a;
            for (n = 0, a = r.length; a > n; n++) if (((e = r[n]), e.type === t)) return e;
        }),
        (p = function (t) {
            var e, n, r, a, o, i;
            for (r = !0, a = 0, n = (t + "").split("").reverse(), o = 0, i = n.length; i > o; o++) (e = n[o]), (e = parseInt(e, 10)), (r = !r) && (e *= 2), e > 9 && (e -= 9), (a += e);
            return a % 10 === 0;
        }),
        (h = function (t) {
            var e;
            return null != t.prop("selectionStart") && t.prop("selectionStart") !== t.prop("selectionEnd")
                ? !0
                : null != ("undefined" != typeof document && null !== document && null != (e = document.selection) ? e.createRange : void 0) && document.selection.createRange().text
                ? !0
                : !1;
        }),
        ($ = function (t, e) {
            var n, r, a;
            try {
                n = e.prop("selectionStart");
            } catch (o) {
                (r = o), (n = null);
            }
            return (a = e.val()), e.val(t), null !== n && e.is(":focus") ? (n === a.length && (n = t.length), e.prop("selectionStart", n), e.prop("selectionEnd", n)) : void 0;
        }),
        (m = function (t) {
            var e, n, r, a, o, i, u, l;
            for (null == t && (t = ""), r = "０１２３４５６７８９", a = "0123456789", i = "", n = t.split(""), u = 0, l = n.length; l > u; u++) (e = n[u]), (o = r.indexOf(e)), o > -1 && (e = a[o]), (i += e);
            return i;
        }),
        (v = function (e) {
            return setTimeout(function () {
                var n, r;
                return (n = t(e.currentTarget)), (r = n.val()), (r = m(r)), (r = r.replace(/\D/g, "")), $(r, n);
            });
        }),
        (f = function (e) {
            return setTimeout(function () {
                var n, r;
                return (n = t(e.currentTarget)), (r = n.val()), (r = m(r)), (r = t.payment.formatCardNumber(r)), $(r, n);
            });
        }),
        (u = function (n) {
            var r, a, o, i, u, l, c;
            return (
                (o = String.fromCharCode(n.which)),
                !/^\d+$/.test(o) ||
                ((r = t(n.currentTarget)),
                (c = r.val()),
                (a = e(c + o)),
                (i = (c.replace(/\D/g, "") + o).length),
                (l = 16),
                a && (l = a.length[a.length.length - 1]),
                i >= l || (null != r.prop("selectionStart") && r.prop("selectionStart") !== c.length))
                    ? void 0
                    : ((u = a && "amex" === a.type ? /^(\d{4}|\d{4}\s\d{6})$/ : /(?:^|\s)(\d{4})$/),
                      u.test(c)
                          ? (n.preventDefault(),
                            setTimeout(function () {
                                return r.val(c + " " + o);
                            }))
                          : u.test(c + o)
                          ? (n.preventDefault(),
                            setTimeout(function () {
                                return r.val(c + o + " ");
                            }))
                          : void 0)
            );
        }),
        (o = function (e) {
            var n, r;
            return (
                (n = t(e.currentTarget)),
                (r = n.val()),
                8 !== e.which || (null != n.prop("selectionStart") && n.prop("selectionStart") !== r.length)
                    ? void 0
                    : /\d\s$/.test(r)
                    ? (e.preventDefault(),
                      setTimeout(function () {
                          return n.val(r.replace(/\d\s$/, ""));
                      }))
                    : /\s\d?$/.test(r)
                    ? (e.preventDefault(),
                      setTimeout(function () {
                          return n.val(r.replace(/\d$/, ""));
                      }))
                    : void 0
            );
        }),
        (d = function (e) {
            return setTimeout(function () {
                var n, r;
                return (n = t(e.currentTarget)), (r = n.val()), (r = m(r)), (r = t.payment.formatExpiry(r)), $(r, n);
            });
        }),
        (l = function (e) {
            var n, r, a;
            return (
                (r = String.fromCharCode(e.which)),
                /^\d+$/.test(r)
                    ? ((n = t(e.currentTarget)),
                      (a = n.val() + r),
                      /^\d$/.test(a) && "0" !== a && "1" !== a
                          ? (e.preventDefault(),
                            setTimeout(function () {
                                return n.val("0" + a + " / ");
                            }))
                          : /^\d\d$/.test(a)
                          ? (e.preventDefault(),
                            setTimeout(function () {
                                return n.val("" + a + " / ");
                            }))
                          : void 0)
                    : void 0
            );
        }),
        (c = function (e) {
            var n, r, a;
            return (r = String.fromCharCode(e.which)), /^\d+$/.test(r) ? ((n = t(e.currentTarget)), (a = n.val()), /^\d\d$/.test(a) ? n.val("" + a + " / ") : void 0) : void 0;
        }),
        (s = function (e) {
            var n, r, a;
            return (a = String.fromCharCode(e.which)), "/" === a || " " === a ? ((n = t(e.currentTarget)), (r = n.val()), /^\d$/.test(r) && "0" !== r ? n.val("0" + r + " / ") : void 0) : void 0;
        }),
        (i = function (e) {
            var n, r;
            return (
                (n = t(e.currentTarget)),
                (r = n.val()),
                8 !== e.which || (null != n.prop("selectionStart") && n.prop("selectionStart") !== r.length)
                    ? void 0
                    : /\d\s\/\s$/.test(r)
                    ? (e.preventDefault(),
                      setTimeout(function () {
                          return n.val(r.replace(/\d\s\/\s$/, ""));
                      }))
                    : void 0
            );
        }),
        (g = function (e) {
            return setTimeout(function () {
                var n, r;
                return (n = t(e.currentTarget)), (r = n.val()), (r = m(r)), (r = r.replace(/\D/g, "").slice(0, 4)), $(r, n);
            });
        }),
        (w = function (t) {
            var e;
            return t.metaKey || t.ctrlKey ? !0 : 32 === t.which ? !1 : 0 === t.which ? !0 : t.which < 33 ? !0 : ((e = String.fromCharCode(t.which)), !!/[\d\s]/.test(e));
        }),
        (C = function (n) {
            var r, a, o, i;
            return (r = t(n.currentTarget)), (o = String.fromCharCode(n.which)), /^\d+$/.test(o) && !h(r) ? ((i = (r.val() + o).replace(/\D/g, "")), (a = e(i)), a ? i.length <= a.length[a.length.length - 1] : i.length <= 16) : void 0;
        }),
        (T = function (e) {
            var n, r, a;
            return (n = t(e.currentTarget)), (r = String.fromCharCode(e.which)), /^\d+$/.test(r) && !h(n) ? ((a = n.val() + r), (a = a.replace(/\D/g, "")), a.length > 6 ? !1 : void 0) : void 0;
        }),
        (y = function (e) {
            var n, r, a;
            return (n = t(e.currentTarget)), (r = String.fromCharCode(e.which)), /^\d+$/.test(r) && !h(n) ? ((a = n.val() + r), a.length <= 4) : void 0;
        }),
        (D = function (e) {
            var n, a, o, i, u;
            return (
                (n = t(e.currentTarget)),
                (u = n.val()),
                (i = t.payment.cardType(u) || "unknown"),
                n.hasClass(i)
                    ? void 0
                    : ((a = (function () {
                          var t, e, n;
                          for (n = [], t = 0, e = r.length; e > t; t++) (o = r[t]), n.push(o.type);
                          return n;
                      })()),
                      n.removeClass("unknown"),
                      n.removeClass(a.join(" ")),
                      n.addClass(i),
                      n.toggleClass("identified", "unknown" !== i),
                      n.trigger("payment.cardType", i))
            );
        }),
        (t.payment.fn.formatCardCVC = function () {
            return this.on("keypress", w), this.on("keypress", y), this.on("paste", g), this.on("change", g), this.on("input", g), this;
        }),
        (t.payment.fn.formatCardExpiry = function () {
            return this.on("keypress", w), this.on("keypress", T), this.on("keypress", l), this.on("keypress", s), this.on("keypress", c), this.on("keydown", i), this.on("change", d), this.on("input", d), this;
        }),
        (t.payment.fn.formatCardNumber = function () {
            return this.on("keypress", w), this.on("keypress", C), this.on("keypress", u), this.on("keydown", o), this.on("keyup", D), this.on("paste", f), this.on("change", f), this.on("input", f), this.on("input", D), this;
        }),
        (t.payment.fn.restrictNumeric = function () {
            return this.on("keypress", w), this.on("paste", v), this.on("change", v), this.on("input", v), this;
        }),
        (t.payment.fn.cardExpiryVal = function () {
            return t.payment.cardExpiryVal(t(this).val());
        }),
        (t.payment.cardExpiryVal = function (t) {
            var e, n, r, a;
            return (
                (a = t.split(/[\s\/]+/, 2)),
                (e = a[0]),
                (r = a[1]),
                2 === (null != r ? r.length : void 0) && /^\d+$/.test(r) && ((n = new Date().getFullYear()), (n = n.toString().slice(0, 2)), (r = n + r)),
                (e = parseInt(e, 10)),
                (r = parseInt(r, 10)),
                { month: e, year: r }
            );
        }),
        (t.payment.validateCardNumber = function (t) {
            var n, r;
            return (t = (t + "").replace(/\s+|-/g, "")), /^\d+$/.test(t) ? ((n = e(t)), n ? ((r = t.length), k.call(n.length, r) >= 0 && (n.luhn === !1 || p(t))) : !1) : !1;
        }),
        (t.payment.validateCardExpiry = function (e, n) {
            var r, a, o;
            return (
                "object" == typeof e && "month" in e && ((o = e), (e = o.month), (n = o.year)),
                e && n
                    ? ((e = t.trim(e)),
                      (n = t.trim(n)),
                      /^\d+$/.test(e) && /^\d+$/.test(n) && e >= 1 && 12 >= e
                          ? (2 === n.length && (n = 70 > n ? "20" + n : "19" + n), 4 !== n.length ? !1 : ((a = new Date(n, e)), (r = new Date()), a.setMonth(a.getMonth() - 1), a.setMonth(a.getMonth() + 1, 1), a > r))
                          : !1)
                    : !1
            );
        }),
        (t.payment.validateCardCVC = function (e, r) {
            var a, o;
            return (e = t.trim(e)), /^\d+$/.test(e) ? ((a = n(r)), null != a ? ((o = e.length), k.call(a.cvcLength, o) >= 0) : e.length >= 3 && e.length <= 4) : !1;
        }),
        (t.payment.cardType = function (t) {
            var n;
            return t ? (null != (n = e(t)) ? n.type : void 0) || null : null;
        }),
        (t.payment.formatCardNumber = function (n) {
            var r, a, o, i;
            return (
                (n = n.replace(/\D/g, "")),
                (r = e(n))
                    ? ((o = r.length[r.length.length - 1]),
                      (n = n.slice(0, o)),
                      r.format.global
                          ? null != (i = n.match(r.format))
                              ? i.join(" ")
                              : void 0
                          : ((a = r.format.exec(n)),
                            null != a
                                ? (a.shift(),
                                  (a = t.grep(a, function (t) {
                                      return t;
                                  })),
                                  a.join(" "))
                                : void 0))
                    : n
            );
        }),
        (t.payment.formatExpiry = function (t) {
            var e, n, r, a;
            return (n = t.match(/^\D*(\d{1,2})(\D+)?(\d{1,2})?/))
                ? ((e = n[1] || ""),
                  (r = n[2] || ""),
                  (a = n[3] || ""),
                  a.length > 0 ? (r = " / ") : " /" === r ? ((e = e.substring(0, 1)), (r = "")) : 2 === e.length || r.length > 0 ? (r = " / ") : 1 === e.length && "0" !== e && "1" !== e && ((e = "0" + e), (r = " / ")),
                  e + r + a)
                : "";
        });
}.call(this));
