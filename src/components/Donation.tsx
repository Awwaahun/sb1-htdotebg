import { useState, useEffect } from 'react';
import { Gift, Copy, Check, CreditCard, Wallet, QrCode } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Donation() {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [selectedQR, setSelectedQR] = useState<string | null>(null);
  const [qrCodes, setQrCodes] = useState<Record<string, string>>({});

  const accounts = [
    {
      id: 'bank1',
      type: 'Bank Account',
      bank: 'Bank Central',
      accountNumber: '1234567890',
      accountName: 'Sarah Johnson',
      icon: CreditCard,
    },
    {
      id: 'bank2',
      type: 'Bank Account',
      bank: 'National Bank',
      accountNumber: '0987654321',
      accountName: 'James Anderson',
      icon: CreditCard,
    },
    {
      id: 'ewallet1',
      type: 'E-Wallet',
      bank: 'PayNow',
      accountNumber: '+1-555-0123',
      accountName: 'Sarah Johnson',
      icon: Wallet,
    },
    {
      id: 'ewallet2',
      type: 'E-Wallet',
      bank: 'PayNow',
      accountNumber: '+1-555-0124',
      accountName: 'James Anderson',
      icon: Wallet,
    },
  ];

  useEffect(() => {
    const generateQRCodes = async () => {
      const codes: Record<string, string> = {};
      for (const account of accounts) {
        const qrData = `${account.bank}|${account.accountName}|${account.accountNumber}`;
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`;
        codes[account.id] = qrUrl;
      }
      setQrCodes(codes);
    };
    generateQRCodes();
  }, []);

  const copyToClipboard = (text: string, accountId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(accountId);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-rose-100 to-orange-100 p-6 rounded-full animate-pulse-glow">
              <Gift className="text-rose-600" size={48} />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">Wedding Gift</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your presence at our wedding is the greatest gift of all. However, if you wish to honor us with a gift,
            we would graciously accept a contribution towards our future together.
          </p>
        </div>

        <div
          ref={elementRef}
          className={`max-w-4xl mx-auto grid md:grid-cols-2 gap-6 animate-on-scroll ${isVisible ? 'visible' : ''}`}
        >
          {accounts.map((account, index) => (
            <div
              key={account.id}
              className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-100 rounded-xl p-6 hover:shadow-xl hover:scale-105 transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="bg-rose-100 p-3 rounded-full mr-4">
                  <account.icon className="text-rose-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{account.type}</p>
                  <p className="font-semibold text-gray-800">{account.bank}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Account Name</p>
                  <p className="font-medium text-gray-800">{account.accountName}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-500 mb-1">Account Number</p>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <p className="font-mono font-semibold text-gray-800">{account.accountNumber}</p>
                    <button
                      onClick={() => copyToClipboard(account.accountNumber, account.id)}
                      className="ml-2 p-2 hover:bg-rose-100 rounded-lg transition-colors group"
                      title="Copy to clipboard"
                    >
                      {copiedAccount === account.id ? (
                        <Check className="text-green-600" size={20} />
                      ) : (
                        <Copy className="text-gray-600 group-hover:text-rose-600 transition-colors" size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedQR(account.id)}
                  className="w-full mt-4 flex items-center justify-center space-x-2 bg-rose-500 hover:bg-rose-600 text-white py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <QrCode size={20} />
                  <span>Show QR Code</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-block bg-rose-50 rounded-lg p-6 max-w-2xl">
            <p className="text-gray-700 leading-relaxed">
              <span className="font-semibold text-rose-600">Note:</span> Your generous gift will help us start our
              new chapter together. Thank you for being part of our special day and for your love and support.
            </p>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {selectedQR && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setSelectedQR(null)}
        >
          <div
            className="bg-white rounded-2xl p-8 max-w-md w-full animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-serif text-gray-800">Scan QR Code</h3>
              <button
                onClick={() => setSelectedQR(null)}
                className="text-gray-500 hover:text-rose-600 transition-colors"
              >
                <Check size={24} />
              </button>
            </div>

            {qrCodes[selectedQR] && (
              <div className="text-center">
                <div className="bg-white p-4 rounded-lg border-4 border-rose-100 inline-block mb-4">
                  <img
                    src={qrCodes[selectedQR]}
                    alt="QR Code"
                    className="w-64 h-64"
                  />
                </div>
                <div className="mt-4">
                  {accounts.map((account) => {
                    if (account.id === selectedQR) {
                      return (
                        <div key={account.id} className="text-left bg-gray-50 rounded-lg p-4">
                          <p className="text-sm text-gray-500">{account.bank}</p>
                          <p className="font-semibold text-gray-800">{account.accountName}</p>
                          <p className="font-mono text-gray-700">{account.accountNumber}</p>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Scan this QR code with your banking app to send a gift
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
