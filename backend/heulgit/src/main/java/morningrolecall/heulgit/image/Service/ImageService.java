package morningrolecall.heulgit.image.Service;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import lombok.RequiredArgsConstructor;
import morningrolecall.heulgit.image.util.FileUtils;

@RequiredArgsConstructor
@Component
@Service
public class ImageService {

	private static final String FILE_URL_PROTOCOL = "https://s3.ap-northeast-2.amazonaws.com/";

	@Autowired
	private AmazonS3 s3Client;

	@Value("${cloud.aws.s3.bucket}")
	private String bucketName;

	/**
	 *  파일 업로드
	 * 1. 사용자 Id,카테고리, 파일
	 * 2. S3에 파일 업로드
	 * */

	public List<String>  uploadFile(String userId, String category, List<MultipartFile> multipartFiles) {
		List<String> fileUrls = new ArrayList<>();
		for(MultipartFile multipartFile: multipartFiles){
			if(fileUrls.size()> 10){
				//TODO: 예외 처리
			}
			String fileName = FileUtils.buildFileName(category,userId,multipartFile.getOriginalFilename());
			ObjectMetadata objectMetadata = new ObjectMetadata();
			objectMetadata.setContentType(multipartFile.getContentType());
			try (InputStream inputStream = multipartFile.getInputStream()) {
				s3Client.putObject(new PutObjectRequest(bucketName, fileName, inputStream, objectMetadata)
					.withCannedAcl(CannedAccessControlList.PublicRead));
				fileUrls.add(FILE_URL_PROTOCOL + bucketName + "/" + fileName);
			} catch (IOException e) {
				//TODO: 예외 처리
			}
		}
		return fileUrls;
	}

	/**
	 *  파일 삭제
	 * 1. 파일 URL 정보 받아
	 * 2. 파싱하여 S3에서 삭제
	 * */
	public void deleteFile(List<String> fileUrls){

		for(String fileUrl: fileUrls){
			String pattern = "/heulgitbucket/(.*)";
			Pattern r = Pattern.compile(pattern);
			Matcher m = r.matcher(fileUrl);
			if (m.find()) {
				String extractedValue = m.group(1);
				s3Client.deleteObject(bucketName,extractedValue);
			}
		}

	}


}
