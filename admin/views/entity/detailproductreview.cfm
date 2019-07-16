<!---

    Slatwall - An Open Source eCommerce Platform
    Copyright (C) ten24, LLC
	
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
	
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
	
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
    
    Linking this program statically or dynamically with other modules is
    making a combined work based on this program.  Thus, the terms and
    conditions of the GNU General Public License cover the whole
    combination.
	
    As a special exception, the copyright holders of this program give you
    permission to combine this program with independent modules and your 
    custom code, regardless of the license terms of these independent
    modules, and to copy and distribute the resulting program under terms 
    of your choice, provided that you follow these specific guidelines: 

	- You also meet the terms and conditions of the license of each 
	  independent module 
	- You must not alter the default display of the Slatwall name or logo from  
	  any part of the application 
	- Your custom code must not alter or create any files inside Slatwall, 
	  except in the following directories:
		/integrationServices/

	You may copy and distribute the modified version of this program that meets 
	the above guidelines as a combined work under the terms of GPL for this program, 
	provided that you include the source code of that other code when and as the 
	GNU GPL requires distribution of source code.
    
    If you modify this program, you may extend this exception to your version 
    of the program, but you are not obligated to do so.

Notes:

--->
<cfimport prefix="swa" taglib="../../../tags" />
<cfimport prefix="hb" taglib="../../../org/Hibachi/HibachiTags" />


<cfparam name="rc.productReview" type="any" />
<cfparam name="rc.edit" type="boolean" />

<cfoutput>
	<hb:HibachiEntityDetailForm object="#rc.productReview#" edit="#rc.edit#">
		<hb:HibachiEntityActionBar type="detail" object="#rc.productReview#" edit="#rc.edit#"></hb:HibachiEntityActionBar>

		<hb:HibachiPropertyRow>
			<hb:HibachiPropertyList>
				<cfif rc.edit eq true AND rc.productReview.isNew() >
					<swa:SlatwallProductTypeahead productPropertyName="product.productID" edit="#rc.edit#" productLabelText="#$.slatwall.rbkey('entity.product_plural')#"></swa:SlatwallProductTypeahead>
					<cfset productCollectionList=getHibachiScope().getService('productService').getProductCollectionList()/>
					<cfset productCollectionList.setDisplayProperties('productID',{isVisible=false,isSearchable=false})/>
					<cfset productCollectionList.addDisplayProperties('productName',{isVisible=true,isSearchable=true})/>
					<cfset productCollectionList.addFilter('activeFlag',1)/>
					<hb:HibachiTypeahead 
						entityName="Product" 
						propertyName="product.productID" 
						edit="#rc.edit#" 
						collectionEntity="#productCollectionList#"
					></hb:HibachiTypeahead>
				<cfelse>
					<hb:HibachiPropertyDisplay object="#rc.productReview#" property="productReviewProductName" edit="false" productLabelText="#$.slatwall.rbkey('entity.product_plural')#">
				</cfif>
					
			
				<hb:HibachiPropertyDisplay object="#rc.productReview#" property="activeFlag" edit="#rc.edit#">
				<hb:HibachiPropertyDisplay object="#rc.productReview#" property="reviewTitle" edit="#rc.edit#">
				<hb:HibachiPropertyDisplay object="#rc.productReview#" property="reviewerName" edit="#rc.edit#">
				<hb:HibachiPropertyDisplay object="#rc.productReview#" property="rating" edit="#rc.edit#">
				<hb:HibachiPropertyDisplay object="#rc.productReview#" property="review" edit="#rc.edit#" fieldType="textarea">
				<cfif rc.productReview.isNew() neq true >
				<hb:HibachiPropertyDisplay object="#rc.productReview#" property="productReviewsStatus" edit="#rc.edit#" productLabelText="#$.slatwall.rbkey('entity.product_plural')#">
				</cfif>
			</hb:HibachiPropertyList>
		</hb:HibachiPropertyRow>

		<hb:HibachiEntityDetailGroup object="#rc.productReview#">
				
		<!--- Custom Attributes --->
		<cfloop array="#rc.productReview.getAssignedAttributeSetSmartList().getRecords()#" index="attributeSet">
			<swa:SlatwallAdminTabCustomAttributes object="#rc.productReview#" attributeSet="#attributeSet#" />
		</cfloop>
		
		</hb:HibachiEntityDetailGroup>

	</hb:HibachiEntityDetailForm>
</cfoutput>
