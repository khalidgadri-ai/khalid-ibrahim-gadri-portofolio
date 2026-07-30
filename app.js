document.addEventListener('DOMContentLoaded', () => {
  const sessionData = {
    selectedEmotion: '',
    customEmotion: '',
    initialIntensity: 7,
    somaticLocation: '',
    somaticDesc: '',
    protectionMsg: '',
    truthMsg: '',
    allowValue: '',
    releaseValue: '',
    affirmation: 'أنا أسمح لهذا الخوف بالرحيل، وأختار طاقة السكينة والأمان.',
    finalIntensity: 3,
    clientName: '',
    clientPhone: ''
  };

  let currentStep = 1;
  const totalSteps = 5;

  const stepCategoryTitles = {
    1: 'تحديد الشعور والخوف',
    2: 'التجسيد في الجسد',
    3: 'الوعي بالرسالة والاحتياج',
    4: 'التنفس والتحرر',
    5: 'النتيجة والتوجيه'
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
      sessionData.initialIntensity = val;
      if (compInitial) compInitial.textContent = `${val}/10`;
    });
  }

  if (finalIntensityInput) {
    finalIntensityInput.addEventListener('input', (e) => {
      const val = e.target.value;
      finalIntensityVal.textContent = val;
      sessionData.finalIntensity = val;
      if (compFinal) compFinal.textContent = `${val}/10`;
    });
  }

  document.querySelectorAll('.next-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const nextStep = parseInt(btn.dataset.next);
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
      sessionData.initialIntensity = intensityInput.value;
    } else if (step === 2) {
      sessionData.somaticDesc = document.getElementById('step2_somatic').value.trim();
    } else if (step === 3) {
      sessionData.protectionMsg = document.getElementById('step3_protection').value.trim();
      sessionData.truthMsg = document.getElementById('step3_truth').value.trim();
    } else if (step === 4) {
      const allowRadio = document.querySelector('input[name="allow"]:checked');
      if (allowRadio) sessionData.allowValue = allowRadio.value;

      const releaseRadio = document.querySelector('input[name="release"]:checked');
      if (releaseRadio) sessionData.releaseValue = releaseRadio.value;

      sessionData.affirmation = document.getElementById('step4_release_statement').value.trim();
    } else if (step === 5) {
      sessionData.finalIntensity = finalIntensityInput.value;
      sessionData.clientName = document.getElementById('clientName').value.trim();
      sessionData.clientPhone = document.getElementById('clientPhone').value.trim();
    }
  }

  const generateSummaryBtn = document.getElementById('generateSummaryBtn');
  if (generateSummaryBtn) {
    generateSummaryBtn.addEventListener('click', () => {
      saveStepData(5);
      cards.forEach(c => c.classList.remove('active'));

      const emotionText = sessionData.customEmotion || sessionData.selectedEmotion || 'غير محدد';
      document.getElementById('sumEmotion').textContent = emotionText;
      document.getElementById('sumInitialIntensity').textContent = sessionData.initialIntensity;

      const bodyText = sessionData.somaticLocation || 'غير محدد';
      document.getElementById('sumBodyLocation').textContent = bodyText;
      document.getElementById('sumSomaticDesc').textContent = sessionData.somaticDesc || 'لا يوجد تفاصيل إضافية';

      document.getElementById('sumProtection').textContent = sessionData.protectionMsg || 'لا يوجد';
      document.getElementById('sumTruth').textContent = sessionData.truthMsg || 'لا يوجد';

      document.getElementById('sumAffirmation').textContent = sessionData.affirmation || '-';
      document.getElementById('sumFinalIntensity').textContent = sessionData.finalIntensity;

      const now = new Date();
      document.getElementById('summaryDate').textContent = `تاريخ الجلسة: ${now.toLocaleDateString('ar-SA')} - ${now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}`;

      const directWhatsappLink = document.getElementById('directWhatsappLink');
      if (directWhatsappLink) {
        const clientNameStr = sessionData.clientName ? `أنا ${sessionData.clientName}` : 'أنا أحد زوار المنصة';
        const rawMsg = `مرحباً كوتش خالد ابراهيم قادري،\n${clientNameStr}، أكملت جلسة التحرر الذاتية عبر المنصة:\n\n• الشعور المستهدف: ${emotionText}\n• الشدة الأولية: ${sessionData.initialIntensity}/10\n• الشدة الحالية: ${sessionData.finalIntensity}/10\n• توكيد التحرر: ${sessionData.affirmation}\n\nأود حجز جلسة كوتشينج خاصة معك لتعميق هذه النتائج.`;
        const encodedMsg = encodeURIComponent(rawMsg);
        directWhatsappLink.href = `https://wa.me/966591533385?text=${encodedMsg}`;
      }

      summaryView.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
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
      const emotionText = sessionData.customEmotion || sessionData.selectedEmotion || 'غير محدد';
      const clientNameStr = sessionData.clientName || 'العميل';
      const reportText = `=== تقرير جلسة التحرر الذاتية ===\nأكاديمية الكوتش خالد ابراهيم قادري\nالتاريخ: ${new Date().toLocaleDateString('ar-SA')}\n\n` +
        `اسم العميل: ${clientNameStr}\n` +
        `الشعور المستهدف: ${emotionText}\n` +
        `شدة الشعور الأولي: ${sessionData.initialIntensity}/10\n` +
        `شدة الشعور النهائية: ${sessionData.finalIntensity}/10\n` +
        `مكان الإحساس في الجسد: ${sessionData.somaticLocation || '-'}\n` +
        `رسالة حماية الشعور: ${sessionData.protectionMsg || '-'}\n` +
        `توكيد التحرر: ${sessionData.affirmation}\n\n` +
        `للتواصل وحجز الجلسات:\n` +
        `واتساب: https://wa.me/966591533385\n` +
        `تليجرام: https://t.me/khalidigadri\n` +
        `الموقع: https://khalidibrahimgadri.com`;

      const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `تقرير_جلسة_التحرر_${clientNameStr}.txt`;
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
          if (id === 'saveBeliefBtn') btn.textContent = 'حفظ المعتقد الجديد 🌟';
          if (id === 'saveWheelBtn') btn.textContent = 'حفظ تقييم العجلة 🎡';
          if (id === 'saveMovieBtn') btn.textContent = 'حفظ السيناريو 🎬';
          if (id === 'saveFocusBtn') btn.textContent = 'تفعيل درع التركيز 🎯';
        }, 3000);
      });
    }
  });
});