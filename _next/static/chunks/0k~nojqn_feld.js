(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,94834,(t,e,s)=>{t.e,e.exports=function(){"use strict";var t="millisecond",e="second",s="minute",r="hour",a="week",i="month",n="quarter",o="year",u="date",c="Invalid Date",d=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,l=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,h=function(t,e,s){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(s)+t},f="en",p={};p[f]={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],s=t%100;return"["+t+(e[(s-20)%10]||e[s]||e[0])+"]"}};var g="$isDayjsObject",y=function(t){return t instanceof C||!(!t||!t[g])},m=function t(e,s,r){var a;if(!e)return f;if("string"==typeof e){var i=e.toLowerCase();p[i]&&(a=i),s&&(p[i]=s,a=i);var n=e.split("-");if(!a&&n.length>1)return t(n[0])}else{var o=e.name;p[o]=e,a=o}return!r&&a&&(f=a),a||!r&&f},$=function(t,e){if(y(t))return t.clone();var s="object"==typeof e?e:{};return s.date=t,s.args=arguments,new C(s)},D={s:h,z:function(t){var e=-t.utcOffset(),s=Math.abs(e);return(e<=0?"+":"-")+h(Math.floor(s/60),2,"0")+":"+h(s%60,2,"0")},m:function t(e,s){if(e.date()<s.date())return-t(s,e);var r=12*(s.year()-e.year())+(s.month()-e.month()),a=e.clone().add(r,i),n=s-a<0,o=e.clone().add(r+(n?-1:1),i);return+(-(r+(s-a)/(n?a-o:o-a))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(c){return({M:i,y:o,w:a,d:"day",D:u,h:r,m:s,s:e,ms:t,Q:n})[c]||String(c||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}};D.l=m,D.i=y,D.w=function(t,e){return $(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var C=function(){function h(t){this.$L=m(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[g]=!0}var f=h.prototype;return f.parse=function(t){this.$d=function(t){var e=t.date,s=t.utc;if(null===e)return new Date(NaN);if(D.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(d);if(r){var a=r[2]-1||0,i=(r[7]||"0").substring(0,3);return s?new Date(Date.UTC(r[1],a,r[3]||1,r[4]||0,r[5]||0,r[6]||0,i)):new Date(r[1],a,r[3]||1,r[4]||0,r[5]||0,r[6]||0,i)}}return new Date(e)}(t),this.init()},f.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},f.$utils=function(){return D},f.isValid=function(){return this.$d.toString()!==c},f.isSame=function(t,e){var s=$(t);return this.startOf(e)<=s&&s<=this.endOf(e)},f.isAfter=function(t,e){return $(t)<this.startOf(e)},f.isBefore=function(t,e){return this.endOf(e)<$(t)},f.$g=function(t,e,s){return D.u(t)?this[e]:this.set(s,t)},f.unix=function(){return Math.floor(this.valueOf()/1e3)},f.valueOf=function(){return this.$d.getTime()},f.startOf=function(t,n){var c=this,d=!!D.u(n)||n,l=D.p(t),h=function(t,e){var s=D.w(c.$u?Date.UTC(c.$y,e,t):new Date(c.$y,e,t),c);return d?s:s.endOf("day")},f=function(t,e){return D.w(c.toDate()[t].apply(c.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(e)),c)},p=this.$W,g=this.$M,y=this.$D,m="set"+(this.$u?"UTC":"");switch(l){case o:return d?h(1,0):h(31,11);case i:return d?h(1,g):h(0,g+1);case a:var $=this.$locale().weekStart||0,C=(p<$?p+7:p)-$;return h(d?y-C:y+(6-C),g);case"day":case u:return f(m+"Hours",0);case r:return f(m+"Minutes",1);case s:return f(m+"Seconds",2);case e:return f(m+"Milliseconds",3);default:return this.clone()}},f.endOf=function(t){return this.startOf(t,!1)},f.$set=function(a,n){var c,d=D.p(a),l="set"+(this.$u?"UTC":""),h=((c={}).day=l+"Date",c[u]=l+"Date",c[i]=l+"Month",c[o]=l+"FullYear",c[r]=l+"Hours",c[s]=l+"Minutes",c[e]=l+"Seconds",c[t]=l+"Milliseconds",c)[d],f="day"===d?this.$D+(n-this.$W):n;if(d===i||d===o){var p=this.clone().set(u,1);p.$d[h](f),p.init(),this.$d=p.set(u,Math.min(this.$D,p.daysInMonth())).$d}else h&&this.$d[h](f);return this.init(),this},f.set=function(t,e){return this.clone().$set(t,e)},f.get=function(t){return this[D.p(t)]()},f.add=function(t,n){var u,c=this;t=Number(t);var d=D.p(n),l=function(e){var s=$(c);return D.w(s.date(s.date()+Math.round(e*t)),c)};if(d===i)return this.set(i,this.$M+t);if(d===o)return this.set(o,this.$y+t);if("day"===d)return l(1);if(d===a)return l(7);var h=((u={})[s]=6e4,u[r]=36e5,u[e]=1e3,u)[d]||1,f=this.$d.getTime()+t*h;return D.w(f,this)},f.subtract=function(t,e){return this.add(-1*t,e)},f.format=function(t){var e=this,s=this.$locale();if(!this.isValid())return s.invalidDate||c;var r=t||"YYYY-MM-DDTHH:mm:ssZ",a=D.z(this),i=this.$H,n=this.$m,o=this.$M,u=s.weekdays,d=s.months,h=s.meridiem,f=function(t,s,a,i){return t&&(t[s]||t(e,r))||a[s].slice(0,i)},p=function(t){return D.s(i%12||12,t,"0")},g=h||function(t,e,s){var r=t<12?"AM":"PM";return s?r.toLowerCase():r};return r.replace(l,function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return D.s(e.$y,4,"0");case"M":return o+1;case"MM":return D.s(o+1,2,"0");case"MMM":return f(s.monthsShort,o,d,3);case"MMMM":return f(d,o);case"D":return e.$D;case"DD":return D.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return f(s.weekdaysMin,e.$W,u,2);case"ddd":return f(s.weekdaysShort,e.$W,u,3);case"dddd":return u[e.$W];case"H":return String(i);case"HH":return D.s(i,2,"0");case"h":return p(1);case"hh":return p(2);case"a":return g(i,n,!0);case"A":return g(i,n,!1);case"m":return String(n);case"mm":return D.s(n,2,"0");case"s":return String(e.$s);case"ss":return D.s(e.$s,2,"0");case"SSS":return D.s(e.$ms,3,"0");case"Z":return a}return null}(t)||a.replace(":","")})},f.utcOffset=function(){return-(15*Math.round(this.$d.getTimezoneOffset()/15))},f.diff=function(t,u,c){var d,l=this,h=D.p(u),f=$(t),p=(f.utcOffset()-this.utcOffset())*6e4,g=this-f,y=function(){return D.m(l,f)};switch(h){case o:d=y()/12;break;case i:d=y();break;case n:d=y()/3;break;case a:d=(g-p)/6048e5;break;case"day":d=(g-p)/864e5;break;case r:d=g/36e5;break;case s:d=g/6e4;break;case e:d=g/1e3;break;default:d=g}return c?d:D.a(d)},f.daysInMonth=function(){return this.endOf(i).$D},f.$locale=function(){return p[this.$L]},f.locale=function(t,e){if(!t)return this.$L;var s=this.clone(),r=m(t,e,!0);return r&&(s.$L=r),s},f.clone=function(){return D.w(this.$d,this)},f.toDate=function(){return new Date(this.valueOf())},f.toJSON=function(){return this.isValid()?this.toISOString():null},f.toISOString=function(){return this.$d.toISOString()},f.toString=function(){return this.$d.toUTCString()},h}(),v=C.prototype;return $.prototype=v,[["$ms",t],["$s",e],["$m",s],["$H",r],["$W","day"],["$M",i],["$y",o],["$D",u]].forEach(function(t){v[t[1]]=function(e){return this.$g(e,t[0],t[1])}}),$.extend=function(t,e){return t.$i||(t(e,C,$),t.$i=!0),$},$.locale=m,$.isDayjs=y,$.unix=function(t){return $(1e3*t)},$.en=p[f],$.Ls=p,$.p={},$}()},53157,(t,e,s)=>{t.e,e.exports=function(){"use strict";var t="minute",e=/[+-]\d\d(?::?\d\d)?/g,s=/([+-]|\d\d)/g;return function(r,a,i){var n=a.prototype;i.utc=function(t){var e={date:t,utc:!0,args:arguments};return new a(e)},n.utc=function(e){var s=i(this.toDate(),{locale:this.$L,utc:!0});return e?s.add(this.utcOffset(),t):s},n.local=function(){return i(this.toDate(),{locale:this.$L,utc:!1})};var o=n.parse;n.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),o.call(this,t)};var u=n.init;n.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds()}else u.call(this)};var c=n.utcOffset;n.utcOffset=function(r,a){var i=this.$utils().u;if(i(r))return this.$u?0:i(this.$offset)?c.call(this):this.$offset;if("string"==typeof r&&null===(r=function(t){void 0===t&&(t="");var r=t.match(e);if(!r)return null;var a=(""+r[0]).match(s)||["-",0,0],i=a[0],n=60*a[1]+ +a[2];return 0===n?0:"+"===i?n:-n}(r)))return this;var n=16>=Math.abs(r)?60*r:r;if(0===n)return this.utc(a);var o=this.clone();if(a)return o.$offset=n,o.$u=!1,o;var u=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();return(o=this.local().add(n+u,t)).$offset=n,o.$x.$localOffset=u,o};var d=n.format;n.format=function(t){var e=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return d.call(this,e)},n.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*t},n.isUTC=function(){return!!this.$u},n.toISOString=function(){return this.toDate().toISOString()},n.toString=function(){return this.toDate().toUTCString()};var l=n.toDate;n.toDate=function(t){return"s"===t&&this.$offset?i(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():l.call(this)};var h=n.diff;n.diff=function(t,e,s){if(t&&this.$u===t.$u)return h.call(this,t,e,s);var r=this.local(),a=i(t).local();return h.call(r,a,e,s)}}}()},12926,t=>{"use strict";var e=t.i(94834),s=t.i(53157);e.default.extend(s.default);let r=e.default;t.s(["date",0,r])},29923,71577,t=>{"use strict";t.i(7240),t.s([],29923);var e=t.i(91398),s=t.i(45246),r=t.i(58678),a=t.i(80683),i=t.i(12926),n=t.i(95767),o=t.i(61786);let u=()=>(0,e.jsx)(e.Fragment,{children:"·"});var c=t.i(80611);let d=({articleBlog:t,articleComponent:d})=>{let l=i.date.utc(t.datePublication),h=t.dateLastUpdate?i.date.utc(t.dateLastUpdate):void 0;return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(o.DocumentTitle,{title:t.title}),(0,e.jsx)(r.default,{children:(0,e.jsx)("meta",{name:"description",content:t.description,className:s.default.dynamic([["95892963f5415aab",[(0,n.gridCss)(.5),(0,n.gridCss)(5),(0,n.gridCss)(2),(0,n.gridCss)(3)]]])})}),(0,e.jsxs)("article",{className:s.default.dynamic([["95892963f5415aab",[(0,n.gridCss)(.5),(0,n.gridCss)(5),(0,n.gridCss)(2),(0,n.gridCss)(3)]]]),children:[(0,e.jsx)("h1",{className:s.default.dynamic([["95892963f5415aab",[(0,n.gridCss)(.5),(0,n.gridCss)(5),(0,n.gridCss)(2),(0,n.gridCss)(3)]]]),children:t.title}),(0,e.jsx)("p",{className:s.default.dynamic([["95892963f5415aab",[(0,n.gridCss)(.5),(0,n.gridCss)(5),(0,n.gridCss)(2),(0,n.gridCss)(3)]]])+" time-wrapper",children:h?(0,e.jsxs)(e.Fragment,{children:["Published"," ",(0,e.jsx)("time",{title:"Publication date",dateTime:l.toISOString(),className:s.default.dynamic([["95892963f5415aab",[(0,n.gridCss)(.5),(0,n.gridCss)(5),(0,n.gridCss)(2),(0,n.gridCss)(3)]]]),children:l.format("YYYY-MMM-DD")}),(0,e.jsx)("br",{className:s.default.dynamic([["95892963f5415aab",[(0,n.gridCss)(.5),(0,n.gridCss)(5),(0,n.gridCss)(2),(0,n.gridCss)(3)]]])}),"Updated:"," ",(0,e.jsx)("time",{title:"Last update date",dateTime:h.toISOString(),className:s.default.dynamic([["95892963f5415aab",[(0,n.gridCss)(.5),(0,n.gridCss)(5),(0,n.gridCss)(2),(0,n.gridCss)(3)]]]),children:h.format("YYYY-MMM-DD")})]}):(0,e.jsx)("time",{title:"Publication date",dateTime:l.toISOString(),className:s.default.dynamic([["95892963f5415aab",[(0,n.gridCss)(.5),(0,n.gridCss)(5),(0,n.gridCss)(2),(0,n.gridCss)(3)]]]),children:l.format("YYYY-MMM-DD")})}),(0,e.jsx)("div",{className:s.default.dynamic([["95892963f5415aab",[(0,n.gridCss)(.5),(0,n.gridCss)(5),(0,n.gridCss)(2),(0,n.gridCss)(3)]]])+" article-content",children:(0,e.jsx)(d,{className:s.default.dynamic([["95892963f5415aab",[(0,n.gridCss)(.5),(0,n.gridCss)(5),(0,n.gridCss)(2),(0,n.gridCss)(3)]]])})})]}),(0,e.jsxs)("p",{className:s.default.dynamic([["95892963f5415aab",[(0,n.gridCss)(.5),(0,n.gridCss)(5),(0,n.gridCss)(2),(0,n.gridCss)(3)]]])+" links",children:[(0,e.jsx)(c.Link,{href:a.routes.articleGitHubLink(t.articleDirectory),children:"Edit on GitHub"})," ",(0,e.jsx)(u,{})," ",(0,e.jsx)(c.Link,{href:a.routes.articleXSearch(t.slug),children:"Discuss on X"})," "]}),(0,e.jsx)(s.default,{id:"95892963f5415aab",dynamic:[(0,n.gridCss)(.5),(0,n.gridCss)(5),(0,n.gridCss)(2),(0,n.gridCss)(3)],children:`h1.__jsx-style-dynamic-selector,.time-wrapper.__jsx-style-dynamic-selector{margin:0}time.__jsx-style-dynamic-selector{padding-top:${(0,n.gridCss)(.5)};display:inline-block}.article-content.__jsx-style-dynamic-selector{padding-top:${(0,n.gridCss)(5)}}.article-content.__jsx-style-dynamic-selector>*{margin:${(0,n.gridCss)(2)} 0}.article-content.__jsx-style-dynamic-selector>:first-child{margin-top:0}.article-content.__jsx-style-dynamic-selector>:last-child{margin-bottom:0}.links.__jsx-style-dynamic-selector{margin:0;margin-top:${(0,n.gridCss)(3)}}`})]})};t.s(["articlePage",0,t=>({articleBlog:s})=>(0,e.jsx)(d,{articleBlog:s,articleComponent:t})],71577)},85039,t=>{"use strict";var e=t.i(91398);t.i(29923);var s=t.i(59647),r=t.i(50038),a=t.i(99377),i=t.i(80611);let n=(0,t.i(71577).articlePage)(()=>(0,e.jsxs)(e.Fragment,{children:[(0,e.jsxs)(r.P,{children:["Discriminate union types (also called ",(0,e.jsx)(r.Italic,{children:"tagged unions"})," or ",(0,e.jsx)(r.Italic,{children:"algebraic data types"}),") are one of my favorite features of any typed language."]}),(0,e.jsx)(r.P,{children:"They can be used to cleanly model and describe state transitions in your business logic and your UI. They are worth knowing about because patterns emerging from these can also be used in dynamic languages without the need for a type system."}),(0,e.jsx)(r.H1,{children:"HTTP request example"}),(0,e.jsx)(r.P,{children:"Let's take a simple example of making an HTTP request and displaying the response in the UI. With these async operations you also need to handle the loading and error case and display it to the user."}),(0,e.jsx)(r.H1,{children:'"Traditional" approach'}),(0,e.jsx)(s.Code,{language:"jsx",children:`
      // Initial state
      let apiData = null;

      // User initiates API request, data is loading
      apiData = {
        error: false,
        loading: true,
        data: null
      };

      try {
        const requestData = await getApiData();

        // Data is fetched
        apiData = {
          error: false,
          loading: false,
          data: requestData
        };
      } catch (error) {
        // Error with the request
        apiData = {
          error: error,
          loading: false,
          data: null
        };
      }

      // Somewhere in your UI code
      if (!apiData) {
        return <p>Initial state</p>;
      } else if (apiData.loading) {
        return <p>Loading</p>;
      } else if (apiData.error) {
        return <p>Error</p>;
      }

      return <p>Api data: {apiData.data}</p>;
    `}),(0,e.jsx)(r.P,{children:"This is an approach that can be often seen. While it might be ok when the structure is small and local, problems will start surfacing when there will be more state transitions or when the data structure will be used in more places."}),(0,e.jsx)(r.H2,{children:"Problems"}),(0,e.jsxs)(a.List,{children:[(0,e.jsx)(a.Li,{children:"Instead of a clear indication of which type of state we are in, there are a bunch of boolean flags or empty/non-empty data values and we need to decide which has higher priority and what combination of these fields results in the corresponding state type."}),(0,e.jsxs)(a.Li,{children:["The data structure can end up in states that do not make sense, like ",(0,e.jsx)(s.Code,{children:"loading: true"})," and"," ",(0,e.jsx)(s.Code,{children:"error: true"})," at the same time."]}),(0,e.jsxs)(a.Li,{children:["Extending the structure, let's say by adding ",(0,e.jsx)(s.Code,{children:"RETRYING"})," or ",(0,e.jsx)(s.Code,{children:"CANCELLED"})," request states, only magnifies the problem."]})]}),(0,e.jsx)(r.H1,{children:"Discriminated union types"}),(0,e.jsx)(r.P,{children:"Let's see how we would model this problem when using union types. The best part is you do not even need typed language to take advantage of this approach."}),(0,e.jsx)(s.Code,{language:"jsx",children:`
      // Initial state
      let apiData = {
        type: "INITIAL"
      };

      // User initiates API request, data is loading
      apiData = {
        type: "LOADING"
      };

      try {
        const requestData = await getApiData();

        // Data is fetched
        apiData = {
          type: "FINISHED",
          data: requestData
        };
      } catch (error) {
        // Error with the request
        apiData = {
          type: "ERROR",
          error: error
        };
      }

      // Somewhere in your UI code
      switch (apiData.type) {
        case "INITIAL":
          return <p>Initial state</p>;
        case "LOADING":
          return <p>Loading</p>;
        case "ERROR":
          return <p>Error</p>;
        case "FINISHED":
          return <p>Api data: {apiData.data}</p>;
        default:
          throw new Error(\`Unknown apiData.type "\${apiData.type}"\`);
      }
    `}),(0,e.jsx)(r.P,{children:"This is much better now because we have a clear indicator of what state transition we are in, and we do not need to check boolean flags that can be mutually exclusive. Also the current state we are in only has data relevant to it, so for example, when we are in the loading state there is no empty data field and false in the error field."}),(0,e.jsx)(r.H1,{children:"TypeScript"}),(0,e.jsx)(r.P,{children:"If you have typed language that supports union types you can take advantage of the type system to enforce these rules during compile time. Here is how it would look like in TypeScript."}),(0,e.jsx)(s.Code,{language:"ts",children:`
      type HttpData<T> =
        | { type: "INITIAL" }
        | { type: "LOADING" }
        | { type: "ERROR"; error: unknown }
        | { type: "FINISHED"; data: T };
    `}),(0,e.jsxs)(r.P,{children:["This uses another interesting feature of TypeScript that is"," ",(0,e.jsx)(i.Link,{href:"https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#literal-types",children:"literal types"}),", meaning you can have a type of exact values, like ",(0,e.jsx)(s.Code,{children:'"INITIAL"'}),", instead of super-set like"," ",(0,e.jsx)(s.Code,{children:"string"}),"."]}),(0,e.jsx)(s.Code,{language:"tsx",children:`
      type HttpData<T> =
        | { type: "INITIAL" }
        | { type: "LOADING" }
        | { type: "ERROR"; error: unknown }
        | { type: "FINISHED"; data: T };

      const apiData: HttpData<string> = {
        type: "FINISHED",
        data: "api response data"
      };

      // Somewhere in your UI code
      switch (apiData.type) {
        case "INITIAL":
          return <p>Initial state</p>;
        case "LOADING":
          return <p>Loading</p>;
        case "ERROR":
          return <p>Error</p>;
        case "FINISHED":
          return <p>Api data: {apiData.data}</p>;
        default:
          throw new Error(\`Unknown apiData.type "\${apiData.type}"\`);
      }
    `})]}));t.s(["__N_SSG",0,!0,"default",0,n],85039)},68023,(t,e,s)=>{let r="/articles/union-types";(window.__NEXT_P=window.__NEXT_P||[]).push([r,()=>t.r(85039)]),e.hot&&e.hot.dispose(function(){window.__NEXT_P.push([r])})},48761,t=>{t.v(e=>Promise.all(["static/chunks/0ey~yy8oeyp~5.js"].map(e=>t.l(e))).then(()=>e(93594)))},28805,t=>{t.v(e=>Promise.all(["static/chunks/0599p99vu8fk5.js"].map(e=>t.l(e))).then(()=>e(79466)))}]);