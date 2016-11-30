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

exports.isValidAmount = function(amount){
	console.log(amount);
	console.log(!!amount.match(/(?=.)(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/);
	return !!amount.match(/(?=.)(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/)
}