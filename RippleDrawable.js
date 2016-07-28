var Button = android.widget.Button,
	TextView = android.widget.TextView,
	ToggleButton = android.widget.ToggleButton,
	CheckBox = android.widget.CheckBox,
	Switch = android.widget.Switch,
	SeekBar = android.widget.SeekBar,
	ProgressBar = android.widget.ProgressBar,
	PopupWindow = android.widget.PopupWindow,
	Toast = android.widget.Toast,
	EditText = android.widget.EditText,
	OnCheckedChangeListener = android.widget.CompoundButton.OnCheckedChangeListener,
	OnTouchListener = android.view.View.OnTouchListener,
	OnClickListener = android.view.View.OnClickListener,
	MotionEvent = android.view.MotionEvent,
	Gravity = android.view.Gravity,
	ScrollView = android.widget.ScrollView,
	LinearLayout = android.widget.LinearLayout,
	horizontalScrollView = android.widget.HorizontalScrollView,
	FrameLayout = android.widget.FrameLayout,
	WIDTH = pe.CONTEXT.getScreenWidth(),
	HEIGHT = pe.CONTEXT.getScreenHeight(),
	Bitmap = android.graphics.Bitmap,
	BitmapFactory = android.graphics.BitmapFactory,
	BitmapDrawable = android.graphics.drawable.BitmapDrawable,
	Drawable = android.graphics.drawable.Drawable,
	drawable = android.graphics.drawable,
	ColorDrawable = android.graphics.drawable.ColorDrawable,
	Color = android.graphics.Color,
	Canvas = android.graphics.Canvas,
	Paint = android.graphics.Paint,
	Typeface = android.graphics.Typeface,
	GradientDrawable = android.graphics.drawable.GradientDrawable,
	ClipDrawable = android.graphics.drawable.ClipDrawable,
	LayerDrawable = android.graphics.drawable.LayerDrawable,
	PorterDuff = android.graphics.PorterDuff,
	PorterDuffColorFilter = android.graphics.PorterDuffColorFilter,
	File = java.io.File,
	OutputStreamWriter = java.io.OutputStreamWriter,
	FileOutputStream = java.io.FileOutputStream,
	FileInputStream = java.io.FileInputStream,
	BufferedReader = java.io.BufferedReader,
	BufferedWriter = java.io.BufferedWriter,
	BufferedInputStream = java.io.BufferedInputStream,
	BufferedOutputStream = java.io.BufferedOutputStream,
	InputStreamReader = java.io.InputStreamReader,
	Params = android.widget.LinearLayout.LayoutParams,
	SpeechRecognizer = android.speech.SpeechRecognizer,
	Intent = android.content.Intent,
	RecognizerIntent = android.speech.RecognizerIntent,
	Thread = java.lang.Thread,
	Runnable = java.lang.Runnable,
	DP = android.util.TypedValue.applyDimension(android.util.TypedValue.COMPLEX_UNIT_DIP, 1, pe.CONTEXT.getResources().getDisplayMetrics()),
	ValueAnimator = android.animation.ValueAnimator,
	AnimatorListenerAdapter = android.animation.AnimatorListenerAdapter;




/**
* @create a rippledrawable.
* @param {View} view
* @param {Float} width
* @param {Float} height
* @param {Float} x
* @param {Float} y
* @param {Color} color
* @param {Color} _color
* @param {Void} func
*/
const RippleDrawable = (view, width, height, x, y, color, _color, func) => { 

	const drawCircle = (view, width, height, x, y, color, _color, radius, alpha) => {
		var bm = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888),
			canvas = new Canvas(bm),
			paint = new Paint();
		
		paint.setColor(_color);
		if(alpha != null) paint.setAlpha(alpha);
		paint.setAntiAlias(true);
		
		canvas.drawCircle(x, y, (radius == null? 15 * DP : radius), paint);
		
		if(color == null) view.setBackgroundDrawable(new BitmapDrawable(bm));
		else view.setBackgroundDrawable(new LayerDrawable([new ColorDrawable(color), new BitmapDrawable(bm)]));
	};
	

	var radius = Math.max(width, height) / 2, 
		max_radius = (Math.hypot(width, height) / 2) + 100 * DP,
		click = false;
		
	var valueAnimator = ValueAnimator.ofFloat([radius, max_radius]),
		_valueAnimatorX = ValueAnimator.ofFloat([x, width / 2]),
		_valueAnimatorY = ValueAnimator.ofFloat([y, height / 2]);
	
	_valueAnimatorX.setDuration(300);
	_valueAnimatorY.setDuration(300);
	
	valueAnimator.addUpdateListener(new ValueAnimator.AnimatorUpdateListener({
		onAnimationUpdate : _valueAnimator => {
			var current_radius = _valueAnimator.getAnimatedValue(),
				circle_point_x = _valueAnimatorX.getAnimatedValue(),
				circle_point_y = _valueAnimatorY.getAnimatedValue(),
				percent = 1 - (current_radius / max_radius);
			
			if(current_radius < max_radius) {
				drawCircle(view, width, height, circle_point_x, circle_point_y, color,  _color, current_radius);
			}
			
			if(circle_point_x == width / 2) {
				if(color == null) view.setBackgroundDrawable(null);
				if(color != null) view.setBackgroundDrawable(new ColorDrawable(color));
				if(func != null && !click) func(view);
				
				click = true;
			}
		}
	}));
	
	valueAnimator.setDuration(350);
	valueAnimator.start();
	_valueAnimatorX.start();
	_valueAnimatorY.start();
};
