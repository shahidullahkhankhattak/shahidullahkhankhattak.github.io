    $( document ).ready(function() {
        "use strict";
        
        // NAV
        $('.button-collapse').sideNav({
            closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
            }
        );
        
    /**************************************************************************
            Style demo
    **************************************************************************/
   
    $('.cv-style-switch').click(function(){
        if($(this).hasClass('open')){
            $(this).removeClass('open');
            $('#switch-style').animate({'right':'0'});
        }else{
            $(this).addClass('open');
            $('#switch-style').animate({'right':'-300'});
        }
    });
  
        
        // Portfolio fancybox
        $(".single_imadge").fancybox({
			padding: 4,
		});
		
		 //Portfolio 
        $('#portfolio-item').mixItUp();
        
        // Sticky nav
        $("#sticky-nav").sticky({topSpacing:0});
        
        //Skills
        $(".determinate").each(function(){
            var width = $(this).text();
            $(this).css("width", width)
                .empty()
                .append('<i class="fa fa-circle"></i>');                
        });
        
    // Nav
        
    $('#example-one').onePageNav({
      changeHash: true,
      scrollSpeed: 750,
      scrollThreshold: 0.5,
      filter: ':not(.external)'
    });
        
    $('a[href^="#"].inpage-scroll, .inpage-scroll a[href^="#"]').on('click', function(e) {
        e.preventDefault();

        var target = this.hash,
            $target = $(target);
        $('.main-navigation a[href="' + target + '"]').addClass('active');
        $('.main-navigation a:not([href="' + target + '"])').removeClass('active');
        $('html, body').stop().animate({
            'scrollTop': ($target.offset()) ? $target.offset().top : 0
        }, 900, 'swing', function() {
            window.location.hash = target;
        });
    });
    
            
        
        // Smooth Scroll
        $(function() {
          $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
              var target = $(this.hash);
              target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
              if (target.length) {
                $('html,body').animate({
                  scrollTop: target.offset().top
                }, 1000);
                return false;
              }
            }
          });
        });
        
        // Blog
        jQuery(window).on('load', function(){ var $ = jQuery;
            $('.blog').masonry({
                itemSelector: '.blog-post',
                columnWidth: '.blog-post',
                percentPosition: true
            });
        });
        
        // Contact form
        
        $("#contactForm").validator().on("submit", function (event) {
            if (event.isDefaultPrevented()) {
              // handle the invalid form...
              formError();
              submitMSG(false, "Did you fill in the form properly?");
            } else {
              // everything looks good!
              event.preventDefault();
              submitForm();
            }
         });


        function submitForm(){
          // Initiate Variables With Form Content
          var name = $("#name").val();
          var email = $("#email").val();
          var subject = $("#subject").val();
          var message = $("#message").val();
          var budget = $("select").val();
          $.ajax({
              type: "POST",
              url: "process.php",
              data: {formData: JSON.stringify({name: name, email: email, subject: subject, message: message, budget: budget})},
              success : function(text){
                  if (text == "success"){
                      formSuccess();
                    } else {
                      formError();
                      submitMSG(false,"Could'nt Send Your Message Due To Some Temperory Problem, Please Try Again Later");
                    }
                }
            });
        }
        function formSuccess(){
            $("#contactForm")[0].reset();
            submitMSG(true, "Message Sent!")
        }
        function formError(){
            $("#contactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', 
            function(){
              $(this).removeClass();
            });
        }
        function submitMSG(valid, msg){
            if(valid){
              var msgClasses = "h3 text-center fadeInUp animated text-success";
            } else {
              var msgClasses = "h3 text-center text-danger";
            }
            $("#msgSubmit").removeClass().addClass(msgClasses).text(msg);
        }
        
        //Tooltip
        $('.tooltipped').tooltip({delay: 50});
        
        //wow
        new WOW().init();
        
    });
    
