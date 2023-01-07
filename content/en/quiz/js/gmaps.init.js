function map()
{
    (map = new GMaps(
    {
        el: "#map",
        lat: -12.043333,
        lng: -77.028333,
        zoomControl: !0,
        zoomControlOpt:
        {
            style: "SMALL",
            position: "TOP_LEFT"
        },
        panControl: !1,
        streetViewControl: !1,
        mapTypeControl: !1,
        overviewMapControl: !1,
        scrollwheel: !1,
        draggable: !1,
        styles: [
        {
            featureType: "landscape",
            stylers: [
            {
                saturation: -100
            },
            {
                lightness: 65
            },
            {
                visibility: "on"
            }]
        },
        {
            featureType: "poi",
            stylers: [
            {
                saturation: -100
            },
            {
                lightness: 51
            },
            {
                visibility: "simplified"
            }]
        },
        {
            featureType: "road.highway",
            stylers: [
            {
                saturation: -100
            },
            {
                visibility: "simplified"
            }]
        },
        {
            featureType: "road.arterial",
            stylers: [
            {
                saturation: -100
            },
            {
                lightness: 30
            },
            {
                visibility: "on"
            }]
        },
        {
            featureType: "road.local",
            stylers: [
            {
                saturation: -100
            },
            {
                lightness: 40
            },
            {
                visibility: "on"
            }]
        },
        {
            featureType: "transit",
            stylers: [
            {
                saturation: -100
            },
            {
                visibility: "simplified"
            }]
        },
        {
            featureType: "administrative.province",
            stylers: [
            {
                visibility: "off"
            }]
        },
        {
            featureType: "water",
            elementType: "labels",
            stylers: [
            {
                visibility: "on"
            },
            {
                lightness: -25
            },
            {
                saturation: -100
            }]
        },
        {
            featureType: "water",
            elementType: "geometry",
            stylers: [
            {
                hue: "#ffff00"
            },
            {
                lightness: -25
            },
            {
                saturation: -97
            }]
        }]
    })).addMarker(
    {
        lat: -12.043333,
        lng: -77.028333,
        icon: "img/marker.png"
    })
}
$(function ()
{
    map()
});