import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { TrendingUp, Users, Target } from 'lucide-react';

const StatsCard = ({ title, value, subtitle, icon: Icon, trend, color = "blue" }) => {
  const colorClasses = {
    blue: "from-blue-600 to-blue-700",
    green: "from-green-600 to-green-700", 
    orange: "from-orange-600 to-orange-700",
    purple: "from-purple-600 to-purple-700"
  };

  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-gray-50">
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${colorClasses[color]} opacity-10 rounded-full transform translate-x-8 -translate-y-8`}></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className={`h-5 w-5 bg-gradient-to-br ${colorClasses[color]} text-transparent bg-clip-text`} />
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        {subtitle && (
          <p className="text-xs text-gray-500 flex items-center gap-1">
            {trend && <TrendingUp className="h-3 w-3 text-green-500" />}
            {subtitle}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;