import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import axios from 'axios';

export default function BowFactoryScreen({ route, navigation }) {
  const [selectedFactory, setSelectedFactory] = useState('활공장을 선택해 주세요');
  const [summaryData, setSummaryData] = useState({});
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    if (route.params?.selectedFactory) {
      setSelectedFactory(route.params.selectedFactory);
      fetchWeatherData(route.params.selectedFactory);
    }
  }, [route.params?.selectedFactory]);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await axios.get('http://121.127.174.92:5000/factories');
        const data = response.data.reduce((acc, factory) => {
          acc[factory.name] = factory.summary;
          return acc;
        }, {});
        setSummaryData(data);
      } catch (error) {
        console.error('Error fetching factory data:', error);
      }
    };

    fetchSummaryData();
  }, []);

  const fetchWeatherData = async (factoryName) => {
    try {
      const region = getRegionForFactory(factoryName);
      const response = await axios.post('http://121.127.174.92:5000/api/weather', {
        data: { region }
      });
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      Alert.alert('오류', '날씨 정보를 가져오는 중 오류가 발생했습니다.');
    }
  };

  const getRegionForFactory = (factoryName) => {
    const factoryRegions = {
      '각산이륙장': '경남',
      '간월재이륙장': '전남',
      '감악산이륙장': '강원',
      '경각산이륙장': '경기',
      '계룡산이륙장': '경남',
      '고근산이륙장': '경북',
      '고헌산(곰돌이)이륙장': '제주',
      '관모산이륙장': '강원',
      '광교산이륙장': '경남',
      '광의이륙장': '강원',
      '괘방산 활공장': '경남',
      '국당이륙장': '울산',
      '금오름이륙장': '광주',
      '기룡산 이륙장': '전북',
      '남산 이륙장': '전남',
      '남포이륙장': '강원',
      '노안이륙장': '대구',
      '논개이륙장': '강원',
      '달마산이륙장': '경남',
      '대관령 활공장': '충남',
      '대니산이륙장': '충남',
      '대릉산 이륙장': '충북',
      '대부도 구봉산 이륙장': '경남',
      '대암산이륙장': '전남',
      '덕기봉이륙장': '경남',
      '도비산 활공장': '경남',
      '두산 활공장': '경기',
      '마래산이륙장': '강원',
      '망실봉이륙장': '전북',
      '망운산이륙장': '경북',
      '매산리 활공장': '전북',
      '무릉 활공장': '경남',
      '무주이륙장': '경남',
      '무척산이륙장': '전북',
      '문경활공랜드': '경기',
      '미륵산이륙장': '경남',
      '미시령 활공장': '경북',
      '바람재이륙장': '전북',
      '박달산 활공장': '충남',
      '발례이륙장': '충북',
      '방광산이륙장': '경북',
      '방장산이륙장': '강원',
      '백월산이륙장': '강원',
      '백화산이륙장': '충남',
      '벽도산이륙장': '경남',
      '봉래산이륙장': '경남',
      '봉수대이륙장': '경기',
      '봉화산(당진) 활공장': '충남',
      '봉화산이륙장': '강원',
      '불탄산이륙장': '전남',
      '사곡이륙장': '제주',
      '사명산이륙장': '경기',
      '사자산이륙장': '경기',
      '서독산 활공장': '경기',
      '서우봉이륙장': '대전',
      '서운산 활공장': '제주',
      '송라산 활공장': '경북',
      '식장산이륙장': '충북',
      '안동길안이륙장': '경기',
      '양백산이륙장': '울산',
      '어섬 활공장': '경기',
      '연화산이륙장': '전남',
      '예봉산이륙장': '전남',
      '오봉산이륙장': '충남',
      '오산이륙장': '전북',
      '오서산 활공장': '경남',
      '오성산이륙장': '울산',
      '와룡산이륙장': '경기',
      '와우정사 활공장': '충남',
      '왜목 활공장': '경기',
      '원적산이륙장': '제주',
      '월랑봉이륙장': '경기',
      '유명산 활공장': '경기',
      '은봉산 활공장': '경남',
      '음달산이륙장': '경남',
      '자양산이륙장': '전남',
      '장동산이륙장': '강원',
      '장암산 활공장': '충남',
      '장암산이륙장': '전남',
      '재석산이륙장': '전남',
      '정광산이륙장': '경북',
      '주월산이륙장': '부산',
      '주작산이륙장': '전남',
      '진례이륙장': '전북',
      '진천 활공장': '경북',
      '창평이륙장': '경남',
      '초록봉 활공장': '강원',
      '칠포이륙장': '경기',
      '특리이륙장': '경북',
      '한우산이륙장': '경남',
      '향적봉이륙장': '경남',
      '형제봉이륙장': '전남',
      '혜음령이륙장': '강원',
      '호락산이륙장': '경기',
      '화순이륙장': '경북',
      '황금산이륙장': '전남',
      '황령산이륙장': '경남',
      '혹성산이륙장': '충북'
    };
    return factoryRegions[factoryName] || '경기도';
  };


  const getImageSource = (factoryName) => {
    const images = {
      '각산이륙장': require('../assets/GakSanTakeOff.png'),
      '간월재이륙장': require('../assets/GanWolJaeTakeOff.png'),
      '감악산이륙장': require('../assets/GamakSanTakeOff.png'),
      '경각산이륙장': require('../assets/GyeongGakSanTakeOff.png'),
      '계룡산이륙장': require('../assets/GyeRyeongSanTakeOff.png'),
      '고근산이륙장': require('../assets/GoGeunSanTakeOff.png'),
      '고헌산(곰돌이)이륙장': require('../assets/GoHeonSanGomDoliTakeOff.png'),
      '관모산이륙장': require('../assets/GwanMoSanTakeOff.png'),
      '광교산이륙장': require('../assets/GwangGyoSanTakeOff.png'),
      '광의이륙장': require('../assets/GwangUiTakeOff.png'),
      '괘방산 활공장': require('../assets/GwaeBangSanTakeOff.png'),
      '국당이륙장': require('../assets/GukDangTakeOff.png'),
      '금오름이륙장': require('../assets/GeumOReumTakeOff.png'),
      '기룡산 이륙장': require('../assets/GiRyeongSanTakeOff.png'),
      '남산 이륙장': require('../assets/NamSanTakeOff.png'),
      '남포이륙장': require('../assets/NamPoTakeOff.png'),
      '노안이륙장': require('../assets/NoAnTakeOff.png'),
      '논개이륙장': require('../assets/NonGaeTakeOff.png'),
      '달마산이륙장': require('../assets/DalMaSanTakeOff.png'),
      '대관령 활공장': require('../assets/DaeGwanRyeongTakeOff.png'),
      '대니산이륙장': require('../assets/DaeNiSanTakeOff.png'),
      '대릉산 이륙장': require('../assets/DaeReungSanTakeOff.png'),
      '대부도 구봉산 이륙장': require('../assets/DaeBuDoGuBongSanTakeOff.png'),
      '대암산이륙장': require('../assets/DaeAmSanTakeOff.png'),
      '덕기봉이륙장': require('../assets/DeokGiBongTakeOff.png'),
      '도비산 활공장': require('../assets/DoBiSanTakeOff.png'),
      '두산 활공장': require('../assets/DuSanTakeOff.png'),
      '마래산이륙장': require('../assets/MaRaeSanTakeOff.png'),
      '망실봉이륙장': require('../assets/MangSilBongTakeOff.png'),
      '망운산이륙장': require('../assets/MangUnSanTakeOff.png'),
      '매산리 활공장': require('../assets/MaeSanRiTakeOff.png'),
      '무릉 활공장': require('../assets/MuReungTakeOff.png'),
      '무주이륙장': require('../assets/MuJuTakeOff.png'),
      '무척산이륙장': require('../assets/MuCheokSanTakeOff.png'),
      '문경활공랜드': require('../assets/MunGyeongTakeOff.png'),
      '미륵산이륙장': require('../assets/MiReukSanTakeOff.png'),
      '미시령 활공장': require('../assets/MiSiRyeongTakeOff.png'),
      '바람재이륙장': require('../assets/BaRamJaeTakeOff.png'),
      '박달산 활공장': require('../assets/BakDalSanTakeOff.png'),
      '발례이륙장': require('../assets/BalRyeTakeOff.png'),
      '방광산이륙장': require('../assets/BangGwangSanTakeOff.png'),
      '방장산이륙장': require('../assets/BangJangSanTakeOff.png'),
      '백월산이륙장': require('../assets/BaekWolSanTakeOff.png'),
      '백화산이륙장': require('../assets/BaekHwaSanTakeOff.png'),
      '벽도산이륙장': require('../assets/ByeokDoSanTakeOff.png'),
      '봉래산이륙장': require('../assets/BongRaeSanTakeOff.png'),
      '봉수대이륙장': require('../assets/BongSuDaeTakeOff.png'),
      '봉화산(당진) 활공장': require('../assets/BongHwaSanDanginTakeOff.png'),
      '봉화산이륙장': require('../assets/BongHwaSanTakeOff.png'),
      '불탄산이륙장': require('../assets/BulTanSanTakeOff.png'),
      '사곡이륙장': require('../assets/SaGokTakeOff.png'),
      '사명산이륙장': require('../assets/SaMyeongSanTakeOff.png'),
      '사자산이륙장': require('../assets/SaJaSanTakeOff.png'),
      '서독산 활공장': require('../assets/SeoDokSanTakeOff.png'),
      '서우봉이륙장': require('../assets/SeoUBongTakeOff.png'),
      '서운산 활공장': require('../assets/SeoUnSanTakeOff.png'),
      '송라산 활공장': require('../assets/SongRaSanTakeOff.png'),
      '식장산이륙장': require('../assets/SikJangSanTakeOff.png'),
      '안동길안이륙장': require('../assets/AnDongGilAnTakeOff.png'),
      '양백산이륙장': require('../assets/YangBaekSanTakeOff.png'),
      '어섬 활공장': require('../assets/EOSeomTakeOff.png'),
      '연화산이륙장': require('../assets/YeonHwaSanTakeOff.png'),
      '예봉산이륙장': require('../assets/YeBongSanTakeOff.png'),
      '오봉산이륙장': require('../assets/OBongSanTakeOff.png'),
      '오산이륙장': require('../assets/OSanTakeOff.png'),
      '오서산 활공장': require('../assets/OSeoSanTakeOff.png'),
      '오성산이륙장': require('../assets/OSungSanTakeOff.png'),
      '와룡산이륙장': require('../assets/WaRyeongSanTakeOff.png'),
      '와우정사 활공장': require('../assets/WaUJeongSaTakeOff.png'),
      '왜목 활공장': require('../assets/WaeMokTakeOff.png'),
      '원적산이륙장': require('../assets/WonJeokSanTakeOff.png'),
      '월랑봉이륙장': require('../assets/WolRangBongTakeOff.png'),
      '유명산 활공장': require('../assets/YuMyeongSanTakeOff.png'),
      '은봉산 활공장': require('../assets/EunBongSanTakeOff.png'),
      '음달산이륙장': require('../assets/EumDalSanTakeOff.png'),
      '자양산이륙장': require('../assets/JaYangSanTakeOff.png'),
      '장동산이륙장': require('../assets/JangDongSanTakeOff.png'),
      '장암산 활공장': require('../assets/JangAmSanTakeOff.png'),
      '장암산이륙장': require('../assets/JangAmTakeOff.png'),
      '재석산이륙장': require('../assets/JaeSeokSanTakeOff.png'),
      '정광산이륙장': require('../assets/JeongGwangSanTakeOff.png'),
      '주월산이륙장': require('../assets/JuWolSanTakeOff.png'),
      '주작산이륙장': require('../assets/JuJakSanTakeOff.png'),
      '진례이륙장': require('../assets/JinRyeTakeOff.png'),
      '진천 활공장': require('../assets/JinCheonTakeOff.png'),
      '창평이륙장': require('../assets/ChangPyeongTakeOff.png'),
      '초록봉 활공장': require('../assets/ChoRokBongTakeOff.png'),
      '칠포이륙장': require('../assets/ChilPoTakeOff.png'),
      '특리이륙장': require('../assets/TeukRiTakeOff.png'),
      '한우산이륙장': require('../assets/HanUSanTakeOff.png'),
      '향적봉이륙장': require('../assets/HyangJeokBongTakeOff.png'),
      '형제봉이륙장': require('../assets/HyeongJeBongTakeOff.png'),
      '혜음령이륙장': require('../assets/HyeEumRyeongTakeOff.png'),
      '호락산이륙장': require('../assets/HoRakSanTakeOff.png'),
      '화순이륙장': require('../assets/HwaSunTakeOff.png'),
      '황금산이륙장': require('../assets/HwangGeumSanTakeOff.png'),
      '황령산이륙장': require('../assets/HwangRyeongSanTakeOff.png'),
      '혹성산이륙장': require('../assets/HokSeongSanTakeOff.png')
    };
    return images[factoryName] || require('../assets/default.png');
  };

  return (
    <View style={styles.container}>
      <View style={styles.selectedFactoryContainer}>
        <Text style={styles.selectedFactoryText}>{selectedFactory}</Text>
        <TouchableOpacity style={styles.selectButton} onPress={() => navigation.navigate('SelectBowFactoryScreen')}>
          <Text style={styles.buttonText}>선택</Text>
        </TouchableOpacity>
      </View>
      {selectedFactory !== '활공장을 선택해 주세요' && (
        <View style={styles.detailsContainer}>
          <TouchableOpacity
            style={styles.summaryContainer}
            onPress={() => navigation.navigate('FirstBowFactoryInfoScreen', { selectedFactory })}
          >
            <Text style={styles.summaryTitle}>{selectedFactory}</Text>
            <Text style={styles.summaryText}>{summaryData[selectedFactory]}</Text>
          </TouchableOpacity>
          {weatherData && (
            <View style={styles.weatherContainer}>
              <Text style={styles.weatherText}>온도: {weatherData.temperature}°C</Text>
              <Text style={styles.weatherText}>풍속: {weatherData.wind_speed} m/s</Text>
              <Text style={styles.weatherText}>설명: {weatherData.description}</Text>
            </View>
          )}
          <Image
            source={getImageSource(selectedFactory)}
            style={styles.factoryImage}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  selectedFactoryContainer: {
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  selectedFactoryText: {
    fontSize: 18,
    marginBottom: 10,
  },
  selectButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  detailsContainer: {
    marginTop: 20,
  },
  summaryContainer: {
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
  },
  factoryImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  weatherContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  weatherText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
