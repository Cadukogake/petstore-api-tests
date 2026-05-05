const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');
async function generateReport(results) {
  const { mdToPdf } = await import('md-to-pdf');
  const timestamp = dayjs().format('YYYY-MM-DD_HH-mm-ss');
  const reportsDir = path.resolve('cypress/reports');
  const mdPath = path.join(reportsDir, `report-${timestamp}.md`);
  const pdfPath = path.join(reportsDir, `report-${timestamp}.pdf`);

  fs.mkdirSync(reportsDir, { recursive: true });

  const status = results.totalFailed > 0 ? 'FALHOU' : 'PASSOU';
  const durationSec = (results.totalDuration / 1000).toFixed(2);

  let md = `# Relatório de Execução — Cypress Petstore API\n\n`;
  md += `**Data/hora:** ${timestamp.replace('_', ' ').replace(/-/g, ':').replace(/^(\d{4}):(\d{2}):(\d{2})/, '$1-$2-$3')}\n`;
  md += `**Duração total:** ${durationSec}s\n`;
  md += `**Status geral:** ${status}\n\n`;
  md += `---\n\n`;
  md += `## Resumo\n\n`;
  md += `| Métrica          | Valor |\n`;
  md += `|------------------|-------|\n`;
  md += `| Total de testes  | ${results.totalTests} |\n`;
  md += `| Passaram         | ${results.totalPassed} |\n`;
  md += `| Falharam         | ${results.totalFailed} |\n`;
  md += `| Pendentes        | ${results.totalPending} |\n`;
  md += `| Ignorados        | ${results.totalSkipped} |\n`;
  md += `| Suites           | ${results.totalSuites} |\n`;
  md += `\n---\n\n`;
  md += `## Resultado por Suite\n\n`;

  for (const run of results.runs || []) {
    const specStatus = run.stats.failures > 0 ? 'FALHOU' : 'PASSOU';
    const specDuration = (run.stats.duration / 1000).toFixed(2);

    md += `### ${run.spec.name}\n\n`;
    md += `- **Status:** ${specStatus}\n`;
    md += `- **Duração:** ${specDuration}s\n`;
    md += `- **Passaram:** ${run.stats.passes} | **Falharam:** ${run.stats.failures}\n\n`;
    md += `#### Testes\n\n`;
    md += `| Teste | Status | Duração |\n`;
    md += `|-------|--------|---------|\n`;

    for (const test of run.tests || []) {
      const title = Array.isArray(test.title) ? test.title.join(' > ') : test.title;
      md += `| ${title} | ${test.state} | ${test.duration}ms |\n`;
    }

    md += `\n`;
  }

  fs.writeFileSync(mdPath, md, 'utf8');
  await mdToPdf({ path: mdPath }, { dest: pdfPath });

  console.log(`\n[report_generator] Relatório MD : ${mdPath}`);
  console.log(`[report_generator] Relatório PDF: ${pdfPath}\n`);
}

module.exports = { generateReport };
