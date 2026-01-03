"use client";

import * as React from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  ArrowRight, Save, Trash2, Globe, Mail, 
  Palette, Code, AlertTriangle
} from "lucide-react";
import { Button, Input, Modal, GradientText } from "../../../../../components/ui/index.ts";
import { PageHeader } from "../../../../../components/dashboard/index.ts";

/**
 * ProjectSettingsPage component for managing site-specific configurations.
 * Features sections for metadata, visual identity, and external tracking integrations.
 */
export default function ProjectSettingsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params?.id as string;

  const [isSaving, setIsSaving] = React.useState(false);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "صالون الجمال",
    subdomain: "beauty-salon",
    contactEmail: "info@salon.com",
    googleTagId: "",
    facebookPixelId: "",
    primaryColor: "#7C3AED",
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call for saving settings
    await new Promise((r) => setTimeout(r, 1000));
    setIsSaving(false);
    // In a real app, we would update the project state via a context or revalidation
  };

  const handleDelete = async () => {
    // Simulate deletion process
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    router.push("/dashboard/projects");
  };

  return (
    <div className="max-w-3xl mx-auto" dir="rtl">
      <PageHeader
        title="إعدادات المشروع"
        description="تخصيص إعدادات موقعك وهويته الرقمية"
      >
        <Link href={`/dashboard/projects/${projectId}/builder`}>
          <Button variant="ghost">
            <ArrowRight className="h-4 w-4 ml-2" />
            العودة للمحرر
          </Button>
        </Link>
      </PageHeader>

      <div className="space-y-8 pb-20">
        {/* Basic Info Section */}
        <section className="bg-white border-3 border-black shadow-brutal p-8 rounded-2xl">
          <h2 className="text-xl font-black mb-6 flex items-center gap-3">
            <div className="p-2 bg-brand-violet/10 rounded-lg">
              <Globe className="h-6 w-6 text-brand-violet" />
            </div>
            المعلومات الأساسية
          </h2>
          <div className="space-y-6">
            <Input
              label="اسم المشروع"
              placeholder="مثال: مطعمي الخاص"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <Input
              label="النطاق الفرعي (Subdomain)"
              value={formData.subdomain}
              onChange={(e) => setFormData({ ...formData, subdomain: e.target.value })}
              hint={`${formData.subdomain}.kwq8.com`}
              className="font-mono"
            />
            <Input
              label="البريد الإلكتروني للتواصل"
              type="email"
              placeholder="contact@example.com"
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              hint="سيتم إرسال رسائل نموذج التواصل في موقعك إلى هذا البريد"
              leftIcon={<Mail className="h-5 w-5" />}
            />
          </div>
        </section>

        {/* Branding Section */}
        <section className="bg-white border-3 border-black shadow-brutal p-8 rounded-2xl">
          <h2 className="text-xl font-black mb-6 flex items-center gap-3">
            <div className="p-2 bg-brand-pink/10 rounded-lg">
              <Palette className="h-6 w-6 text-brand-pink" />
            </div>
            الهوية البصرية
          </h2>
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-black text-content-primary">اللون الرئيسي للموقع</label>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="color"
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    className="w-16 h-16 border-3 border-black cursor-pointer rounded-xl overflow-hidden p-0"
                  />
                  <div className="absolute inset-0 pointer-events-none border-3 border-black rounded-xl" />
                </div>
                <div className="flex-1">
                  <Input
                    value={formData.primaryColor}
                    onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                    className="font-mono uppercase"
                  />
                </div>
              </div>
              <p className="text-xs text-content-muted font-bold">هذا اللون سيستخدم في الأزرار والروابط والعناصر الرئيسية في موقعك.</p>
            </div>
          </div>
        </section>

        {/* Analytics Section */}
        <section className="bg-white border-3 border-black shadow-brutal p-8 rounded-2xl">
          <h2 className="text-xl font-black mb-6 flex items-center gap-3">
            <div className="p-2 bg-brand-cyan/10 rounded-lg">
              <Code className="h-6 w-6 text-brand-cyan" />
            </div>
            التحليلات والتتبع
          </h2>
          <div className="space-y-6">
            <Input
              label="Google Tag Manager ID"
              placeholder="GTM-XXXXXXX"
              value={formData.googleTagId}
              onChange={(e) => setFormData({ ...formData, googleTagId: e.target.value })}
              hint="اختياري - أضف كود تتبع جوجل تحليل زيارات موقعك"
            />
            <Input
              label="Facebook Pixel ID"
              placeholder="123456789"
              value={formData.facebookPixelId}
              onChange={(e) => setFormData({ ...formData, facebookPixelId: e.target.value })}
              hint="اختياري - لتتبع التحويلات وتحسين إعلانات فيسبوك"
            />
          </div>
        </section>

        {/* Danger Zone */}
        <section className="bg-red-50 border-3 border-red-500 p-8 rounded-2xl">
          <h2 className="text-xl font-black mb-4 flex items-center gap-3 text-red-600">
            <AlertTriangle className="h-6 w-6" />
            منطقة الخطر
          </h2>
          <p className="text-content-secondary mb-6 font-bold">
            حذف المشروع نهائياً. بمجرد حذف المشروع، لن تتمكن من استعادته أو الوصول إلى بياناته مرة أخرى.
          </p>
          <Button
            variant="danger"
            onClick={() => setShowDeleteModal(true)}
            className="shadow-none border-red-600 hover:bg-red-600 hover:text-white"
          >
            <Trash2 className="h-5 w-5 ml-2" />
            حذف هذا المشروع نهائياً
          </Button>
        </section>

        {/* Bottom Actions */}
        <div className="flex justify-end pt-4">
          <Button 
            variant="gradient" 
            size="xl" 
            onClick={handleSave} 
            isLoading={isSaving}
            className="px-12 shadow-brutal-lg"
          >
            <Save className="h-6 w-6 ml-2" />
            حفظ جميع التغييرات
          </Button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="تأكيد الحذف النهائي"
        description="هذا الإجراء سيقوم بمسح كافة ملفات وإعدادات الموقع"
        size="md"
      >
        <div className="space-y-6">
          <div className="p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-700 text-sm font-bold">
            ⚠️ تحذير: سيتم حذف الموقع "{formData.name}" نهائياً من خوادمنا. لا يمكن التراجع عن هذا الإجراء.
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-end">
            <Button 
              variant="ghost" 
              onClick={() => setShowDeleteModal(false)}
              className="order-2 sm:order-1"
            >
              إلغاء التراجع
            </Button>
            <Button 
              variant="danger" 
              onClick={handleDelete}
              className="order-1 sm:order-2"
            >
              <Trash2 className="h-4 w-4 ml-2" />
              نعم، احذف المشروع
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
