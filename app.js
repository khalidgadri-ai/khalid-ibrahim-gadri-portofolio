document.addEventListener('DOMContentLoaded', () => {
  const sessionData = {
    selectedEmotion: 'الخوف من الفشل',
    customEmotion: '',
    initialIntensity: 7,
    somaticLocation: 'انقباض في الصدر',
    somaticDesc: '',
    protectionMsg: '',
    truthMsg: '',
    affirmation: 'أنا أسمح لهذا الخوف بالرحيل، وأختار طاقة السكينة والأمان.',
    finalIntensity: 3,
    clientName: '',
    clientPhone: ''
  };

  let currentStep = 1;
  const totalSteps = 5;

  const stepCategoryTitles = {
    1: 'تحديد الشعور والموقف',
    2: 'التجسيد والوصف الجسدي',
    3: 'القناعة والاحتياج الأصيل',
    4: 'التنفس والتحرر',
    5: 'إعادة التقييم والتوجيه'
  };

  const navTabs = document.querySelectorAll('.nav-tab');
  const toolSections = document.querySelectorAll('.tool-section');

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      navTabs.forEach(t => t.classList.remove('active'));
      toolSections.forEach(s => s.classList.remove('active'));

      tab.classList.add('active');
      const toolId = `tool-${tab.dataset.tool}`;
      const activeSection = document.getElementById(toolId);
      if (activeSection) activeSection.classList.add('active');
    });
  });

  const wheelRanges = document.querySelectorAll('.wheel-range');
  wheelRanges.forEach(range => {
    range.addEventListener('input', (e) => {
      const targetId = range.dataset.target;
      const targetSpan = document.getElementById(targetId);
      if (targetSpan) targetSpan.textContent = e.target.value;
    });
  });

  const progressBar = document.getElementById('progressBar');
  const stepCounterText = document.getElementById('stepCounterText');
  const stepCategoryText = document.getElementById('stepCategoryText');
  const cards = document.querySelectorAll('.step-card');
  const summaryView = document.getElementById('summaryView');

  const intensityInput = document.getElementById('step1_intensity');
  const intensityVal = document.getElementById('intensityVal');
  const finalIntensityInput = document.getElementById('step5_final_intensity');
  const finalIntensityVal = document.getElementById('finalIntensityVal');
  const compInitial = document.getElementById('compInitial');
  const compFinal = document.getElementById('compFinal');

  setupTagGroup('emotionTags', (val) => { sessionData.selectedEmotion = val; });
  setupTagGroup('bodyTags', (val) => { sessionData.somaticLocation = val; });

  function setupTagGroup(containerId, callback) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const buttons = container.querySelectorAll('.tag-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        callback(btn.dataset.value);
      });
    });
  }

  if (intensityInput) {
    intensityInput.addEventListener('input', (e) => {
      const val = e.target.value;
      intensityVal.textContent = val;
      sessionData.initialIntensity = parseInt(val);
      if (compInitial) compInitial.textContent = `${val}/10`;
    });
  }

  if (finalIntensityInput) {
    finalIntensityInput.addEventListener('input', (e) => {
      const val = e.target.value;
      finalIntensityVal.textContent = val;
      sessionData.finalIntensity = parseInt(val);
      if (compFinal) compFinal.textContent = `${val}/10`;
    });
  }

  document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextStep = parseInt(btn.dataset.next);

      if (!validateStepInput(currentStep)) {
        return;
      }

      saveStepData(currentStep);
      goToStep(nextStep);
    });
  });

  document.querySelectorAll('.prev-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const prevStep = parseInt(btn.dataset.prev);
      goToStep(prevStep);
    });
  });

  function validateStepInput(step) {
    if (step === 1) {
      const customVal = document.getElementById('step1_custom').value.trim();
      const err = document.getElementById('err_step1');
      if (!customVal) {
        if (err) err.classList.remove('hidden');
        return false;
      }
      if (err) err.classList.add('hidden');
    } else if (step === 2) {
      const somaticVal = document.getElementById('step2_somatic').value.trim();
      const err = document.getElementById('err_step2');
      if (!somaticVal) {
        if (err) err.classList.remove('hidden');
        return false;
      }
      if (err) err.classList.add('hidden');
    } else if (step === 3) {
      const protVal = document.getElementById('step3_protection').value.trim();
      const truthVal = document.getElementById('step3_truth').value.trim();
      const errP = document.getElementById('err_step3_p');
      const errT = document.getElementById('err_step3_t');

      let valid = true;
      if (!protVal) { if (errP) errP.classList.remove('hidden'); valid = false; }
      else { if (errP) errP.classList.add('hidden'); }

      if (!truthVal) { if (errT) errT.classList.remove('hidden'); valid = false; }
      else { if (errT) errT.classList.add('hidden'); }

      return valid;
    } else if (step === 4) {
      const affVal = document.getElementById('step4_release_statement').value.trim();
      const err = document.getElementById('err_step4');
      if (!affVal) {
        if (err) err.classList.remove('hidden');
        return false;
      }
      if (err) err.classList.add('hidden');
    }
    return true;
  }

  function goToStep(stepNumber) {
    currentStep = stepNumber;

    const progressPercent = (currentStep / totalSteps) * 100;
    if (progressBar) progressBar.style.width = `${progressPercent}%`;
    if (stepCounterText) stepCounterText.textContent = `الخطوة ${currentStep} من ${totalSteps}`;
    if (stepCategoryText) stepCategoryText.textContent = stepCategoryTitles[currentStep] || '';

    cards.forEach(card => {
      if (parseInt(card.dataset.step) === stepNumber) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });

    if (summaryView) summaryView.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function saveStepData(step) {
    if (step === 1) {
      sessionData.customEmotion = document.getElementById('step1_custom').value.trim();
      sessionData.initialIntensity = parseInt(intensityInput.value);
    } else if (step === 2) {
      sessionData.somaticDesc = document.getElementById('step2_somatic').value.trim();
    } else if (step === 3) {
      sessionData.protectionMsg = document.getElementById('step3_protection').value.trim();
      sessionData.truthMsg = document.getElementById('step3_truth').value.trim();
    } else if (step === 4) {
      sessionData.affirmation = document.getElementById('step4_release_statement').value.trim();
    } else if (step === 5) {
      sessionData.finalIntensity = parseInt(finalIntensityInput.value);
      sessionData.clientName = document.getElementById('clientName').value.trim();
      sessionData.clientPhone = document.getElementById('clientPhone').value.trim();
    }
  }

  function calculateCoachingNeed() {
    const initVal = parseInt(sessionData.initialIntensity) || 7;
    const finalVal = parseInt(sessionData.finalIntensity) || 3;
    const drop = initVal - finalVal;

    const needsCoaching = (initVal >= 7 || finalVal >= 5 || drop <= 2);

    return {
      needsCoaching,
      initVal,
      finalVal,
      drop
    };
  }

  const generateSummaryBtn = document.getElementById('generateSummaryBtn');
  if (generateSummaryBtn) {
    generateSummaryBtn.addEventListener('click', () => {
      saveStepData(5);
      cards.forEach(c => c.classList.remove('active'));

      const emotionText = sessionData.selectedEmotion || 'غير محدد';
      const customEventText = sessionData.customEmotion || 'لم يتم ذكر التفاصيل';

      document.getElementById('sumEmotion').textContent = emotionText;
      document.getElementById('sumCustomEvent').textContent = customEventText;
      document.getElementById('sumInitialIntensity').textContent = sessionData.initialIntensity;

      const bodyText = sessionData.somaticLocation || 'غير محدد';
      document.getElementById('sumBodyLocation').textContent = bodyText;
      document.getElementById('sumSomaticDesc').textContent = sessionData.somaticDesc || 'لا يوجد تفاصيل إضافية';

      document.getElementById('sumProtection').textContent = sessionData.protectionMsg || 'لا يوجد';
      document.getElementById('sumTruth').textContent = sessionData.truthMsg || 'لا يوجد';
      document.getElementById('sumAffirmation').textContent = sessionData.affirmation || '-';
      document.getElementById('sumFinalIntensity').textContent = sessionData.finalIntensity;

      const now = new Date();
      document.getElementById('summaryDate').textContent = `تاريخ التقييم: ${now.toLocaleDateString('ar-SA')} - ${now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}`;

      const diag = calculateCoachingNeed();
      const outcomeBox = document.getElementById('diagnosticOutcomeBox');
      const diagBadge = document.getElementById('diagBadge');
      const diagTitle = document.getElementById('diagTitle');
      const diagDesc = document.getElementById('diagDescText') || document.getElementById('diagDescription');
      const diagIcon = document.getElementById('diagIcon');

      if (diag.needsCoaching) {
        if (outcomeBox) outcomeBox.className = 'diagnostic-result-box needs-coaching';
        if (diagBadge) diagBadge.textContent = '🎯 نتيجة التقييم: يوصى بشدة بجلسة كوتشينج';
        if (diagTitle) diagTitle.textContent = 'أنت بحاجة إلى جلسة كوتشينج مخصصة وتحليل الشخصية';
        if (diagIcon) diagIcon.textContent = '💡';
        if (diagDesc) {
          diagDesc.textContent = `أظهر تحليل إجاباتك الصريحة وتدرج الشدة (من ${diag.initVal}/10 إلى ${diag.finalVal}/10) وجود قناعات قديمة تتطلب تفكيكاً ومواكبة مخصصة. ننصحك بحجز جلسة كوتشينج وخدمة تحليل الشخصية بالأرقام الصينية بالخصم المستحق (40%) أو باقة 3 جلسات بالخصم (50%).`;
        }
      } else {
        if (outcomeBox) outcomeBox.className = 'diagnostic-result-box';
        if (diagBadge) diagBadge.textContent = '🌱 نتيجة التقييم: استجابة ممتازة ووعي عالٍ';
        if (diagTitle) diagTitle.textContent = 'حالتك مستقرة وتظهر وعياً عالياً بالتحرر';
        if (diagIcon) diagIcon.textContent = '✨';
        if (diagDesc) {
          diagDesc.textContent = `أظهر تحليل إجاباتك انخفاضاً طيباً في شدة الشعور (انخفاض قدره ${diag.drop} درجات). ننصحك بالاستمرار على توكيد التحرر، واستغلال الخصم الخاص للاستفادة من تحليل الشخصية بالنمط الصيني لتطوير مسارك.`;
        }
      }

      const whatsappSingleSessionLink = document.getElementById('whatsappSingleSessionLink');
      const whatsappBundleLink = document.getElementById('whatsappBundleLink');
      const clientNameStr = sessionData.clientName ? `أنا ${sessionData.clientName}` : 'أنا أحد زوار الاختبار';

      const basePayload = `• الشعور المستهدف: ${emotionText}\n` +
        `• الموقف/الذكرى: ${customEventText}\n` +
        `• التأثير الجسدي: ${sessionData.somaticLocation} (${sessionData.somaticDesc})\n` +
        `• قناعة الخوف: ${sessionData.protectionMsg}\n` +
        `• الاحتياج الاصيل: ${sessionData.truthMsg}\n` +
        `• الشدة: من ${sessionData.initialIntensity}/10 إلى ${sessionData.finalIntensity}/10\n` +
        `• توكيد التحرر: ${sessionData.affirmation}`;

      if (whatsappSingleSessionLink) {
        const msgSingle = `مرحباً كوتش خالد ابراهيم قادري،\n${clientNameStr}، أكملت اختبار التحرر والكوتشينج وأود الاستفادة من (عرض خصم 40%) لحجز جلسة كوتشينج فردية + خدمة تحليل الشخصية بالأرقام الصينية.\n\nبيانات تقريري:\n${basePayload}`;
        whatsappSingleSessionLink.href = `https://wa.me/966591533385?text=${encodeURIComponent(msgSingle)}`;
      }

      if (whatsappBundleLink) {
        const msgBundle = `مرحباً كوتش خالد ابراهيم قادري،\n${clientNameStr}، أكملت اختبار التحرر والكوتشينج وأود الاستفادة من (عرض خصم 50%) لحجز باقة 3 جلسات كوتشينج متكاملة.\n\nبيانات تقريري:\n${basePayload}`;
        whatsappBundleLink.href = `https://wa.me/966591533385?text=${encodeURIComponent(msgBundle)}`;
      }

      saveAnalyticsData(sessionData, diag);

      summaryView.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  function saveAnalyticsData(data, diagResult) {
    try {
      const existing = JSON.parse(localStorage.getItem('khalid_coaching_analytics') || '[]');
      existing.push({
        timestamp: new Date().toISOString(),
        emotion: data.selectedEmotion,
        customEvent: data.customEmotion,
        somaticDesc: data.somaticDesc,
        protectionMsg: data.protectionMsg,
        truthMsg: data.truthMsg,
        initialIntensity: data.initialIntensity,
        finalIntensity: data.finalIntensity,
        needsCoaching: diagResult.needsCoaching,
        clientName: data.clientName
      });
      localStorage.setItem('khalid_coaching_analytics', JSON.stringify(existing));
    } catch (e) {
      console.log('Analytics storage:', e);
    }
  }

  const printSummaryBtn = document.getElementById('printSummaryBtn');
  if (printSummaryBtn) {
    printSummaryBtn.addEventListener('click', () => {
      window.print();
    });
  }

  const downloadTxtBtn = document.getElementById('downloadTxtBtn');
  if (downloadTxtBtn) {
    downloadTxtBtn.addEventListener('click', () => {
      const emotionText = sessionData.selectedEmotion || 'غير محدد';
      const clientNameStr = sessionData.clientName || 'المستفيد';
      const diag = calculateCoachingNeed();

      const reportText = `=== تقرير نتيجة اختبار الكوتشينج والتحرر ===\nأكاديمية الكوتش خالد ابراهيم قادري\nالتاريخ: ${new Date().toLocaleDateString('ar-SA')}\n\n` +
        `اسم المستفيد: ${clientNameStr}\n` +
        `نوع الشعور: ${emotionText}\n` +
        `الموقف/الذكرى (التعبير الحر): ${sessionData.customEmotion || '-'}\n` +
        `تدرج الشدة: من ${sessionData.initialIntensity}/10 إلى ${sessionData.finalIntensity}/10\n` +
        `التجسيد الجسدي: ${sessionData.somaticLocation} (${sessionData.somaticDesc || '-'})\n` +
        `قناعة وحماية الخوف: ${sessionData.protectionMsg || '-'}\n` +
        `الاحتياج الحقيقي: ${sessionData.truthMsg || '-'}\n` +
        `توكيد التحرر: ${sessionData.affirmation}\n\n` +
        `نتيجة التقييم: ${diag.needsCoaching ? 'يوصى بشدة بحجز جلسة كوتشينج مخصصة وتحليل شخصية' : 'حالة استقرار ووعي جيد'}\n\n` +
        `العروض المخصصة المستحقة:\n` +
        `- خصم 40% على جلسة الكوتشينج + خدمة تحليل الشخصية بالأرقام الصينية\n` +
        `- خصم 50% على باقة 3 جلسات كوتشينج\n\n` +
        `للتواصل المباشر وحجز الجلسات بالخصم:\n` +
        `واتساب: https://wa.me/966591533385\n` +
        `تليجرام: https://t.me/khalidigadri\n` +
        `الموقع الرسمي: https://khalidibrahimgadri.com`;

      const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `تقرير_اختبار_الكوتشينج_${clientNameStr}.txt`;
      link.click();
    });
  }

  const restartBtn = document.getElementById('restartBtn');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      document.querySelectorAll('input[type="text"], textarea').forEach(i => i.value = '');
      document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('selected'));
      if (intensityInput) { intensityInput.value = 7; intensityVal.textContent = '7'; }
      if (finalIntensityInput) { finalIntensityInput.value = 3; finalIntensityVal.textContent = '3'; }
      if (compInitial) compInitial.textContent = '7/10';
      if (compFinal) compFinal.textContent = '3/10';

      goToStep(1);
    });
  }

  const breathingModal = document.getElementById('breathingModal');
  const toggleBreathingBtn = document.getElementById('toggleBreathingBtn');
  const closeBreathingBtn = document.getElementById('closeBreathingBtn');
  const startBreathingBtn = document.getElementById('startBreathingBtn');
  const breathingCircle = document.getElementById('breathingCircle');
  const breathingText = document.getElementById('breathingText');
  let breathingInterval = null;

  if (toggleBreathingBtn) toggleBreathingBtn.addEventListener('click', () => breathingModal.classList.remove('hidden'));
  if (closeBreathingBtn) closeBreathingBtn.addEventListener('click', () => {
    breathingModal.classList.add('hidden');
    clearInterval(breathingInterval);
    breathingCircle.classList.remove('expand');
    breathingText.textContent = 'شهيق';
  });

  if (startBreathingBtn) {
    startBreathingBtn.addEventListener('click', () => {
      let state = 0;
      startBreathingBtn.disabled = true;
      startBreathingBtn.textContent = 'التمرين جاري... (دقيقة)';

      const runCycle = () => {
        if (state === 0) {
          breathingText.textContent = 'شهيق عميق...';
          breathingCircle.classList.add('expand');
          state = 1;
        } else if (state === 1) {
          breathingText.textContent = 'احبس النفس...';
          state = 2;
        } else {
          breathingText.textContent = 'زفير بطيء...';
          breathingCircle.classList.remove('expand');
          state = 0;
        }
      };

      runCycle();
      breathingInterval = setInterval(runCycle, 4000);

      setTimeout(() => {
        clearInterval(breathingInterval);
        breathingText.textContent = 'تم إكمال التمرين ✨';
        breathingCircle.classList.remove('expand');
        startBreathingBtn.disabled = false;
        startBreathingBtn.textContent = 'إعادة التمرين مرة أخرى';
      }, 60000);
    });
  }

  ['saveBeliefBtn', 'saveWheelBtn', 'saveMovieBtn', 'saveFocusBtn'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => {
        btn.textContent = '✅ تم الحفظ بنجاح!';
        setTimeout(() => {
          if (id === 'saveBeliefBtn') btn.textContent = 'حفظ القناعة الجديدة 🌟';
          if (id === 'saveWheelBtn') btn.textContent = 'حفظ تقييم العجلة 🎡';
          if (id === 'saveMovieBtn') btn.textContent = 'حفظ السيناريو 🎬';
          if (id === 'saveFocusBtn') btn.textContent = 'تفعيل درع التركيز 🎯';
        }, 3000);
      });
    }
  });
});
