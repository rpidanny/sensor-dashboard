$(document).ready(function() {
            console.log( "ready!" );
            var temp = new Date().toLocaleString("en-US", {timeZone: "Asia/Kathmandu"});
            var d = new Date(temp)
            d.setDate(d.getDate()-5);
            query = { "timestamp": { "$gte": d.getTime() }}
            // $.getJSON("https://sensor-datalogger.herokuapp.com/api/v1/sensor/daily", function(result){
            $.postJSON("https://21c7s8b615.execute-api.eu-west-1.amazonaws.com/dev/find", query, function(result){
                console.log(result)
                var temp = [];
                var hum = [];
                var heat = [];
                var label = [];
                result.forEach(function(data){
                    let date = new Date(data.timestamp);

                    if(date.getMinutes()==0){
                        temp.push(data.temperature);
                        hum.push(data.humidity);
                        heat.push(data.heatIndex);
                        label.push(date.getHours());                        
                    }

                });
                var configTemperature = {
                    type: 'line',
                    data: {
                        labels: label,
                        datasets: [{
                            label: "Temperature (celcius)",
                            data: temp,
                            borderColor: '#F44336',
                            backgroundColor: '#F44336',
                            fill: false,
                            cubicInterpolationMode: 'monotone'
                        }, {
                            label: "Heat Index (celcius)",
                            data: heat,
                            borderColor: '#009688',
                            backgroundColor: '#009688',
                            fill: false,
                            cubicInterpolationMode: 'monotone',
                            borderDash: [5, 5],
                        }]
                    },
                    options: {
                        responsive: true,
                        title:{
                            display:true,
                            text:'Temperature'
                        },
                        tooltips: {
                            mode: 'index'
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: true
                        },
                        scales: {
                            xAxes: [{
                                display: true,
                                gridLines: {
                                  display: true,
                                  color:'#546E7A'
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString:"Time",
                                    color:'#fff'
                                }
                            }],
                            yAxes: [{
                                display: true,
                                gridLines: {
                                  display: true,
                                  color:'#546E7A'
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Value',
                                    color:'#fff'
                                },
                                ticks: {
                                    suggestedMin: Math.min.apply(Math,temp)-1,
                                    suggestedMax: Math.max.apply(Math,temp)+1 // 3,
                                }
                            }]
                        },
                        scaleFontColor: "#FFFFFF"
                    }
                };


                var configHumidity = {
                    type: 'line',
                    data: {
                        labels: label,
                        datasets: [{
                            label: "Humidity",
                            data: hum,
                            borderColor: '#0091EA',
                            backgroundColor: '#0091EA',
                            fill: true,
                            cubicInterpolationMode: 'monotone'
                        }]
                    },
                    options: {
                        responsive: true,
                        title:{
                            display:true,
                            text:'Humidity'
                        },
                        tooltips: {
                            mode: 'index'
                        },
                        hover: {
                            mode: 'nearest',
                            intersect: true
                        },
                        scales: {
                            xAxes: [{
                                display: true,
                                gridLines: {
                                  display: true,
                                  color:'#546E7A'
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString:"Time",
                                    color:'#fff'
                                }
                            }],
                            yAxes: [{
                                display: true,
                                gridLines: {
                                  display: true,
                                  color:'#546E7A'
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Value',
                                    color:'#fff'
                                },
                                ticks: {
                                    suggestedMin: Math.min.apply(Math,hum)-1,
                                    suggestedMax: Math.max.apply(Math,hum)+1 // 3,
                                }
                            }]
                        },
                        scaleFontColor: "#FFFFFF"
                    }
                };
                new Chart(document.getElementById("temperature").getContext("2d"),configTemperature);
                new Chart(document.getElementById("humidity").getContext("2d"),configHumidity)
                Chart.defaults.global.defaultFontColor = "#fff";
            });
        });