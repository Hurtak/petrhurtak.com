(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,94834,(t,e,s)=>{t.e,e.exports=function(){"use strict";var t="millisecond",e="second",s="minute",i="hour",n="week",r="month",a="quarter",o="year",c="date",u="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,d=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,h=function(t,e,s){var i=String(t);return!i||i.length>=e?t:""+Array(e+1-i.length).join(s)+t},f="en",g={};g[f]={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],s=t%100;return"["+t+(e[(s-20)%10]||e[s]||e[0])+"]"}};var m="$isDayjsObject",p=function(t){return t instanceof C||!(!t||!t[m])},$=function t(e,s,i){var n;if(!e)return f;if("string"==typeof e){var r=e.toLowerCase();g[r]&&(n=r),s&&(g[r]=s,n=r);var a=e.split("-");if(!n&&a.length>1)return t(a[0])}else{var o=e.name;g[o]=e,n=o}return!i&&n&&(f=n),n||!i&&f},y=function(t,e){if(p(t))return t.clone();var s="object"==typeof e?e:{};return s.date=t,s.args=arguments,new C(s)},b={s:h,z:function(t){var e=-t.utcOffset(),s=Math.abs(e);return(e<=0?"+":"-")+h(Math.floor(s/60),2,"0")+":"+h(s%60,2,"0")},m:function t(e,s){if(e.date()<s.date())return-t(s,e);var i=12*(s.year()-e.year())+(s.month()-e.month()),n=e.clone().add(i,r),a=s-n<0,o=e.clone().add(i+(a?-1:1),r);return+(-(i+(s-n)/(a?n-o:o-n))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(u){return({M:r,y:o,w:n,d:"day",D:c,h:i,m:s,s:e,ms:t,Q:a})[u]||String(u||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}};b.l=$,b.i=p,b.w=function(t,e){return y(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var C=function(){function h(t){this.$L=$(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[m]=!0}var f=h.prototype;return f.parse=function(t){this.$d=function(t){var e=t.date,s=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var i=e.match(l);if(i){var n=i[2]-1||0,r=(i[7]||"0").substring(0,3);return s?new Date(Date.UTC(i[1],n,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)):new Date(i[1],n,i[3]||1,i[4]||0,i[5]||0,i[6]||0,r)}}return new Date(e)}(t),this.init()},f.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},f.$utils=function(){return b},f.isValid=function(){return this.$d.toString()!==u},f.isSame=function(t,e){var s=y(t);return this.startOf(e)<=s&&s<=this.endOf(e)},f.isAfter=function(t,e){return y(t)<this.startOf(e)},f.isBefore=function(t,e){return this.endOf(e)<y(t)},f.$g=function(t,e,s){return b.u(t)?this[e]:this.set(s,t)},f.unix=function(){return Math.floor(this.valueOf()/1e3)},f.valueOf=function(){return this.$d.getTime()},f.startOf=function(t,a){var u=this,l=!!b.u(a)||a,d=b.p(t),h=function(t,e){var s=b.w(u.$u?Date.UTC(u.$y,e,t):new Date(u.$y,e,t),u);return l?s:s.endOf("day")},f=function(t,e){return b.w(u.toDate()[t].apply(u.toDate("s"),(l?[0,0,0,0]:[23,59,59,999]).slice(e)),u)},g=this.$W,m=this.$M,p=this.$D,$="set"+(this.$u?"UTC":"");switch(d){case o:return l?h(1,0):h(31,11);case r:return l?h(1,m):h(0,m+1);case n:var y=this.$locale().weekStart||0,C=(g<y?g+7:g)-y;return h(l?p-C:p+(6-C),m);case"day":case c:return f($+"Hours",0);case i:return f($+"Minutes",1);case s:return f($+"Seconds",2);case e:return f($+"Milliseconds",3);default:return this.clone()}},f.endOf=function(t){return this.startOf(t,!1)},f.$set=function(n,a){var u,l=b.p(n),d="set"+(this.$u?"UTC":""),h=((u={}).day=d+"Date",u[c]=d+"Date",u[r]=d+"Month",u[o]=d+"FullYear",u[i]=d+"Hours",u[s]=d+"Minutes",u[e]=d+"Seconds",u[t]=d+"Milliseconds",u)[l],f="day"===l?this.$D+(a-this.$W):a;if(l===r||l===o){var g=this.clone().set(c,1);g.$d[h](f),g.init(),this.$d=g.set(c,Math.min(this.$D,g.daysInMonth())).$d}else h&&this.$d[h](f);return this.init(),this},f.set=function(t,e){return this.clone().$set(t,e)},f.get=function(t){return this[b.p(t)]()},f.add=function(t,a){var c,u=this;t=Number(t);var l=b.p(a),d=function(e){var s=y(u);return b.w(s.date(s.date()+Math.round(e*t)),u)};if(l===r)return this.set(r,this.$M+t);if(l===o)return this.set(o,this.$y+t);if("day"===l)return d(1);if(l===n)return d(7);var h=((c={})[s]=6e4,c[i]=36e5,c[e]=1e3,c)[l]||1,f=this.$d.getTime()+t*h;return b.w(f,this)},f.subtract=function(t,e){return this.add(-1*t,e)},f.format=function(t){var e=this,s=this.$locale();if(!this.isValid())return s.invalidDate||u;var i=t||"YYYY-MM-DDTHH:mm:ssZ",n=b.z(this),r=this.$H,a=this.$m,o=this.$M,c=s.weekdays,l=s.months,h=s.meridiem,f=function(t,s,n,r){return t&&(t[s]||t(e,i))||n[s].slice(0,r)},g=function(t){return b.s(r%12||12,t,"0")},m=h||function(t,e,s){var i=t<12?"AM":"PM";return s?i.toLowerCase():i};return i.replace(d,function(t,i){return i||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return b.s(e.$y,4,"0");case"M":return o+1;case"MM":return b.s(o+1,2,"0");case"MMM":return f(s.monthsShort,o,l,3);case"MMMM":return f(l,o);case"D":return e.$D;case"DD":return b.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return f(s.weekdaysMin,e.$W,c,2);case"ddd":return f(s.weekdaysShort,e.$W,c,3);case"dddd":return c[e.$W];case"H":return String(r);case"HH":return b.s(r,2,"0");case"h":return g(1);case"hh":return g(2);case"a":return m(r,a,!0);case"A":return m(r,a,!1);case"m":return String(a);case"mm":return b.s(a,2,"0");case"s":return String(e.$s);case"ss":return b.s(e.$s,2,"0");case"SSS":return b.s(e.$ms,3,"0");case"Z":return n}return null}(t)||n.replace(":","")})},f.utcOffset=function(){return-(15*Math.round(this.$d.getTimezoneOffset()/15))},f.diff=function(t,c,u){var l,d=this,h=b.p(c),f=y(t),g=(f.utcOffset()-this.utcOffset())*6e4,m=this-f,p=function(){return b.m(d,f)};switch(h){case o:l=p()/12;break;case r:l=p();break;case a:l=p()/3;break;case n:l=(m-g)/6048e5;break;case"day":l=(m-g)/864e5;break;case i:l=m/36e5;break;case s:l=m/6e4;break;case e:l=m/1e3;break;default:l=m}return u?l:b.a(l)},f.daysInMonth=function(){return this.endOf(r).$D},f.$locale=function(){return g[this.$L]},f.locale=function(t,e){if(!t)return this.$L;var s=this.clone(),i=$(t,e,!0);return i&&(s.$L=i),s},f.clone=function(){return b.w(this.$d,this)},f.toDate=function(){return new Date(this.valueOf())},f.toJSON=function(){return this.isValid()?this.toISOString():null},f.toISOString=function(){return this.$d.toISOString()},f.toString=function(){return this.$d.toUTCString()},h}(),v=C.prototype;return y.prototype=v,[["$ms",t],["$s",e],["$m",s],["$H",i],["$W","day"],["$M",r],["$y",o],["$D",c]].forEach(function(t){v[t[1]]=function(e){return this.$g(e,t[0],t[1])}}),y.extend=function(t,e){return t.$i||(t(e,C,y),t.$i=!0),y},y.locale=$,y.isDayjs=p,y.unix=function(t){return y(1e3*t)},y.en=g[f],y.Ls=g,y.p={},y}()},53157,(t,e,s)=>{t.e,e.exports=function(){"use strict";var t="minute",e=/[+-]\d\d(?::?\d\d)?/g,s=/([+-]|\d\d)/g;return function(i,n,r){var a=n.prototype;r.utc=function(t){var e={date:t,utc:!0,args:arguments};return new n(e)},a.utc=function(e){var s=r(this.toDate(),{locale:this.$L,utc:!0});return e?s.add(this.utcOffset(),t):s},a.local=function(){return r(this.toDate(),{locale:this.$L,utc:!1})};var o=a.parse;a.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),o.call(this,t)};var c=a.init;a.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds()}else c.call(this)};var u=a.utcOffset;a.utcOffset=function(i,n){var r=this.$utils().u;if(r(i))return this.$u?0:r(this.$offset)?u.call(this):this.$offset;if("string"==typeof i&&null===(i=function(t){void 0===t&&(t="");var i=t.match(e);if(!i)return null;var n=(""+i[0]).match(s)||["-",0,0],r=n[0],a=60*n[1]+ +n[2];return 0===a?0:"+"===r?a:-a}(i)))return this;var a=16>=Math.abs(i)?60*i:i;if(0===a)return this.utc(n);var o=this.clone();if(n)return o.$offset=a,o.$u=!1,o;var c=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();return(o=this.local().add(a+c,t)).$offset=a,o.$x.$localOffset=c,o};var l=a.format;a.format=function(t){var e=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return l.call(this,e)},a.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*t},a.isUTC=function(){return!!this.$u},a.toISOString=function(){return this.toDate().toISOString()},a.toString=function(){return this.toDate().toUTCString()};var d=a.toDate;a.toDate=function(t){return"s"===t&&this.$offset?r(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():d.call(this)};var h=a.diff;a.diff=function(t,e,s){if(t&&this.$u===t.$u)return h.call(this,t,e,s);var i=this.local(),n=r(t).local();return h.call(i,n,e,s)}}}()},12926,t=>{"use strict";var e=t.i(94834),s=t.i(53157);e.default.extend(s.default);let i=e.default;t.s(["date",0,i])},29923,71577,t=>{"use strict";t.i(7240),t.s([],29923);var e=t.i(91398),s=t.i(45246),i=t.i(58678),n=t.i(80683),r=t.i(12926),a=t.i(95767),o=t.i(61786);let c=()=>(0,e.jsx)(e.Fragment,{children:"·"});var u=t.i(80611);let l=({articleBlog:t,articleComponent:l})=>{let d=r.date.utc(t.datePublication),h=t.dateLastUpdate?r.date.utc(t.dateLastUpdate):void 0;return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(o.DocumentTitle,{title:t.title}),(0,e.jsx)(i.default,{children:(0,e.jsx)("meta",{name:"description",content:t.description,className:s.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]])})}),(0,e.jsxs)("article",{className:s.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]]),children:[(0,e.jsx)("h1",{className:s.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]]),children:t.title}),(0,e.jsx)("p",{className:s.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]])+" time-wrapper",children:h?(0,e.jsxs)(e.Fragment,{children:["Published"," ",(0,e.jsx)("time",{title:"Publication date",dateTime:d.toISOString(),className:s.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]]),children:d.format("YYYY-MMM-DD")}),(0,e.jsx)("br",{className:s.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]])}),"Updated:"," ",(0,e.jsx)("time",{title:"Last update date",dateTime:h.toISOString(),className:s.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]]),children:h.format("YYYY-MMM-DD")})]}):(0,e.jsx)("time",{title:"Publication date",dateTime:d.toISOString(),className:s.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]]),children:d.format("YYYY-MMM-DD")})}),(0,e.jsx)("div",{className:s.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]])+" article-content",children:(0,e.jsx)(l,{className:s.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]])})})]}),(0,e.jsxs)("p",{className:s.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]])+" links",children:[(0,e.jsx)(u.Link,{href:n.routes.articleGitHubLink(t.articleDirectory),children:"Edit on GitHub"})," ",(0,e.jsx)(c,{})," ",(0,e.jsx)(u.Link,{href:n.routes.articleXSearch(t.slug),children:"Discuss on X"})," "]}),(0,e.jsx)(s.default,{id:"95892963f5415aab",dynamic:[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)],children:`h1.__jsx-style-dynamic-selector,.time-wrapper.__jsx-style-dynamic-selector{margin:0}time.__jsx-style-dynamic-selector{padding-top:${(0,a.gridCss)(.5)};display:inline-block}.article-content.__jsx-style-dynamic-selector{padding-top:${(0,a.gridCss)(5)}}.article-content.__jsx-style-dynamic-selector>*{margin:${(0,a.gridCss)(2)} 0}.article-content.__jsx-style-dynamic-selector>:first-child{margin-top:0}.article-content.__jsx-style-dynamic-selector>:last-child{margin-bottom:0}.links.__jsx-style-dynamic-selector{margin:0;margin-top:${(0,a.gridCss)(3)}}`})]})};t.s(["articlePage",0,t=>({articleBlog:s})=>(0,e.jsx)(l,{articleBlog:s,articleComponent:t})],71577)},61074,t=>{"use strict";var e=t.i(91398);t.i(29923);var s=t.i(59647),i=t.i(50038),n=t.i(99377),r=t.i(80611);let a=(0,t.i(71577).articlePage)(()=>(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)(i.P,{children:[(0,e.jsx)(s.Code,{children:"IIFE"})," is an abbreviation for ",(0,e.jsx)(s.Code,{children:"immediately-invoked function expression"}),". What that means is that we define a new function and execute it immediately."]}),(0,e.jsx)(s.Code,{language:"js",children:`
      console.log(1);

      // IIFE with arrow function
      (() => {
        console.log(2);
      })();

      // IIFE with anonymous function
      (function () {
        console.log(3);
      })();

      // Regular function call equivalent
      function foo () {
        console.log(4);
      }
      foo();

      console.log(5);

      // logs: 1 2 3 4 5
    `}),(0,e.jsx)(i.H1,{children:"Where IIFE can be useful"}),(0,e.jsx)(i.H2,{children:"Not leaking variables into the global scope"}),(0,e.jsx)(i.P,{children:"In the browser environment (if you are not using module system), it is a good practice to wrap your code inside IIFE to make sure:"}),(0,e.jsxs)(n.List,{children:[(0,e.jsx)(n.Li,{children:"You are not leaking any global variables/functions into global scope."}),(0,e.jsx)(n.Li,{children:"Your variables cannot be overwritten by any other scripts that also might be accessing global scope."}),(0,e.jsx)(n.Li,{children:"You do not accidentally overwrite global variables of other scripts by using the same name."})]}),(0,e.jsx)(s.Code,{language:"js",children:`
      <!DOCTYPE html>
      <html>
        <head><!-- code --></head>
        <body>
          <!-- code -->
          <script>
            (() => {
              const config = { foo: 'bar' };
              // "config" is not leaked to the window object
              AnalyticsScript.init(config);
            })()
          </script>
        </body>
      </html>
    `}),(0,e.jsx)(i.H2,{children:"Variable assignment with its own scope"}),(0,e.jsx)(s.Code,{language:"js",children:`
      // IIFE
      const res = (() => {
        const foo = 1;
        const bar = 2;
        return foo + bar;
      })();

      // Vs regular approach
      const foo = 1;
      const bar = 2;
      const res = foo + bar;
    `}),(0,e.jsx)(i.P,{children:"This approach might lead to better code structure where it is clearer what parts of the code are only sub computations and what are the results of these computations."}),(0,e.jsxs)(i.P,{children:["It is more common to see this in functional languages where keywords like ",(0,e.jsx)(s.Code,{children:"let"})," are available."]}),(0,e.jsx)(s.Code,{language:"elm",children:`
      res =
        let
          foo = 1
          bar = 2
        in
          foo + bar
    `}),(0,e.jsxs)(i.P,{children:["At the moment there is a stage 1 ",(0,e.jsx)(s.Code,{children:"do"})," keyword"," ",(0,e.jsx)(r.Link,{href:"https://github.com/tc39/proposal-do-expressions",children:"proposal"})," for JavaScript that introduces such functionality."]}),(0,e.jsx)(s.Code,{language:"js",children:`
      const res = do {
        const foo = 1;
        const bar = 2;
        foo + bar; // implicit return
      }
    `}),(0,e.jsx)(i.H2,{children:"React"}),(0,e.jsxs)(i.P,{children:["In React ",(0,e.jsx)(s.Code,{children:"if"})," statements inside templates are usually done either with ternary operators, which might get hairy when there is some nesting."]}),(0,e.jsx)(s.Code,{language:"jsx",children:`
      <section>
        {condition ? <p>true</p> : <p>false</p>}
      </section>
    `}),(0,e.jsx)(i.P,{children:"IIFE might be used to create blocks with regular code flow."}),(0,e.jsx)(s.Code,{language:"jsx",children:`
      <section>
        {(() => {
          if (a) {
            if (b) {
              return <p>a and b</p>;
            } else {
              return <p>a and not b</p>;
            }
          } else {
            return <p>not a</p>;
          }
        })()}
      </section>
    `}),(0,e.jsx)(i.P,{children:"Also might be useful when we want to do some computations right in the templates."}),(0,e.jsx)(s.Code,{language:"jsx",children:`
      <section>
        {(() => {
          const foo = 1;
          const bar = 2;
          const res = foo + bar;

          return <p>{res}</p>;
        })()}
      </section>
    `}),(0,e.jsx)(i.H2,{children:"Module pattern"}),(0,e.jsx)(i.P,{children:"Module pattern was once popular before the module system was introduced into the language."}),(0,e.jsx)(i.P,{children:"This pattern provides:"}),(0,e.jsxs)(n.List,{children:[(0,e.jsx)(n.Li,{children:"Encapsulation."}),(0,e.jsx)(n.Li,{children:"Private variables/functions/methods."})]}),(0,e.jsx)(s.Code,{language:"js",children:`
      const Counter = (() => {
        // private variables/functions
        let state = 0;

        function privateMethod () {
          // ...
        }

        // exported public functions
        return {
          init: (initialState) => {
            state = initialState;
          },
          increment: () => {
            privateMethod();
            state += 1;
          },
          getCount: () => state
        };
      })()

      Counter.init(1);
      Counter.increment();
      Counter.getCount(); // 2
    `}),(0,e.jsx)(i.P,{children:"Class like interface can also be done with the module pattern. It is not recommended for objects that are created often because new functions are created for each instance, instead of having one method on the prototype chain that is reused by each instance, this will also lead to bigger memory requirements compared to classes."}),(0,e.jsx)(s.Code,{language:"js",children:`
      const Counter = initialState => {
        // private variables/functions
        let state = initialState;

        function privateMethod () {
          // ...
        }

        // exported public functions
        return {
          increment: () => {
            privateMethod();
            state += 1;
          },
          getCount: () => state
        };
      }

      const counterA = Counter(1);
      const counterB = Counter(2);
      counterA.increment();
      counterB.increment();
      counterA.getCount(); // 2
      counterB.getCount(); // 3
    `}),(0,e.jsx)(i.H1,{children:"Downsides"}),(0,e.jsxs)(n.List,{children:[(0,e.jsx)(n.Li,{children:"They are not commonly used pattern, so they might be confusing."}),(0,e.jsx)(n.Li,{children:"They might not promote best practices, for example they might lead you to write more inlined code, while refactoring into some nice testable function might be better option."}),(0,e.jsx)(n.Li,{children:"They are not best from performance point of view, you are creating function that is technically not needed most of the time, and then you are executing it immediately."})]})]}));t.s(["__N_SSG",0,!0,"default",0,a],61074)},2779,(t,e,s)=>{let i="/articles/iife";(window.__NEXT_P=window.__NEXT_P||[]).push([i,()=>t.r(61074)]),e.hot&&e.hot.dispose(function(){window.__NEXT_P.push([i])})},48761,t=>{t.v(e=>Promise.all(["static/chunks/0ey~yy8oeyp~5.js"].map(e=>t.l(e))).then(()=>e(93594)))},28805,t=>{t.v(e=>Promise.all(["static/chunks/0599p99vu8fk5.js"].map(e=>t.l(e))).then(()=>e(79466)))}]);