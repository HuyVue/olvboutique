var indexMore = 0;
var NOD = {
	init: function() {
		var that = this;
		that.initViews();
		that.showQuickView();
		that.accountPopup();
		that.loopWishlist();
		that.loadPage();
		that.checkWishList();
	},
	initViews: function() {
		var view = shop.template,
				that = this;
		switch (view) {
			case 'index':
				that.getImageInstagram();
				that.slideHome();
				break;
			case 'collection.list-lookbook':
				that.scrollMore();
				break;
			case 'collection':
				that.toggleSort();
				that.filterCollection();
				break;
			case 'search':
				break;
			case 'product':
				that.thumbProduct2();
				that.addCartDetail('');
				that.changeSwatch('');
				that.zoomImg();
				break;
			case 'blog':
				break;
			case 'page.contact':
				that.sendGoogleform();
				break;
			case 'cart':
				that.changeQuantity();
				break;
			case 'page':
				break;
			default:
				console.log(view);
		}
	},
	loadPage: function(){
		setTimeout(function(){
			$('.loader_overlay').addClass('loaded');
		},1000);
	},
	loopWishlist: function(){
		$('.pro_love_icon').click(function(){
			debugger;
			var quickview_product_id = $(this).data('productid');
			var quickviewprohandle = $(this).data('handle');
			var quickviewprotitle = $(this).data('title');
			var that2 = $(this);
			$.ajax({
				url: "https://apollotran.com/app/haravan/apwishlist/install/?add=" + Haravan.shop,
				data: {email: customerEmail, customerId: customerId, action: "add", productId: quickview_product_id, productHandle: quickviewprohandle,productTitle: quickviewprotitle},
				dataType: "Json",
				success: function(response) {
					alert('Đã thêm vào danh sách của bạn.');
					that2.find('span svg').attr('data-prefix','fas');
					that2.attr('href','/pages/danh-sach-yeu-thich');
				},
				complete: function() {
				}
			})
		});
	},
	checkWishList: function(){
		var that = this;
		$.ajax({
			url: "https://apollotran.com/app/haravan/apwishlist/haravan/install/index/?list=" + Haravan.domain,
			data: {email: customerEmail, customer: customerId, action: "get"},
			dataType: "Json",
			success: function(response) {
				//console.log(response);
				if(typeof response != "undefined") {
					var data = response;
					//console.log(data);
					var len = data.length;
					for(var i = 0; i < len; i++) {
						var item = data[i];
						var ap_wishlist = item['product_id'];
						//console.log(item['product_id']);
						//$("." + ap_wishlist).addClass('long');
						$("." + ap_wishlist).find('.icon-heart').attr('data-prefix','fas');
						$("." + ap_wishlist).attr('title','Đã Thêm Vào DS');
					}
				}

			}
		});
	},
	slideHome: function(){
		$('.home-slider').on('initialized.owl.carousel',function(event){
			if($(window).width() > 767){
				if($('.home-slider').find('.active .slide-item').hasClass('dark')){
					$('header').addClass('dark');
				}else{
					$('header').removeClass('dark');
				}
			}
		});
		$('.home-slider').owlCarousel({
			items:1,
			autoHeight: true,
			autoplay:true,
			autoplayTimeout:3000,
			dots: true,
			lazyLoad:true,
			loop:true,
			margin:0
		});
		$('.home-slider').on('changed.owl.carousel',function(event){
			if($(window).width() > 767){
				var index = event.item.index;
				if($('.home-slider .owl-item:eq('+index+')').find('.slide-item').hasClass('dark')){
					$('header').addClass('dark');
				}else{
					$('header').removeClass('dark');
				}
			}
		});
		$('.content-product-list-wrapper').owlCarousel({
			items: 4,
			autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause: false,
			dots: false,
			navText: ['<img src="//theme.hstatic.net/1000304367/1000739373/14/arrow-left.png?v=300" alt="arrow left" />','<img src="//theme.hstatic.net/1000304367/1000739373/14/arrow-left.png?v=300" alt="arrow left" />'], 
			lazyLoad: true,
			loop: true,
			margin: 30,
			nav: true,
			autoHeight: true,
			responsive : {
				// breakpoint from 0 up
				0 : {
					items: 2,
				},
				// breakpoint from 768 up
				768 : {
					items: 3,
				},
				// breakpoint from 992 up
				992 : {
					items: 4,
				}
			}
		});
	},
	getImageInstagram: function() {
		/*var feed = new Instafeed({
			get: 'user',
			limit: "10",
			userId: "2691044645",
			//clientId: 'c35f9d868c48411eb187774ec6daa06a',
			accessToken: "2691044645.cd5a733.372460c9129a462489ebeb1323897f48",
			target: 'instafeed',
			resolution: 'standard_resolution',
			template: '<a class="instagram_item" href="{{link}}" target="_blank"><div class="instagram_image" style="background-image:url({{image}})"></div></a>',
			after: function() {
				$('#instafeed').owlCarousel({
					items:4,
					autoplay:true,
					autoplayTimeout: 5000,
					autoplayHoverPause:false,
					dots: true,
					lazyLoad:true,
					loop:true,
					margin:5,
					autoHeight: true,
					responsive : {
						// breakpoint from 0 up
						0 : {
							items: 1,
						},
						479 : {
							items: 2,
						},
						// breakpoint from 768 up
						768 : {
							items: 3,
						},
						// breakpoint from 992 up
						992 : {
							items: 4,
						}
					}
				});
			}
		});
		feed.run();*/
		$('.instagram-wrapper').owlCarousel({
			items: 5,
			autoplay: true,
			autoplayTimeout: 5000,
			autoplayHoverPause:false,
			dots: true,
			lazyLoad:true,
			loop: false,
			margin: 20,
			autoHeight: true,
			responsive : {
				// breakpoint from 0 up
				0 : {
					items: 2,
				},
				// breakpoint from 768 up
				768 : {
					items: 3,
				},
				// breakpoint from 992 up
				992 : {
					items: 5,
				}
			}
		});
	},
	scrollMore: function(){
		jQuery(window).scroll(function(){
			var seeMore = $('.see_more:eq('+indexMore+')').offset().top;
			if (jQuery(window).scrollTop() > (seeMore - 500)){
				if(indexMore > 0){
					setTimeout(function(){
						$('.see_more:eq('+indexMore+')').hide();
						var aimShow = $('.see_more:eq('+indexMore+') + div');
						aimShow.show();
						indexMore++;
						$('.see_more:eq('+indexMore+')').show();
					},800);
				}else{
					$('.see_more:eq('+indexMore+')').hide();
					var aimShow = $('.see_more:eq('+indexMore+') + div');
					aimShow.show();
					indexMore++;
					$('.see_more:eq('+indexMore+')').show();
				}
			}
		});
	},
	toggleSort: function(){
		if(window.location.href.indexOf('sort_by') > -1){
			var curSort = $('.browse-tags select option:selected').html();
			$('.filter-sort span').html(curSort);
		}
		else{
			$('.filter-sort span').html('LỌC THEO<i class="fas fa-caret-down"></i>');
		}

		$('.filter-sort span').on('click',function(){
			$(this).siblings().slideToggle();
		});

		$('.filter-sort li').on('click',function(){
			var changeSort = $(this).data('change');
			if(changeSort == 'con-hang'){
				$('.filter-availabel li').trigger('click');
			}else{
				$('.browse-tags select').val(changeSort).trigger('change');
			}
		});
	},
	genQuery: function(){
		var filterPage = $('[data-filter]'),
				id = filterPage.data('id') || 0,
				handle = filterPage.data('handle') || 'all',
				product_size = $('.filter li'),
				template = shop.template,
				productSize='', _query;
		var checkHasFilter = false;
		var category = '', __query = '/search?q=filter=';

		_query = handle === 'all' ? '((collectionid:product>='+ id +')' : '((collectionid:product='+ id +')'; 

		product_size.each(function(){
			if($(this).hasClass('active')){
				productSize += $(this).data('filter') + '||';
				checkHasFilter = true;
			}
		});


		if(productSize) {productSize += '#'; productSize = productSize.replace("||#", ""); _query += '&&(' + productSize + ')';}
		if(checkHasFilter == false){
			__query = '/collections/'+handle;
		}else{
			__query = __query + encodeURIComponent(_query) + ')';
		}
		return __query;
	},
	getProduct: function(page){
		var linkdan = window.href;

		if(linkdan.indexOf("descending") != -1){
			var sort = '&sort_by=price-descending';
		}else if(linkdan.indexOf("ascending") != -1){
			var sort = '&sort_by=price-ascending';
		}else if(linkdan.indexOf("created-descending") != -1){
			var sort = '&sort_by=created-descending';
		}else if(linkdan.indexOf("best-selling") != -1){
			var sort = '&sort_by=best-selling';
		}else{
			var sort = '';
		}

		console.log(linkdan);

		if(linkdan )
			var that = this,
					filterPage = $('[data-filter]'),
					total_page = parseInt(filterPage.data('pageSize')) || 0;
		/* fix */
		var container = $('.content-product-list');
		$.ajax({
			url: that.genQuery() + ((that.genQuery().indexOf('search') > -1)?'&view=pagesize':'?view=pagesize'),
			async: false,
			success:function(data){
				total_page = parseInt(data);
			}
		});
		if(page <= total_page){
			$.ajax({
				url: that.genQuery() + ((that.genQuery().indexOf('search') > -1)?'&view=data&page='+page:'?view=data&page='+page+sort),
				success:function(data){
					$('#opacity').removeClass('loading');
					container.append(data);
					$(window).resize();
					that.checkWishList();
					that.loopWishlist();

				}
			});
		}

		if(total_page == 1 || page == total_page){
			$('.pages').hide();
		}else if( total_page > 1 && page < total_page ){
			$('.pages button').attr('onclick','NOD.getProduct('+(page+1)+')').parent().show();
		}		
	},
	getProductLookBook: function(page){
		var that = this,
				filterPage = $('[data-filter]'),
				total_page = parseInt(filterPage.data('pageSize')) || 0;
		/* fix */
		var container = $('.content-product-list');
		$.ajax({
			url: that.genQuery() + ((that.genQuery().indexOf('search') > -1)?'&view=pagesize_lookbook':'?view=pagesize_lookbook'),
			async: false,
			success:function(data){
				total_page = parseInt(data);
			}
		});
		if(page <= total_page){
			$.ajax({
				url: that.genQuery() + ((that.genQuery().indexOf('search') > -1)?'&view=data_lookbook&page='+page:'?view=data_lookbook&page='+page),
				success:function(data){
					$('#opacity').removeClass('loading');
					container.append(data);
					$(window).resize();
				}
			});
		}

		if(total_page == 1 || page == total_page){
			$('.pages').hide();
		}else if( total_page > 1 && page < total_page ){
			$('.pages button').attr('onclick','NOD.getProductLookBook('+(page+1)+')').parent().show();
		}		
	},
	getStringfilter: function(){
		var that = this,
				filterPage = $('[data-filter]'),
				container = $('.content-product-list'),
				cur_page = parseInt(filterPage.data('currentPage')) || 1,
				total_page = parseInt(filterPage.data('pageSize')) || 0;
		var timeOutFilter;
		clearTimeout(timeOutFilter);
		$('.pages').hide();
		timeOutFilter = setTimeout(function(){
			that.genQuery() + ((that.genQuery().indexOf('search') > -1)?'&view=pagesize':'?view=pagesize')
			$.ajax({
				url: that.genQuery() + ((that.genQuery().indexOf('search') > -1)?'&view=pagesize':'?view=pagesize'),
				async: false,
				success:function(data){
					total_page = parseInt(data);
					cur_page = 1;
				}
			});

			if(cur_page <= total_page){
				if(cur_page < total_page){
					$('.pages button').attr('onclick','NOD.getProduct('+(cur_page+1)+')').parent().show();
				}else{
					$('.pages').hide();
				}
				$.ajax({
					url: that.genQuery() + ((that.genQuery().indexOf('search') > -1)?'&view=data':'?view=data'),
					async: false,
					success:function(data){
						container.html(data);
						$(window).resize();
						that.checkWishList();
						that.loopWishlist();
					}
				});
			}
			else{
				$('.pages').hide();
				container.html("<div class='col-sm-12 text-center'>Không có sản phẩm phù hợp!</div>");
			}
		},800);
	},
	filterCollection: function(){
		var that = this;
		$('.filter li').on('click',function(){
			$(this).toggleClass('active');
			that.getStringfilter();
		});

		if($(window).width() < 768){
			$('.filter_mobile').on('click',function(e){
				e.preventDefault();
				$('body').toggleClass('openFilter');
			});

			$(document).on('click','body.openFilter .loader_overlay.loaded',function(e){
				e.preventDefault();
				$('body').removeClass('openFilter');
			});

			$(document).on('click','.btn_cancel',function(e){
				e.preventDefault();
				$('body').removeClass('openFilter');
			});
		}
	},
	thumbProduct: function(title){
		$('.' + title + 'slide_thumb_img').owlCarousel({
			items:7,
			autoplayHoverPause:false,
			dots: true,
			lazyLoad:true,
			loop:false,
			margin:5,
			autoHeight: true,
			responsive : {
				// breakpoint from 0 up
				0 : {
					items: 5,
				},
				// breakpoint from 768 up
				768 : {
					items: 5,
				},
				// breakpoint from 992 up
				992 : {
					items: 6,
				}
			}
		});

		$(document).on('click','.' + title + 'slide_thumb_img li',function(){
			$('.' + title + 'slide_thumb_img li').removeClass('active');
			$(this).addClass('active');
			var src_change = $(this).find('a').data('image');
			$('.' + title + 'product-image-feature').attr('src',src_change);
		});
	},	
	thumbProduct2: function(){
		$('.slide_thumb_img').owlCarousel({
			items:7,
			autoplayHoverPause:false,
			dots: true,
			lazyLoad:true,
			loop:false,
			margin:5,
			autoHeight: true,
			responsive : {
				// breakpoint from 0 up
				0 : {
					items: 5,
				},
				// breakpoint from 768 up
				768 : {
					items: 5,
				},
				// breakpoint from 992 up
				992 : {
					items: 6,
				}
			}
		});

		$('.slide_thumb_img li').on('click',function(){
			$('.slide_thumb_img li').removeClass('active');
			$(this).addClass('active');
			var src_change = $(this).find('a').data('image');
			$('.product-image-feature').attr('src',src_change);
		});
	},
	addCartDetail: function(prefix){
		$('#'+prefix+'add-to-cart').on('click',function(e){
			e.preventDefault();
			$.ajax({
				type: 'POST',
				url: '/cart/add.js',
				data: 'id='+$('#'+prefix+'product-select').val()+'&quantity=1',
				success: function(data){
					alert('Thêm vào giỏ thành công');
					$.get('/cart.js').done(function(cart){
						$('.account_top span').html(cart.item_count);
					});
				},
				error: function(XMLHttpRequest, textStatus) {
					Haravan.onError(XMLHttpRequest, textStatus);
				}
			});
		});
	},
	changeSwatch: function(prefix){
		$(document).on('click','.selector-wrapper input',function(){
			var vHandle = $(this).data('vhandle'),
					cOption = $(this).val(),
					vIndex = $(this).parents('.selector-wrapper').data('option-index'),
					arrClass = [];
			arrClass[vIndex] = vHandle;

			$(this).parents('.selector-wrapper').find('.swatch-element').removeClass('active');
			$(this).parents('.swatch-element').addClass('active');
			$('#'+prefix+'product-select-option-'+vIndex).val(cOption).trigger('change');

			var checkFirst = false;
			$('.'+prefix+'select .selector-wrapper:not(:eq(0))').each(function(){
				var those = $(this);
				var oIndex = those.data('option-index');

				those.find('input').each(function(){
					var vOption = $(this).val();

					if( those.find('.swatch-element.active').length >= 0 ){
						arrClass[oIndex] = $(this).data('vhandle');
						var classFind = arrClass.join('-');
						//if($('.'+classFind).length > 0){
						if(vIndex != oIndex){
							if(checkFirst == false){
								if($('.'+classFind).length > 0){
									$(this).attr('disabled',false).parents('.swatch-element').removeClass('soldout');
									$(this).parents('.swatch-element').addClass('active');
									$('#'+prefix+'product-select-option-'+oIndex).val(vOption).trigger('change');
									checkFirst = true;
								}else{
									$(this).parents('.swatch-element').addClass('active');
									$(this).attr('disabled',true).parents('.swatch-element').removeClass('soldout');
								}
							}
							else{
								if($('.'+classFind).length > 0){
									$(this).parents('.swatch-element').removeClass('active');
									$(this).parents('.swatch-element').removeClass('soldout').find('input').attr('disabled',false);
								}else{
									$(this).parents('.swatch-element').removeClass('active');
									$(this).attr('disabled',true).parents('.swatch-element').addClass('soldout');
								}
							}
						}
						else{

						}
						/*else{
					 $(this).parent().addClass('soldout').find('input').attr('disabled',true);
					 $(this).siblings().removeClass('sd');
				 }*/
					}
				});
			});

			 });
			},
				quickViewCallBack: function(variant, selector){
					if (variant && variant.available) {
						if(variant.featured_image != null)
						{
							$(".q-slide_thumb_img a[data-image='"+Haravan.resizeImage(variant.featured_image.src,'large').replace('https:','')+"']").click().parent('li').addClass('active');
						}
						/*-- Khi nào sử dụng sku thì bật lên
		if (variant.sku != null ){
			jQuery('#pro_sku').html('SKU: ' +variant.sku);
		}--*/

						jQuery('#q-add-to-cart').removeAttr('disabled').removeClass('disabled').html("Thêm vào giỏ hàng");
						if(variant.price < variant.compare_at_price){
							jQuery('#q-price-preview').html('<span>'+Haravan.formatMoney(variant.price, "") + "</span><del>"+Haravan.formatMoney(variant.compare_at_price, "")+"</del>");
						} else {
							jQuery('#q-price-preview').html('<span>'+Haravan.formatMoney(variant.price, "")+'</span>');
						}

					} 
					else {
						if(variant.price < variant.compare_at_price){
							jQuery('#q-price-preview').html('<span>'+Haravan.formatMoney(variant.price, "") + "</span><del>"+Haravan.formatMoney(variant.compare_at_price, "")+"</del>");
						} else {
							jQuery('#q-price-preview').html('<span>'+Haravan.formatMoney(variant.price, "")+'</span>');
						}
						jQuery('#q-add-to-cart').addClass('disabled').attr('disabled', 'disabled').html("Hết hàng");
						var message = variant ? "Hết hàng" : "Không có hàng";
						jQuery('#q-price-preview').text(message);
					}
				},
					showQuickView: function(){
						var these = this;
						$(document).on('click','.q_view',function(e){
							e.preventDefault();
							var url = $(this).data('url');
							$.ajax({
								type: 'GET',
								url: url+'?view=quickview',
								success: function(data){
									$('#quick-view-modal .quick-main').html(data);
									$.ajax({
										type: 'GET',
										url: url+'.js',
										success: function(product){
											if (product.variants.length == 1 && product.variants[0].title.indexOf('Default') != -1){
												//$('.p-option-wrapper').hide();
											}else{
												//$('.p-option-wrapper').show();
											}

											if (product.variants.length == 1 && product.variants[0].title.indexOf('Default') != -1) {
												these.quickViewCallBack(product.variants[0], null);
											}
											else {
												new Haravan.OptionSelectors("q-product-select", { product: product, onVariantSelected: these.quickViewCallBack });
												console.log(product.options[0].name);
												if (product.options.length == 1 && product.options[0].name.indexOf('Tiêu đề') == -1){
													$('#quick-view-modal').find('.selector-wrapper:eq(0)').prepend('<label>' + product.options[0] + '</label>');
												}
												$('.quick-main .p-option-wrapper select:not(#p-select)').each(function () {
													$(this).wrap('<span class="custom-dropdown custom-dropdown--white"></span>');
													$(this).addClass("custom-dropdown__select custom-dropdown__select--white");
												});
												these.quickViewCallBack(product.variants[0], null);
											}
											$('#quick-view-modal').modal('show');
										}
									});
									$('.btn-wishlist-quickview').click(function(){
										debugger;
										var quickview_product_id = $(this).data('productid');
										var quickviewprohandle = $(this).data('handle');
										var quickviewprotitle = $(this).data('title');
										var that2 = $(this);
										$.ajax({
											url: "https://apollotran.com/app/haravan/apwishlist/install/?add=" + Haravan.domain,
											data: {email: customerEmail, customerId: customerId, action: "add", productId: quickview_product_id, productHandle: quickviewprohandle,productTitle: quickviewprotitle},
											dataType: "Json",
											success: function(response) {
												alert('Đã thêm vào danh sách của bạn.');
												that2.find('span').html('Tới trang DS');
												that2.attr('href','/pages/danh-sach-yeu-thich');
											},
											complete: function() {
											}
										})
									});
								},
								error: function(){
									console.log('Lỗi');
								}
							});
							setTimeout(function(){
								these.changeSwatch('q-');
								these.thumbProduct('q-');
								these.addCartDetail('q-');
							},300);
						});
					},
						sendGoogleform: function(){
							$('#contact_form').on('submit',function(e){
								e.preventDefault();
								var that = $(this);
								var unindexed_array = that.serializeArray();
								var indexed_array = {};
								var url = that.attr('action');

								$.map(unindexed_array, function(n, i){
									indexed_array[n['name']] = n['value'];
								});
								$.ajax({
									type: 'POST',
									url: url,
									async : false,
									data: indexed_array,
									dataType: 'json',
									complete: function() {
										alert('Thông tin gửi thành công!');
										that.trigger('reset');
									},
									error: function(XMLHttpRequest, textStatus) {
										console.log('err', textStatus );
									}
								});
							});
						},
							changeQuantity: function(){
								$('.quantity_cart').change(function(){
									var that = $(this);
									var new_quan = that.val();
									var variant_id = that.data('id');
									var total = that.data('price') * that.val();
									jQuery.ajax({
										type: 'POST',
										url: '/cart/change.js',
										dataType: 'json',
										async: false,
										data: 'quantity=' + new_quan + '&id=' + variant_id,
										success: function(line_item){
											var outOfStock = false;
											$.each(line_item.items, function(key, item) {
												if (item.variant_id === variant_id && new_quan > item.quantity) {
													alert('Bạn đã đặt quá số lượng cho phép!');
													that.val(item.quantity);
													outOfStock = true;
													return false;
												}
											});
											if (!outOfStock){
												that.parents('.cart_row').find('.price_item span').html(Haravan.formatMoney(total, shop.moneyFormat));
												jQuery.getJSON('/cart.js', function(cart, txtStatus){
													$('#cart_count').html(cart.item_count);
													$('.order_sum .value_minicart').html(Haravan.formatMoney(cart.total_price, shop.moneyFormat));
												});
											}
										},
										error: function(XMLHttpRequest, txtStatus){
											Haravan.onError(XMLHttpRequest, txtStatus);
										}
									});
								});
							},
								accountPopup: function(){
									$('.login_header').click(function(){
										$(".sign_in_fixed").animate({
											right: "0%"
										},function(){
											$('#opacity').addClass('opacity');
											$("#opacity").animate({
												opacity: .25
											}, 100)
										})
									});
									$('.register_header').click(function(){
										$(".sign_up_fixed").animate({
											right: "0%"
										},function(){
											$('#opacity').addClass('opacity');
											$("#opacity").animate({
												opacity: .25
											}, 100)
										})
									});
									$('.open_login').on('click',function(){
										$('.sign_up_fixed').removeAttr('style');
										$('.login_header').trigger('click');
									});
									$('.new--user').click(function(){
										$(".sign_in_fixed").animate({
											right: "-100%"
										},function(){
											$(".sign_up_fixed").animate({
												right: "0%"
											})
										})
									});
									$('#opacity,.icon_close').click(function(){
										$(".sign_in_fixed,.sign_up_fixed").animate({
											right: "-100%"
										},function(){
											$('#opacity').removeClass('opacity');
											$("#opacity").animate({
												opacity: 0
											}, 100)
										})
									});
								},
									showSizeGuidePopup: function(){
										$("#size--guide").animate({
											left: "0%"
										})
										$('#hideSizeGuide').click(function(){
											$("#size--guide").animate({
												left: "100%"
											})
										})
									},
										zoomImg: function(){
											if($(window).width() > 960){
												jQuery(".product-image-feature").elevateZoom({
													gallery:'sliderproduct',
													zoomType: 'inner',
													cursor: 'url("//theme.hstatic.net/1000304367/1000739373/14/icon--zoom.png?v=300"), auto'
												});
											} else {

											}
										}
		};
									 $(document).ready(function(){
			NOD.init();
		});
		(function($) {

			$.fn.menumaker = function(options) {

				var cssmenu = $(this), settings = $.extend({
					title: "Menu",
					format: "dropdown",
					sticky: false
				}, options);

				return this.each(function() {
					cssmenu.prepend('<div id="menu-button">' + settings.title + '</div>');
					$(this).find("#menu-button").on('click', function(){
						$(this).toggleClass('menu-opened');
						var mainmenu = $(this).next('ul');
						if (mainmenu.hasClass('open')) { 
							mainmenu.hide().removeClass('open');
						}
						else {
							mainmenu.show().addClass('open');
							if (settings.format === "dropdown") {
								mainmenu.find('ul').slideToggle();
							}
						}
					});

					cssmenu.find('li ul').parent().addClass('has-sub');		
					/* fix */
					function multiTg() {
						cssmenu.find(".has-sub").prepend('<span class="submenu-button"></span>');
						cssmenu.find('.submenu-button').on('click', function() {
							$(this).toggleClass('submenu-opened');
							if ($(this).siblings('ul').hasClass('open')) {
								$(this).siblings('ul').removeClass('open').slideToggle();
							}
							else {
								$(this).siblings('ul').addClass('open').slideToggle();
							}
						});
					};

					if (settings.format === 'multitoggle') multiTg();
					else cssmenu.addClass('dropdown');

					if (settings.sticky === true) cssmenu.css('position', 'fixed');

					cssmenu.find('ul').hide().removeClass('open');

				});
			};
		})(jQuery);

		(function($){
			$(document).ready(function(){

				$(".display_product_option span").click(function () {
					$(".display_product_option span").removeClass("active");
					$(this).addClass("active");
				});

				$(".view_3cols").click(function(){
					$(".content-product-list").addClass("three_col").removeClass("four_col");
					$(window).resize();
				});
				$(".view_4cols").click(function(){
					$(".content-product-list").addClass("four_col").removeClass("three_col");
					$(window).resize();
				});

				$("#main_cate_menu").menumaker({
					title: "",
					format: "multitoggle"
				});

			});
		})(jQuery);



		$(document).ready(function(){
			var height1 = $(".checkot2").height();
			//var height2 = $(".checkot1").height(height1);

			$('.downclick').click(function(){
				$(this).parents('.has-sub').find('.has-child').toggleClass('active-sub');
			})


		})















