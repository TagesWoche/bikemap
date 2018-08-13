import mapboxgl from 'mapbox-gl';
import { transition } from 'd3-transition';
import { select, selectAll } from 'd3-selection';


const heroTeaser = select('#featured-1701965');

heroTeaser.html('<section id="mapVizContainer" style="height:100%;"> <div id="mapViz"></div> <div id="filteroverlay"><!-- <div class="closelegend"> <p class="minibutton">Legende minimieren</p> </div> --> <!-- <div class="title"> <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" viewBox="0 0 80 80" version="1.1" x="0px" y="0px"><path style="" d="m 68.360481,32.959841 -0.70346,-4.684663 c -0.04868,-0.324413 -0.529216,-0.519316 -1.077352,-0.437006 l -15.335932,2.302904 c -0.548136,0.08231 -0.950199,0.409743 -0.901486,0.734155 l 0.703469,4.684665 c 0.04876,0.324407 0.529216,0.519319 1.077352,0.437008 l 15.335932,-2.30291 c 0.548136,-0.08231 0.950199,-0.409736 0.901477,-0.734153 z" fill="#ffffff" fill-opacity="1" stroke="none"></path><path style="" d="m 71.003157,25.74106 c -1.979939,0.611148 -3.089568,2.711641 -2.478412,4.691592 0.611148,1.979942 2.711641,3.089566 4.691581,2.478416 1.979948,-0.611148 3.089577,-2.71164 2.478421,-4.691582 -0.611148,-1.97995 -2.711641,-3.089575 -4.691581,-2.478427 z" fill="#ffffff" fill-opacity="1" stroke="none"></path><path d="m 68.098706,32.501827 c 0.283698,0.30387 0.267517,0.775178 -0.03638,1.058871 l -4.837187,4.516139 -0.02485,0.02319 c -0.504859,0.447141 -1.276912,0.412074 -1.739892,-0.08382 -0.46299,-0.495899 -0.445019,-1.268533 0.0357,-1.74154 0.0076,-0.0077 0.01671,-0.01564 0.02485,-0.02319 l 4.837196,-4.516134 c 0.303865,-0.283696 0.775174,-0.267498 1.058863,0.03635 l 0.681682,0.730139 z" style="" fill="#ffffff" fill-opacity="1" stroke="none"></path><path d="m 61.679377,36.425913 c 0.517079,-0.432419 1.282407,-0.374805 1.729707,0.121986 0.01035,0.01136 0.01917,0.02297 0.02917,0.03482 l 4.136118,4.945905 c 0.266677,0.318898 0.224799,0.788622 -0.0941,1.055302 l -0.76626,0.640809 c -0.318902,0.266681 -0.788625,0.22479 -1.05531,-0.0941 l -4.136118,-4.945892 c -0.0099,-0.01209 -0.01968,-0.02267 -0.02909,-0.0349 -0.409849,-0.528161 -0.331122,-1.291593 0.185949,-1.724006 z" style="" fill="#ffffff" fill-opacity="1" stroke="none"></path><path d="m 52.99423,32.513571 c 0.282274,0.305187 0.271596,0.784753 -0.03358,1.067016 l -4.749946,4.393253 -0.0085,0.0079 c -0.820783,0.750728 -2.082794,0.707065 -2.8315,-0.102431 -0.748688,-0.809473 -0.701628,-2.079388 0.110767,-2.839193 0.0025,-0.0025 0.0059,-0.0056 0.0085,-0.0079 l 4.749937,-4.393257 c 0.305189,-0.282266 0.776421,-0.263889 1.058686,0.0413 l 1.695639,1.833307 z" style="" fill="#ffffff" fill-opacity="1" stroke="none"></path><path d="m 48.479956,36.956936 c -0.211052,1.086149 -1.267328,1.788902 -2.364465,1.57573 l -9.482438,-1.842505 c -0.408085,-0.07929 -0.669657,-0.481379 -0.590362,-0.889454 l 0.476321,-2.451395 c 0.0793,-0.408083 0.47024,-0.671817 0.878317,-0.592525 l 9.482447,1.842505 c 1.097128,0.21318 1.811232,1.271492 1.60018,2.357644 z" style="" fill="#ffffff" fill-opacity="1" stroke="none"></path><path style="" d="m 51.339883,33.014708 c 0.347533,-0.228127 0.818774,-0.13857 1.046906,0.208955 l 3.55048,5.408943 0.0059,0.0099 c 0.605219,0.933271 0.354181,2.170837 -0.5676,2.775906 -0.921789,0.605073 -2.166592,0.349391 -2.782142,-0.577093 -0.0017,-0.003 -0.0042,-0.0061 -0.0068,-0.0092 l -3.550497,-5.40894 c -0.228115,-0.347531 -0.132334,-0.80929 0.215199,-1.03741 l 2.087653,-1.370361 z" fill="#ffffff" fill-opacity="1" stroke="none"></path><path style="" d="m 55.475467,38.216765 c 0.894201,0.651662 1.082804,1.906271 0.424555,2.809511 l -5.689239,7.806665 c -0.244839,0.33596 -0.719897,0.402372 -1.055853,0.157535 L 47.136742,47.519698 C 46.80076,47.274896 46.72769,46.808975 46.972521,46.473013 l 5.689239,-7.806666 c 0.65825,-0.903239 1.919514,-1.101244 2.813707,-0.449582 z" fill="#ffffff" fill-opacity="1" stroke="none"></path><path style="" d="m 61.52942,22.876109 c 0.517071,-0.432414 1.282391,-0.374836 1.729716,0.121992 0.01026,0.01145 0.01917,0.02291 0.02909,0.03483 l 4.136118,4.945895 c 0.266685,0.318895 0.224799,0.78862 -0.09409,1.055304 l -0.766269,0.640808 c -0.318893,0.266684 -0.788616,0.224801 -1.055301,-0.09409 l -4.136118,-4.945895 c -0.0099,-0.01193 -0.01968,-0.02266 -0.02909,-0.03483 -0.409849,-0.528163 -0.331122,-1.291596 0.185948,-1.724011 z" fill="#ffffff" fill-opacity="1" stroke="none"></path><path style="" d="m 59.319373,16.517427 c 0.37333,-0.182869 0.819485,-0.0301 1.002356,0.343235 l 2.9111,5.94301 0.01501,0.03058 c 0.280678,0.613217 0.02222,1.341564 -0.587037,1.640005 -0.609266,0.298441 -1.343155,0.05618 -1.655611,-0.541476 -0.0051,-0.0098 -0.01001,-0.02058 -0.01501,-0.03058 l -2.911109,-5.94301 c -0.18287,-0.373329 -0.03011,-0.819484 0.343241,-1.002353 l 0.897051,-0.439411 z" fill="#ffffff" fill-opacity="1" stroke="none"></path><path d="m 5.8354437,42.093616 -0.447244,-0.305334 c 2.901639,-4.135957 8.5566593,-5.361771 12.9320863,-2.694624 1.358183,0.827911 2.436552,1.937989 3.212073,3.207808 l 3.898929,-2.165897 0.175458,-1.409301 c -0.115185,-0.04253 -0.211849,-0.08679 -0.284274,-0.130947 -0.483996,-0.295074 -1.218777,-2.792086 -0.414539,-3.402063 0.346565,-0.262924 0.939276,0.551111 1.80561,1.365407 0.193089,0.181485 0.876493,0.593003 1.297282,0.79079 0.979746,0.460615 1.917301,0.738582 1.813844,1.251875 -0.125786,0.619362 -1.846571,0.608517 -3.15973,0.385555 l -0.09486,0.761277 13.373217,8.151949 0.279839,-1.35922 0.132902,0.02737 0.428583,-2.081999 0.02146,0.0046 2.46e-4,-4.14e-4 c 0.297793,0.06525 1.011473,0.121502 1.320952,-0.122259 0.06886,-0.05453 0.161592,-0.154959 0.16557,-0.394711 0.0076,-0.450149 -1.639956,-1.470477 -3.526115,-2.183294 l 0.286623,-0.760116 c 0.955661,0.361258 4.073276,1.641283 4.05109,2.956598 -0.0076,0.427239 -0.171463,0.779496 -0.474294,1.018846 -0.341731,0.269818 -0.802312,0.347518 -1.196361,0.353971 l -0.282757,1.373251 0.132893,0.02737 -1.311419,6.368669 c 1.200118,0.193582 2.383996,0.616614 3.485772,1.288232 0.41816,0.254885 0.809182,0.536714 1.173828,0.84141 l -0.353961,0.410273 c 3.414008,2.845993 4.321999,7.837047 1.939097,11.746169 -2.621958,4.301348 -8.234302,5.662694 -12.53565,3.040703 -3.222606,-1.964403 -4.794597,-5.606874 -4.278111,-9.119378 l -0.536339,-0.07124 c 0.182268,-1.248221 0.613335,-2.481398 1.311538,-3.626798 1.904198,-3.123837 5.297632,-4.782719 8.711615,-4.623216 l 0.284978,-1.384315 -12.526083,3.740882 c 0.04376,0.530199 -0.06819,1.077835 -0.366538,1.567182 -0.749859,1.230208 -2.355264,1.61995 -3.58587,0.869819 -0.09056,-0.05521 -0.17534,-0.117042 -0.256339,-0.180512 l -1.159598,1.114234 0.506292,0.308487 -0.564054,0.924604 -1.973503,-1.202976 0.564062,-0.924605 0.749936,0.457019 1.325311,-1.274028 c -0.523237,-0.783536 -0.595442,-1.817118 -0.12169,-2.690642 l -1.489092,-1.139163 c -2.846909,3.404402 -7.829607,4.310722 -11.7341873,1.930593 -4.30094,-2.621712 -5.662704,-8.234313 -3.040726,-12.535653 0.10636,-0.174525 0.219737,-0.34194 0.335719,-0.507205 -0.0025,0.0014 -0.0025,0.0035 -0.004,0.0045 z m 26.1924803,16.67185 c -2.155109,3.535401 -1.036465,8.148502 2.498936,10.303586 3.535402,2.155118 8.148595,1.035397 10.303434,-2.499597 2.154863,-3.534986 1.036211,-8.148095 -2.499191,-10.30318 -0.935765,-0.570771 -1.948196,-0.909262 -2.969549,-1.03677 l -0.736502,3.577075 0.07887,2.657196 c 0.123242,0.02943 0.244848,0.07243 0.358837,0.14201 0.583094,0.355673 0.767677,1.115998 0.412419,1.698769 -0.355674,0.583102 -1.115998,0.767677 -1.699193,0.412172 -0.583094,-0.355673 -0.767669,-1.116006 -0.412165,-1.699201 0.131138,-0.214724 0.317927,-0.375214 0.530488,-0.474829 l -0.08192,-2.759557 0.733516,-3.611084 c -2.566111,-0.03723 -5.08541,1.243362 -6.51796,3.593435 z M 24.907551,53.116 c 0.17344,0.05998 0.342783,0.13779 0.505325,0.236942 0.0765,0.04668 0.148914,0.0965 0.218753,0.148604 l 1.298673,-1.247924 -0.564097,-0.344248 0.563817,-0.924193 1.973494,1.202973 -0.563816,0.9242 -0.692122,-0.422241 -1.453566,1.397367 c 0.05487,0.07863 0.100641,0.161824 0.146437,0.245059 l 13.083175,-3.906527 0.288142,-1.398765 -13.286789,-8.099259 -1.51712,12.187499 z m -3.706127,-0.230332 1.05553,0.807695 c 0.434901,-0.413421 0.993044,-0.65859 1.57529,-0.708982 l 1.474589,-11.851022 -3.380645,1.87779 c 1.440624,2.878212 1.41346,6.411254 -0.385119,9.361816 -0.107222,0.176815 -0.222212,0.346065 -0.339654,0.512694 z m -1.50914,-1.639676 c 1.378621,-2.261571 1.415148,-4.963602 0.338916,-7.18106 l -5.346083,2.969345 c 0.05987,0.268505 0.04223,0.552998 -0.05953,0.82004 l 4.85704,3.717147 c 0.07217,-0.106778 0.142231,-0.214737 0.209712,-0.325455 z M 9.3891067,53.745189 c 3.1884673,1.943565 7.2524163,1.222964 9.6000813,-1.530075 l -4.855633,-3.715739 c -0.453016,0.330146 -1.078538,0.375625 -1.58683,0.06577 -0.674767,-0.411805 -0.888781,-1.291432 -0.477335,-1.96642 0.411186,-0.674561 1.291595,-0.888124 1.966569,-0.476668 0.09466,0.05768 0.178426,0.126817 0.254753,0.201626 l 5.347007,-2.96992 c -0.597545,-0.952453 -1.418362,-1.785851 -2.444405,-2.411311 -3.53541,-2.155089 -8.1483373,-1.035799 -10.3031763,2.499195 -2.155081,3.535413 -1.036463,8.148504 2.498944,10.303591 z" style="" fill="#ffffff" stroke="none"></path><path style="" d="m 47.061128,68.432224 c -1.733066,0.530106 -1.84887,0.138762 -2.50182,1.505332 -0.356403,0.621317 -0.268381,1.391682 -0.127211,1.865764 l 5.300465,0 c 0.325253,-1.652117 -1.064359,-3.333958 -2.671434,-3.371096 z" fill="#ffffff" stroke="none"></path><path style="text-indent:0;text-transform:none;direction:ltr;block-progression:tb;baseline-shift:baseline;color:#ffffff;enable-background:accumulate;" d="m 31.823708,25.351014 1.187304,0 0.0212,0 0.402835,0.0212 0.0424,-0.657258 -0.424037,-0.0424 -0.0212,0 -1.208506,0 z m -1.420525,-0.593652 -0.0212,0 -0.763266,0.106009 0.08481,0.657258 0.742065,-0.10601 0,0.0212 0.869276,-0.0636 -0.06361,-0.67846 z m 3.561913,0.657257 0.360431,0.0424 0.0212,0 1.208506,0.169615 0.106009,-0.67846 -1.229707,-0.169614 -0.0212,0 -0.0212,0 -0.360432,-0.0424 z m -6.084934,-0.23322 -0.0212,0 -0.402835,0.127211 0.169615,0.657258 0.402835,-0.127211 0.0212,0 1.1449,-0.233221 -0.148413,-0.678459 z m 8.20512,0.530046 0.975285,0.212019 0,-0.0212 0.57245,0.169615 0.190817,-0.657258 -0.614854,-0.169615 -0.0212,0 -0.975285,-0.190816 z m -9.413626,-0.169614 -0.0212,0 -1.1449,0.424037 -0.0212,0.0212 -0.127211,0.0636 0.275624,0.614854 0.106009,-0.06361 0.0212,0 1.102497,-0.424037 0.0212,0 0.23322,-0.0636 -0.190817,-0.657258 z m 11.491408,0.678459 0.254422,0.06361 0.0212,0 1.25091,0.424037 0.212018,-0.657258 -1.272111,-0.424037 -0.0212,0 -0.275624,-0.06361 z m -13.781209,0.275624 -0.0212,0 -0.0212,0.0212 -0.932882,0.530047 0.318028,0.593652 0.932882,-0.530047 0.0212,0 0.466441,-0.23322 -0.296826,-0.614854 z m 15.816587,0.381634 1.038891,0.424037 0.445239,0.190817 0.275624,-0.614854 -0.445239,-0.190817 0,-0.0212 -0.0212,0 -1.060093,-0.402835 z m 1.971773,0.848074 0.487643,0.23322 0,-0.0212 0.954083,0.508844 0.318028,-0.593652 -0.954083,-0.508844 -0.0212,0 -0.508845,-0.233221 z m -19.908546,0.08481 -0.0212,0 -0.657258,0.530047 0.424037,0.530046 0.636056,-0.508844 0.0212,-0.0212 0.636056,-0.424037 -0.381634,-0.551249 z m 21.986328,0.593652 -0.169615,0.296827 0.0212,0 1.378121,0.826872 0.33923,-0.593652 -1.399323,-0.826873 -0.0212,0 z m -23.894495,1.038892 -0.0212,0.0212 -0.360431,0.402836 0.508844,0.445239 0.360432,-0.381634 0.763267,-0.742065 -0.445239,-0.487642 z m 25.569442,0.360431 1.038891,0.699662 0.360432,-0.572451 -1.038891,-0.699661 z m -26.438718,0.57245 0,0.0212 -0.805671,1.017689 0,0.0212 -0.106009,0.148413 0.551248,0.381634 0.10601,-0.148413 0,-0.0212 0.763267,-0.954084 0.0212,-0.0212 0.08481,-0.106009 -0.487643,-0.445239 z m -1.526534,2.141388 -0.0212,0 0,0.0212 -0.530046,0.91168 0.593652,0.33923 0.508844,-0.91168 0.0212,-0.0212 0.296826,-0.445239 -0.551248,-0.381634 z m -1.293313,2.417012 0,0.0212 -0.190817,0.487643 0.636056,0.254422 0.169615,-0.466441 0.0212,-0.0212 0.466441,-0.975285 -0.614854,-0.275624 z m -0.530047,1.335717 0,0.0212 -0.402835,1.229708 0.657258,0.212018 0.402835,-1.229707 0.106009,-0.296826 -0.636056,-0.254423 z m -0.826872,2.883453 0,0.0212 -0.08481,0.487643 0.657258,0.127211 0.106009,-0.487643 -0.0212,0 0.275625,-1.060093 -0.657258,-0.169615 z m -0.275624,1.547736 -0.0212,0.0212 -0.127211,1.102496 0.657257,0.10601 0.148413,-1.102497 0,-0.0212 0.08481,-0.487643 -0.657258,-0.106009 z m -0.33923,3.30749 0.678459,0.0636 0.10601,-1.632543 -0.67846,-0.0424 z" fill="#ffffff" fill-opacity="1" stroke="none" marker="none" visibility="visible" display="inline" overflow="visible"></path></svg> <h2>Velounfälle in Basel</h2> </div> --> <div id="severity" class="unfallschwere"> <h3>Unfallschwere</h3> <div class="tawo-checkbox"> <input type="checkbox" id="tote" value="Unfall mit Getöteten" name="severity" checked> <label for="tote" class="checkbox">Tote</label> </div> <div class="tawo-checkbox"> <input type="checkbox" id="schwerverletzte" value="Unfall mit Schwerverletzten" name="severity" checked> <label for="schwerverletzte" class="checkbox">Schwerverletzte</label> </div> <div class="tawo-checkbox"> <input type="checkbox" id="leichtverletzte" value="Unfall mit Leichtverletzten" name="severity" checked> <label for="leichtverletzte" class="checkbox">Leichtverletzte</label> </div> </div> <div class="unfallart"> <h3>Unfallart</h3> <div class="profil-form__select" id="accidenttypeMenu"></div> </div> <div id="accidentday" class="wochentag tawo-button"> <h3>Tag der Woche</h3> <input type="checkbox" id="wochenende" value="Wochenende" name="day" checked> <label for="wochenende" class="checkbox">Wochenende</label> <input type="checkbox" id="wochentage" value="Wochentag" name="day" checked> <label for="wochentage" class="checkbox">Wochentage</label> </div> <div id="jahre" class="jahre"> <h3>Jahre</h3> <div class="profil-form__select" id="years"> </div> </div> <div id="uhrzeit" class="uhrzeit tawo-button"> <h3>Tageszeit</h3> <input type="checkbox" id="morgen" value="morgens" name="daytime" checked> <label for="morgen" class="checkbox">morgens</label> <input type="checkbox" id="mittag" value="mittags" name="daytime" checked> <label for="mittag" class="checkbox">mittags</label> <input type="checkbox" id="abend" value="abends" name="daytime" checked> <label for="abend" class="checkbox">abends</label> <input type="checkbox" id="nacht" value="nachts" name="daytime" checked> <label for="nacht" class="checkbox">nachts</label> </div>  <div class="source_info">Quelle: Bundesamt für Strassen ASTRA</div></div> </section>');

