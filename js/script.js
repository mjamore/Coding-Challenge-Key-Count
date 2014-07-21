$(function() {
	(function() {
		$('#toggle-description').on('click', function() {
			var text = $(this).text();

			if( text === "[ + ] Description" )
			{
				$(this).text("[ - ] Description");
				$('#description').slideToggle();
			}
			else if( text === "[ - ] Description" )
			{
				$(this).text("[ + ] Description");
				$('#description').slideToggle();
			}
		});


		$('#form').on('submit', function(e) {
			e.preventDefault();

			// get user input, convert to lowercase (assuming we want case insensitivity), and remove all spaces
			var userInput = $('#user-input').val().toLowerCase();
			userInput = userInput.replace(/ /g, '');

			// split string into an array of strings on each newline character
			var lines = userInput.split("\n");

			var obj = {};

			for( var i = 0; i < lines.length; i++ )
			{
				// split each string on the comma
				var keyValues = lines[i].split(',');

				// if the current key already exists in the object, add new value to its current value; else, add the new key and its associated value
				if( obj.hasOwnProperty(keyValues[0]) )
				{
					// get current key's value
					var value = obj[keyValues[0]];
					
					// add new value to existing sum for this key
					value += parseInt(keyValues[1]);

					// set this key's value to the newly calculated sum
					obj[keyValues[0]] = value;
				}
				else
				{
					// add the new key and its associated value to the object
					obj[keyValues[0]] = parseInt(keyValues[1]);
				}
			}

			var output = "";

			// loop over the object keys/values and create the HTML string for output
			$.each( obj, function(key, value) {
				output += '<p>The total for <span>' + key + '</span> is <span>' + value + '</span>.</p>';
			});

			// set the output message
			$('#output').html(output);
		});
	})();
});