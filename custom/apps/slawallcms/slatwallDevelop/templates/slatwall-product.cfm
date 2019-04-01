<!--- This header include should be changed to the header of your site.  Make sure that you review the header to include necessary JS elements for slatwall templates to work --->
<cfinclude template="_slatwall-header.cfm" />

<!--- This import allows for the custom tags required by this page to work --->
<cfimport prefix="sw" taglib="../tags" />

<cfset local.product = $.slatwall.getProduct() />
<cfoutput>
	<div class="container">
		
		<!--- If this item was just added show the success message --->
		<cfif $.slatwall.hasSuccessfulAction( "public:cart.addOrderItem" )>
			<div class="alert alert-success">
				The item was successfully added to your cart.  You might want to change the action="" of the add to cart form so that it points directly to shopping cart page that way the user ends up there.  Or you can add a 'sRedirectURL' hidden field value to specify where you would like the user to be redirected after a succesful addToCart
			</div>
		<!--- If this item was just tried to be added, but failed then show the failure message --->
		<cfelseif $.slatwall.hasFailureAction( "public:cart.addOrderItem" )>
			<div class="alert alert-danger">
				<!--- Display whatever errors might have been associated with the specific options --->
				<sw:ErrorDisplay object="#$.slatwall.cart().getProcessObject('addOrderItem')#" />

				<!--- Display any errors with saving the order after the item was atempted to be added --->
				<sw:ErrorDisplay object="#$.slatwall.cart()#" errorName="addOrderItem" />
			</div>
		</cfif>
		
		<!--- We use the getTitle() method which uses the title template setting to pull in brand name or whatever else you might want in your titles --->
		<h1>#local.product.getProductName()# / #local.product.getTitle()#</h1>

		<div class="row">
			
			<!--- Product Image --->
			<div class="col-md-4">

				<!--- Display primary product image if it exists or the product image placeholder  --->
				<cfif local.product.getImageExistsFlag()>
					<!--- If the image exists, display image with link to full version --->
					<img src="#local.product.getImagePath()#" class="clickToOpenModal" />
				<cfelse>
					<!--- If the image doesn't exists, display image with link to full version --->
					#local.product.getImage(size="l")#
				</cfif>
				
			</div>
			
			
			<!--- Product Body --->
			<div class="col-md-8">
				<ul>
					<!--- Product Code --->
					<li>Product Code #local.product.getProductCode()#</li>

					<!--- Product Type --->
					<li>Product Type <a href="#$.slatwall.setting('globalURLKeyProductType')#/#local.product.getProductType().getUrlTitle()#" class="text-secondary">#local.product.getProductType().getProductTypeName()#</a></li>
					<!--- Brand --->
					<cfif !isNull(local.product.getBrand())>
						<li>Brand: <a href="#$.slatwall.setting('globalURLKeyBrand')#/#local.product.getBrand().getUrlTitle()#" class="text-secondary">#local.product.getBrand().getBrandName()#</a></li>
					</cfif>
				
					<!--- List Price | This price is really just a place-holder type of price that can display the MSRP.  It is typically used to show the highest price --->
					<li>List Price: #local.product.getFormattedValue('listPrice')#</li>

					<!--- Current Account Price | This price is used for accounts that have Price Groups associated with their account.  Typically Price Groups are used for Wholesale pricing, or special employee / account pricing --->
					<li>Current Account Price: #local.product.getFormattedValue('currentAccountPrice')#</li>

					<!--- Sale Price | This value will be pulled from any current active promotions that don't require any promotion qualifiers or promotion codes --->
					<li>Sale Price: #local.product.getFormattedValue('salePrice')#</li>

					<!--- Live Price | The live price looks at both the salePrice and currentAccountPrice to figure out which is better and display that.  This is what the customer will see in their cart once the item has been added so it should be used as the primary price to display --->
					<li>Live Price: #local.product.getFormattedValue('livePrice')#</li>
				</ul>

				<!--- Product Description --->
				<h3>Product Description</h3>
				#local.product.getProductDescription()#
				
				<!----Categories---->
				<cfset local.categories = local.product.getCategories() />
				Categories
				<cfloop array="#local.categories#" index="local.category">
					<a href="#$.slatwall.setting('globalURLKeyCategory')#/#local.category.getUrlTitle()#">#local.category.getCategoryName()#</a>
				</cfloop>

				<!--- Start: PRICE DISPLAY EXAMPLE --->
				<h5>Price Display Example</h5>
				
				<cfif $.slatwall.product('price') gt $.slatwall.product('livePrice')>
					<p>#local.product.getFormattedValue('price')#</p>
					<p>#local.product.getFormattedValue('livePrice')#</p>
				<cfelse>
					<p>#local.product.getFormattedValue('livePrice')#</p>
				</cfif>
			</div>
		</div>

		<!--- Start: Add to Cart Examples --->
		<cfif #local.product.getAvailableForPurchaseFlag()# AND (local.product.getQATS() GTE 1) >

			<cfinclude template="./inc/productdetail/addToCartSingleSku.cfm" />
			<cfinclude template="./inc/productdetail/addToCartSplitOptions.cfm" />
			<cfinclude template="./inc/productdetail/addToCartSplitOptionsAjaxUpdate.cfm" />
		
		<cfelseif local.product.getQATS() GTE 1>
			<p>Available for purchase #dateFormat(local.product.getPurchaseStartDateTime(),"long")#</p>
		</cfif>

		<!--- Product Reviews --->
		<cfinclude template="./inc/productdetail/productReview.cfm" />

		<!--- Related Products --->
		<cfinclude template="./inc/productdetail/relatedProducts.cfm" />

		<!--- Product Image Gallery --->
		<cfinclude template="./inc/productdetail/productImageGallery.cfm" />
		
	</div>
	
	<!--- Adds zoom modal for img tags with class "clickToOpenModal"---->
	<div class="modal fade" id="imagemodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-dialog">
    		<div class="modal-content">              
        		<div class="modal-body">
          			<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
            		<img src="" class="imagepreview" style="width: 100%;" >
        		</div>
        	</div>
    	</div>
    </div>
    
    <script>
      $(function() {
      		$('.clickToOpenModal').on('click', function() {
      			$('.imagepreview').attr('src', $(this).attr('src'));
      			$('##imagemodal').modal('show');   
      		});		
      });
    </script>
	
</cfoutput>

<!--- This footer should be replaced with the footer of your site --->
<cfinclude template="_slatwall-footer.cfm" />