select('.featured-stage .entry-header').transition().duration(500).delay(5000).style('opacity', 0).style('display', 'none');


select('#filteroverlay').transition().duration(500).delay(5500).style('opacity', 1);


// mapboxgl.accessToken =  'pk.eyJ1IjoiZmVsaXhtaWNoZWwiLCJhIjoiZWZrazRjOCJ9.62fkOEqGMxFxJZPJuo2iIQ'; Felix Schlüssel
mapboxgl.accessToken =  'pk.eyJ1IjoidGFnZXN3b2NoZSIsImEiOiJjamp0cHc2ZTIwOWtiM3BxaDU3aG44endjIn0.X3Tgu7aJyY0t-95wu518fQ'; // TagesWoche Schlüssel

var filterObject = {
    'severity': ['Unfall mit Leichtverletzten', 'Unfall mit Schwerverletzten', 'Unfall mit Getöteten'], 
    'accidentype': 'Alle Unfälle',
    'day': ['Wochentag', 'Wochenende'],
    'daytime': ['morgens', 'mittags', 'abends', 'nachts'],
    'year': 'Alle Jahre'
};


const accidenttypes = ['Alle Unfälle', 'Parkierunfall', 'Einbiegeunfall', 'Schleuder- oder Selbstunfall', 'Tierunfall', 'Überholunfall oder Fahrstreifenwechsel', 'Abbiegeunfall', 'Auffahrunfall', 'Frontalkollision', 'Überqueren der Fahrbahn', 'Fussgängerunfall', 'Andere'];
const yearArray = ['Alle Jahre', 2011, 2012, 2013, 2014, 2015, 2016, 2017];
const accidenttypeMenu = select("#accidenttypeMenu");
const yearMenu = select("#years");


