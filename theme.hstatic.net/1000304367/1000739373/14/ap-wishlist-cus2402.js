/**
*  @name AP wishlist cus
*  @description description
*  @author Tris Nguyen (NoDeadline Team)
*  @Date : 14/10/2017
*/
;(function($, window, undefined) {
	//'use strict';

	var pluginName = 'wishlist-cus';

	function Plugin(element, options) {
		this.proto = location.protocol;
		this.element = $(element);
		this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
		this.init();
	}

	function formatMoney(money) {
		return Haravan.formatMoney(money, window.shop.moneyFormat); 
	}

	function getImageSize(url, prefix) {
		var pos = url.lastIndexOf(".");
		var newUrl = url.substring(0, pos) + (prefix ? prefix : "_large") + url.substring(pos);
		return newUrl;
	}

	function getVariant(variants, va) {
		var len = variants.length;
		for(var i = 0; i < len; i++) {
			if(va === variants[i]["id"]) {
				return variants[i];
			}
		}
		return variants[0];
	}

	Plugin.prototype = {
		init: function() {
			var that = this;
			that.getWishList();
			that.removeWL();
			that.addToCart();
		},

		getWishList: function() {
			var that = this;
			$.ajax({
				url: "https://apollotran.com/app/haravan/apwishlist/haravan/install/index/?list=" + Haravan.domain,
				data: {email: email, customer: customer, action: "get"},
				dataType: "Json",
				success: function(data) {
					if(typeof data != "undefined") {
						that.showWishList(data);
					}
					$(window).resize();
				},
				error: function(hx, e) {
				},
				complete: function() {
				}
			});
		},

		getDetailProduct: function(product_handle,product_id,id_wl) {
			var that = this;
			var deferred = $.Deferred();
			var variant = '' ;
			$.ajax({
				url: that.proto + "//" + Haravan.domain + "/products/" + product_handle + ".js",
				dataType: "Json",
				type: "Get",
				success: function(product) {
					product.idWL = id_wl;
					deferred.resolve(product);
				},
				error: function(ex, hr) {
					console.log(ex);
					console.log(hr);
					deferred.reject(ex);
					$.ajax({
						url: "https://apollotran.com/app/haravan/apwishlist/haravan/install/index/?add=" + Haravan.domain,
						data: {email: email, customerId: customer, action: "remove", id: product_id, variant: variant},
						dataType: "Json",
						success: function(response) {
						},
						complete: function() {
						}
					});
				},
				complete: function() {
				}
			})
			return deferred.promise();
		},

		showWishList: function(data) {
			var that = this;
			var options = that.options;
			var blockItems = that.element.find(options.blockItems).first();
			var limit = parseInt(options.limit || 0);
			var countLimit = 0;
			var countLen =  parseInt(data.length);
			var len = 0;
			if(limit > 0 && data.length > 0 && countLen > limit){
				len = limit;
			}else{
				len = data.length || 0;
			}
			if(len == 0) {
				blockItems.find('[data-notfound-item]').removeClass('hide');
				return false;
			} else {
				blockItems.find('[data-notfound-item]').addClass('hide');
			}
			for(var i = 0; i < len; i++) {
				var item = data[i];
				var variant = (typeof item['product_id'] != "undefined") ? item['product_id'] : "";
				var id_wl = (typeof item['id'] != "undefined") ? item['id'] : "";
				var url = "https://" + Haravan.domain + "/products/" + item['product_handle'];
				that.getDetailProduct(item['product_handle'],item['product_id'],item['id']).then(function(res) {
					that.renderData(res);
					countLimit++;
					if(countLimit == limit) {
						return;
					}
					$(window).resize();
				});
			}
		},

		renderData: function(product) {
			var that = this,
					el = that.element,
					options = that.options,
					blockItems = el.find(options.blockItems).first(),
					templateItem = el.find(options.templateItem).first(),
					content = templateItem.clone().removeClass('hide');

			var variants = product.variants[0];
			var subUrl = "";
			if(product.variantWL) {
				variants = getVariant(product.variants, product.variantWL);
				subUrl = "?variant=" + variants.id;
			}
			var love = 0;
			var price = variants.price;
			var comparePrice = product.compare_at_price_max;
			var url = that.proto + "//" + Haravan.domain + "/products/" + product.handle + subUrl;
			var imageSrc = 'http://hstatic.net/0/0/global/noDefaultImage6_large.gif';
			if(product.featured_image && product.featured_image !== '') {
				imageSrc = getImageSize(product.featured_image);
			}
			if(product.tags && product.tags.length) {
				var taglove = 'love:';
				$.each(product.tags, function( index, value ) {
					if(value.indexOf(taglove) != -1){
						love = $.trim(value.replace(taglove,''));
						return;
					}
				});
			}
			content.find('[data-wl-img]').attr({
				src: imageSrc,
				alt: product.title
			});
			content.find('[data-wl-title]').attr({
				href: url,
				title: product.title,
			}).text(product.title);
			content.find('[data-wl-link]').attr({
				href: url,
				title: product.title
			});
			content.find('[data-quickview]').attr('data-handle', product.url);
			content.find('[data-wl-price]').text(formatMoney(price));
			content.find('[data-wl-type]').text(product.type);
			content.find('[data-wl-vendor]').text(product.vendor);
			content.find('[data-wl-love]').text(love);
			content.find('[data-wl-remove]').attr({
				'data-wl-id': product.idWL,
				'data-wl-variant-id': product.id
			});
			content.find('[data-wl-addtocart]').attr('data-wl-variant-id', variants.id);

			blockItems.append(content);
		},

		removeWL: function() {
			var that = this;
			var el = that.element;
			var options = that.options;
			el.on('click.' + pluginName,'[data-wl-remove]', function(e) {
				e.preventDefault();
				var btn = $(this);
				var id = btn.data("wl-id");
				var variant = '' ; //btn.data("wl-variant-id");
				if(btn.data("status") == "running") {
					return;
				}
				btn.data("status", "running");
				btn.addClass("running");
				$.ajax({
					url: "https://apollotran.com/app/haravan/apwishlist/haravan/install/index/?add=" + Haravan.domain,
					data: {email: email, customerId: customer, action: "remove", id: id, variant: variant},
					dataType: "Json",
					success: function(response) {
						if(response.status == "SUCCESS") {
							btn.closest(options.templateItem).remove();
							if(that.element.find(options.templateItem).length <= 1) {
								window.location.reload();
							}
						}
$(window).resize();
					},
					complete: function() {
						btn.data("status", "");
						btn.removeClass("running");
					}
				});
			});
		},

		addToCart: function() {
			var that = this;
			var el = that.element;
			var options = that.options;
			el.on('click.' + pluginName,'[data-wl-addtocart]', function(e) {
				e.preventDefault();
				$.ajax({
					type: 'POST',
					async: false,
					url:'/cart/add.js',
					async:false,
					data: {
						id: $(this).data('wl-variant-id'),
						quantity:1
					},
					success:function(line){
						window.location = "/cart";
					},
					error: function(jqXHR, textStatus, errorThrown) {
						alert('Sản phẩm bạn vừa mua đã vượt quá tồn kho');
					}
				});
			})
		},

		destroy: function() {
			$.removeData(this.element[0], pluginName);
		}
	};

	$.fn[pluginName] = function(options, params) {
		return this.each(function() {
			var instance = $.data(this, pluginName);
			if (!instance) {
				$.data(this, pluginName, new Plugin(this, options));
			} else if (instance[options]) {
				instance[options](params);
			}
		});
	};

	$.fn[pluginName].defaults = {
		limit: $('.list_products_page').data('limit'),
		templateItem: '[data-template-item]',
		blockItems: '[data-block-item]',
		onCallback: null
	};

	$(function() {
		$('[data-' + pluginName + ']').on('customEvent', function() {
			// to do
		});

		$('[data-' + pluginName + ']')[pluginName]({
			key: 'custom'
		});
	});

}(jQuery, window));