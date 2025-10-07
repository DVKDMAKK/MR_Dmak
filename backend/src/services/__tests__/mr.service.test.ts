import { MRService } from '../mr.service';
import MedicalRepresentative from '../../models/MedicalRepresentative';
import Group from '../../models/Group';
import { ConsentService } from '../consent.service';
import { IConsent } from '../../models/consent.model';
import mongoose from 'mongoose';

// Mock the models and services
jest.mock('../../models/MedicalRepresentative');
jest.mock('../../models/Group');
jest.mock('../consent.service');

describe('MRService', () => {
  let mrService: MRService;
  let consentService: jest.Mocked<ConsentService>;
  const userId = new mongoose.Types.ObjectId().toHexString();

  beforeEach(() => {
    consentService = new ConsentService() as jest.Mocked<ConsentService>;
    mrService = new MRService(consentService);
    jest.clearAllMocks();
  });

  describe('getMRs', () => {
    it('should return MRs with consent status and handle N+1 query problem', async () => {
      // Arrange
      const mockMRs = [
        { _id: '1', phone: '+1234567890', toObject: () => ({ _id: '1', phone: '+1234567890' }) },
        { _id: '2', phone: '+0987654321', toObject: () => ({ _id: '2', phone: '+0987654321' }) },
      ];
      const mockConsentStatus: { phone: string; consent: Partial<IConsent> }[] = [
        { phone: '+1234567890', consent: { consented: true } },
        { phone: '+0987654321', consent: { consented: false, opt_out: { status: true, reason: 'test' } } },
      ];

      (MedicalRepresentative.find as jest.Mock).mockReturnValue({
        populate: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        skip: jest.fn().mockResolvedValue(mockMRs),
      });
      (MedicalRepresentative.countDocuments as jest.Mock).mockResolvedValue(mockMRs.length);
      consentService.getConsentStatus.mockImplementation(async (phone) => {
        const status = mockConsentStatus.find(cs => cs.phone === phone);
        return { success: true, consent: status?.consent as IConsent, message: '', phone: phone, phone_e164: phone };
      });

      // Act
      const result = await mrService.getMRs(userId, undefined, '', 10, 0);

      // Assert
      expect(MedicalRepresentative.find).toHaveBeenCalledTimes(1);
      expect(consentService.getConsentStatus).toHaveBeenCalledTimes(mockMRs.length);
      expect(result.mrs).toHaveLength(mockMRs.length);
      expect(result.mrs[0].consentStatus).toBe('approved');
      expect(result.mrs[1].consentStatus).toBe('rejected');
    });
  });

  describe('getGroups', () => {
    it('should return groups with MR counts and handle N+1 query problem', async () => {
      // Arrange
      const mockGroups = [
        { _id: 'group1', name: 'Group 1', mrCount: 5 },
        { _id: 'group2', name: 'Group 2', mrCount: 10 },
      ];

      (Group.aggregate as jest.Mock).mockResolvedValue(mockGroups);

      // Act
      const result = await mrService.getGroups(userId);

      // Assert
      expect(Group.aggregate).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockGroups);
    });
  });
});