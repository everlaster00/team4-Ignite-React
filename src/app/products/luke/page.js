'use client';
import React, { useState } from 'react';
import { TrendingUp, AlertTriangle, CheckCircle, BarChart3, Store } from 'lucide-react';

const SangsaengPlatform = () => {
const [formData, setFormData] = useState({
businessName: '',
businessType: '',
location: '',
monthlyRevenue: '',
monthlyRent: '',
employeeCount: '',
businessAge: '',
seasonalImpact: 'medium'
});

const [isAnalyzing, setIsAnalyzing] = useState(false);
const [result, setResult] = useState(null);
const [stats, setStats] = useState({
highRisk: 12,
mediumRisk: 35,
lowRisk: 128,
total: 175
});

const regions = [
'서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시',
'대전광역시', '울산광역시', '세종특별자치시', '경기도', '강원특별자치도',
'충청북도', '충청남도', '전북특별자치도', '전라남도', '경상북도',
'경상남도', '제주특별자치도'
];

const businessTypes = ['음식점', '카페', '소매업', '서비스업', '제조업', '도소매업', '기타'];

const handleInputChange = (e) => {
const { name, value } = e.target;
setFormData(prev => ({ ...prev, [name]: value }));
};

const analyzeBusiness = () => {
if (!formData.businessName || !formData.businessType || !formData.location ||
!formData.monthlyRevenue || !formData.monthlyRent || !formData.employeeCount || !formData.businessAge) {
alert('모든 필수 항목을 입력해주세요.');
return;
}


setIsAnalyzing(true);

setTimeout(() => {
  let riskScore = 0;

  const rentRatio = (parseInt(formData.monthlyRent) * 10000) / (parseInt(formData.monthlyRevenue) * 10000);
  if (rentRatio > 0.4) riskScore += 30;
  else if (rentRatio > 0.2) riskScore += 10;

  if (parseInt(formData.businessAge) < 1) riskScore += 20;
  else if (parseInt(formData.businessAge) < 3) riskScore += 10;

  const revenue = parseInt(formData.monthlyRevenue) * 10000;
  if (revenue < 2000000) riskScore += 25;
  else if (revenue < 5000000) riskScore += 10;

  const revenuePerEmployee = revenue / parseInt(formData.employeeCount);
  if (revenuePerEmployee < 1000000) riskScore += 15;

  const locationRisk = {
    '서울특별시': 12, '부산광역시': 8, '경기도': 10, '인천광역시': 7,
    '대구광역시': 6, '광주광역시': 5, '대전광역시': 5, '울산광역시': 6,
    '세종특별자치시': 3, '강원특별자치도': 4, '충청북도': 4, '충청남도': 4,
    '전북특별자치도': 5, '전라남도': 4, '경상북도': 5, '경상남도': 6, '제주특별자치도': 7
  };
  riskScore += locationRisk[formData.location] || 5;

  const seasonalRisk = { 'high': 10, 'medium': 5, 'low': 0 };
  riskScore += seasonalRisk[formData.seasonalImpact];

  const survivalRate = Math.max(15, 100 - riskScore);
  const recommendations = generateRecommendations(survivalRate, formData);

  setResult({
    survivalRate,
    riskLevel: survivalRate >= 70 ? 'low' : survivalRate >= 40 ? 'medium' : 'high',
    recommendations
  });

  setStats(prev => {
    const newStats = { ...prev, total: prev.total + 1 };
    if (survivalRate < 40) newStats.highRisk += 1;
    else if (survivalRate < 70) newStats.mediumRisk += 1;
    else newStats.lowRisk += 1;
    return newStats;
  });

  setIsAnalyzing(false);

  setTimeout(() => {
    document.getElementById('result-section')?.scrollIntoView({ behavior: 'smooth' });
  }, 100);
}, 2000);



};

const generateRecommendations = (survivalRate, data) => {
const recommendations = [];
const rentRatio = (parseInt(data.monthlyRent) * 10000) / (parseInt(data.monthlyRevenue) * 10000);


if (survivalRate < 40) {
  recommendations.push('💰 긴급 자금 확보 - 소상공인 정책자금 신청');
  recommendations.push('✂️ 비용 절감 - 불필요한 지출 즉시 중단');
  recommendations.push('📢 매출 증대 - 할인 이벤트 및 마케팅 강화');
  recommendations.push('🏥 전문가 상담 - 경영 컨설팅 즉시 신청');
  if (rentRatio > 0.3) {
    recommendations.push('🏠 임대료 협상 - 임대인과 임대료 조정 협상');
  }
} else if (survivalRate < 70) {
  recommendations.push('📈 경영 효율성 개선 - 재고 관리 최적화');
  recommendations.push('😊 고객 서비스 강화 - 리뷰 관리 및 만족도 향상');
  recommendations.push('🚚 온라인 진출 - 배달 서비스 및 온라인 주문 도입');
  recommendations.push('🤝 네트워크 활용 - 지역 상인회 참여');
  if (data.businessType === '음식점' || data.businessType === '카페') {
    recommendations.push('📱 SNS 마케팅 - 인스타그램, 블로그 활용');
  }
} else {
  recommendations.push('🎯 현재 경영 상태 유지 - 안정적 운영 지속');
  recommendations.push('🚀 사업 확장 검토 - 추가 매장 또는 메뉴 확대');
  recommendations.push('💡 혁신 투자 - 시설 개선 및 신기술 도입');
  recommendations.push('📊 데이터 분석 - 고객 패턴 분석으로 매출 최적화');
  if (parseInt(data.employeeCount) < 3) {
    recommendations.push('👥 인력 확충 고려 - 서비스 품질 향상을 위한 직원 채용');
  }
}

return recommendations;



};

return (
<div className="min-h-screen bg-gray-50">
<header className="bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg">
<nav className="max-w-7xl mx-auto px-4 py-4">
<div className="flex items-center justify-between flex-wrap gap-4">
<div className="flex items-center gap-2 text-2xl font-bold">
<Store size={32} />
<span>상생(商生)</span>
</div>
<div className="flex gap-6 flex-wrap">
<button onClick={() => window.location.hash = '#home'} className="hover:bg-white/20 px-4 py-2 rounded transition">홈</button>
<button onClick={() => window.location.hash = '#analysis'} className="hover:bg-white/20 px-4 py-2 rounded transition">위험도 분석</button>
<button onClick={() => window.location.hash = '#dashboard'} className="hover:bg-white/20 px-4 py-2 rounded transition">대시보드</button>
<button onClick={() => window.location.hash = '#about'} className="hover:bg-white/20 px-4 py-2 rounded transition">서비스 소개</button>
</div>
</div>
</nav>
</header>


  <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20" id="home">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h1 className="text-5xl font-bold mb-4">AI로 예측하는 사업 생존율</h1>
      <p className="text-xl mb-8 opacity-90">
        데이터 기반 분석으로 소상공인의 위험요소를 사전에 감지하고<br />
        맞춤형 생존 전략을 제공합니다
      </p>
      <button
        onClick={() => window.location.hash = '#analysis'}
        className="inline-block bg-white text-purple-600 px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition transform hover:-translate-y-1"
      >
        🔍 무료 분석 시작하기
      </button>
    </div>
  </section>

  <main className="max-w-7xl mx-auto px-4 py-12">
    <section className="mb-16" id="analysis">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">📊 사업체 생존율 분석</h2>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">사업체명 *</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleInputChange}
              placeholder="예: 홍대 맛집"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">업종 *</label>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
            >
              <option value="">선택하세요</option>
              {businessTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">지역 (시/도) *</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
            >
              <option value="">선택하세요</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">월 매출 (만원) *</label>
            <input
              type="number"
              name="monthlyRevenue"
              value={formData.monthlyRevenue}
              onChange={handleInputChange}
              placeholder="500"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">월 임대료 (만원) *</label>
            <input
              type="number"
              name="monthlyRent"
              value={formData.monthlyRent}
              onChange={handleInputChange}
              placeholder="100"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">직원 수 (명) *</label>
            <input
              type="number"
              name="employeeCount"
              value={formData.employeeCount}
              onChange={handleInputChange}
              placeholder="3"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">사업 연수 (년) *</label>
            <input
              type="number"
              name="businessAge"
              value={formData.businessAge}
              onChange={handleInputChange}
              placeholder="2"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">계절성 영향도</label>
            <select
              name="seasonalImpact"
              value={formData.seasonalImpact}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition"
            >
              <option value="low">낮음</option>
              <option value="medium">보통</option>
              <option value="high">높음</option>
            </select>
          </div>
        </div>

        <button
          onClick={analyzeBusiness}
          disabled={isAnalyzing}
          className="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 disabled:opacity-50 transition"
        >
          {isAnalyzing ? '🔄 분석 중...' : '🔍 AI 생존율 분석하기'}
        </button>
      </div>

      {result && (
        <div id="result-section" className="mt-8 bg-white rounded-2xl shadow-xl p-8">
          <div className={`text-center p-8 rounded-xl mb-6 ${
            result.riskLevel === 'low' ? 'bg-gradient-to-r from-green-500 to-green-600' :
            result.riskLevel === 'medium' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
            'bg-gradient-to-r from-red-500 to-red-600'
          } text-white`}>
            <div className="text-6xl font-bold mb-2">{result.survivalRate}%</div>
            <div className="text-xl">
              {result.riskLevel === 'low' ? '✅ 안정적 - 생존 확률 높음' :
               result.riskLevel === 'medium' ? '⚠️ 주의 - 관리 필요' :
               '🚨 위험 - 즉시 대응 필요'}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp /> 맞춤형 생존 전략
            </h3>
            <div className="space-y-3">
              {result.recommendations.map((rec, idx) => (
                <div key={idx} className="p-4 bg-gray-50 border-l-4 border-purple-600 rounded">
                  {rec}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>

    <section className="mb-16" id="dashboard">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">📈 실시간 분석 현황</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-5xl font-bold text-red-500 mb-2">{stats.highRisk}</div>
          <div className="text-gray-600 text-lg">고위험 사업체</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-5xl font-bold text-orange-500 mb-2">{stats.mediumRisk}</div>
          <div className="text-gray-600 text-lg">중위험 사업체</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-5xl font-bold text-green-500 mb-2">{stats.lowRisk}</div>
          <div className="text-gray-600 text-lg">저위험 사업체</div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-5xl font-bold text-purple-600 mb-2">{stats.total}</div>
          <div className="text-gray-600 text-lg">총 분석 건수</div>
        </div>
      </div>
    </section>
  </main>

  <footer className="bg-gray-800 text-white py-8">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <p className="text-lg mb-2">&copy; 2025 상생(商生) - 소상공인 생존 예측 플랫폼</p>
      <p className="text-gray-400">오즈코딩스쿨</p>
    </div>
  </footer>
</div>



);
};

export default SangsaengPlatform;