accidenttypeMenu.append("select").selectAll("option")
    .data(accidenttypes).enter().append("option")
    .attr('value', d => d )
    .text(d => d );

accidenttypeMenu.on('change', function() {
    let selectedAccident = select(this)
        .select("select")
        .property("value");

    filterObject.accidentype = selectedAccident;
    updateFilters();
});

yearMenu.append("select").selectAll("option")
    .data(yearArray).enter().append("option")
    .attr('value', d => d )
    .text(d => d );

yearMenu.on('change', function() {
    let selectedYear = select(this)
        .select("select")
        .property("value");

    if(selectedYear != 'Alle Jahre')  {
        filterObject.year = parseFloat(selectedYear);
    } else {
        filterObject.year = selectedYear;
    }

    updateFilters();
    console.log(filterObject);
});



const severity = selectAll("input[name='severity']").on("change", function() {
    var index = filterObject.severity.indexOf(this.value);
    if (index > -1) {
        filterObject.severity.splice(index, 1);
    } else {
        filterObject.severity.push(this.value);
    }

    updateFilters();

});

const day = selectAll("input[name='day']").on("change", function() {
    var index = filterObject.day.indexOf(this.value);
    if (index > -1) {
        filterObject.day.splice(index, 1);
    } else {
        filterObject.day.push(this.value);
    }

    updateFilters();

});

