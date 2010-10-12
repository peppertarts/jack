

describe('Saving arguments', {
	'Should be able to save arguments': function() {
		window.globalFunction = function() {}
		
		jack(function(){
			jack.expect("globalFunction").exactly("1 time");
			globalFunction();
		});
		
		var inspectArguments = jack.inspect("globalFunction").arguments();
		value_of(inspectArguments).should_not_be_undefined();
		
		window.globalFunction = null;
	}
	,
	'Should be able to inspect argument values': function() {
		window.globalFunction = function(arg1, arg2) {}
		
		jack(function(){
			jack.expect("globalFunction").exactly("1 time");
			globalFunction("value1", 7740923, {message:'Kilroy was here!'});
		});
		
		var inspectArguments = jack.inspect("globalFunction").arguments();
		value_of(inspectArguments[0]).should_be("value1");
		value_of(inspectArguments[1]).should_be(7740923);
		value_of(inspectArguments[2]).should_be({message:'Kilroy was here!'});
		
		window.globalFunction = null;
	}
	,
	'Should be able to inspect argument values for multiple invocations of the same function': function() {
		window.globalFunction = function(arg1, arg2) {}
		
		jack(function(){
			jack.expect("globalFunction").exactly("2 times");
			globalFunction("value1", 7740923, {message:'Kilroy was here!'});
			globalFunction("value2", 1234567, {message:'Jack was here!'});
		});
		
		var firstInvocation = jack.inspect("globalFunction").arguments(0);
		value_of(firstInvocation[0]).should_be("value1");
		value_of(firstInvocation[1]).should_be(7740923);
		value_of(firstInvocation[2]).should_be({message:'Kilroy was here!'});
		
		var secondInvocation = jack.inspect("globalFunction").arguments(1);
		value_of(secondInvocation[0]).should_be("value2");
		value_of(secondInvocation[1]).should_be(1234567);
		value_of(secondInvocation[2]).should_be({message:'Jack was here!'});

		window.globalFunction = null;
	}
});
