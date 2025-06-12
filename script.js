function getCombinations(arr, size) {
  const result = [];
  const combine = (start, prefix) => {
    if (prefix.length === size) {
      result.push(prefix);
      return;
    }
    for (let i = start; i < arr.length; i++) {
      combine(i + 1, [...prefix, arr[i]]);
    }
  };
  combine(0, []);
  return result.map(c => c.join(''));
}

function getWin2WithDouble(digits) {
  const result = new Set();
  for (let i = 0; i < digits.length; i++) {
    for (let j = 0; j < digits.length; j++) {
      const sorted = [digits[i], digits[j]].sort().join('');
      result.add(sorted);
    }
  }
  return [...result].sort();
}

function getWin3WithDouble(digits) {
  const result = new Set();
  for (let i = 0; i < digits.length; i++) {
    for (let j = 0; j < digits.length; j++) {
      for (let k = 0; k < digits.length; k++) {
        const combo = [digits[i], digits[j], digits[k]].sort().join('');
        result.add(combo);
      }
    }
  }
  return [...result].sort();
}

function isDoubleNumber(str) {
  return [...str].every(ch => ch === str[0]);
}

function renderSet(title, list) {
  const doubles = list.filter(n => isDoubleNumber(n));
  const normals = list.filter(n => !isDoubleNumber(n));
  const finalList = [...normals, ...doubles];

  return `
    <div class="flex flex-col items-center space-y-2 mb-2">
      <div class="flex items-center justify-center gap-2">
        <h3 class="text-lg font-semibold">${title} <span class="text-sm text-gray-400">(${finalList.length} ชุด)</span></h3>
        <button onclick="copyToClipboard(\`${finalList.join(' ')}\`, this)" class="copy-btn">คัดลอก</button>
      </div>
      <div class="flex flex-wrap gap-2 text-sm justify-center">
        ${finalList.map(n => `<span>${n}</span>`).join(' ')}
      </div>
    </div>`;
}

function calculateWin() {
  const input = document.getElementById("numbersInput").value.replace(/\D/g, '');
  const digits = input.split('');
  const result = document.getElementById("result");

  if (digits.length > 7) {
    result.innerHTML = `<p class="text-red-500 text-center">🚫 ไม่เกิน 7 ตัวเลข</p>`;
    return;
  }

  const duplicates = digits.filter((val, idx, arr) => arr.indexOf(val) !== idx && arr.lastIndexOf(val) === idx);
  if (duplicates.length > 0) {
    result.innerHTML = `<p class="text-red-500 text-center">🚫 มีเลขซ้ำ: ${duplicates.join(', ')}</p>`;
    return;
  }

  const uniqueDigits = [...new Set(digits)];
  if (uniqueDigits.length < 2) {
    result.innerHTML = '';
    return;
  }

  const win2 = getCombinations(uniqueDigits, 2);
  const win3 = getCombinations(uniqueDigits, 3);
  const win2All = getWin2WithDouble(uniqueDigits);
  const win3All = getWin3WithDouble(uniqueDigits);

  result.innerHTML = `
    ${renderSet("เลขวิน 2 ตัว", win2)}
    ${renderSet("เลขวิน 3 ตัว", win3)}
    ${renderSet("เลขวิน 2 ตัว รวมเลขเบิ้ล", win2All)}
    ${renderSet("เลขวิน 3 ตัว รวมเลขเบิ้ล", win3All)}
  `;
}

function resetInput() {
  document.getElementById("numbersInput").value = "";
  document.getElementById("result").innerHTML = "";
}

function copyToClipboard(text, buttonElement) {
  navigator.clipboard.writeText(text).then(() => {
    const original = buttonElement.innerText;
    buttonElement.innerText = "คัดลอกสำเร็จ";
    buttonElement.disabled = true;
    buttonElement.classList.add("animate-pulse");
    setTimeout(() => {
      buttonElement.innerText = original;
      buttonElement.disabled = false;
      buttonElement.classList.remove("animate-pulse");
    }, 1500);
  });
}

function toggleDarkMode() {
  const html = document.documentElement;
  html.classList.toggle('dark');
  localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
}

if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}
