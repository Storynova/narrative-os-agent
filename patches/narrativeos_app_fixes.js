/*
 * NarrativeOS - app.js bug fix (Phase 1)
 * ----------------------------------------
 * BUG: "Generating insights..." hangs forever in several sections.
 * Console: TypeError: Cannot read properties of undefined (reading 'split')
 *   - generateProductAnalysis  (crash on  data.keyFeatures.split('\n'))
 *   - generatePositioning      (crash on  data.competitors.split('\n'))
 *
 * ROOT CAUSE: these generators are called with validation.sanitized as their
 * "data" argument, but the sanitizer's whitelist does NOT include the
 * multiline fields keyFeatures and competitors. So data.keyFeatures /
 * data.competitors are undefined, and calling .split() on undefined throws.
 * (The Battle Card generator works because its field, strengths, IS in the
 * whitelist.)
 *
 * TWO-PART FIX below: (A) make the sanitizer include the missing fields, and
 * (B) make every .split() call null-safe so a missing field can never crash
 * the UI again.
 */

/* ---------- FIX A: helper - always split safely ---------- */
function toLines(value) {
  return String(value == null ? '' : value)
    .split('\n')
    .map(function (s) { return s.trim(); })
    .filter(Boolean);
}

/* ---------- FIX B: add the missing fields to the sanitizer whitelist ----------
 * Wherever the sanitizer builds "sanitized", ensure these keys are copied:
 *   keyFeatures, competitors
 * Example (adapt to your existing sanitize function):
 */
function sanitizeFormData(data) {
  var allow = [
    'productName', 'category', 'description', 'targetAudience',
    'keyFeatures',            // <-- was missing (Product Understanding)
    'posProduct', 'posCategory', 'unique',
    'competitors',            // <-- was missing (Positioning Engine)
    'strengths', 'weaknesses', 'objections', 'persona'
  ];
  var out = {};
  allow.forEach(function (k) {
    out[k] = typeof data[k] === 'string' ? data[k].trim() : (data[k] || '');
  });
  return out;
}

/* ---------- Corrected generators (drop-in replacements) ---------- */

function generateProductAnalysis(data) {
  var features = toLines(data.keyFeatures);          // was: data.keyFeatures.split('\n')
  var audience = data.targetAudience || '';
  var featureBenefit = features.map(function (f) {
    return { feature: f, benefit: 'Delivers ' + f + ' with less manual effort', outcome: 'Faster, more consistent storytelling' };
  });
  return {
    valueMap: features,
    jobsToBeDone: audience,
    featureBenefitOutcome: featureBenefit,
    coreStory: (data.description || '').slice(0, 400)
  };
}

function generatePositioning(data) {
  var competitors = toLines(data.competitors);       // was: data.competitors.split('\n')
  return {
    positioningStatement: 'For ' + (data.persona || 'buyers') + ', ' + (data.posProduct || 'the product') +
      ' is the ' + (data.posCategory || 'category') + ' that ' + (data.unique || 'is differentiated') + '.',
    valueProposition: data.unique || '',
    competitiveMatrix: competitors.map(function (c) {
      return { competitor: c, weWin: 'Consistency + evidence-gated claims' };
    })
  };
}

/*
 * NOTE: also audit generateStoryArchitecture, generateHooks, and
 * generateLaunchPlan for the same pattern (X.split(...) on an un-whitelisted
 * field) and wrap them with toLines() the same way.
 */

