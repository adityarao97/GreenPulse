import React from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import Card from '../../components/ui/Card';

const CompanyEmployees = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Users className="w-8 h-8 text-green-600" />
          <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
        </div>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Employee List</h2>
          <p className="text-gray-600">
            Manage your company's employees and their carbon reduction progress.
          </p>
          {/* Employee list will be implemented here */}
        </div>
      </Card>
    </motion.div>
  );
};

export default CompanyEmployees;