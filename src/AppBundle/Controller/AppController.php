<?php

namespace AppBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class AppController extends Controller
{
	public function homepageAction(Request $request)
	{
		return $this->render(
			'AppBundle::homepage.html.twig'
		);
	}
}