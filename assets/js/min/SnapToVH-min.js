$(document).ready(function(){return;var o=25,n;$(window).on("scroll",function(e){clearTimeout(n),n=setTimeout(function(){var n=$(window).scrollTop(),e=$(window).innerHeight(),i=e*(o/100);console.log("windowHeight",e),console.log("increment",i);var r=Math.round(n/i)*i;console.log("rounded",r),$(window).scrollTo(r,300,{axis:"y"})},250)})});