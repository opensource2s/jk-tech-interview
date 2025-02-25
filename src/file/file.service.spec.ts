import { Test, TestingModule } from '@nestjs/testing';
import { FileService } from './file.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UploadFile, UploadStatus } from './file.model';

describe('FileService', () => {
  let service: FileService;
  let repository: Repository<UploadFile>;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn().mockImplementation((data) => data),
      save: jest.fn().mockResolvedValue(undefined),
      findOne: jest.fn().mockResolvedValue(null),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileService,
        {
          provide: getRepositoryToken(UploadFile),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<FileService>(FileService);
    repository = module.get<Repository<UploadFile>>(getRepositoryToken(UploadFile));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upload a file successfully', async () => {
    const result = await service.uploadFile('test-file.txt');
    expect(result).toEqual({
      message: 'File uploaded successfully',
      status: UploadStatus.SUCCESS,
    });
    expect(repository.create).toHaveBeenCalledWith({
      filename: 'test-file.txt',
      uploadStatus: UploadStatus.SUCCESS,
    });
    expect(repository.save).toHaveBeenCalled();
  });

  it('should return FAILED if file is not found', async () => {
    const result = await service.getUploadStatus('non-existent-file.txt');
    expect(result).toEqual({
      filename: 'non-existent-file.txt',
      status: UploadStatus.FAILED,
    });
    expect(repository.findOne).toHaveBeenCalledWith({ where: { filename: 'non-existent-file.txt' } });
  });

  it('should return the correct status for an existing file', async () => {
    const mockFile = {
      id : 1,
      filename: 'existing-file.txt',
      uploadStatus: UploadStatus.SUCCESS,
    };
    jest.spyOn(repository, 'findOne').mockResolvedValueOnce(mockFile);

    const result = await service.getUploadStatus('existing-file.txt');
    expect(result).toEqual({
      filename: 'existing-file.txt',
      status: UploadStatus.SUCCESS,
    });
  });

  it('should handle errors when uploadFile fails', async () => {
    jest.spyOn(repository, 'save').mockRejectedValue(new Error('Database error'));

    const result = await service.uploadFile('test-file.txt');
    expect(result).toEqual({
      message: 'File upload failed',
      status: UploadStatus.FAILED,
    });
  });

});
