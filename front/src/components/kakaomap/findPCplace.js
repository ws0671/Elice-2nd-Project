/*global kakao*/
import React, { useEffect } from "react";

const FindPCplace = () => {
  useEffect(() => {
    var mapContainer = document.getElementById("map");
    var mapOptions = {
      center: new kakao.maps.LatLng(37.365264512305174, 127.10676860117488),
      level: 3,
      mapTypeId: kakao.maps.MapTypeId.ROADMAP,
    };

    let map = new kakao.maps.Map(mapContainer, mapOptions); // 지도를 생성합니다.

    // HTML5의 geolocaiton으로 사용할 수 있는지 확인합니다.
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치를 얻어옵니다.
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        var locPostion = new kakao.maps.LatLng(lat, lon), //마커가 표시될 위치를 geolocation 좌표로 생성합니다.
          message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다.

        // 마커와 인포윈도우를 표시합니다.
        displayMarker(locPostion, message);
      });
    } else {
    }

    // 지도에 마커와 인포윈도우를 표시하는 함수입니다.
    function displayMarker(locPostion, message) {
      // 마커를 생성합니다.
      var marker = new kakao.maps.Marker({
        map: map,
        position: locPostion,
      });

      var iwContent = message, // 인포윈도우에 표시할 내용
        iwRemoveable = true;

      // 인포윈도우를 생성합니다.
      var infowindow = new kakao.maps.InfoWindow({
        content: iwContent,
        removable: iwRemoveable,
      });

      // 인포윈도우를 마커위에 표시합니다.
      infowindow.open(map, marker);

      // 지도 중심좌표를 접속위치로 변경합니다.
      map.setCenter(locPostion);
    }
  }, []);

  return (
    <div>
      <div id="map" style={{ width: "500px", height: "400px" }}></div>
    </div>
  );
};

export default FindPCplace;
