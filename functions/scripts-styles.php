<?php
/**
 * Scripts & Styles
 *
 * @package Bulmapress
 */

if ( ! function_exists( 'bulmapress_scripts' ) ) {
	/**
	 * Enqueue scripts and styles.
	 */
	function bulmapress_scripts() {
		wp_enqueue_style( 'bulmapress-style', get_stylesheet_uri() );

		wp_enqueue_style( 'bulmapress-fontawesome', "https://use.fontawesome.com/releases/v5.2.0/css/all.css" );

		// check to see if on localhost so that we can send the un-minified files... used by gulp/browsersync dev server
		if(in_array($_SERVER['REMOTE_ADDR'], array('127.0.0.1','::1')) || $_SERVER['REMOTE_ADDR'] === "127.0.0.1") {
			wp_enqueue_style( 'sms-build-styles', get_template_directory_uri() . '/assets/build/index.css' );

			wp_enqueue_script( 'sms-build-scripts', get_template_directory_uri() . '/assets/build/scripts.bundle.js', array(), '20190723', true );
		} else {
			wp_enqueue_style( 'sms-build-styles', get_template_directory_uri() . '/assets/build/index.min.css' );

			wp_enqueue_script( 'sms-build-scripts', get_template_directory_uri() . '/assets/build/scripts.bundle.min.js', array(), '20190723', true );
		}

		if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
			wp_enqueue_script( 'comment-reply' );
		}
}
}
add_action( 'wp_enqueue_scripts', 'bulmapress_scripts' );
