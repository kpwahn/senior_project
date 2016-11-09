exports.formatAmount = function(amount){
	if(amount.indexOf(".") == -1){
		return amount.concat(".00");
	} else if (amount.indexOf(".") == (amount.length - 1) ) {
		return amount.concat("00");
	} else if (amount.indexOf(".") == (amount.length - 2) ){
		return amount.concat("0");
	} else { 
		return amount;
	}
}