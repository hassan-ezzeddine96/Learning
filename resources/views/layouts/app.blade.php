<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel = "icon" href =  
"/images/welcome/download (1).png" 
        type = "image/x-icon"> 
    <title>Tutor Me</title>


    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="icon" href="img/favicon.png" type="image/png">
        <script src="https://unpkg.com/scrollreveal"></script>
    <script>
        ScrollReveal({ reset: true });
    </script>
</head>
<body>
<div id="app" style='
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 10;"'>
    <header class="header_area">
            <div class="main_menu">
            	<nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
					<div class="container">
                        <!-- Brand and toggle get grouped for better mobile display -->
                        <div class="spin">
    
                                <svg class="loader" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 1400">
                                    <circle cx="170" cy="170" r="160" stroke="#E2007C"/>
                                    <circle cx="170" cy="170" r="135" stroke="#404041"/>
                                    <circle cx="170" cy="170" r="110" stroke="#E2007C"/>
                                    <circle cx="170" cy="170" r="85" stroke="#404041"/>
                                </svg>
                                
                            </div>
                        <a class="navbar-brand" href="{{ url('/') }}">
                            Tutor Me
                        </a>
                        
						<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
							<span class="icon-bar"></span>
						</button>
						<!-- Collect the nav links, forms, and other content for toggling -->
						<div class="collapse navbar-collapse offset" id="navbarSupportedContent">
                        <ul class="navbar-nav ml-auto">
                                @guest
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Login') }}</a>
                            </li>
                            @if (Route::has('register'))
                                <li class="nav-item">
                                    <a class="nav-link" href="{{ route('register') }}">{{ __('Register') }}</a>
                                </li>
                            @endif
                        @else
                            <li class="nav-item dropdown">
                                <a id="navbarDropdown" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                    {{ Auth::user()->name }} <span class="caret"></span>
                                </a>

                                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a class="dropdown-item" href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        {{ __('Logout') }}
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        @csrf
                                    </form>
                                </div>
                            </li>
                        @endguest
							</ul>
						</div> 
					</div>
            	</nav>
            </div>
    </header>
    <main class="py-4">
            @yield('content')
        </main>
        </div>
</body>
</html>