const daytime = selectAll("input[name='daytime']").on("change", function() {
    var index = filterObject.daytime.indexOf(this.value);
    if (index > -1) {
        filterObject.daytime.splice(index, 1);
    } else {
        filterObject.daytime.push(this.value);
    }

    updateFilters();

});

const map = new mapboxgl.Map({
    container: 'mapViz',
    style: 'mapbox://styles/tageswoche/cjjtq37gn01v32sqm5cv1004c?optimize=true',
    zoom: 13,
    center: [7.588576,47.559648],
    scrollZoom      : false,
    boxZoom         : true,
    doubleClickZoom : false
});



const transition_time = 1000;

map.on('style.load', function () {
    let mapCanvas = document.getElementsByClassName('mapboxgl-canvas')[0];
    mapCanvas.style.height = '100%';
    map.resize();

    map.addSource('all_bikeaccidents', {
    type: 'vector',
    url: 'mapbox://felixmichel.cjkibbowh0znk2vqs3yr04986-07tcl'
    });
    map.addLayer({
        'id': 'all_bikeaccidents',
        'type': 'circle',
        'source': 'all_bikeaccidents',
        'source-layer': 'all_bikeaccidents',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-opacity': 1,
            'circle-opacity-transition': {
                duration: transition_time
            },
            'circle-radius': 6,
            'circle-color': {
                property: 'severity',
                type: 'categorical',
                stops: [['Unfall mit Leichtverletzten', '#35FDFF'], ['Unfall mit Schwerverletzten', '#43d722'], ['Unfall mit Getöteten', '#e60000']]
            },
            'circle-blur': 1
        },
        'source-layer': 'all_bikeaccidents'
    });
});

