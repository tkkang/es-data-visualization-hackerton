'use strict';

angular.module('esvisualizationApp')
  .controller('MainCtrl', function ($scope, $http) {

    $scope.xAxisTickFormatFunction = function(){
      return function(d){
        return d3.time.format('%x')(new Date(d));
      }
    }

    $scope.getImpression = function() {
      // real data 
      var client = new elasticsearch.Client({
                                              host: '54.178.125.74:9200',
                                              sniffOnStart: true,
                                              sniffInterval: 60000,
                                            });

      client.search({
          index: 'impression',
          size: 5,
          body: {
            "filter": {
                "and": [
                    {
                      "range": {
                        "time": {
                            "from": "2013-7-1", 
                            "to": "2014-6-30"
                        }
                      }
                    }
                ]
            },
            "aggs": {
              "events": {
                "terms": {
                  "field": "event"   
                },
                "aggs" : {   
                  "time_histogram" : {
                      "date_histogram" : {
                          "field" : "time",
                          "interval" : "1d",   
                          "format" : "yyyy-MM-dd" 
                      }
                  }
                }
              }
            }

            // End query.
          }
      }).then(function (resp) {
         var impressions = resp.aggregations.events.buckets[0].time_histogram.buckets;
         console.log(impressions);

         var fixData = [];
         angular.forEach(impressions, function(impression, idx) {
          fixData[idx] = [impression.key, impression.doc_count];
         });

         $scope.data1 = [
            {
              "key": "Series 1",
              "values": fixData
            }
          ];

         var fixData2 = [];
         angular.forEach(impressions, function(impression, idx) {
          fixData2[idx] = [impression.key, impression.doc_count];
         });

         $scope.data2 = [
            {
              "key": "Series 1",
              "values": fixData2
            }
          ];

        $scope.$apply();
      });
    }

  });
