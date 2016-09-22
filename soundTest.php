

<html>
<head>
<link rel="stylesheet" href="foundation.css" />
<title>Sound Test</title>

</head>
<body>

<br>

<fieldset>
<legend>Sound Info</legend>
<label for='frequency1' >Frequency 1:</label>
<input type='number' name='frequency1' id='frequency1' maxlength="5" />
<label for='frequency2' >Frequency 2:</label>
<input type='number' name='frequency2' id='frequency2' maxlength="5" />
<button id='toggleSound' onclick='toggleUserFrequency()'>Play Frequency</button><br>
<br>
</fieldset>

<br>

<fieldset>
<legend>Telephony</legend>
<button onmousedown='playTelephony(0)' onmouseup='stopSound()'>1</button>
<button onmousedown='playTelephony(1)' onmouseup='stopSound()'>2</button>
<button onmousedown='playTelephony(2)' onmouseup='stopSound()'>3</button>
<br>
<button onmousedown='playTelephony(3)' onmouseup='stopSound()'>4</button>
<button onmousedown='playTelephony(4)' onmouseup='stopSound()'>5</button>
<button onmousedown='playTelephony(5)' onmouseup='stopSound()'>6</button>
<br>
<button onmousedown='playTelephony(6)' onmouseup='stopSound()'>7</button>
<button onmousedown='playTelephony(7)' onmouseup='stopSound()'>8</button>
<button onmousedown='playTelephony(8)' onmouseup='stopSound()'>9</button>
<br>
<button onmousedown='playTelephony(9)' onmouseup='stopSound()'>*</button>
<button onmousedown='playTelephony(10)' onmouseup='stopSound()'>0</button>
<button onmousedown='playTelephony(11)' onmouseup='stopSound()'>#</button>
<br>
<br>
</fieldset>

<br>

<fieldset>
<legend>Graph Testing</legend>
<div>
<canvas id="outputTestCanvas" width="300" height="150" style="border:1px solid #000000;">
</canvas>
</div>
<div>
<button onclick='setGraphStyle(1)'>Sine Wave</button>
<button onclick='setGraphStyle(2)'>Frequency</button>
</div>
<br>
</fieldset>

<script>
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var analyzer = context.createAnalyser();
var playing1 = 0;
var playing2 = 0;
var frequency1 = 0;
var frequency2 = 0;
var oscillator1;
var gainNode1;
var oscillator2;
var gainNode2;

/*
   var canvas;
   var canvasContext;

   window.onLoad=function(){ init();};

   function init()
   {
   canvas = document.getElementById("outputTestCanvas");
   canvasContext = canvas.getContext("2d");
   }
 */
var drawVisual;
var visualSetting = 0; //0 = off, 1 = wave, 2 = freq
var userVisualSetting = 1;

//Modified from
//https://github.com/mdn/voice-change-o-matic/blob/gh-pages/scripts/app.js#L123-L167
function visualize()
{
	var canvas = document.getElementById("outputTestCanvas");
	var canvasContext = canvas.getContext("2d");
	WIDTH = 300;
	HEIGHT = 150;


	if(visualSetting == 1)
	{
		//Waveform
		analyzer.fftSize = 2048;
		var bufferLength = analyzer.fftSize;
		var dataArray = new Uint8Array(bufferLength);

		canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

		function draw()
		{
			drawVisual = requestAnimationFrame(draw);
			analyzer.getByteTimeDomainData(dataArray);

			canvasContext.fillStyle = 'rgb(200, 200, 200)';
			canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

			canvasContext.lineWidth = 2;
			canvasContext.strokeStyle = 'rgb(0, 0, 0)';

			canvasContext.beginPath();

			//*1.0 to convert to double?
			var sliceWidth = WIDTH * 1.0 / bufferLength;
			var x = 0;

			for(var i = 0; i < bufferLength; i++)
			{
				var v = dataArray[i] / 128.0;
				var y = v*HEIGHT/2;

				if(i === 0)
				{
					canvasContext.moveTo(x,y);
				}
				else
				{
					canvasContext.lineTo(x,y);
				}

				x += sliceWidth;
			}

			canvasContext.lineTo(canvas.width, canvas.height/2);
			canvasContext.stroke();		
		};

		draw();
	}
	else if(visualSetting == 2)
	{
		//Frequency
		analyzer.fftSize = 256;
		var bufferLength = analyzer.frequencyBinCount;

		var dataArray = new Uint8Array(bufferLength);

		canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

		function draw()
		{
			drawVisual = requestAnimationFrame(draw);

			//Fast Fourier Transform
			analyzer.getByteFrequencyData(dataArray);

			canvasContext.fillStyle = 'rgb(0, 0, 0)';
			canvasContext.fillRect(0, 0, WIDTH, HEIGHT);

			var barWidth = (WIDTH / bufferLength) * 2.5;
			var barHeight;

			var x = 0;

			for(var i = 0; i < bufferLength; i++)
			{
				barHeight = dataArray[i];

				canvasContext.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
				canvasContext.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

				x += barWidth + 1;
			}
		};

		draw();
	}
	else if(visualSetting == 0)
	{
		canvasContext.clearRect(0, 0, WIDTH, HEIGHT);
		canvasContext.fillStyle = "red";
		canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
	}
}