const layerIds = [ 'all_bikeaccidents', 'export_15-16-17', 'bike_hotspots_circles' ];

const fully = new mapboxgl.FullscreenControl();
const nav = new mapboxgl.NavigationControl();
map.addControl(nav, 'top-left');
map.addControl(fully, 'top-left');


function updateFilters() {
    let accidentTypeFilter;
    let severityFilter;
    let dayFilter;
    let dayTimeFilter;
    let yearFilter;

    if(filterObject.daytime.length > 0) {
        dayTimeFilter = ['match', ['get', 'timefilter'], filterObject.daytime, true, false];
    } else {
        dayTimeFilter = ['==', ['string', ['get', 'timefilter']], 'none'];
    }

    if(filterObject.severity.length > 0) {
        severityFilter = ['match', ['get', 'severity'], filterObject.severity, true, false];
    } else {
        severityFilter = ['==', ['string', ['get', 'severity']], 'none'];
    }

    if(filterObject.day.length > 0) {
        dayFilter = ['match', ['get', 'weekyday'], filterObject.day, true, false];
    } else {
        dayFilter = ['==', ['string', ['get', 'weekyday']], 'none'];
    }

    if(filterObject.accidentype == 'Alle Unfälle') {
        accidentTypeFilter = ['!=', ['string', ['get', 'accidenttype']], filterObject.accidentype];
    } else {
        accidentTypeFilter = ['==', ['string', ['get', 'accidenttype']], filterObject.accidentype];
    }

    if(filterObject.year == 'Alle Jahre') {
        yearFilter = ['!=', ['number', ['get', 'year']], 1];
    } else {
        yearFilter = ['==', ['number', ['get', 'year']], filterObject.year];
    }

    map.setFilter(layerIds[0], ['all', severityFilter, accidentTypeFilter, dayFilter, dayTimeFilter, yearFilter]);
}

