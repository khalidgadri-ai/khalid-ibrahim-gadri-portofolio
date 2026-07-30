document.addEventListener('DOMContentLoaded', () => {
  const sessionData = {
    selectedPath: 'personal',
    selectedCategory: 'الخوف من الفشل',
    customText1: '',
    customText2: '',
    customText3: '',
    techHours: 40,
    appliedCoupon: '',
    discountPercent: 0,
    clientName: '',
    clientPhone: ''
  };

  let currentStep = 0;
  const totalSteps = 3;

  const pathConfigs = {
    personal: {
      name: 'التطوير والتحرر الشخصي والجلسات الفردية',
      step1Title: 'تحديد الشعور والموقف المتسبب به',
      step1Label: 'اختر نوع الشعور الأساسي لتحديد اتجاه التقييم:',
      step1Tags: ['الخوف من الفشل 😔', 'القلق والتوتر 😰', 'الخوف من المستقبل 🔮', 'الغضب والإنزعاج 😡', 'شعور بالعجز أو الثقل 🪨', 'الخوف من الحكم والحرج 👥'],
      step1CustomLabel: 'صف بصراحة ومصداقية: ما الموقف، الذكرى، أو الفكرة التي تسببت بهذا الشعور؟ *',
      step2Title: 'التأثير الجسدي والقناعات الخفية',
      step2Label1: 'أين تلاحظ التوتر في جسدك وما التغيرات التي مداهمتك؟ *',
      step2Label2: 'مما يحاول هذا الخوف حمايتك في اعتقادك، وما الاحتياج الأصيل الذي تفترق إليه؟ *',
      step3Title: 'التنفس والتحرر وصياغة الهدف المنشود',
      step3Label1: 'اكتب توكيد التحرر والقناعة التمكينية الجديدة التي تختارها الآن: *'
    },
    career: {
      name: 'التطوير والتوجيه المهني والوظيفي',
      step1Title: 'تحديد التحدي أو الهدف المهني الحالي',
      step1Label: 'اختر محور التطوير المهني المطلوب:',
      step1Tags: ['التموضع والترقية الوظيفية 📈', 'القيادة وإدارة الفرق 👥', 'تغيير المسار المهني 🔄', 'التعامل مع ضغوط العمل 💼', 'تطوير الأداء وزيادة الدخل 💰'],
      step1CustomLabel: 'صف بصراحة وضعك الوظيفي الحالي والهدف الذي تسعى للوصول إليه: *',
      step2Title: 'عقبات النمو والمهارات المطلوبة',
      step2Label1: 'ما أبرز العوائق أو المهارات المفقودة التي تعطل قفزتك المهنية القادمة؟ *',
      step2Label2: 'ما التكلفة الناتجة عن البقاء في الوضع الحالي دون تطوير للمسار؟ *',
      step3Title: 'الخطة الاستراتيجية والنتائج المنشودة',
      step3Label1: 'ما المسمى الوظيفي أو الدخل أو النتيجة التي تطمح لتحقيقها خلال 6 أشهر؟ *'
    },
    business: {
      name: 'تطوير وتحليل التجارة والأعمال القائمة',
      step1Title: 'فحص ميكانيكية وتحديات مشروعك التجاري',
      step1Label: 'اختر التحدي الأول في مشروعك:',
      step1Tags: ['الهدر المالي وعشوائية التشغيل 💸', 'ضعف المبيعات والتموضع 📉', 'الرسائل التسويقية وجذب العملاء 🎯', 'إدارة الفريق والعمليات 👥', 'التوسع ودخول أسواق جديدة 🚀'],
      step1CustomLabel: 'صف طبيعة نشاطك التجاري الحالي والتحدي الأكبر في التشغيل والمبيعات: *',
      step2Title: 'التحليل المالي والتشغيلي',
      step2Label1: 'أين تلاحظ التسرب المالي أو الضغط التشغيلي الأكثر إرهاقاً لمشروعك؟ *',
      step2Label2: 'ما الأثر التراكمي على الأرباح والاستمرارية في حال عدم الحل الفوري؟ *',
      step3Title: 'هندسة النمو والحلول الاستراتيجية',
      step3Label1: 'ما رقم المبيعات أو النتيجة التشغيلية التي تسعى لتحقيقها في مشروعك؟ *'
    },
    startup: {
      name: 'التفكير في تأسيس مشروع تجاري جديد',
      step1Title: 'فحص فكرة المشروع والمجال الاستثماري',
      step1Label: 'حدد مجال مشروعك المستقبلي:',
      step1Tags: ['تجارة إلكترونية وخدمات 🛒', 'مشروع خدمي / استشاري 💡', 'منتج خاص / تصنيع 📦', 'تطبيق أو منصة رقمية 🌐', 'فكرة في مرحلة الدراسة 🧠'],
      step1CustomLabel: 'صف فكرة المشروع، الفئة المستهدفة، والميزة التنافسية التي تخطط لها: *',
      step2Title: 'جاهزية التأسيس والميزانية',
      step2Label1: 'ما الميزانية التقديرية المرصودة وما رأس المال المتاح حالياً؟ *',
      step2Label2: 'ما أبرز مخاوفك أو التحديات التي تجعلك متردداً في انطلاقة المشروع؟ *',
      step3Title: 'خطة الانطلاق والجدول الزمني',
      step3Label1: 'متى تخطط لإطلاق مشروعك وما العائد المتوقع للشهور الأولى؟ *'
    },
    tech: {
      name: 'بناء نظام أتمتة أو تطبيق برمجي أو موقع إلكتروني',
      step1Title: 'تحديد نوع النظام أو الحل البرمجي',
      step1Label: 'اختر نوع الحل التقني المطلوب:',
      step1Tags: ['أتمتة عمليات وتقليل الجهد اليدوي ⚙️', 'تطبيق برمجي خاص / هاتف 📱', 'موقع إلكتروني / منصة متكاملة 🌐', 'ربط أنظمة وبوابات دفع 💳', 'نظام إدارة بيانات ومبيعات 📊'],
      step1CustomLabel: 'صف بالتفصيل طبيعة العمليات التي تريد أتمتتها أو فكرة التطبيق/الموقع: *',
      step2Title: 'حجم العمليات والشتات اليدوي الحالي',
      step2Label1: 'كم عدد الساعات الأسبوعية التي تضيع حالياً في العمليات اليدوية التكرارية؟ *',
      step2Label2: 'ما المخاطر أو تكلفة الأخطاء البشرية الحالية على بياناتك وعملك؟ *',
      step3Title: 'المواصفات التقنية وتقدير الساعات',
      step3Label1: 'ما الميزات الجوهرية والأنظمة الخارجية المطلوبة ربطها مع مشروعك؟ *'
    }
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

  const pathCards = document.querySelectorAll('.path-card');
  pathCards.forEach(card => {
    card.addEventListener('click', () => {
      pathCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      sessionData.selectedPath = card.dataset.path;
    });
  });

  const startPathAssessmentBtn = document.getElementById('startPathAssessmentBtn');
  if (startPathAssessmentBtn) {
    startPathAssessmentBtn.addEventListener('click', () => {
      applyPathConfiguration(sessionData.selectedPath);
      goToStep(1);
    });
  }

  function applyPathConfiguration(pathKey) {
    const config = pathConfigs[pathKey] || pathConfigs.personal;

    document.getElementById('step1Title').textContent = config.step1Title;
    document.getElementById('step1OptionsLabel').textContent = config.step1Label;
    document.getElementById('step1CustomLabel').innerHTML = `${config.step1CustomLabel} <span class="required-star">*</span>`;

    const tagsContainer = document.getElementById('step1Tags');
    tagsContainer.innerHTML = '';
    config.step1Tags.forEach((tagText, idx) => {
      const btn = document.createElement('button');
      btn.className = `tag-btn ${idx === 0 ? 'selected' : ''}`;
      btn.dataset.value = tagText.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();
      btn.textContent = tagText;
      btn.addEventListener('click', () => {
        tagsContainer.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        sessionData.selectedCategory = btn.dataset.value;
      });
      tagsContainer.appendChild(btn);
    });
    sessionData.selectedCategory = config.step1Tags[0].replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '').trim();

    document.getElementById('step2Title').textContent = config.step2Title;
    document.getElementById('step2Label1').innerHTML = `${config.step2Label1} <span class="required-star">*</span>`;
    document.getElementById('step2Label2').innerHTML = `${config.step2Label2} <span class="required-star">*</span>`;

    document.getElementById('step3Title').textContent = config.step3Title;
    document.getElementById('step3Label1').innerHTML = `${config.step3Label1} <span class="required-star">*</span>`;

    const techGroup = document.getElementById('techDetailsGroup');
    if (pathKey === 'tech') {
      if (techGroup) techGroup.style.display = 'block';
    } else {
      if (techGroup) techGroup.style.display = 'none';
    }
  }

  const techScopeRange = document.getElementById('techScopeRange');
  const techScopeVal = document.getElementById('techScopeVal');
  if (techScopeRange) {
    techScopeRange.addEventListener('input', (e) => {
      const val = e.target.value;
      sessionData.techHours = parseInt(val);
      if (techScopeVal) techScopeVal.textContent = `${val} ساعة`;
    });
  }

  const progressBar = document.getElementById('progressBar');
  const stepCounterText = document.getElementById('stepCounterText');
  const stepCategoryText = document.getElementById('stepCategoryText');
  const cards = document.querySelectorAll('.step-card');
  const summaryView = document.getElementById('summaryView');

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
      const txt1 = document.getElementById('step1CustomText').value.trim();
      const err = document.getElementById('err_step1');
      if (!txt1) {
        if (err) err.classList.remove('hidden');
        return false;
      }
      if (err) err.classList.add('hidden');
    } else if (step === 2) {
      const txt1 = document.getElementById('step2Text1').value.trim();
      const txt2 = document.getElementById('step2Text2').value.trim();
      const err1 = document.getElementById('err_step2_1');
      const err2 = document.getElementById('err_step2_2');

      let valid = true;
      if (!txt1) { if (err1) err1.classList.remove('hidden'); valid = false; }
      else { if (err1) err1.classList.add('hidden'); }

      if (!txt2) { if (err2) err2.classList.remove('hidden'); valid = false; }
      else { if (err2) err2.classList.add('hidden'); }

      return valid;
    } else if (step === 3) {
      const txt1 = document.getElementById('step3Text1').value.trim();
      const err1 = document.getElementById('err_step3_1');
      if (!txt1) {
        if (err1) err1.classList.remove('hidden');
        return false;
      }
      if (err1) err1.classList.add('hidden');
    }
    return true;
  }

  function goToStep(stepNumber) {
    currentStep = stepNumber;

    const progressPercent = ((currentStep + 1) / 4) * 100;
    if (progressBar) progressBar.style.width = `${progressPercent}%`;
    if (stepCounterText) stepCounterText.textContent = `الخطوة ${currentStep} من 3`;
    
    const config = pathConfigs[sessionData.selectedPath] || pathConfigs.personal;
    if (stepCategoryText) {
      if (stepNumber === 0) stepCategoryText.textContent = 'اختيار مسار التقييم';
      else if (stepNumber === 1) stepCategoryText.textContent = config.step1Title;
      else if (stepNumber === 2) stepCategoryText.textContent = config.step2Title;
      else if (stepNumber === 3) stepCategoryText.textContent = config.step3Title;
    }

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
      sessionData.customText1 = document.getElementById('step1CustomText').value.trim();
    } else if (step === 2) {
      sessionData.customText2 = document.getElementById('step2Text1').value.trim();
      sessionData.customText3 = document.getElementById('step2Text2').value.trim();
    } else if (step === 3) {
      sessionData.customText3 = (sessionData.customText3 ? sessionData.customText3 + ' | النتيجة المنشودة: ' : '') + document.getElementById('step3Text1').value.trim();
      sessionData.clientName = document.getElementById('clientName').value.trim();
      sessionData.clientPhone = document.getElementById('clientPhone').value.trim();
    }
  }

  const generateSummaryBtn = document.getElementById('generateSummaryBtn');
  if (generateSummaryBtn) {
    generateSummaryBtn.addEventListener('click', () => {
      saveStepData(3);
      cards.forEach(c => c.classList.remove('active'));

      const pathConf = pathConfigs[sessionData.selectedPath] || pathConfigs.personal;

      document.getElementById('sumPathName').textContent = pathConf.name;
      document.getElementById('sumCategory').textContent = sessionData.selectedCategory || 'عام';
      document.getElementById('sumCustom1').textContent = sessionData.customText1 || '-';
      document.getElementById('sumCustom2').textContent = sessionData.customText2 || '-';
      document.getElementById('sumCustom3').textContent = sessionData.customText3 || '-';

      const now = new Date();
      document.getElementById('summaryDate').textContent = `تاريخ التقييم: ${now.toLocaleDateString('ar-SA')} - ${now.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}`;

      const outcomeBox = document.getElementById('diagnosticOutcomeBox');
      const diagBadge = document.getElementById('diagBadge');
      const diagTitle = document.getElementById('diagTitle');
      const diagDesc = document.getElementById('diagDescText') || document.getElementById('diagDescription');
      const diagIcon = document.getElementById('diagIcon');

      if (sessionData.selectedPath === 'tech') {
        if (outcomeBox) outcomeBox.className = 'diagnostic-result-box needs-coaching';
        if (diagBadge) diagBadge.textContent = '⚙️ النتيجة التقييمية: أتمتة وهندسة أنظمة برمجية';
        if (diagTitle) diagTitle.textContent = 'مشروعك بحاجة إلى نظام أتمتة وحل برمجي مستقل';
        if (diagIcon) diagIcon.textContent = '⚙️';
        if (diagDesc) {
          diagDesc.textContent = `أظهر تحليل متطلباتك التقنية لحجم العمل الأسبوعي (${sessionData.techHours} ساعة تقديرية) أن الأتمتة البرمجية ستوفر عليك مئات الساعات والتكاليف التشغيلية. تم إعداد تقدير التكلفة وتطبيق الخصم الخاص أدناه.`;
        }

        document.getElementById('techEstimateCard').style.display = 'block';
        document.getElementById('coachingOffersGrid').style.display = 'none';

        calculateTechPrices(0);
      } else {
        if (outcomeBox) outcomeBox.className = 'diagnostic-result-box needs-coaching';
        if (diagBadge) diagBadge.textContent = '🎯 النتيجة التقييمية: توجيه واستشارة مخصصة';
        if (diagTitle) diagTitle.textContent = `يوصى بحجز جلسات توجيه مخصصة لمسار: ${pathConf.name}`;
        if (diagIcon) diagIcon.textContent = '💡';
        if (diagDesc) {
          diagDesc.textContent = `أظهر تحليل إجاباتك وجود عوائق وقناعات تتطلب تفكيكاً ومواكبة مخصصة مع الكوتش خالد ابراهيم قادري لمساعدتك على التحول السريع واستغلال الخصم الفوري لتأكيد جلساتك.`;
        }

        document.getElementById('techEstimateCard').style.display = 'none';
        document.getElementById('coachingOffersGrid').style.display = 'grid';

        calculateCoachingPrices(0);
      }

      updateWhatsappLinks();
      saveAnalyticsData(sessionData);

      summaryView.classList.remove('hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const applyCouponBtn = document.getElementById('applyCouponBtn');
  if (applyCouponBtn) {
    applyCouponBtn.addEventListener('click', () => {
      const code = document.getElementById('couponCodeInput').value.trim().toUpperCase();
      const msgBox = document.getElementById('couponMsg');

      let discount = 0;

      if (code === 'KHALID40') {
        discount = 40;
        msgBox.style.color = '#25D366';
        msgBox.textContent = '🎉 تم تطبيق خصم 40% بنجاح على الجلسات والخدمات!';
      } else if (code === 'KHALID50') {
        discount = 50;
        msgBox.style.color = '#25D366';
        msgBox.textContent = '🎉 تم تطبيق خصم 50% بنجاح على الباقات الكاملة!';
      } else if (code === 'SYSTEM30') {
        discount = 30;
        msgBox.style.color = '#25D366';
        msgBox.textContent = '🎉 تم تطبيق خصم 30% على بناء الأنظمة والأتمتة البرمجية!';
      } else if (code === '') {
        discount = 0;
        msgBox.style.color = '#FFFFFF';
        msgBox.textContent = 'تم إرجاع الأسعار إلى وضعها الأساسي.';
      } else {
        msgBox.style.color = '#E07A5F';
        msgBox.textContent = '❌ كود الخصم غير صحيح. جرب (KHALID40 أو KHALID50)';
        return;
      }

      sessionData.appliedCoupon = code;
      sessionData.discountPercent = discount;

      if (sessionData.selectedPath === 'tech') {
        calculateTechPrices(discount);
      } else {
        calculateCoachingPrices(discount);
      }

      updateWhatsappLinks();
    });
  }

  function calculateCoachingPrices(discountPercent) {
    const baseSingleUsd = 106.95;
    const baseBundleUsd = 320.85;

    const singleUsdElem = document.getElementById('priceSingleUsd');
    const bundleUsdElem = document.getElementById('priceBundleUsd');

    if (discountPercent > 0) {
      const newSingleUsd = (baseSingleUsd * (1 - discountPercent / 100)).toFixed(2);
      const newSingleSar = Math.round(350 * (1 - discountPercent / 100));

      const newBundleUsd = (baseBundleUsd * (1 - discountPercent / 100)).toFixed(2);
      const newBundleSar = Math.round(1050 * (1 - discountPercent / 100));

      if (singleUsdElem) singleUsdElem.textContent = `$${newSingleUsd} (${newSingleSar} ر.س)`;
      if (bundleUsdElem) bundleUsdElem.textContent = `$${newBundleUsd} (${newBundleSar} ر.س)`;
    } else {
      if (singleUsdElem) singleUsdElem.textContent = `$64.17 (210 ر.س - بعد خصم 40%)`;
      if (bundleUsdElem) bundleUsdElem.textContent = `$160.42 (525 ر.س - بعد خصم 50%)`;
    }
  }

  function calculateTechPrices(discountPercent) {
    const hours = sessionData.techHours || 40;
    const ratePerHour = 40;
    const rawTotalUsd = hours * ratePerHour;

    const actualDiscount = discountPercent > 0 ? discountPercent : 40;
    const finalUsd = Math.round(rawTotalUsd * (1 - actualDiscount / 100));

    document.getElementById('estHours').textContent = hours;
    document.getElementById('rawTechPrice').textContent = `$${rawTotalUsd}`;
    document.getElementById('discountTechVal').textContent = `خصم ${actualDiscount}%`;
    document.getElementById('finalTechPrice').textContent = `$${finalUsd} (${Math.round(finalUsd * 3.75)} ر.س تقريباً)`;
  }

  function updateWhatsappLinks() {
    const whatsappSingleSessionLink = document.getElementById('whatsappSingleSessionLink');
    const whatsappBundleLink = document.getElementById('whatsappBundleLink');
    const clientNameStr = sessionData.clientName ? `أنا ${sessionData.clientName}` : 'أنا أحد زوار المنصة';

    const pathConf = pathConfigs[sessionData.selectedPath] || pathConfigs.personal;
    const codeStr = sessionData.appliedCoupon ? ` (كود الخصم المطبق: ${sessionData.appliedCoupon})` : '';

    const basePayload = `• المسار المختار: ${pathConf.name}\n` +
      `• التصنيف: ${sessionData.selectedCategory}\n` +
      `• التوصيف والتعبير الحر: ${sessionData.customText1}\n` +
      `• العوائق الحالية: ${sessionData.customText2}\n` +
      `• النتيجة المنشودة: ${sessionData.customText3}` +
      (sessionData.selectedPath === 'tech' ? `\n• الساعات التقنية التقديرية: ${sessionData.techHours} ساعة` : '');

    if (whatsappSingleSessionLink) {
      const msgSingle = `مرحباً كوتش خالد ابراهيم قادري،\n${clientNameStr}، أكملت تقييم منصة الاستشارات وأود حجز جلسة استشارية فردية / تحليل شخصية بالخصم المستحق${codeStr}.\n\nبيانات تقريري:\n${basePayload}`;
      whatsappSingleSessionLink.href = `https://wa.me/966591533385?text=${encodeURIComponent(msgSingle)}`;
    }

    if (whatsappBundleLink) {
      const msgBundle = `مرحباً كوتش خالد ابراهيم قادري،\n${clientNameStr}، أكملت التقييم وأود الاستفادة من الخصم لحجز الباقة المتكاملة أو طلب عرض سعر بناء نظام أتمتة${codeStr}.\n\nبيانات تقريري:\n${basePayload}`;
      whatsappBundleLink.href = `https://wa.me/966591533385?text=${encodeURIComponent(msgBundle)}`;
    }
  }

  function saveAnalyticsData(data) {
    try {
      const existing = JSON.parse(localStorage.getItem('khalid_coaching_analytics') || '[]');
      existing.push({
        timestamp: new Date().toISOString(),
        path: data.selectedPath,
        category: data.selectedCategory,
        custom1: data.customText1,
        custom2: data.customText2,
        custom3: data.customText3,
        techHours: data.techHours,
        coupon: data.appliedCoupon,
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
      const clientNameStr = sessionData.clientName || 'المستفيد';
      const pathConf = pathConfigs[sessionData.selectedPath] || pathConfigs.personal;

      const reportText = `=== تقرير نتيجة التقييم والتوجيه الاستراتيجي ===\nأكاديمية الكوتش خالد ابراهيم قادري\nالتاريخ: ${new Date().toLocaleDateString('ar-SA')}\n\n` +
        `اسم المستفيد: ${clientNameStr}\n` +
        `المسار المختار: ${pathConf.name}\n` +
        `التصنيف: ${sessionData.selectedCategory}\n` +
        `التفاصيل والتعبير الحر: ${sessionData.customText1 || '-'}\n` +
        `العقبات والتكلفة الحالية: ${sessionData.customText2 || '-'}\n` +
        `النتيجة والهدف المنشود: ${sessionData.customText3 || '-'}\n` +
        (sessionData.selectedPath === 'tech' ? `الساعات التقديرية للأتمتة: ${sessionData.techHours} ساعة\n` : '') +
        `كود الخصم المستخدم: ${sessionData.appliedCoupon || 'تلقائي'}\n\n` +
        `للتواصل المباشر وحجز الجلسات بالخصم:\n` +
        `واتساب: https://wa.me/966591533385\n` +
        `تليجرام: https://t.me/khalidigadri\n` +
        `الموقع الرسمي: https://khalidibrahimgadri.com`;

      const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `تقرير_التقييم_الاستراتيجي_${clientNameStr}.txt`;
      link.click();
    });
  }

  const restartBtn = document.getElementById('restartBtn');
  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      document.querySelectorAll('input[type="text"], textarea').forEach(i => i.value = '');
      goToStep(0);
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
