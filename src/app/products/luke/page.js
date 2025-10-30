"use client";
import React, { useEffect } from 'react';
import './luke.css';

// Helper functions moved outside the component
function analyzeBusiness(data) {
    // 로딩 표시
    const analyzeBtn = document.querySelector('.analyze-btn');
    if (analyzeBtn) {
        analyzeBtn.textContent = '🔄 분석 중...';
        // Removed TypeScript type assertion
        analyzeBtn.disabled = true;
    }

    setTimeout(() => {
        // 위험도 계산 알고리즘
        let riskScore = 0;

        // 임대료 대비 매출 비율
        const rentRatio = data.monthlyRent / data.monthlyRevenue;
        if (rentRatio > 0.4) riskScore += 30;
        else if (rentRatio > 0.2) riskScore += 10;

        // 사업 연수
        if (data.businessAge < 1) riskScore += 20;
        else if (data.businessAge < 3) riskScore += 10;

        // 매출 규모
        if (data.monthlyRevenue < 2000000) riskScore += 25;
        else if (data.monthlyRevenue < 5000000) riskScore += 10;

        // 직원 대비 효율성
        const revenuePerEmployee = data.monthlyRevenue / data.employeeCount;
        if (revenuePerEmployee < 1000000) riskScore += 15;

        // 지역별 위험도
        const locationRisk = {
            '강남구': 10,
            '마포구': 5,
            '송파구': 5,
            '영등포구': 8,
            '기타': 0
        };
        riskScore += locationRisk[data.location] || 0;

        // 계절성 영향
        const seasonalRisk = {
            'high': 10,
            'medium': 5,
            'low': 0
        };
        riskScore += seasonalRisk[data.seasonalImpact];

        // 생존율 계산 (위험도를 생존율로 변환)
        const survivalRate = Math.max(15, 100 - riskScore);

        // 결과 표시
        displayResults(survivalRate, data);

        // 버튼 복원
        if (analyzeBtn) {
            analyzeBtn.textContent = '🔍 AI 생존율 분석하기';
            // Removed TypeScript type assertion
            analyzeBtn.disabled = false;
        }

        // 통계 업데이트
        updateDashboardStats(survivalRate);

    }, 2000); // 2초 로딩 시뮬레이션
}

