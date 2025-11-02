import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type');
    
    if (!contentType?.includes('application/csp-report') && !contentType?.includes('application/json')) {
      return new Response('Invalid content type', { status: 400 });
    }

    const report = await request.json();
    const violation = report['csp-report'] || report;
    
    const logData = {
      timestamp: new Date().toISOString(),
      documentUri: violation['document-uri'] || violation.documentURL,
      violatedDirective: violation['violated-directive'] || violation.violatedDirective,
      blockedUri: violation['blocked-uri'] || violation.blockedURL,
      originalPolicy: violation['original-policy'] || violation.originalPolicy,
      sourceFile: violation['source-file'] || violation.sourceFile,
      lineNumber: violation['line-number'] || violation.lineNumber,
      columnNumber: violation['column-number'] || violation.columnNumber,
      statusCode: violation['status-code'] || violation.statusCode,
    };

    if (import.meta.env.DEV) {
      console.warn('🚨 CSP Violation Report:', JSON.stringify(logData, null, 2));
    } else {
      console.error('CSP Violation:', logData);
      
      // TODO: Integrar con servicio de logging externo
      // Ejemplos:
      // - await sendToSentry(logData);
      // - await sendToDatadog(logData);
      // - await saveToDatabase(logData);
    }

    return new Response(null, { status: 204 });
    
  } catch (error) {
    console.error('Error processing CSP report:', error);
    
    return new Response(null, { status: 204 });
  }
};

export const GET: APIRoute = () => {
  return new Response('Method not allowed', { status: 405 });
};

export const PUT: APIRoute = () => {
  return new Response('Method not allowed', { status: 405 });
};

export const DELETE: APIRoute = () => {
  return new Response('Method not allowed', { status: 405 });
};
