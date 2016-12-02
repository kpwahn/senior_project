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
	// Can't seem to get the regex to not allow a '$', so this.
	if(amount[0] = '$')
		return false
		console.log("IS it true or false?" + !!amount.match(/(?=.)(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/));
	return !!amount.match(/(?=.)(([1-9][0-9]{0,2}(,[0-9]{3})*)|[0-9]+)?(\.[0-9]{1,2})?$/);
}