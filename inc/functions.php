<?php
// Helper functions for GIS MitraQodha

function format_phone_for_whatsapp($phone) {
    // Minimal normalization: remove non-digits
    $digits = preg_replace('/[^0-9+]/', '', $phone);
    // Further normalization can be added (country code, etc.)
    return $digits;
}

// Add more helper functions here for statistics, caching, etc.