function displayResults(survivalRate, businessData) {
    const resultSection = document.getElementById('resultSection');
    const riskDisplay = document.getElementById('riskDisplay');
    const riskScore = document.getElementById('riskScore');
    const riskLevel = document.getElementById('riskLevel');
    const recommendationsList = document.getElementById('recommendationsList');

    if (resultSection && riskDisplay && riskScore && riskLevel && recommendationsList) {
        // 위험도별 스타일 적용
        riskDisplay.className = 'risk-display';
        if (survivalRate >= 70) {
            riskDisplay.classList.add('risk-low');
            riskLevel.textContent = '✅ 안정적 - 생존 확률 높음';
        } else if (survivalRate >= 40) {
            riskDisplay.classList.add('risk-medium');
            riskLevel.textContent = '⚠️ 주의 - 관리 필요';
        } else {
            riskDisplay.classList.add('risk-high');
            riskLevel.textContent = '🚨 위험 - 즉시 대응 필요';
        }

        riskScore.textContent = survivalRate + '%';

        // 맞춤형 추천사항 생성
        const recommendations = generateRecommendations(survivalRate, businessData);
        recommendationsList.innerHTML = '';

        recommendations.forEach(rec => {
            const li = document.createElement('li');
            li.className = 'rec-item';
            li.textContent = rec;
            recommendationsList.appendChild(li);
        });

        // 결과 섹션 표시
        resultSection.style.display = 'block';
        resultSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function generateRecommendations(survivalRate, businessData) {
    const recommendations = [];

    if (survivalRate < 40) {
        recommendations.push('💰 긴급 자금 확보 - 소상공인 정책자금 신청');
        recommendations.push('✂️ 비용 절감 - 불필요한 지출 즉시 중단');
        recommendations.push('📢 매출 증대 - 할인 이벤트 및 마케팅 강화');
        recommendations.push('🏥 전문가 상담 - 경영 컨설팅 즉시 신청');

        if (businessData.monthlyRent / businessData.monthlyRevenue > 0.3) {
            recommendations.push('🏠 임대료 협상 - 임대인과 임대료 조정 협상');
        }
    } else if (survivalRate < 70) {
        recommendations.push('📈 경영 효율성 개선 - 재고 관리 최적화');
        recommendations.push('😊 고객 서비스 강화 - 리뷰 관리 및 만족도 향상');
        recommendations.push('🚚 온라인 진출 - 배달 서비스 및 온라인 주문 도입');
        recommendations.push('🤝 네트워크 활용 - 지역 상인회 참여');

        if (businessData.businessType === '음식점' || businessData.businessType === '카페') {
            recommendations.push('📱 SNS 마케팅 - 인스타그램, 블로그 활용');
        }
    } else {
        recommendations.push('🎯 현재 경영 상태 유지 - 안정적 운영 지속');
        recommendations.push('🚀 사업 확장 검토 - 추가 매장 또는 메뉴 확대');
        recommendations.push('💡 혁신 투자 - 시설 개선 및 신기술 도입');
        recommendations.push('📊 데이터 분석 - 고객 패턴 분석으로 매출 최적화');

        if (businessData.employeeCount < 3) {
            recommendations.push('👥 인력 확충 고려 - 서비스 품질 향상을 위한 직원 채용');
        }
    }

    return recommendations;
}

function updateDashboardStats(newSurvivalRate) {
    // 가상의 통계 업데이트
    const highRiskCountEl = document.getElementById('highRiskCount');
    const mediumRiskCountEl = document.getElementById('mediumRiskCount');
    const lowRiskCountEl = document.getElementById('lowRiskCount');
    const totalAnalysisEl = document.getElementById('totalAnalysis');

    if (highRiskCountEl && mediumRiskCountEl && lowRiskCountEl && totalAnalysisEl) {
        if (newSurvivalRate < 40) {
            highRiskCountEl.textContent = (parseInt(highRiskCountEl.textContent || '0') + 1).toString();
        } else if (newSurvivalRate < 70) {
            mediumRiskCountEl.textContent = (parseInt(mediumRiskCountEl.textContent || '0') + 1).toString();
        } else {
            lowRiskCountEl.textContent = (parseInt(lowRiskCountEl.textContent || '0') + 1).toString();
        }

        totalAnalysisEl.textContent = (parseInt(totalAnalysisEl.textContent || '0') + 1).toString();
    }
}

export default function LukePage() {
  useEffect(() => {
    // 사업체 분석 폼 처리
    const businessForm = document.getElementById('businessForm');
    if (businessForm) {
      businessForm.addEventListener('submit', function(e) {
          e.preventDefault();

          // 폼 데이터 수집 - ADD NULL CHECKS HERE
          const businessNameEl = document.getElementById('businessName');
          const businessTypeEl = document.getElementById('businessType');
          const locationEl = document.getElementById('location');
          const monthlyRevenueEl = document.getElementById('monthlyRevenue');
          const monthlyRentEl = document.getElementById('monthlyRent');
          const employeeCountEl = document.getElementById('employeeCount');
          const businessAgeEl = document.getElementById('businessAge');
          const seasonalImpactEl = document.getElementById('seasonalImpact');

          const formData = {
              businessName: businessNameEl ? businessNameEl.value : '',
              businessType: businessTypeEl ? businessTypeEl.value : '',
              location: locationEl ? locationEl.value : '',
              monthlyRevenue: monthlyRevenueEl ? parseInt(monthlyRevenueEl.value) * 10000 : 0,
              monthlyRent: monthlyRentEl ? parseInt(monthlyRentEl.value) * 10000 : 0,
              employeeCount: employeeCountEl ? parseInt(employeeCountEl.value) : 0,
              businessAge: businessAgeEl ? parseInt(businessAgeEl.value) : 0,
              seasonalImpact: seasonalImpactEl ? seasonalImpactEl.value : ''
          };

          // AI 분석 실행 (시뮬레이션)
          analyzeBusiness(formData);
      });
    }

    // 네비게이션 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            } else {
                // Fallback for when target is not found
                window.location.hash = this.getAttribute('href') || '';
            }
        });
    });

    // 페이지 로드 시 애니메이션
    const hero = document.querySelector('.hero');
    if(hero) {
      hero.style.opacity = '0';
      hero.style.transform = 'translateY(20px)';
      hero.style.transition = 'opacity 0.8s, transform 0.8s';

      setTimeout(() => {
          hero.style.opacity = '1';
          hero.style.transform = 'translateY(0)';
      }, 100);
    }
  }, []);

  return (
    <>
      <div className="container">
          {/* 히어로 섹션 */}
          <section className="hero" id="home">
              <div className="container">
                  <h1>AI로 예측하는 사업 생존율</h1>
                  <p>데이터 기반 분석으로 소상공인의 위험요소를 사전에 감지하고<br/>맞춤형 생존 전략을 제공합니다</p>
                  <a href="#analysis" className="cta-button">🔍 무료 분석 시작하기</a>
              </div>
          </section>

          {/* 메인 콘텐츠 */}
          <main className="main-content">
              <div className="container">
                  {/* 분석 섹션 */}
                  <section className="section" id="analysis">
                      <h2 className="section-title">📊 사업체 생존율 분석</h2>

                      <form className="analysis-form" id="businessForm">
                          <div className="form-grid">
                              <div className="form-group">
                                  <label htmlFor="businessName">사업체명</label>
                                  <input type="text" id="businessName" placeholder="예: 홍대 맛집" required />
                              </div>

                              <div className="form-group">
                                  <label htmlFor="businessType">업종</label>
                                  <select id="businessType" required>
                                      <option value="">선택하세요</option>
                                      <option value="음식점">음식점</option>
                                      <option value="카페">카페</option>
                                      <option value="소매업">소매업</option>
                                      <option value="서비스업">서비스업</option>
                                      <option value="기타">기타</option>
                                  </select>
                              </div>

                              <div className="form-group">
                                  <label htmlFor="location">지역</label>
                                  <select id="location" required>
                                      <option value="">선택하세요</option>
                                      <option value="강남구">강남구</option>
                                      <option value="마포구">마포구</option>
                                      <option value="송파구">송파구</option>
                                      <option value="영등포구">영등포구</option>
                                      <option value="기타">기타</option>
                                  </select>
                              </div>

                              <div className="form-group">
                                  <label htmlFor="monthlyRevenue">월 매출 (만원)</label>
                                  <input type="number" id="monthlyRevenue" placeholder="500" required />
                              </div>

                              <div className="form-group">
                                  <label htmlFor="monthlyRent">월 임대료 (만원)</label>
                                  <input type="number" id="monthlyRent" placeholder="100" required />
                              </div>

                              <div className="form-group">
                                  <label htmlFor="employeeCount">직원 수 (명)</label>
                                  <input type="number" id="employeeCount" placeholder="3" required />
                              </div>

                              <div className="form-group">
                                  <label htmlFor="businessAge">사업 연수 (년)</label>
                                  <input type="number" id="businessAge" placeholder="2" required />
                              </div>

                              <div className="form-group">
                                  <label htmlFor="seasonalImpact">계절성 영향도</label>
                                  <select id="seasonalImpact">
                                      <option value="low">낮음</option>
                                      <option value="medium">보통</option>
                                      <option value="high">높음</option>
                                  </select>
                              </div>
                          </div>

                          <button type="submit" className="analyze-btn">🔍 AI 생존율 분석하기</button>
                      </form>

                      {/* 결과 표시 */}
                      <div className="result-section" id="resultSection">
                          <div className="risk-display" id="riskDisplay">
                              <div className="risk-score" id="riskScore">85%</div>
                              <div className="risk-level" id="riskLevel">생존 확률</div>
                          </div>

                          <div className="recommendations">
                              <h3>💡 맞춤형 생존 전략</h3>
                              <ul className="rec-list" id="recommendationsList">
                                  {/* 추천사항이 여기에 동적으로 추가됩니다 */}
                              </ul>
                          </div>
                      </div>
                  </section>

                  {/* 대시보드 섹션 */}
                  <section className="section" id="dashboard">
                      <h2 className="section-title">📈 실시간 분석 현황</h2>

                      <div className="dashboard">
                          <div className="stat-card">
                              <div className="stat-number high" id="highRiskCount">12</div>
                              <div className="stat-label">고위험 사업체</div>
                          </div>

                          <div className="stat-card">
                              <div className="stat-number medium" id="mediumRiskCount">35</div>
                              <div className="stat-label">중위험 사업체</div>
                          </div>

                          <div className="stat-card">
                              <div className="stat-number low" id="lowRiskCount">128</div>
                              <div className="stat-label">저위험 사업체</div>
                          </div>

                          <div className="stat-card">
                              <div className="stat-number" style={{color: '#667eea'}} id="totalAnalysis">175</div>
                              <div className="stat-label">총 분석 건수</div>
                          </div>
                      </div>
                  </section>
              </div>
          </main>
      </div>
    </>
  );
}