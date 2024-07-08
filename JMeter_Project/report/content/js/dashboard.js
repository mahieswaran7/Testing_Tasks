/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 92.85714285714286, "KoPercent": 7.142857142857143};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.8392857142857143, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "Alumini"], "isController": false}, {"data": [1.0, 500, 1500, "CurrentStudent-0"], "isController": false}, {"data": [1.0, 500, 1500, "CurrentStudent-1"], "isController": false}, {"data": [0.0, 500, 1500, "CurrentStudent-2"], "isController": false}, {"data": [1.0, 500, 1500, "Research"], "isController": false}, {"data": [1.0, 500, 1500, "Families-0"], "isController": false}, {"data": [1.0, 500, 1500, "About-2"], "isController": false}, {"data": [0.0, 500, 1500, "Families-1"], "isController": false}, {"data": [1.0, 500, 1500, "About-1"], "isController": false}, {"data": [0.5, 500, 1500, "Families-2"], "isController": false}, {"data": [1.0, 500, 1500, "About-0"], "isController": false}, {"data": [1.0, 500, 1500, "Admissions-0"], "isController": false}, {"data": [1.0, 500, 1500, "Alumini-2"], "isController": false}, {"data": [1.0, 500, 1500, "Admissions-1"], "isController": false}, {"data": [1.0, 500, 1500, "Alumini-1"], "isController": false}, {"data": [1.0, 500, 1500, "Admissions-2"], "isController": false}, {"data": [1.0, 500, 1500, "Alumini-0"], "isController": false}, {"data": [1.0, 500, 1500, "Admissions"], "isController": false}, {"data": [1.0, 500, 1500, "Research-2"], "isController": false}, {"data": [1.0, 500, 1500, "Campus"], "isController": false}, {"data": [1.0, 500, 1500, "Research-1"], "isController": false}, {"data": [0.0, 500, 1500, "CurrentStudent"], "isController": false}, {"data": [1.0, 500, 1500, "Research-0"], "isController": false}, {"data": [1.0, 500, 1500, "Campus-2"], "isController": false}, {"data": [0.0, 500, 1500, "Families"], "isController": false}, {"data": [1.0, 500, 1500, "Campus-0"], "isController": false}, {"data": [1.0, 500, 1500, "Campus-1"], "isController": false}, {"data": [1.0, 500, 1500, "About"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 28, 2, 7.142857142857143, 369.24999999999994, 6, 2844, 315.0, 849.7000000000013, 2305.7999999999965, 2844.0, 5.394990366088632, 214.62999759152214, 1.1078998073217725], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Alumini", 1, 0, 0.0, 390.0, 390, 390, 390.0, 390.0, 390.0, 390.0, 2.5641025641025643, 220.44020432692307, 0.9715544871794871], "isController": false}, {"data": ["CurrentStudent-0", 1, 0, 0.0, 50.0, 50, 50, 50.0, 50.0, 50.0, 50.0, 20.0, 14.86328125, 3.06640625], "isController": false}, {"data": ["CurrentStudent-1", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 6.0, 166.66666666666666, 107.09635416666667, 25.553385416666668], "isController": false}, {"data": ["CurrentStudent-2", 1, 1, 100.0, 380.0, 380, 380, 380.0, 380.0, 380.0, 380.0, 2.631578947368421, 173.2653166118421, 0.41375411184210525], "isController": false}, {"data": ["Research", 1, 0, 0.0, 376.0, 376, 376, 376.0, 376.0, 376.0, 376.0, 2.6595744680851063, 211.16086269946808, 1.077854886968085], "isController": false}, {"data": ["Families-0", 1, 0, 0.0, 431.0, 431, 431, 431.0, 431.0, 431.0, 431.0, 2.320185614849188, 1.685759860788863, 0.31721287703016243], "isController": false}, {"data": ["About-2", 1, 0, 0.0, 264.0, 264, 264, 264.0, 264.0, 264.0, 264.0, 3.787878787878788, 304.51734138257575, 0.4993785511363636], "isController": false}, {"data": ["Families-1", 1, 0, 0.0, 1648.0, 1648, 1648, 1648.0, 1648.0, 1648.0, 1648.0, 0.6067961165048543, 0.38280301881067963, 0.08296040655339806], "isController": false}, {"data": ["About-1", 1, 0, 0.0, 6.0, 6, 6, 6.0, 6.0, 6.0, 6.0, 166.66666666666666, 103.35286458333333, 21.321614583333332], "isController": false}, {"data": ["Families-2", 1, 0, 0.0, 761.0, 761, 761, 761.0, 761.0, 761.0, 761.0, 1.314060446780552, 99.32064101511169, 0.1847897503285151], "isController": false}, {"data": ["About-0", 1, 0, 0.0, 56.0, 56, 56, 56.0, 56.0, 56.0, 56.0, 17.857142857142858, 12.834821428571429, 2.284458705357143], "isController": false}, {"data": ["Admissions-0", 1, 0, 0.0, 51.0, 51, 51, 51.0, 51.0, 51.0, 51.0, 19.607843137254903, 14.22717524509804, 2.661611519607843], "isController": false}, {"data": ["Alumini-2", 1, 0, 0.0, 330.0, 330, 330, 330.0, 330.0, 330.0, 330.0, 3.0303030303030303, 256.4837831439394, 0.390625], "isController": false}, {"data": ["Admissions-1", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 7.0, 142.85714285714286, 89.70424107142857, 19.39174107142857], "isController": false}, {"data": ["Alumini-1", 1, 0, 0.0, 8.0, 8, 8, 8.0, 8.0, 8.0, 8.0, 125.0, 77.1484375, 15.625], "isController": false}, {"data": ["Admissions-2", 1, 0, 0.0, 316.0, 316, 316, 316.0, 316.0, 316.0, 316.0, 3.1645569620253164, 255.99844244462025, 0.4419254351265823], "isController": false}, {"data": ["Alumini-0", 1, 0, 0.0, 52.0, 52, 52, 52.0, 52.0, 52.0, 52.0, 19.230769230769234, 13.746995192307693, 2.4038461538461537], "isController": false}, {"data": ["Admissions", 1, 0, 0.0, 374.0, 374, 374, 374.0, 374.0, 374.0, 374.0, 2.6737967914438503, 219.91717496657753, 1.0992855949197862], "isController": false}, {"data": ["Research-2", 1, 0, 0.0, 314.0, 314, 314, 314.0, 314.0, 314.0, 314.0, 3.1847133757961785, 248.5600368232484, 0.4385201035031847], "isController": false}, {"data": ["Campus", 1, 0, 0.0, 425.0, 425, 425, 425.0, 425.0, 425.0, 425.0, 2.352941176470588, 196.35110294117646, 0.9742647058823529], "isController": false}, {"data": ["Research-1", 1, 0, 0.0, 8.0, 8, 8, 8.0, 8.0, 8.0, 8.0, 125.0, 78.125, 16.7236328125], "isController": false}, {"data": ["CurrentStudent", 1, 1, 100.0, 437.0, 437, 437, 437.0, 437.0, 437.0, 437.0, 2.288329519450801, 153.83652745995423, 1.0614809782608696], "isController": false}, {"data": ["Research-0", 1, 0, 0.0, 54.0, 54, 54, 54.0, 54.0, 54.0, 54.0, 18.51851851851852, 13.40060763888889, 2.4775752314814814], "isController": false}, {"data": ["Campus-2", 1, 0, 0.0, 364.0, 364, 364, 364.0, 364.0, 364.0, 364.0, 2.7472527472527473, 225.53228021978023, 0.3863324175824176], "isController": false}, {"data": ["Families", 1, 0, 0.0, 2844.0, 2844, 2844, 2844.0, 2844.0, 2844.0, 2844.0, 0.35161744022503516, 27.053596936533054, 0.14559159634317864], "isController": false}, {"data": ["Campus-0", 1, 0, 0.0, 53.0, 53, 53, 53.0, 53.0, 53.0, 53.0, 18.867924528301884, 13.70872641509434, 2.5795990566037736], "isController": false}, {"data": ["Campus-1", 1, 0, 0.0, 7.0, 7, 7, 7.0, 7.0, 7.0, 7.0, 142.85714285714286, 89.84375, 19.53125], "isController": false}, {"data": ["About", 1, 0, 0.0, 327.0, 327, 327, 327.0, 327.0, 327.0, 327.0, 3.058103975535168, 249.94325783639144, 1.1856125764525993], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["404/Not Found", 2, 100.0, 7.142857142857143], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 28, 2, "404/Not Found", 2, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["CurrentStudent-2", 1, 1, "404/Not Found", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["CurrentStudent", 1, 1, "404/Not Found", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
