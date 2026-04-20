import * as l from 'lucide-react';
const needed = ['Zap','Menu','X','MapPin','ChevronRight','Flame','Crosshair','ArrowUpRight','Download','RefreshCw','Sparkles'];
needed.forEach(n => {
  console.log(n, n in l ? 'YES' : 'NO');
});
