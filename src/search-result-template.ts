import { titleCase } from './utils';

export interface SearchResult {
  dataType: string; 
  data: unknown; 
  title: string; 
  description: string;
}
export function searchResultsTemplate(results: SearchResult[]){
  return results.map((result) => `
    <div class="card--small" data-${result.dataType}="${result.data}">
        <div class="result-title">${titleCase(result.title)}</div>
        <div class="result-tag">${result.description}</div>
    </div>`
  ).join('');
}