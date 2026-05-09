(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,94834,(t,e,i)=>{t.e,e.exports=function(){"use strict";var t="millisecond",e="second",i="minute",n="hour",s="week",r="month",a="quarter",o="year",c="date",u="Invalid Date",d=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,l=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,f=function(t,e,i){var n=String(t);return!n||n.length>=e?t:""+Array(e+1-n.length).join(i)+t},h="en",g={};g[h]={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],i=t%100;return"["+t+(e[(i-20)%10]||e[i]||e[0])+"]"}};var m="$isDayjsObject",$=function(t){return t instanceof D||!(!t||!t[m])},p=function t(e,i,n){var s;if(!e)return h;if("string"==typeof e){var r=e.toLowerCase();g[r]&&(s=r),i&&(g[r]=i,s=r);var a=e.split("-");if(!s&&a.length>1)return t(a[0])}else{var o=e.name;g[o]=e,s=o}return!n&&s&&(h=s),s||!n&&h},C=function(t,e){if($(t))return t.clone();var i="object"==typeof e?e:{};return i.date=t,i.args=arguments,new D(i)},y={s:f,z:function(t){var e=-t.utcOffset(),i=Math.abs(e);return(e<=0?"+":"-")+f(Math.floor(i/60),2,"0")+":"+f(i%60,2,"0")},m:function t(e,i){if(e.date()<i.date())return-t(i,e);var n=12*(i.year()-e.year())+(i.month()-e.month()),s=e.clone().add(n,r),a=i-s<0,o=e.clone().add(n+(a?-1:1),r);return+(-(n+(i-s)/(a?s-o:o-s))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(u){return({M:r,y:o,w:s,d:"day",D:c,h:n,m:i,s:e,ms:t,Q:a})[u]||String(u||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}};y.l=p,y.i=$,y.w=function(t,e){return C(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var D=function(){function f(t){this.$L=p(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[m]=!0}var h=f.prototype;return h.parse=function(t){this.$d=function(t){var e=t.date,i=t.utc;if(null===e)return new Date(NaN);if(y.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var n=e.match(d);if(n){var s=n[2]-1||0,r=(n[7]||"0").substring(0,3);return i?new Date(Date.UTC(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,r)):new Date(n[1],s,n[3]||1,n[4]||0,n[5]||0,n[6]||0,r)}}return new Date(e)}(t),this.init()},h.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},h.$utils=function(){return y},h.isValid=function(){return this.$d.toString()!==u},h.isSame=function(t,e){var i=C(t);return this.startOf(e)<=i&&i<=this.endOf(e)},h.isAfter=function(t,e){return C(t)<this.startOf(e)},h.isBefore=function(t,e){return this.endOf(e)<C(t)},h.$g=function(t,e,i){return y.u(t)?this[e]:this.set(i,t)},h.unix=function(){return Math.floor(this.valueOf()/1e3)},h.valueOf=function(){return this.$d.getTime()},h.startOf=function(t,a){var u=this,d=!!y.u(a)||a,l=y.p(t),f=function(t,e){var i=y.w(u.$u?Date.UTC(u.$y,e,t):new Date(u.$y,e,t),u);return d?i:i.endOf("day")},h=function(t,e){return y.w(u.toDate()[t].apply(u.toDate("s"),(d?[0,0,0,0]:[23,59,59,999]).slice(e)),u)},g=this.$W,m=this.$M,$=this.$D,p="set"+(this.$u?"UTC":"");switch(l){case o:return d?f(1,0):f(31,11);case r:return d?f(1,m):f(0,m+1);case s:var C=this.$locale().weekStart||0,D=(g<C?g+7:g)-C;return f(d?$-D:$+(6-D),m);case"day":case c:return h(p+"Hours",0);case n:return h(p+"Minutes",1);case i:return h(p+"Seconds",2);case e:return h(p+"Milliseconds",3);default:return this.clone()}},h.endOf=function(t){return this.startOf(t,!1)},h.$set=function(s,a){var u,d=y.p(s),l="set"+(this.$u?"UTC":""),f=((u={}).day=l+"Date",u[c]=l+"Date",u[r]=l+"Month",u[o]=l+"FullYear",u[n]=l+"Hours",u[i]=l+"Minutes",u[e]=l+"Seconds",u[t]=l+"Milliseconds",u)[d],h="day"===d?this.$D+(a-this.$W):a;if(d===r||d===o){var g=this.clone().set(c,1);g.$d[f](h),g.init(),this.$d=g.set(c,Math.min(this.$D,g.daysInMonth())).$d}else f&&this.$d[f](h);return this.init(),this},h.set=function(t,e){return this.clone().$set(t,e)},h.get=function(t){return this[y.p(t)]()},h.add=function(t,a){var c,u=this;t=Number(t);var d=y.p(a),l=function(e){var i=C(u);return y.w(i.date(i.date()+Math.round(e*t)),u)};if(d===r)return this.set(r,this.$M+t);if(d===o)return this.set(o,this.$y+t);if("day"===d)return l(1);if(d===s)return l(7);var f=((c={})[i]=6e4,c[n]=36e5,c[e]=1e3,c)[d]||1,h=this.$d.getTime()+t*f;return y.w(h,this)},h.subtract=function(t,e){return this.add(-1*t,e)},h.format=function(t){var e=this,i=this.$locale();if(!this.isValid())return i.invalidDate||u;var n=t||"YYYY-MM-DDTHH:mm:ssZ",s=y.z(this),r=this.$H,a=this.$m,o=this.$M,c=i.weekdays,d=i.months,f=i.meridiem,h=function(t,i,s,r){return t&&(t[i]||t(e,n))||s[i].slice(0,r)},g=function(t){return y.s(r%12||12,t,"0")},m=f||function(t,e,i){var n=t<12?"AM":"PM";return i?n.toLowerCase():n};return n.replace(l,function(t,n){return n||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return y.s(e.$y,4,"0");case"M":return o+1;case"MM":return y.s(o+1,2,"0");case"MMM":return h(i.monthsShort,o,d,3);case"MMMM":return h(d,o);case"D":return e.$D;case"DD":return y.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(i.weekdaysMin,e.$W,c,2);case"ddd":return h(i.weekdaysShort,e.$W,c,3);case"dddd":return c[e.$W];case"H":return String(r);case"HH":return y.s(r,2,"0");case"h":return g(1);case"hh":return g(2);case"a":return m(r,a,!0);case"A":return m(r,a,!1);case"m":return String(a);case"mm":return y.s(a,2,"0");case"s":return String(e.$s);case"ss":return y.s(e.$s,2,"0");case"SSS":return y.s(e.$ms,3,"0");case"Z":return s}return null}(t)||s.replace(":","")})},h.utcOffset=function(){return-(15*Math.round(this.$d.getTimezoneOffset()/15))},h.diff=function(t,c,u){var d,l=this,f=y.p(c),h=C(t),g=(h.utcOffset()-this.utcOffset())*6e4,m=this-h,$=function(){return y.m(l,h)};switch(f){case o:d=$()/12;break;case r:d=$();break;case a:d=$()/3;break;case s:d=(m-g)/6048e5;break;case"day":d=(m-g)/864e5;break;case n:d=m/36e5;break;case i:d=m/6e4;break;case e:d=m/1e3;break;default:d=m}return u?d:y.a(d)},h.daysInMonth=function(){return this.endOf(r).$D},h.$locale=function(){return g[this.$L]},h.locale=function(t,e){if(!t)return this.$L;var i=this.clone(),n=p(t,e,!0);return n&&(i.$L=n),i},h.clone=function(){return y.w(this.$d,this)},h.toDate=function(){return new Date(this.valueOf())},h.toJSON=function(){return this.isValid()?this.toISOString():null},h.toISOString=function(){return this.$d.toISOString()},h.toString=function(){return this.$d.toUTCString()},f}(),v=D.prototype;return C.prototype=v,[["$ms",t],["$s",e],["$m",i],["$H",n],["$W","day"],["$M",r],["$y",o],["$D",c]].forEach(function(t){v[t[1]]=function(e){return this.$g(e,t[0],t[1])}}),C.extend=function(t,e){return t.$i||(t(e,D,C),t.$i=!0),C},C.locale=p,C.isDayjs=$,C.unix=function(t){return C(1e3*t)},C.en=g[h],C.Ls=g,C.p={},C}()},53157,(t,e,i)=>{t.e,e.exports=function(){"use strict";var t="minute",e=/[+-]\d\d(?::?\d\d)?/g,i=/([+-]|\d\d)/g;return function(n,s,r){var a=s.prototype;r.utc=function(t){var e={date:t,utc:!0,args:arguments};return new s(e)},a.utc=function(e){var i=r(this.toDate(),{locale:this.$L,utc:!0});return e?i.add(this.utcOffset(),t):i},a.local=function(){return r(this.toDate(),{locale:this.$L,utc:!1})};var o=a.parse;a.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),o.call(this,t)};var c=a.init;a.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds()}else c.call(this)};var u=a.utcOffset;a.utcOffset=function(n,s){var r=this.$utils().u;if(r(n))return this.$u?0:r(this.$offset)?u.call(this):this.$offset;if("string"==typeof n&&null===(n=function(t){void 0===t&&(t="");var n=t.match(e);if(!n)return null;var s=(""+n[0]).match(i)||["-",0,0],r=s[0],a=60*s[1]+ +s[2];return 0===a?0:"+"===r?a:-a}(n)))return this;var a=16>=Math.abs(n)?60*n:n;if(0===a)return this.utc(s);var o=this.clone();if(s)return o.$offset=a,o.$u=!1,o;var c=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();return(o=this.local().add(a+c,t)).$offset=a,o.$x.$localOffset=c,o};var d=a.format;a.format=function(t){var e=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return d.call(this,e)},a.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||this.$d.getTimezoneOffset());return this.$d.valueOf()-6e4*t},a.isUTC=function(){return!!this.$u},a.toISOString=function(){return this.toDate().toISOString()},a.toString=function(){return this.toDate().toUTCString()};var l=a.toDate;a.toDate=function(t){return"s"===t&&this.$offset?r(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():l.call(this)};var f=a.diff;a.diff=function(t,e,i){if(t&&this.$u===t.$u)return f.call(this,t,e,i);var n=this.local(),s=r(t).local();return f.call(n,s,e,i)}}}()},12926,t=>{"use strict";var e=t.i(94834),i=t.i(53157);e.default.extend(i.default);let n=e.default;t.s(["date",0,n])},29923,71577,t=>{"use strict";t.i(7240),t.s([],29923);var e=t.i(91398),i=t.i(45246),n=t.i(58678),s=t.i(80683),r=t.i(12926),a=t.i(95767),o=t.i(61786);let c=()=>(0,e.jsx)(e.Fragment,{children:"·"});var u=t.i(80611);let d=({articleBlog:t,articleComponent:d})=>{let l=r.date.utc(t.datePublication),f=t.dateLastUpdate?r.date.utc(t.dateLastUpdate):void 0;return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(o.DocumentTitle,{title:t.title}),(0,e.jsx)(n.default,{children:(0,e.jsx)("meta",{name:"description",content:t.description,className:i.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]])})}),(0,e.jsxs)("article",{className:i.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]]),children:[(0,e.jsx)("h1",{className:i.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]]),children:t.title}),(0,e.jsx)("p",{className:i.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]])+" time-wrapper",children:f?(0,e.jsxs)(e.Fragment,{children:["Published"," ",(0,e.jsx)("time",{title:"Publication date",dateTime:l.toISOString(),className:i.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]]),children:l.format("YYYY-MMM-DD")}),(0,e.jsx)("br",{className:i.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]])}),"Updated:"," ",(0,e.jsx)("time",{title:"Last update date",dateTime:f.toISOString(),className:i.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]]),children:f.format("YYYY-MMM-DD")})]}):(0,e.jsx)("time",{title:"Publication date",dateTime:l.toISOString(),className:i.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]]),children:l.format("YYYY-MMM-DD")})}),(0,e.jsx)("div",{className:i.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]])+" article-content",children:(0,e.jsx)(d,{className:i.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]])})})]}),(0,e.jsxs)("p",{className:i.default.dynamic([["95892963f5415aab",[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)]]])+" links",children:[(0,e.jsx)(u.Link,{href:s.routes.articleGitHubLink(t.articleDirectory),children:"Edit on GitHub"})," ",(0,e.jsx)(c,{})," ",(0,e.jsx)(u.Link,{href:s.routes.articleXSearch(t.slug),children:"Discuss on X"})," "]}),(0,e.jsx)(i.default,{id:"95892963f5415aab",dynamic:[(0,a.gridCss)(.5),(0,a.gridCss)(5),(0,a.gridCss)(2),(0,a.gridCss)(3)],children:`h1.__jsx-style-dynamic-selector,.time-wrapper.__jsx-style-dynamic-selector{margin:0}time.__jsx-style-dynamic-selector{padding-top:${(0,a.gridCss)(.5)};display:inline-block}.article-content.__jsx-style-dynamic-selector{padding-top:${(0,a.gridCss)(5)}}.article-content.__jsx-style-dynamic-selector>*{margin:${(0,a.gridCss)(2)} 0}.article-content.__jsx-style-dynamic-selector>:first-child{margin-top:0}.article-content.__jsx-style-dynamic-selector>:last-child{margin-bottom:0}.links.__jsx-style-dynamic-selector{margin:0;margin-top:${(0,a.gridCss)(3)}}`})]})};t.s(["articlePage",0,t=>({articleBlog:i})=>(0,e.jsx)(d,{articleBlog:i,articleComponent:t})],71577)},961,t=>{"use strict";var e=t.i(91398);t.i(29923);var i=t.i(59647),n=t.i(50038);let s=(0,t.i(71577).articlePage)(()=>(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(n.P,{children:"This article assumes basic Docker knowledge and is more of a shortlist of useful commands rather than beginners introduction."}),(0,e.jsx)(n.H1,{children:"Dockerfile"}),(0,e.jsxs)(n.P,{children:["First, you will need a ",(0,e.jsx)(i.Code,{children:"Dockerfile"})," file in your repository. Here is how simple one might look like."]}),(0,e.jsx)(i.Code,{language:"docker",children:`
      # Base image
      FROM node:12

      # Working directory inside of the container
      WORKDIR /app/

      # Copy stuff inside of the container. The left path is the host OS, the
      # right path is inside of the container relative to the WORKDIR.
      COPY ./package.json .
      COPY ./index.js .

      # Run scripts or install dependencies
      RUN npm install

      # Set environment variables
      ENV NODE_ENV production

      # What command/binary to run when the image is started
      ENTRYPOINT ["node"]
      # What default arguments to supply to given ENTRYPOINT
      CMD ["index.js"]
    `}),(0,e.jsx)(n.H1,{children:"Create commands"}),(0,e.jsx)(i.Code,{language:"bash",children:`
      # Build image
      #   -f/--file  Path to Dockerfile, default is 'CWD/Dockerfile'
      #   -t/--tag   Name and optionally a tag in the 'name:tag' format
      docker build .

      # List images
      docker image ls

      # Run container
      #   -d/--detach   Run container in background and print container ID
      #   -p/--publish  Connect container port to host OS port, eg: '-p 8000:8000'
      docker run <IMAGE ID>

      # List running containers
      #   -a/--all  Show all containers, default shows just running
      docker ps

      # Run a command in a running container
      #   -i, --interactive  Keep STDIN open even if not attached
      #   -t, --tty          Allocate a pseudo-TTY
      docker exec -it <CONTAINER ID> /bin/sh
   `}),(0,e.jsx)(n.H1,{children:"Cleanup commands"}),(0,e.jsx)(i.Code,{language:"bash",children:`
      # List containers
      #   --all  Shows also stopped ones
      docker ps --all

      # Stop the running container
      docker container stop <CONTAINER ID>

      # Remove container
      #   --force  Remove running containers
      docker container rm <CONTAINER ID>

      # List images
      docker image ls

      # Remove images
      docker image rm <IMAGE ID>
   `}),(0,e.jsx)(n.H1,{children:"Example workflow"}),(0,e.jsx)(i.Code,{language:"bash",children:`
      # Take Dockerfile and build an image
      $ docker build .
      Sending build context to Docker daemon  2.008MB
      ...
      Successfully built ea5c328aef35

      # List images
      $ docker image ls
      REPOSITORY          TAG                 IMAGE ID            CREATED              SIZE
      <none>              <none>              ea5c328aef35        About a minute ago   919MB

      # Run the container
      $ docker run ea5c328aef35
      Example app listening at http://localhost:8000

      # List running containers
      $ docker ps
      CONTAINER ID        IMAGE               COMMAND             CREATED              STATUS              PORTS               NAMES
      08d6c527fe82        ea5c328aef35        "node index.js"     About a minute ago   Up About a minute                       mystifying_hellman

      # Connect to running container and execute command inside of it.
      # Command we execute is '/bin/bash', so we
      # can use bash to explore container contents.
      $ docker exec -it 08d6c527fe82 /bin/bash
      root@08d6c527fe82:/app# ls
      index.js  node_modules  packag
      root@08d6c527fe82:/app# exit

      # Stop and remove the running container
      $ docker ps
      CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
      08d6c527fe82        ea5c328aef35        "node index.js"     3 seconds ago       Up 3 seconds                            festive_lehmann

      $ docker container stop 08d6c527fe82
      08d6c527fe82
      $ docker container rm 08d6c527fe82
      08d6c527fe82

      $ docker ps
      CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES

      # Remove the image
      $ docker image ls
      REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
      <none>              <none>              ea5c328aef35        48 minutes ago      919MB

      $ docker image rm ea5c328aef35
      Deleted: sha256:ea5c328aef35edf1a19e10fa5d7a62f11d9e61f76db01d86c7c94da5f7432185
      ...
    `})]}));t.s(["__N_SSG",0,!0,"default",0,s],961)},62987,(t,e,i)=>{let n="/articles/docker";(window.__NEXT_P=window.__NEXT_P||[]).push([n,()=>t.r(961)]),e.hot&&e.hot.dispose(function(){window.__NEXT_P.push([n])})},48761,t=>{t.v(e=>Promise.all(["static/chunks/0ey~yy8oeyp~5.js"].map(e=>t.l(e))).then(()=>e(93594)))},28805,t=>{t.v(e=>Promise.all(["static/chunks/0599p99vu8fk5.js"].map(e=>t.l(e))).then(()=>e(79466)))}]);