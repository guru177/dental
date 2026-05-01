$logPath = "C:\Users\ASUS\.gemini\antigravity\brain\831f2359-0299-4f7b-94e5-28b947f96f62\.system_generated\logs\overview.txt"
$targetPath = "c:\Users\ASUS\Documents\dentalmanagement\src\pages\Patients.jsx"
$line = Get-Content $logPath -TotalCount 140 | Select-Object -Last 1
$json = $line | ConvertFrom-Json
$code = $json.tool_calls[0].args.CodeContent
Set-Content -Path $targetPath -Value $code
