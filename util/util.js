exports.formatAmount = function(amount){
	console.log(typeof(amount));
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