function toggleUserFrequency()
{
	if(playing1 == 0 && playing2 == 0)
	{
		frequency1 = document.getElementById("frequency1").value;
		frequency2 = document.getElementById("frequency2").value;
		playSound();
		if(playing1 != 0 && playing2 != 0)
		{
			document.getElementById("toggleSound").innerHTML = "Stop Playing Frequency";
		}
	}
	else
	{
		stopSound();
		document.getElementById("toggleSound").innerHTML = "Play Frequency";
	}
}

function setGraphStyle(style)
{
	userVisualSetting = style;
	if(playing1 != 0 || playing2 != 0)
	{
		visualSetting = style;
		window.cancelAnimationFrame(drawVisual);
		visualize();
	}
}

function playTelephony(buttonID)
{
	if(playing1 != 0 || playing2 != 0)
	{
		stopSound();
		document.getElementById("toggleSound").innerHTML = "Play Frequency";
	}
	switch(buttonID)
	{
		case 0:
			//1 Key
			frequency1 = 1209;
			frequency2 = 697;
			break;
		case 1:
			//2 Key
			frequency1 = 1336;
			frequency2 = 697;
			break;
		case 2:
			//3 Key
			frequency1 = 1477;
			frequency2 = 697;
			break;
		case 3:
			//4 Key
			frequency1 = 1209;
			frequency2 = 770;
			break;
		case 4:
			//5 Key
			frequency1 = 1336;
			frequency2 = 770;
			break;
		case 5:
			//6 Key
			frequency1 = 1477;
			frequency2 = 770;
			break;
		case 6:
			//7 Key
			frequency1 = 1209;
			frequency2 = 852;
			break;
		case 7:
			//8 Key
			frequency1 = 1336;
			frequency2 = 852;
			break;
		case 8:
			//9 Key
			frequency1 = 1477;
			frequency2 = 852;
			break;
		case 9:
			//* Key
			frequency1 = 1209;
			frequency2 = 941;
			break;
		case 10:
			//0 Key
			frequency1 = 1336;
			frequency2 = 941;
			break;
		case 11:
			//# Key
			frequency1 = 1477;
			frequency2 = 941;
			break;
		default:
			frequency1 = 0;
			frequency2 = 0;
			break;
	}
	playSound();
}

function stopSound() {
	if(playing1 == 1)
	{
		oscillator1.stop(0);
		playing1 = 0;
		visualSetting = 0;
	}

	if(playing2 == 1)
	{
		oscillator2.stop(0);
		playing2 = 0;
		visualSetting = 0;
	}

	window.cancelAnimationFrame(drawVisual);
	visualize();

}

function playSound() {
	if(frequency1 > 0 && frequency2 > 0)
	{
		gainNode1 = context.createGain();
		gainNode1.gain.value = 0.1;
		oscillator1 = context.createOscillator();
		oscillator1.frequency.value = frequency1;
		oscillator1.connect(gainNode1);
		gainNode1.connect(context.destination);
		gainNode1.connect(analyzer);

		gainNode2 = context.createGain();
		gainNode2.gain.value = 0.1;
		oscillator2 = context.createOscillator();
		oscillator2.frequency.value = frequency2;
		oscillator2.connect(gainNode2);
		gainNode2.connect(context.destination);
		gainNode2.connect(analyzer);

		oscillator1.start(0);
		oscillator2.start(0);

		playing1 = 1;
		playing2 = 1;
		visualSetting = userVisualSetting;
		window.cancelAnimationFrame(drawVisual);
		visualize();

	}
	else if(frequency1 > 0)
	{
		gainNode1 = context.createGain();
		gainNode1.gain.value = 0.1;
		oscillator1 = context.createOscillator();
		oscillator1.frequency.value = frequency1;
		oscillator1.connect(gainNode1);
		gainNode1.connect(context.destination);
		gainNode1.connect(analyzer);

		oscillator1.start(0);

		playing1 = 1;
		visualSetting = userVisualSetting;
		window.cancelAnimationFrame(drawVisual);
		visualize();

	}
	else if(frequency2 > 0)
	{
		gainNode2 = context.createGain();
		gainNode2.gain.value = 0.1;
		oscillator2 = context.createOscillator();
		oscillator2.frequency.value = frequency2;
		oscillator2.connect(gainNode2);
		gainNode2.connect(context.destination);
		gainNode2.connect(analyzer);

		oscillator2.start(0);

		playing2 = 1;
		visualSetting = userVisualSetting;
		window.cancelAnimationFrame(drawVisual);
		visualize();

	}
}
</script>

</body>
</html>