// Create a popup, but don't add it to the map yet.
var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: true
    // offset: [50, 10]
});

if (window.innerWidth < 768) {
    map.on('click', layerIds[0], function(e) {
    popup.remove();
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    var coordinates = e.features[0].geometry.coordinates.slice();

    var accidenttype = e.features[0].properties.accidenttype;
    var severity = e.features[0].properties.severity;
    var time = e.features[0].properties.day.trim() + ', ' + e.features[0].properties.time.trim() + ', ' + e.features[0].properties.year;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates)
        .setHTML('<h2>' + severity + '</h2><p class="popup-accidenttype">' + accidenttype + '</p><p class="popup-time">' + time + '</p>')
        .addTo(map);
});

} else {
    map.on('mouseenter', layerIds[0], function(e) {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    var coordinates = e.features[0].geometry.coordinates.slice();

    var accidenttype = e.features[0].properties.accidenttype;
    var severity = e.features[0].properties.severity;
    var time = e.features[0].properties.day.trim() + ', ' + e.features[0].properties.time.trim() + ', ' + e.features[0].properties.year;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates)
        .setHTML('<h2>' + severity + '</h2><p class="popup-accidenttype">' + accidenttype + '</p><p class="popup-time">' + time + '</p>')
        .addTo(map);
});


map.on('mouseleave', layerIds[0], function() {
    map.getCanvas().style.cursor = '';
    popup.remove();
});

}