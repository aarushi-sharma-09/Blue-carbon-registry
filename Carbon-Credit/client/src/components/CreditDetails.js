import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCreditDetailsAPI } from '../api/api.js';
import { ethers } from 'ethers';
import { FaEthereum } from "react-icons/fa6";
import { CC_Context } from '../context/SmartContractConnector.js';
import {
  FileText,
  DollarSign,
  User,
  Shield,
  Clock,
  Check,
  X,
  Link,
  CreditCard,
  Activity,
  Cloud
} from 'lucide-react';

const CreditDetails = () => {
  const { creditId } = useParams();
  const navigate = useNavigate();
  const { getCreditDetails } = useContext(CC_Context);
  const [credit, setCredit] = useState(null);
  const [dbCredit, setDbCredit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchCreditDetails = async () => {
      if (parseInt(creditId) < 0) {
        setError('Invalid credit ID.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        // Fetch from smart contract
        let contractData = null;
        try {
          contractData = await getCreditDetails(creditId);
        } catch (contractErr) {
          console.error('Smart contract error:', contractErr);
          setError('Failed to load blockchain data.');
        }

        const response = await getCreditDetailsAPI(creditId);

        setCredit(contractData);
        setDbCredit(response.data);
      } catch (err) {
        setError('Failed to load credit details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCreditDetails();
  }, [creditId, navigate, getCreditDetails]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 rounded-full border-t-2 border-b-2 border-emerald-500 animate-spin"></div>
    </div>
  );

  if (error) return (
    <div className="container p-4 mx-auto text-center">
      <div className="inline-block p-6 bg-red-50 rounded-lg border border-red-200">
        <X className="mx-auto mb-4 w-12 h-12 text-red-500" />
        <p className="text-lg text-red-700">{error}</p>
      </div>
    </div>
  );

  if (!credit && !dbCredit) return (
    <div className="container p-4 mx-auto text-center">
      <div className="inline-block p-6 bg-gray-50 rounded-lg border border-gray-200">
        <FileText className="mx-auto mb-4 w-12 h-12 text-gray-400" />
        <p className="text-lg text-gray-700">No credit found.</p>
      </div>
    </div>
  );

  return (
    <div className="container p-6 mx-auto max-w-6xl">
      <div className="flex items-center mb-6">
        <CreditCard className="mr-3 w-8 h-8 text-emerald-500" />
        <h1 className="text-3xl font-bold text-gray-800">Credit Details <span className="text-emerald-500">#{creditId}</span></h1>
      </div>

      <div className="p-6 mb-8 bg-white rounded-lg border-l-4 border-emerald-500 shadow-lg">
        <div className="flex items-center mb-6">
          <FileText className="mr-2 w-6 h-6 text-emerald-500" />
          <h2 className="text-xl font-semibold text-gray-800">Carbon Credit Information</h2>
        </div>

        <div className="grid grid-cols-1 gap-y-6 gap-x-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Name */}
          {dbCredit && (
            <div className="flex items-start">
              <div className="p-2 mr-3 bg-emerald-50 rounded-full">
                <FileText className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{dbCredit.name}</p>
              </div>
            </div>
          )}

          {/* Tons of Carbon */}
          <div className="flex items-start">
            <div className="p-2 mr-3 bg-emerald-50 rounded-full">
              <Cloud className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Tons of Carbon</p>
              <p className="font-medium">{dbCredit?.amount || ethers.formatEther(credit?.amount || '0')}</p>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-start">
            <div className="p-2 mr-3 bg-emerald-50 rounded-full">
              <FaEthereum className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p className="font-medium">
                {dbCredit?.price ? `${dbCredit.price} ETH` : credit ? `${ethers.formatEther(credit.price)} ETH` : 'N/A'}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-start">
            <div className="p-2 mr-3 bg-emerald-50 rounded-full">
              <Activity className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Status</p>
              <div className="flex items-center">
                <span className={`inline-block w-2 h-2 rounded-full mr-2 ${(dbCredit?.is_active || credit?.forSale) ? 'bg-green-500' : 'bg-gray-400'
                  }`}></span>
                <p className="font-medium">
                  {(dbCredit?.is_active || credit?.forSale) ? 'For Sale' : 'Not For Sale'}
                </p>
              </div>
            </div>
          </div>

          {/* Expiration */}
          <div className="flex items-start">
            <div className="p-2 mr-3 bg-emerald-50 rounded-full">
              <Clock className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Expiration</p>
              <div className="flex items-center">
                {(dbCredit?.is_expired || credit?.expired) ? (
                  <X className="mr-1 w-5 h-5 text-red-500" />
                ) : (
                  <Check className="mr-1 w-5 h-5 text-green-500" />
                )}
                <p className="font-medium">
                  {(dbCredit?.is_expired || credit?.expired) ? 'Expired' : 'Active'}
                </p>
              </div>
            </div>
          </div>

          {/* Creator ID */}
          {dbCredit?.creator_id && (
            <div className="flex items-start">
              <div className="p-2 mr-3 bg-emerald-50 rounded-full">
                <User className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Creator</p>
                <p className="font-medium">{dbCredit.creator_name}</p>
              </div>
            </div>
          )}


          {/* Auditors */}
          <div className="flex items-start">
            <div className="p-2 mr-3 bg-emerald-50 rounded-full">
              <Shield className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Auditors</p>
              <p className="font-medium">
                {dbCredit?.auditors?.length > 0
                  ? dbCredit.auditors.map(auditor => auditor.username).join(', ')
                  : credit ? credit.numOfAuditors.toString() : 'None'}
              </p>
            </div>
          </div>

          {/* Request Status */}
          <div className="flex items-start">
            <div className="p-2 mr-3 bg-emerald-50 rounded-full">
              <Activity className="w-5 h-5 text-emerald-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Request Status</p>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${(dbCredit?.req_status === 3) ? 'bg-green-100 text-green-800' :
                (dbCredit?.req_status === 2 || credit?.requestStatus === '3') ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                {dbCredit?.req_status || credit?.requestStatus || 'Unknown'}
              </span>
            </div>
          </div>

          {/* Owner */}
          {credit?.owner && (
            <div className="flex items-start">
              <div className="p-2 mr-3 bg-emerald-50 rounded-full">
                <User className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Owner add</p>
                <p className="max-w-xs text-xs font-medium md:text-sm truncate">
                  <a href={`https://sepolia.etherscan.io/address/${credit.owner}`} target='_blank' rel="noreferrer" >
                    {credit.owner}</a>
                </p>
              </div>
            </div>
          )}

          {/* Creator */}
          {credit?.creator && (
            <div className="flex items-start">
              <div className="p-2 mr-3 bg-emerald-50 rounded-full">
                <User className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Creator add</p>
                <p className="max-w-xs text-xs font-medium md:text-sm truncate">
                  <a href={`https://sepolia.etherscan.io/address/${credit.creator}`} target='_blank' rel="noreferrer">
                    {credit.creator}
                  </a>
                </p>
              </div>
            </div>
          )}

          {/* Audit Fees */}
          {credit?.auditFees && (
            <div className="flex items-start">
              <div className="p-2 mr-3 bg-emerald-50 rounded-full">
                <DollarSign className="w-5 h-5 text-emerald-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Audit Fees</p>
                <p className="font-medium">{ethers.formatEther(credit.auditFees)} ETH</p>
              </div>
            </div>
          )}
          {/* Document URL */}
          {dbCredit?.docu_url ? (
            <div className="flex items-start">
              <div className="p-2 mr-3 bg-emerald-50 rounded-full">
                <Link className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Document URL</p>
                <a
                  href={dbCredit.docu_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block font-medium text-emerald-500 hover:text-emerald-600 truncate"
                >
                  link
                </a>
              </div>
            </div>
          ) : (
            <div className="flex col-span-1 items-start md:col-span-2 lg:col-span-3">
              <div className="p-2 mr-3 bg-emerald-50 rounded-full">
                <Link className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">Document URL</p>
                <p className="font-medium">Not available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
};

export default CreditDetails;
